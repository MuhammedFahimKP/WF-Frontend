import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGoogleOneTapLogin } from "@react-oauth/google";

import type { AppDispact } from "@/store";
import { logedIn } from "@/slices/authenticationSlice";

import apiClient, {
  type ApiClientError,
  type ApiClientResponse,
} from "@/services/api-client";

export default function useOneTapGoogleAuth() {
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch<AppDispact>();

  const navigate = useNavigate();

  useGoogleOneTapLogin({
    use_fedcm_for_prompt: true,
    onSuccess: (res) => {
      if (res.credential) {
        setIsLoading(true);

        apiClient
          .post("users/google/", { access_token: res.credential })
          .then((res: ApiClientResponse) => {
            if (res.status === 200) {
              dispatch(
                logedIn({
                  access: res.data.access,
                  refresh: res.data.refresh,
                  user: res.data.user,
                })
              );
              navigate("/");
            }
          })
          .catch((err: ApiClientError) => {
            if (err.response?.status === 403) {
              setError("Pleas Signin Via Your Email");
            }
          })
          .finally(() => setIsLoading(false));
      }
    },
  });

  return {
    error,
    isLoading,
  };
}
