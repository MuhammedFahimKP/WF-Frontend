import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  CanceledError,
} from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { getState, dispatch } from "../store";
import {
  setAuthTokens,
  logout,
  setAuthState,
} from "../slices/authenticationSlice";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const apiClient = axios.create({
  baseURL: BASE_URL,
});

apiClient.interceptors.request.use(async (config) => {
  const { access } = getState().persistedReducer.auth;

  if (access !== null) {
    config.headers.Authorization = `Bearer ${access}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (res) => {
    return Promise.resolve(res);
  },
  (err) => {
    return Promise.reject(err);
  }
);

const refreshAuthLogic = async (failedRequest: AxiosError<any>) => {
  const { refresh } = getState().persistedReducer.auth;
  const errorDetailText = "Given token not valid for any token type";

  if (
    refresh !== null &&
    failedRequest.response?.status === 401 &&
    failedRequest.response?.data?.detail === errorDetailText
  ) {
    return axios
      .post(
        "users/refresh/",
        {
          refresh: refresh,
        },
        {
          baseURL: BASE_URL,
        }
      )
      .then((resp) => {
        const { access } = resp.data;
        if (failedRequest?.response) {
          failedRequest.response.config.headers.Authorization = `Bearer ${access}`;
        }
        dispatch(setAuthTokens({ access: access }));
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          dispatch(logout());
        }
      });
  }
};

createAuthRefreshInterceptor(apiClient, refreshAuthLogic);

const handleRefreshTokenChange = (callbackFn?: () => void) => {
  const refresh = getState().persistedReducer.auth.refresh;

  apiClient
    .post<{ access: string; refresh?: string }>("users/refresh/", {
      refresh,
    })
    .then((res) => {
      callbackFn && callbackFn();
      dispatch(setAuthTokens(res.data));
    })
    .catch((err: ApiClientError) => {
      if (err?.response?.status == 401) {
        dispatch(setAuthState("TIMED OUT"));
      }
    });
};

export async function fetcher<T = any>(url: string) {
  return apiClient
    .get<T>(url)
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return err.response.data;
    });
}

export { BASE_URL, handleRefreshTokenChange };

//types

export class ApiClientErrorType extends AxiosError {}
export default apiClient;
export type ApiClientError<T = any, D = any> = AxiosError<T, D>;
export type ApiClientResponse<T = any> = AxiosResponse<T>;
export type ApiCLientRequestConfig = AxiosRequestConfig;
export { CanceledError as ApiClientCanceledError };
