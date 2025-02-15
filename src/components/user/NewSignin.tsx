import { useEffect, useState, useContext } from "react";
import { useDispatch } from "react-redux";

import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";

import { useWindowDimensions } from "@/hooks";

import { ToastContext } from "@/context";

import { logedIn } from "../../slices/authenticationSlice";

import { Toaster } from "react-hot-toast";

import apiClient, {
  ApiClientResponse,
  ApiClientError,
} from "../../services/api-client";

import Logo from "../../assets/whiteLogo.svg";

import ErrorText from "../../ui/user/ErrorText";

import * as Yup from "yup";

import toast from "react-hot-toast";

import { UserSignInData } from "../../types";
import { useOneTapGoogleAuth } from "@/hooks";

import ErrorAlert from "@/ui/alerts/ErrorAlert";

import LoadingAlert from "@/ui/alerts/LoadingAlert";

const covers = [
  "https://espanshe.com/cdn/shop/files/Canvas_3.png?v=1684475994&width=575",
  "https://espanshe.com/cdn/shop/files/Canvas_10_9295a618-dd8e-4abc-a46d-a6f85d8080d5.png?v=1686306955&width=750",
];

const NewSignin = () => {
  const toastContext = useContext(ToastContext);

  const signInSchema = Yup.object().shape({
    email: Yup.string()
      .email("Not a Valid Email")
      .required("Please Provide a Email"),
    password: Yup.string().required("Please Provide the password"),
  });

  const { width } = useWindowDimensions();

  const initialValues: UserSignInData = {
    email: "",
    password: "",
  };

  // function handleGoogleAuthClick(id_token: string) {
  //   handleGoogleAuth(id_token);
  // }

  // useGoogleOneTapLogin({
  //   use_fedcm_for_prompt: true,
  //   onSuccess: (res: CredentialResponse) => {
  //     console.log(res);
  //     res.credential && handleGoogleAuthClick(res.credential);
  //   },
  // });

  const navigate = useNavigate();

  const { error, isLoading } = useOneTapGoogleAuth();

  useEffect(() => {
    toastContext?.addAnotherToast();
    return () => toastContext?.removeAnotherToast();
  }, []);

  useEffect(() => {
    if (error !== null) {
      toast.custom((t) => <ErrorAlert errorText={error} toast={t} />);
    }
  }, [error]);

  const formike = useFormik<UserSignInData>({
    initialValues,
    onSubmit,
    validationSchema: signInSchema,
  });

  const errors = formike.errors;
  const touched = formike.touched;
  const dispatch = useDispatch<any>();

  function onSubmit(values: UserSignInData, actions: any) {
    apiClient
      .post("users/signin/", values)
      .then((res: ApiClientResponse) => {
        if (res.status === 200) {
          actions.resetForm({
            values: {
              email: "",
              password: "",
            },
          });

          dispatch(
            logedIn({
              refresh: res.data.refresh,
              access: res.data.access,
              user: res.data.user,
            })
          );

          navigate("/");
        }
      })
      .catch((err: ApiClientError) => {
        const errorData: any = err.response?.data;
        if (err.response?.status == 403) {
          errorData?.passowrd &&
            formike.setErrors({ password: "incorrect password" });

          errorData?.User && formike.setErrors({ email: "Email Not Verified" });

          errorData?.["auth_method"] &&
            formike.setErrors({ email: "try with google authentication" });
        }
        if (err.response?.status == 404) {
          formike.setErrors({ email: "User with the mail not found" });
          console.log("404");
        }
        console.log(err);
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

    return () => clearInterval(changeImageInterval);
  }, [currentCoverIndex]);

  return (
    <div className="w-screen h-screen font-ubuntu  ">
      <section className="min-h-screen   flex items-center justify-center ">
        <div className="flex rounded-2xl  border border-gray-200    shadow-lg  max-w-3xl overflow-hidden pb-5  md:pb-0">
          <div className="md:w-1/2 px-5 pt-12 ">
            <h2 className="text-2xl ">SignIn</h2>
            <p className="text-sm mt-4 ">
              If you have don't have an account, please login
            </p>
            <form className="mt-6" onSubmit={formike.handleSubmit}>
              <div>
                <label className="block text-gray-700">Email Address</label>
                <input
                  type="email"
                  name="email"
                  onChange={formike.handleChange}
                  id="email"
                  placeholder="Enter Email Address"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border  focus:bg-white focus:outline-none"
                  autoComplete=""
                />
                {errors["email"] && touched["email"] && (
                  <ErrorText> {errors["email"]}</ErrorText>
                )}
              </div>
              <div className="mt-4">
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  onChange={formike.handleChange}
                  name="password"
                  id="password"
                  placeholder="Enter Password"
                  minLength={6}
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border 
            focus:bg-white focus:outline-none"
                />

                {errors["password"] && touched["password"] && (
                  <ErrorText> {errors["password"]}</ErrorText>
                )}
              </div>
              <div className="text-right mt-2">
                <a
                  href="#"
                  className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
                >
                  Forgot Password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white font-ubuntu rounded-lg
          px-4 py-2 mt-2"
              >
                Log In
              </button>
            </form>

            <div className="text-sm flex justify-between items-center mt-3 ">
              <p>If you don't have an account...</p>
              <Link
                to={"/signup/"}
                className="py-2 px-5 ml-3 bg-white border rounded-xl hover:scale-110 duration-300 border-blue-400  "
              >
                Register
              </Link>
            </div>
          </div>
          <div className="w-0 relative invisible md:visible  md:w-1/2 ">
            <img
              src={`${covers[currentCoverIndex]}?_=${timestamp}`}
              className="rounded-sm brightness-75   transition-all duration-1000"
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

export default NewSignin;
