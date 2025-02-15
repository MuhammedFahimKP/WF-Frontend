import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { MonthType, SocketError } from "@/types";
import apiClient, {
  ApiClientCanceledError,
  handleRefreshTokenChange,
} from "@/services/api-client";
import webSocketClient from "@/services/ws-client";

import { generateYearsFromStart, getMonthsForYear } from "@/utils/other-utils";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import Loader from "../Loader";
import NoNetwork from "../NoNetwork";
import DelayComponent from "../DelayComponent";

import NoData from "@/ui/animations/NoData";

interface OrderData {
  day: number;
  order_count: number;
}

const SalesDashboard: React.FC = () => {
  const [salesData, setSalesData] = useState<OrderData[]>([]);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [months, setMonths] = useState<MonthType[]>([]);
  const [tokenChange, setTokenChange] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { access, refresh } = useSelector(
    (state: RootState) => state.persistedReducer.auth
  );

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  useEffect(() => {
    setSalesData([]);
    setIsLoading(true);
    setError(null);

    if (year === currentYear && month === currentMonth) {
      // Use WebSocket for the current month

      const ws = webSocketClient(
        `admin/get-sales-dashboard-count/?token=${access}`
      );

      ws.onopen = () => {
        setError(null);
        setIsLoading(false);
      };
      ws.onmessage = (ev: MessageEvent) => {
        const newData = JSON.parse(ev.data);

        if (newData as SocketError) {
          if (
            newData.code == 4001 &&
            newData.reason == "Token Expired" &&
            refresh
          ) {
            handleRefreshTokenChange(() => setTokenChange(!tokenChange));
          }
        }

        if (JSON.stringify(newData) != null) {
          setSalesData(newData);
        }
      };

      ws.onclose = () => {
        setIsLoading(false);
        setSalesData([]);
        ws.OPEN !== ws.readyState && setError("Network Error");
      };

      return () => ws.close();

      // Use HTTP request for past months
    } else {
      const controller = new AbortController();

      apiClient
        .get(`admin/dashboard-data/${year}/${month}/`, {
          signal: controller.signal,
        })
        .then((res) => {
          if (res.status === 200) {
            setError(null);
            setSalesData(res.data);
          }

          console.log(error);
        })
        .catch((err) => {
          if (err instanceof ApiClientCanceledError) return;
          setError(err.message);
          console.error(err);
        })
        .finally(() => setIsLoading(false));

      return () => controller.abort();
    }
  }, [year, month, tokenChange]);

  useEffect(() => {
    setMonths(getMonthsForYear(year));
  }, [year]);

  // Generate year options (e.g., from 2020 to current year)
  const years = generateYearsFromStart(2023);

  return (
    <div className="my-10 ">
      <h1 className="text-2xl  mb-4">Sales Dashboard</h1>

      {/* Year and Month selection */}
      <div className="flex space-x-4 mb-6">
        <select
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value))}
          className="p-2 text-sm md:text-md   border border-gray-300 rounded-md"
        >
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

        <select
          value={month}
          onChange={(e) => setMonth(parseInt(e.target.value))}
          className="p-2 text-sm md:text-md  border border-gray-300 rounded-md"
        >
          {months.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>
      </div>

      {/* Recharts LineChart */}

      <div className="mt-10 mx-auto flex flex-col lg:flex-row items-baseline    lg:items-center  justify-center   lg:justify-between ">
        {salesData?.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={salesData}
              margin={{
                top: 15,
                right: 15,
                left: 15,
                bottom: 15,
              }}
            >
              <defs>
                <linearGradient id="strokeGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#a855f7" />{" "}
                  {/* Tailwind purple-500 */}
                  <stop offset="100%" stopColor="#ec4899" />{" "}
                  {/* Tailwind pink-500 */}
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="day"
                interval={0} // Ensure all days are shown
                tickFormatter={(tick) => (tick > 0 ? tick : "")} // Only show positive day values
                label={{
                  value: "Day of the Month",
                  position: "insideBottom",
                  offset: -10,
                }}
              />
              <YAxis
                // Only show 0 and positive values on the Y-axis
                label={{ value: "Orders", angle: -90, position: "insideLeft" }}
                type="number"
                allowDecimals={false}
                domain={[0, "auto"]} // Ensure the Y-axis starts at 0
                dataKey={"order_count"}
              />
              <Tooltip />
              <Line
                type="monotone"
                name="Orders "
                dataKey="order_count"
                stroke="url(#strokeGradient)"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          error === null &&
          !isLoading && (
            <DelayComponent delay={700}>
              <div className="flex font-ubuntu  md:pb-4  mx-4      md:mx-8 lg:mx-16 border md:border-none  md:broder-gray  border-gray-200  shadow-lg md:shadow-none  rounded-2xl  w-full  items-center md:justify-center overflow-hidden ">
                <NoData
                  text={`${
                    year === currentYear && month === currentMonth
                      ? "No Sales in this month"
                      : "No Sales have done"
                  }`}
                />
              </div>
            </DelayComponent>
          )
        )}

        {isLoading && (
          <div className="w-full bg-green-500 h-[80vh] ">
            <Loader heightClass="h-full" />
          </div>
        )}

        {!isLoading && error === "Network Error" && (
          <DelayComponent delay={1000}>
            <div className="flex font-ubuntu  md:pb-4  mx-4      md:mx-8 lg:mx-16 border md:border-none  md:broder-gray  border-gray-200  shadow-lg md:shadow-none  rounded-2xl  w-full  items-center md:justify-center overflow-hidden ">
              <NoNetwork reasone="failed to fetch sales data " />
            </div>
          </DelayComponent>
        )}
      </div>
    </div>
  );
};

export default SalesDashboard;
