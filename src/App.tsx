import { Provider } from "react-redux";
import RouteWrapper from "./RouteWrapper";
import { store, persistor } from "./store";

import { PersistGate } from "redux-persist/integration/react";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { ToastContextProvider } from "./context";
import { NotFoundProvider } from "@/context";

export default function App() {
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_ID;
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={false}>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <ToastContextProvider>
            <NotFoundProvider>
              <RouteWrapper />
            </NotFoundProvider>
          </ToastContextProvider>
        </GoogleOAuthProvider>
      </PersistGate>
    </Provider>
  );
}
