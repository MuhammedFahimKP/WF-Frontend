import React, { useEffect, useState } from "react";

import { Typography, Tooltip, IconButton } from "@material-tailwind/react";

import type { AdminSize } from "../../../types";

import { PencilIcon } from "@heroicons/react/24/outline";

import { RiDeleteBin6Line } from "react-icons/ri";

import toast from "react-hot-toast";

import NetworkErrorAlert from "../../alerts/NetworkErrorAlert";

import SuccessAlert from "../../alerts/SuccessAlert";

import SizeEditForm from "./SizeEditForm";

import apiClient, {
  type ApiClientError,
  type ApiClientResponse,
} from "../../../services/api-client";

import Swal from "sweetalert2";

interface Props extends AdminSize {
  classes: string;
  handleDelete: (id: string) => void;
  setData: (value: React.SetStateAction<[] | AdminSize[]>) => void;
}

const SizeRow = ({
  id,
  classes,
  created,
  updated,
  name,
  handleDelete,
  setData,
}: Props) => {
  const [_created, setCreated] = useState<null | string>(null);
  const [_expected_delivery, setExpected_delivery] = useState<null | string>(
    null
  );
  const [showForm, setShowFrom] = useState(false);

  console.log(_expected_delivery);
  console.log(_created);

  const handleSuccess = (name: string, id: string) =>
    setData((prev) => {
      const newSize = [...prev];
      const newItem = newSize.map((size: AdminSize) => {
        if (id === size.id) {
          const newItem = { ...size, name: name };
          return newItem;
        }

        return size;
      });

      return newItem;
    });

  const _handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: `delete the ${name} will make delete to all product variant having the size`,
      icon: "warning",
      customClass: {
        container: "backdrop-blur-sm   font-ubuntu",
        popup: "rounded-2xl",
        title: "text-lg",
        cancelButton: "bg-red-50 text-red-500 rounded-lg",
        confirmButton: "bg-black text-white rounded-lg",
      },
      showCancelButton: true,
      confirmButtonText: "Yes, delete ",
    }).then((result) => {
      if (result.isConfirmed) {
        apiClient
          .delete(`admin/size/${id}/`)
          .then((res: ApiClientResponse) => {
            handleDelete(id);
            res.status === 204 &&
              toast.custom((t) => (
                <SuccessAlert successText="Size Removed " toast={t} />
              ));
          })
          .catch((err: ApiClientError) => {
            err.message === "Network Error" &&
              toast.custom((t) => <NetworkErrorAlert toast={t} />);
          });
      }
    });
  };

  useEffect(() => {
    const getDateTimeFromTimeStamp = (date: string | Date | null) => {
      const newDate = date ? new Date(date) : null;

      return newDate
        ? newDate.toLocaleString("en-GB", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true, // 24-hour format
          })
        : null;
    };

    created && setCreated(getDateTimeFromTimeStamp(created));
    updated && setExpected_delivery(getDateTimeFromTimeStamp(updated));
  }, [created, updated]);

  return (
    <>
      <tr key={id}>
        <td className={classes}>
          <div className="flex items-center gap-3">
            <Typography
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              placeholder={undefined}
              variant="small"
              color="blue-gray"
              className="font-normal font-bebas"
            >
              {name}
            </Typography>
          </div>
        </td>

        <td className={classes}>
          <Typography
            placeholder={undefined}
            variant="small"
            color="blue-gray"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            className="font-normal opacity-70"
          >
            {_created &&
              _created?.split(",")[0] + " at " + _created?.split(",")[1]}
          </Typography>
        </td>

        <td className={classes}>
          <Typography
            placeholder={undefined}
            variant="small"
            color="blue-gray"
            className="font-normal"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {_expected_delivery &&
              _expected_delivery?.split(",")[0] +
                " at " +
                _expected_delivery?.split(",")[1]}
          </Typography>
        </td>

        <td className={classes}>
          <div className="flex items-center gap-2">
            <Tooltip content="Edit Brand">
              <IconButton
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                onClick={() => setShowFrom(!showForm)}
                placeholder={undefined}
                variant="text"
                className="bg-blue-50 text-blue-600  hover:bg-blue-50"
              >
                <PencilIcon className="h-4 w-4" />
              </IconButton>
            </Tooltip>

            <Tooltip content="Delete Brand">
              <IconButton
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                onClick={() => _handleDelete(id)}
                placeholder={undefined}
                className="bg-red-50 text-red-600 hover:bg-red-50  "
                variant="text"
              >
                <RiDeleteBin6Line className="h-4 w-4" />
              </IconButton>
            </Tooltip>
          </div>
        </td>
      </tr>
      <SizeEditForm
        form={showForm}
        id={id}
        name={name}
        handleForm={() => setShowFrom(!showForm)}
        onSuccess={(name, id) => handleSuccess(name, id)}
      />
    </>
  );
};

export default SizeRow;
