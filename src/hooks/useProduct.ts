import useData from "./useData";
import { getState } from "../store";
import type { AdminProduct, ProductResponseData } from "../types";

import usePaginatedData from "./usePaginatedData";
import { ApiCLientRequestConfig } from "../services/api-client";

export default function useProduct(deps: any[], delay?: number) {
  const params = getState().adminProductSearchSlice;

  return useData<AdminProduct>(
    "admin/product/",
    delay,
    {
      params: params,
    },
    undefined,
    [...deps]
  );
}

const usePaginatedAdminProduct = (
  limit: number,
  delay: number,
  requestConfig?: ApiCLientRequestConfig,
  deps?: any[]
) =>
  usePaginatedData<AdminProduct>(
    "admin/product/",
    limit,
    delay,
    requestConfig,
    true,
    deps
  );

const useStoreProduct = (
  limit: number,
  delay?: number,
  requestConfig?: ApiCLientRequestConfig,
  deps?: any[]
) =>
  usePaginatedData<ProductResponseData>(
    "shop/",
    limit,
    delay || 0,
    requestConfig,
    false,
    deps
  );

export { useStoreProduct, usePaginatedAdminProduct };
