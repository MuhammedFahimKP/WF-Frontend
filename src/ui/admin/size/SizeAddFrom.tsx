import { useContext } from "react";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";

import { AdminCategory } from "../../../types";
import { useFormik } from "formik";

import * as Yup from "yup";
import apiClient, { ApiClientError } from "../../../services/api-client";
import SuccessAlert from "../../alerts/SuccessAlert";

import { toast, Toaster } from "react-hot-toast";

import { ToastContext, DataAddedContext } from "../../../context";
import NetworkErrorAlert from "../../alerts/NetworkErrorAlert";

interface Props {
  form: boolean;
  handleForm: () => void;
}

const SizeAddForm = ({ form, handleForm }: Props) => {
  const context = useContext(ToastContext);

  const dataAddedContext = useContext(DataAddedContext);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("please provide a name")
      .min(1, "Size must be a charater ")
      .max(5, "Size must be 1 to 5 characters "),
  });

  interface IntialValues {
    name: string;
  }

  const initialValues: IntialValues = { name: "" };

  const formike = useFormik({
    validationSchema,
    initialValues,
    onSubmit: handleSubmit,
  });

  function handleSubmit(value: IntialValues, actions: any) {
    context?.addAnotherToast();

    apiClient
      .post<AdminCategory>(`admin/size/`, value)
      .then((res) => {
        dataAddedContext?.mutate();
        res.status === 201 &&
          toast.custom((t) => (
            <SuccessAlert successText="Size Added" toast={t} />
          )) &&
          actions.resetForm({
            values: {
              name: "",
            },
          }) &&
          formike.setValues({ ...formike.values, name: res.data.name });
      })
      .catch((err: ApiClientError) => {
        if (err.response?.status === 409) {
          formike.setErrors({
            ...formike.errors,
            name: "Size Already Exist ",
          });
        }

        if (err.message === "Network Error") {
          toast.custom((t) => <NetworkErrorAlert toast={t} />);
        }
      });

    context?.removeAnotherToast();
  }

  return (
    <Dialog
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
      placeholder={"name"}
      open={form}
      handler={handleForm}
      size="xs"
    >
      <DialogHeader
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        placeholder={"dailogou"}
      >
        Add Size
      </DialogHeader>
      <DialogBody
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        placeholder={"hdjhfhjk"}
      >
        <form
          className="max-w-md text-indigo-100 flex  flex-col  gap-3 "
          onSubmit={formike.handleSubmit}
        >
          <div className="">
            <label
              htmlFor="name"
              className="lg:text-lg black text-xs pl-2 text-slate-500"
            >
              Size
            </label>

            <input
              className="lg:text-lg text-black font-medium mt-1 block w-full py-2 font-roboto px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              name="name"
              type="text"
              onChange={formike.handleChange}
              value={formike.values.name}
            />
            {formike.errors.name && formike.touched.name && (
              <p className="text-red-500">{formike.errors.name}</p>
            )}
          </div>

          <DialogFooter
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            placeholder={undefined}
          >
            <button
              className="bg-white hover:bg-red-50 text-red-500 font-bold py-2 px-4 rounded-md transition-all mr-2 "
              type="button"
              onClick={handleForm}
            >
              Cancel
            </button>
            <button
              className="bg-black text-white font-bold py-2 px-4 rounded-md hover:opacity-65 transition-all "
              type="submit"
            >
              Add
            </button>
          </DialogFooter>
        </form>
        <Toaster />
      </DialogBody>
    </Dialog>
  );
};

export default SizeAddForm;
