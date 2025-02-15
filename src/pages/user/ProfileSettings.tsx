import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";

import { RootState, AppDispact } from "@/store";

import * as Yup from "yup";

import { updateUserData } from "@/slices/authenticationSlice";

import apiClient from "@/services/api-client";

import toast from "react-hot-toast";

import ChangePassword from "@/components/user/ChangePassword";
import EmailChangeForm from "@/components/user/EmailChangeForm";

import ErrorText from "@/ui/user/ErrorText";
import SuccessAlert from "@/ui/alerts/SuccessAlert";
import NetworkErrorAlert from "@/ui/alerts/NetworkErrorAlert";
import ErrorAlert from "@/ui/alerts/ErrorAlert";
import ProfileAvatar from "@/ui/user/ProfileAvatar";

import { FILE_REQUEST_CONFIG } from "@/utils/constants";
import { UserModelResponse } from "@/types";

const ProfileSettings = () => {
  const { user } = useSelector(
    (state: RootState) => state.persistedReducer.auth
  );

  const [emailChangeForm, setEmailChangeForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch<AppDispact>();
  const handleEmailChangeForm = () => setEmailChangeForm(!emailChangeForm);

  const initialValues = {
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
  };

  const userNameChangeValidationScehma = Yup.object().shape({
    first_name: Yup.string()
      .min(2, "First name must be at least 2 characters")
      .required("First name is required"),
    last_name: Yup.string().min(2, "Last name must be at least 2 characters"),
  });

  const handleFetching = (
    data: typeof initialValues,
    oldValues: typeof initialValues
  ) => {
    setIsLoading(true);

    apiClient
      .patch("users/user-update/", data, FILE_REQUEST_CONFIG)
      .then((res) => {
        if (res.status === 200) {
          dispatch(updateUserData(res.data)) &&
            toast.custom((t) => (
              <SuccessAlert
                successText="User data updated successfully"
                toast={t}
              />
            ));
        }
      })
      .catch((err) => {
        err.message === "Network Error" &&
          toast.custom((t) => <NetworkErrorAlert toast={t} />) &&
          setValues(oldValues);
      })
      .finally(() => setIsLoading(false));
  };

  const { handleSubmit, errors, touched, handleChange, setValues } = useFormik({
    initialValues,
    validationSchema: userNameChangeValidationScehma,
    onSubmit: (values) => {
      const { first_name, last_name } = user as UserModelResponse;

      if (first_name || last_name) {
        const oldValues = {
          first_name: first_name || "",
          last_name: last_name || "",
        };

        JSON.stringify(oldValues) !== JSON.stringify(values)
          ? handleFetching(values, oldValues)
          : toast.custom((t) => (
              <ErrorAlert errorText="noting changed" toast={t} />
            ));
      }
    },
  });

  return (
    <div className="grid grid-cols-1 gap-4 w-full ">
      <div className="w-full px-6 pb-8   border-2 border-gray-200 rounded-lg ">
        <div className="grid w-full mx-auto mt-8">
          <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
            {/* <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg"
              src={user?.img}
              referrerPolicy="no-referrer"
              alt="Bonnie image"
            /> */}

            <ProfileAvatar src={user?.img || ""} />
          </div>
          <div className="items-center mt-8 sm:mt-14 ">
            <div className="mb-2 sm:mb-6  border-y py-8 border-gray-200">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-black"
              >
                Your email
              </label>
              <div className="flex items-center justify-center gap-4">
                <input
                  type="email"
                  id="email"
                  className="border border-black  focus:border-0 focus:bg-gray-200 focus:placeholder:text-gray-400  rounded-lg block w-full p-2.5 "
                  defaultValue={user?.email}
                  disabled
                />

                <button
                  className={`bg-black px-4 py-2 text-white rounded-lg ${
                    user?.auth_type && user.auth_type === "google"
                      ? "opacity-50"
                      : ""
                  }`}
                  disabled={user?.auth_type === "google"}
                  onClick={handleEmailChangeForm}
                >
                  {" "}
                  change
                </button>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 md:flex-row md:space-x-4 md:space-y-0 sm:mb-6">
                <div className="w-full">
                  <label
                    htmlFor="first_name"
                    className="block mb-2 text-sm font-medium "
                  >
                    Your first name
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    onChange={handleChange}
                    className="border border-black  focus:border-0 focus:outline-none focus:bg-gray-200 focus:placeholder:text-gray-400  rounded-lg block w-full p-2.5 "
                    // className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                    placeholder="Your first name"
                    defaultValue={user?.first_name}
                  />

                  {errors.first_name && touched?.first_name && (
                    <ErrorText>{errors.first_name}</ErrorText>
                  )}
                </div>
                <div className="w-full">
                  <label
                    htmlFor="last_name"
                    className="block mb-2 text-sm font-medium  dark:text-white"
                  >
                    Your last name
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    onChange={handleChange}
                    className="border border-black  focus:border-0 focus:outline-none focus:bg-gray-200 focus:placeholder:text-gray-400  rounded-lg block w-full p-2.5 "
                    placeholder="Your last name"
                    defaultValue={user?.last_name}
                  />

                  {errors.last_name && touched?.last_name && (
                    <ErrorText>{errors.first_name}</ErrorText>
                  )}
                </div>
              </div>
              <div className="flex justify-end mt-5">
                <button
                  type="submit"
                  className={`bg-black  px-4 py-2 rounded-lg text-white ${
                    isLoading ? "opacity-60" : ""
                  } `}
                  disabled={isLoading}
                >
                  {isLoading ? "Saving" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {user?.auth_type === "email" && <ChangePassword />}
      <EmailChangeForm
        form={emailChangeForm}
        handleForm={handleEmailChangeForm}
      />
    </div>
  );
};

export default ProfileSettings;
