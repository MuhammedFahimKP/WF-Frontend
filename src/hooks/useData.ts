import { useEffect, useState } from "react";
import apiClient, {
  ApiClientCanceledError,
  type ApiClientError,
  type ApiClientResponse,
  type ApiCLientRequestConfig,
} from "@/services/api-client";

const useData = <T>(
  endpoint: string,
  delay = 0,
  requestConfig?: ApiCLientRequestConfig,
  auth?: boolean,
  deps?: any[]
) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(
    () => {
      const controller = new AbortController();

      setLoading(true);

      setTimeout(() => {
        apiClient
          .get<T>(endpoint, {
            signal: controller.signal,
            ...requestConfig,
            transformRequest: (_, headers) => {
              if (auth !== true && headers.hasAuthorization()) {
                delete headers["Authorization"];
              }
            },
          })
          .then((res: ApiClientResponse) => {
            if (error !== null) {
              setError(null);
            }

            setData(res.data);
            setLoading(false);
          })
          .catch((err) => {
            if (err instanceof ApiClientCanceledError) return;

            if ((err as ApiClientError)?.message) {
              if (data.length > 0) {
                setData([]);
              }
              setError(err.message);
            }
            setLoading(false);
          });
      }, delay);

      return () => controller.abort();
    },
    deps ? [...deps] : []
  );

  return { data, error, isLoading, setData };
};

export default useData;
