import { useState, useEffect } from "react";

import apiClient, {
  type ApiCLientRequestConfig,
  type ApiClientResponse,
  type ApiClientError,
} from "../services/api-client";

const useSingleData = <T>(
  endpoint: string,
  delay = 0,
  requestConfig?: ApiCLientRequestConfig,
  auth?: boolean,
  deps?: any[]
) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<ApiClientError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    () => {
      setIsLoading(true);

      const controler = new AbortController();

      setTimeout(() => {
        apiClient
          .get<T>(endpoint, {
            signal: controler.signal,
            ...requestConfig,
            transformRequest: (_, headers) => {
              if (auth !== true && headers.hasAuthorization()) {
                delete headers.Authorization;
              }
            },
          })
          .then((res: ApiClientResponse) => {
            setData(res.data);
          })
          .catch((error: ApiClientError) => {
            setError(error);
          })
          .finally(() => setIsLoading(false));
      }, delay);

      return () => controler.abort();
    },
    deps ? [...deps] : []
  );

  return {
    data,
    error,
    isLoading,
    setData,
  };
};

export default useSingleData;
