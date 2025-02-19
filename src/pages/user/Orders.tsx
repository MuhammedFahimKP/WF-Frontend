import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { usePaginatedOrder } from "@/hooks";

import type { OrderFetchResponse } from "@/types";

import {
  getAllSearchParams,
  generateYearsFromStart,
  makeObjFromArray,
} from "@/utils/other-utils";

import NoData from "@/ui/animations/NoData";
import DropDownBtn from "@/ui/user/DropDownBtn";
import PaginationBtn from "@/ui/user/PaginationBtn";

import NoNetwork from "@/components/NoNetwork";
import DelayComponent from "@/components/DelayComponent";

import { Order } from "@/pages/user/OrderHistory";

const Orders = () => {
  const [orderFilters, setOrderFilters] = useSearchParams({});
  const [dataChange] = useState(false);
  const [dateRangeFilterValues] = useState(
    makeObjFromArray<number>(generateYearsFromStart(2022))
  );

  useEffect(
    () =>
      setOrderFilters({
        payment: "RAZOR PAY",
        ordering: "-created",
        status: "Placed",
        created: "past_3_months",
      }),
    []
  );

  const {
    data,
    pages,
    isLoading,
    error,
    next,
    currentPage,
    prev,
    pageRefresh,
  } = usePaginatedOrder(
    2,
    0,
    {
      params: getAllSearchParams(orderFilters),
    },

    [orderFilters, dataChange]
  );

  const handleFilterClick = (key: string, value: string) => {
    setOrderFilters((prev: URLSearchParams) => {
      const newParams = new URLSearchParams(prev);

      if (newParams.has(key)) {
        newParams.delete(key);
      }
      newParams.set(key, value);

      return newParams;
    });
  };

  const handleOrderCancel = () => pageRefresh();

  return (
    <div className="w-full lg:w-3/4">
      <div className="flex flex-col md:flex-row  justify-between items-start md:items-center mb-4 space-y-4 md:space-y-0">
        <div className="w-full md:w-auto">
          <div className="relative border-2 rounded-lg overflow-hidden border-gray-200 shadow-lg"></div>
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full md:w-auto">
          <DropDownBtn
            showTitle={true}
            selectedItem={orderFilters.get("payment")}
            handleParamChange={(value) => handleFilterClick("payment", value)}
            title="Payment Mode:"
            menuItems={{
              "RAZOR PAY": "RAZOR PAY",
              COD: "Cash On Delivery",
            }}
          />
          <DropDownBtn
            showTitle={true}
            handleParamChange={(value) => handleFilterClick("status", value)}
            selectedItem={orderFilters.get("status")}
            title="Status:"
            menuItems={{
              Cancelled: "Cancelled",
              Delivered: "Delivered",
              Placed: "Placed",
            }}
          />

          <DropDownBtn
            showTitle={true}
            handleParamChange={(value) => handleFilterClick("created", value)}
            selectedItem={orderFilters.get("created")}
            title=""
            menuItems={{
              ...dateRangeFilterValues,
              ...{ ["past_3_months"]: "Past 3 months" },
            }}
          />

          <DropDownBtn
            selectedItem={orderFilters.get("ordering")}
            showTitle={true}
            handleParamChange={(value) => handleFilterClick("ordering", value)}
            title="Sort By:"
            menuItems={{
              "-created": "First Ordered ",
              status: "Status",
              "-status": "Status Reverse",
              payment: "Payment Type",
              "-payment": "Payment Type Reverse",
              created: "Last Ordered",
            }}
          />
        </div>
      </div>
      {/* Order Cards */}
      <div className="space-y-4">
        {/* Repeat this structure for each order */}

        {data.length > 0 && currentPage > 0 && pages > 0 && (
          <PaginationBtn
            onNext={next}
            onPrev={prev}
            currentPage={currentPage}
            totalPages={pages}
          />
        )}

        {!isLoading && error === null && data.length === 0 && (
          <DelayComponent delay={3000}>
            <NoData text={`No Order Records`} />
          </DelayComponent>
        )}

        <div className="my-20 w-full px-4  ">
          {!isLoading && error && error === "Network Error" && (
            <div className="flex font-ubuntu  overflow-hidden  md:mx-8 lg:mx-16 border md:border-none  md:broder-gray  border-gray-200  shadow-lg md:shadow-none  rounded-2xl  items-center md:justify-center  ">
              <NoNetwork reasone="failed to fetch orders " />
            </div>
          )}
        </div>

        {data?.map((item: OrderFetchResponse) => (
          <Order
            orders={item.orders}
            created={item.created}
            expected_delivery={item.expected_delivery}
            id={item.id}
            payment={item.payment}
            payment_status={item.payment_status}
            status={item.status}
            total_amount={item.total_amount}
            key={item.id}
            handleOrderCancel={handleOrderCancel}
          />
        ))}

        {/* Repeat for other orders */}
      </div>
    </div>
  );
};

export default Orders;
