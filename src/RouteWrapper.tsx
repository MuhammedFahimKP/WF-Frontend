import React, { useContext } from "react";

import { useSelector } from "react-redux";

import { RootState } from "./store";

import { RouterProvider } from "react-router-dom";

import routes from "./routes";

import { ToastContext } from "./context";

import { Toaster } from "react-hot-toast";

import EmailChangeAfterModal from "./components/EmailChangeAfterModal";

const RouteWrapper = () => {
  const toastContext = useContext(ToastContext);

  const auth = useSelector((state: RootState) => state.persistedReducer.auth);

  return (
    <React.Fragment>
      <RouterProvider router={routes} />

      {auth?.auth_state === "EMAIL CHANGED" && <EmailChangeAfterModal />}

      {toastContext?.anotherToast === false && <Toaster />}
    </React.Fragment>
  );
};

export default RouteWrapper;
