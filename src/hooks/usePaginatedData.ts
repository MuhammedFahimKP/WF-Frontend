import { useEffect, useState } from "react";
import { PaginatedResponseData } from "../types";

import apiClient, {
  ApiCLientRequestConfig,
  ApiClientCanceledError,
  ApiClientError,
  ApiClientResponse,
} from "../services/api-client";

function usePaginatedData<T>(
  url: string,
  limit: number,
  delay: number,
  extraConfig?: ApiCLientRequestConfig,
  auth?: boolean,
  deps?: any[]
) {
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T[] | []>([]);
  const [pageChange, setPageChange] = useState(false);
  const [pageRefreshed, setPageRefreshed] = useState(false);

  const next = () => {
    if (isLoading === false) {
      setCurrentPage((prevPage) => {
        setPageChange(true);
        const page = prevPage + 1 > pages ? 1 : prevPage + 1;
        return page;
      });
    }
  };

  const prev = () => {
    if (isLoading === false) {
      setCurrentPage((prevPage) => {
        setPageChange(true);

        const page = [0, 1].includes(prevPage) ? pages : prevPage - 1;

        return page;
      });
    }
  };

  const pageRefresh = () => {
    setPageChange(true);
    setPageRefreshed(true);
  };

  const setPageAndCurrentPage = () => {
    setData([]);
    if (pageChange !== true) {
      setPages(0);
      setCurrentPage(1);
    }
  };

  useEffect(
    () => {
      setPageAndCurrentPage();

      const requestConfig = {
        ...extraConfig,
        params: { ...extraConfig?.params, page: currentPage, limit: limit },
      };

      const controller = new AbortController();

      setIsLoading(true);

      setTimeout(() => {
        apiClient
          .get<PaginatedResponseData<T>>(url, {
            signal: controller.signal,
            ...requestConfig,
            transformRequest: (_, headers) => {
              if (auth !== true && headers.hasAuthorization()) {
                delete headers.Authorization;
              }
            },
          })
          .then((res: ApiClientResponse) => {
            setData(res.data.results);

            if (error !== null) {
              setError(null);
            }

            setPages(Math.ceil(res.data.count / limit));
          })
          .catch((err: ApiClientError) => {
            if (data.length > 0) {
              setData([]);
            }

            if (
              err?.response?.status === 404 &&
              pageRefreshed === true &&
              [0, 1].includes(currentPage) === false
            ) {
              setCurrentPage(currentPage - 1);
            }

            if (err instanceof ApiClientCanceledError) return;

            setError(err.message);
          })
          .finally(() => {
            setIsLoading(false);

            if (pageChange === true) {
              setPageChange(false);
            }

            if (pageRefreshed === true) {
              setPageRefreshed(false);
            }
          });
      }, delay);

      return () => controller.abort();
    },
    deps ? [...deps, currentPage, pageRefreshed] : [currentPage, pageRefreshed]
  );

  return {
    data,
    pages,
    isLoading,
    error,
    currentPage,
    setCurrentPage,
    pageRefresh,
    setData,
    prev,
    next,
  };
}

export default usePaginatedData;
