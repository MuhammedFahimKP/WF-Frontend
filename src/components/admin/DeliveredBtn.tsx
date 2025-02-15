import { AdminSingleOrderModel } from "../../types";

import { BASE_URL } from "@/services/api-client";

interface BtnProps {
  status: AdminSingleOrderModel["status"];
  payment: AdminSingleOrderModel["payment"];
  paymment_status: AdminSingleOrderModel["payment_status"];
  onClick: () => void;

  userSide?: boolean;
}

interface Props extends BtnProps {
  id: string;
}

const DeliveredButton = ({
  onClick,
  status,
  userSide,
  payment,
  paymment_status,
}: BtnProps) => {
  if (userSide === true) {
    return null;
  }

  if (["Delivered", "Cancelled"].includes(status) === true) {
    return null;
  }

  if (payment === "RAZOR PAY" && paymment_status === "Pending") {
    return null;
  }
  return (
    <button
      onClick={onClick}
      className="bg-black text-white px-2 py-2 rounded-md text-sm text-center mt-2 "
    >
      Delivered
    </button>
  );
};

const DeliveredBtn = ({
  id,
  status,
  payment,
  paymment_status,
  onClick,
  userSide = false,
}: Props) => {
  return (
    <div className="flex flex-col  justify-center">
      <DeliveredButton
        onClick={onClick}
        payment={payment}
        paymment_status={paymment_status}
        status={status}
        userSide={userSide}
      />

      {status !== "Cancelled" ? (
        <a
          href={BASE_URL + `orders/invoice/${id}/`}
          className="bg-black text-white px-2 py-2 rounded-md text-sm text-center mt-2 "
        >
          {" "}
          Download Invoice
        </a>
      ) : (
        <button className="bg-black text-white px-2 py-2 rounded-md text-sm text-center mt-2 ">
          {" "}
          Download Invoice
        </button>
      )}
    </div>
  );
};

export default DeliveredBtn;
