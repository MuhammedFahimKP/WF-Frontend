import React, { useEffect, useState } from "react";

import { Typography, Tooltip, IconButton } from "@material-tailwind/react";

import type { AdminCategory } from "../../../types";

import { PencilIcon } from "@heroicons/react/24/outline";

import { RiDeleteBin6Line } from "react-icons/ri";

import toast from "react-hot-toast";

import NetworkErrorAlert from "../../alerts/NetworkErrorAlert";

import SuccessAlert from "../../alerts/SuccessAlert";

import apiClient, {
  type ApiClientError,
  type ApiClientResponse,
} from "../../../services/api-client";

import Swal from "sweetalert2";
import CategoryEditForm from "./CategoryEditForm";

interface Props extends AdminCategory {
  classes: string;
  handleDelete: (id: string) => void;
  setData: (value: React.SetStateAction<[] | AdminCategory[]>) => void;
}

const CategoryRow = ({
  id,
  classes,
  created,
  updated,
  name,
  img,
  handleDelete,
  setData,
}: Props) => {
  const [_created, setCreated] = useState<null | string>(null);
  const [_expected_delivery, setExpected_delivery] = useState<null | string>(
    null
  );
  const [showForm, setShowFrom] = useState(false);

  const handleSuccess = (name: string, id: string, img: string) =>
    setData((prev) => {
      const newCategoryItems = [...prev];
      const newItem = newCategoryItems.map((categoery: AdminCategory) => {
        if (id === categoery.id) {
          const newItem = { ...categoery, name: name, img: img };
          return newItem;
        }

        return categoery;
      });

      return newItem;
    });

  const _handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: `delete the ${name} will make delete to all product having the category`,
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
          .delete(`admin/categoery/${id}/`)
          .then((res: ApiClientResponse) => {
            handleDelete(id);
            res.status === 204 &&
              toast.custom((t) => (
                <SuccessAlert successText="Category Removed " toast={t} />
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
          <img
            src={img}
            alt=""
            className="rounded-md object-fill h-16 w-14 mr-5"
          />
        </td>
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
            className="font-normal opacity-70"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
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
            <Tooltip content="Edit Category">
              <IconButton
                onClick={() => setShowFrom(!showForm)}
                placeholder={undefined}
                variant="text"
                className="bg-blue-50 text-blue-600  hover:bg-blue-50"
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <PencilIcon className="h-4 w-4" />
              </IconButton>
            </Tooltip>

            <Tooltip content="Delete Category">
              <IconButton
                onClick={() => _handleDelete(id)}
                placeholder={undefined}
                className="bg-red-50 text-red-600 hover:bg-red-50  "
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                variant="text"
              >
                <RiDeleteBin6Line className="h-4 w-4" />
              </IconButton>
            </Tooltip>
          </div>
        </td>
      </tr>
      <CategoryEditForm
        form={showForm}
        img={img}
        id={id}
        name={name}
        handleForm={() => setShowFrom(!showForm)}
        onSuccess={(name, id, img) => handleSuccess(name, id, img)}
      />
    </>
  );
};

export default CategoryRow;
