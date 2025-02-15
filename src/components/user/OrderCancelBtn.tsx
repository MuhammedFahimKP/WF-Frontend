import apiClient from "@/services/api-client";
import type { Order } from "@/types";

import Swal from "sweetalert2";

import toast from "react-hot-toast";

// import NetworkErrorAlert from "@/ui/alerts/NetworkErrorAlert";
import SuccessAlert from "@/ui/alerts/SuccessAlert";
// import LoadingAlert from "@/ui/alerts/LoadingAlert";
import { useState } from "react";

interface Props {
  id: string;
  status: Order["status"];
  onSuccess: () => void;
}

const OrderCancelBtn = ({ status, id, onSuccess }: Props) => {
  if (status === "Delivered") return null;

  const [isLoading, setIsLoading] = useState(false);

  const handleCancelationRequest = () => {
    apiClient
      .patch(`orders/${id}/`)
      .then((res) => {
        if (res.status == 202) {
          onSuccess();

          toast.custom((t) => (
            <SuccessAlert successText="Order Canceled " toast={t} />
          ));
        }
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleClick = () => {
    Swal.fire({
      title: "Are you sure? Cancel the Order  ",
      text: ``,
      icon: "warning",
      customClass: {
        container: "backdrop-blur-sm   font-ubuntu",
        popup: "rounded-2xl",
        title: "text-lg",
        cancelButton: "bg-red-50 text-red-600 rounded-lg",
        confirmButton: "bg-black text-white rounded-lg",
      },
      showCancelButton: true,
      confirmButtonText: "Yes, Canncel ",
      cancelButtonText: "No ",
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        handleCancelationRequest();
      }
    });
  };

  return (
    <div className="px-4">
      <button
        onClick={handleClick}
        disabled={isLoading || status !== "Placed"}
        className={`text-white text-start ${
          status === "Cancelled" ? "opacity-60" : ""
        }  bg-red-600 px-4 py-2 rounded-md`}
      >
        {isLoading ? (
          <div className="flex items-center gap-2 opacity-60 ">
            <div
              className="animate-spin inline-block size-4 border-[2px] border-current border-t-transparent  rounded-full"
              role="status"
              aria-label="loading"
            />
            Canceling
          </div>
        ) : (
          "Cancel"
        )}
      </button>
    </div>
  );
};

export default OrderCancelBtn;
