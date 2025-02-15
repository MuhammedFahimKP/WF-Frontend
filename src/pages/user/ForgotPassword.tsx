import { useEffect, useState, useContext } from "react";

import { useDispatch } from "react-redux";

import { useFormik } from "formik";

import { useWindowDimensions, useOneTapGoogleAuth } from "@/hooks";

import { setAuthState } from "@/slices/authenticationSlice";

import { ToastContext } from "@/context";

import apiClient, {
  ApiClientResponse,
  ApiClientError,
} from "@/services/api-client";
import { Toaster } from "react-hot-toast";

import { Link } from "react-router-dom";

import Logo from "@/assets/whiteLogo.svg";

import * as Yup from "yup";

import toast from "react-hot-toast";
import SuccessAlert from "../../ui/alerts/SuccessAlert";
import ErrorAlert from "../../ui/alerts/ErrorAlert";
import LoadingAlert from "@/ui/alerts/LoadingAlert";
import ErrorText from "@/ui/user/ErrorText";

const covers = [
  "https://espanshe.com/cdn/shop/files/Canvas_3.png?v=1684475994&width=575",
  "https://espanshe.com/cdn/shop/files/Canvas_10_9295a618-dd8e-4abc-a46d-a6f85d8080d5.png?v=1686306955&width=750",
];

const ForgotPassword = () => {
  // if (auth_state !== "FORGET PASS") {
  //   navigate("/signup/");
  // }

  const dispatch = useDispatch();
  const toastContext = useContext(ToastContext);

  const schema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const initialValues: { email: string } = {
    email: "",
  };

  const { error, isLoading } = useOneTapGoogleAuth();

  const [linkeSented] = useState(false);

  useEffect(() => {
    if (error !== null) {
      toast.custom((t) => <ErrorAlert errorText={error} toast={t} />);
    }
  }, [error]);
  const formike = useFormik<{ email: string }>({
    initialValues,
    onSubmit,
    validationSchema: schema,
  });

  useEffect(() => {
    toastContext?.addAnotherToast();
    return () => {
      setAuthState("EMAIL CHANGED");
      toastContext?.removeAnotherToast();

      if (linkeSented) {
      }
      return;
    };
  }, []);

  function onSubmit(values: { email: string }, actions: any) {
    apiClient
      .post("send-forgot-password-link/", values)
      .then((res: ApiClientResponse) => {
        if (res.status === 201) {
          actions.resetForm({
            values: {
              email: "",
              password: "",
              first_name: "",
              last_name: "",
            },
          });

          dispatch(setAuthState("ACTIVATION"));

          toast.custom((t) => (
            <SuccessAlert
              toast={t}
              successText="Please Check Email For Activation"
            />
          ));
        }
      })
      .catch((err: ApiClientError) => {
        if (err.response?.status == 404) {
          formike.setErrors({ email: "there is no user with this gmail" });
        }

        if (err.response?.status == 401) {
          if (err.response.data?.email === "email not verified") {
            formike.setErrors({ email: "please activate your email and try" });
          } else {
            formike.setErrors({
              email: "try to login with using google account option",
            });
          }
        }
      });
  }

  const [currentCoverIndex, setCoverIndex] = useState(0);

  function handelCoverChange() {
    currentCoverIndex != covers.length - 1
      ? setCoverIndex(currentCoverIndex + 1)
      : setCoverIndex(0);

    setTimestamp(Date.now());
  }

  const [timestamp, setTimestamp] = useState(Date.now());

  useEffect(() => {
    const changeImageInterval = setInterval(() => {
      handelCoverChange();
    }, 1000);

    return () => {
      clearInterval(changeImageInterval);
    };
  }, [currentCoverIndex]);

  const { width } = useWindowDimensions();

  return (
    <div className="w-screen h-screen">
      <section className="min-h-screen flex font-ubuntu items-center justify-center">
        <div className="flex rounded-2xl shadow-2xl  max-w-3xl overflow-hidden  border border-gray-200    pb-5  md:pb-0">
          <div className="md:w-1/2 px-5 pt-2 flex flex-col  justify-between">
            <div className="flex  flex-col justify-center my-20">
              <div className="mb-2">
                <h2 className="text-2xl  font-ubuntu">Forget Password</h2>
                <p className="text-sm mt-4 ">
                  If you forget password, Please type your email and submit to
                  get reset link
                </p>
              </div>
              <form className="mt-10" onSubmit={formike.handleSubmit}>
                <div>
                  <label className="block text-gray-700">Email</label>
                  <input
                    type="text"
                    name="email"
                    onChange={formike.handleChange}
                    id=""
                    value={formike.values.email}
                    placeholder="Enter Email"
                    className="w-full px-4 py-2 rounded-lg bg-gray-200 mt-2 border  focus:bg-white focus:outline-none"
                    autoComplete=""
                  />

                  <ErrorText>PAklsdkldkls</ErrorText>
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white  rounded-lg
                        px-4 py-3 mt-6"
                >
                  Send Reset Link
                </button>
              </form>
            </div>

            <div className="text-sm flex justify-between items-center mt-3 mb-5">
              <p>If you rembered password ...</p>
              <Link
                to={"/signin/"}
                className="py-2 px-5 ml-3 bg-white border rounded-xl hover:scale-110 duration-300 border-blue-400  "
              >
                Sign In
              </Link>
            </div>
          </div>
          <div className="w-0 relative invisible md:visible  md:w-1/2 ">
            <img
              src={`${covers[currentCoverIndex]}?_=${timestamp}`}
              className="rounded-sm brightness-75  object-contain  transition-all duration-1000"
              alt="page img"
            />
            <img
              src={Logo}
              className="absolute top-0 left-1/2 -translate-x-1/2   h-auto w-52     object-fill"
            />
          </div>
        </div>
        {isLoading && <LoadingAlert loadingShowText="Authenticating" />}
      </section>

      <Toaster position={width > 900 ? "bottom-right" : "top-center"} />
    </div>
  );
};

export default ForgotPassword;
