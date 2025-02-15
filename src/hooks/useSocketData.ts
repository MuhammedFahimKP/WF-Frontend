import { useState, useEffect } from "react";
import { handleRefreshTokenChange } from "../services/api-client";
import { RootState } from "../store";

import { useSelector } from "react-redux";

import { createQueryParamString } from "../utils/other-utils";

import { SocketError } from "@/types";

import webScoketClient from "@/services/ws-client";

const useSocketData = <T extends Object | T[]>(
  wsUrl: string,
  token: boolean,
  extraQueryParams?: { [key: string]: string | string[] },
  deps?: any[]
) => {
  const [data, setData] = useState<T | null>(null);

  const [tokenChage, setTokenChange] = useState(false);

  const { access, refresh } = useSelector(
    (state: RootState) => state.persistedReducer.auth
  );

  const getParams = () => {
    if (extraQueryParams && token && access) {
      return createQueryParamString({ ...extraQueryParams, token: access });
    }

    if (extraQueryParams && !token) {
      return createQueryParamString({ ...extraQueryParams });
    }

    if (token && access) {
      return createQueryParamString({ token: access });
    }

    return "";
  };

  useEffect(
    () => {
      const params = getParams();

      const ws = webScoketClient(wsUrl + params);
      ws.onmessage = (ev: MessageEvent) => {
        const newData = JSON.parse(ev.data);

        if (newData as SocketError) {
          if (
            newData.code == 4001 &&
            newData.reason == "Token Expired" &&
            refresh
          ) {
            handleRefreshTokenChange(() => setTokenChange(!tokenChage));
          }
        }
        if (JSON.stringify(data) != JSON.stringify(newData)) {
          console.log("insie data and new data");
          setData({ ...newData });
        }
      };

      ws.onclose = () => {
        setData(null);
      };

      return () => ws.close();
    },
    deps ? [...deps, tokenChage] : [tokenChage]
  );

  return { data };
};
export default useSocketData;
