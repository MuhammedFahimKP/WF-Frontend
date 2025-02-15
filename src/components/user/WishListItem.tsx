import { useState } from "react";

import { useDispatch } from "react-redux";

import { AppDispact } from "@/store";

import { deleteWishlistItem } from "@/thunks";

import { WishlistItem as Props } from "@/types";

import toast from "react-hot-toast";

import { FaPlus, FaMinus } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";

import SuccessAlert from "@/ui/alerts/SuccessAlert";
import apiClient from "@/services/api-client";
import NetworkErrorAlert from "@/ui/alerts/NetworkErrorAlert";

const WishListItem = ({ id, product }: Props) => {
  const [_quantity, setQuantity] = useState(1);

  const dispatch = useDispatch<AppDispact>();

  const deleteItem = (id: string) => {
    dispatch(
      deleteWishlistItem({
        id,
        handleSuccess: () =>
          toast.custom((t) => (
            <SuccessAlert successText="Product Removed" toast={t} />
          )),
      })
    );
  };

  const handleCart = () => {
    if (_quantity > 0) {
      apiClient
        .post("shop/cart/", {
          product: product.id,
          quantity: _quantity,
        })
        .then(() => {
          toast.custom((p) => (
            <SuccessAlert toast={p} successText="Product added To Cart " />
          )) &&
            dispatch(
              deleteWishlistItem({
                id,
                handleSuccess() {},
              })
            );
        })
        .catch((err) => {
          err?.message === "Network Error" &&
            toast.custom((t) => <NetworkErrorAlert toast={t} />);
        });
    }
  };

  const incrementCartItem = () => setQuantity(_quantity + 1);

  const decrementCartItem = () =>
    setQuantity((prev) => {
      if (prev === 0) return 0;

      prev - 1 === 0 && deleteItem(id);

      return prev - 1;
    });

  return (
    <div className="relative border border-gray-100 justify-between   mb-6 rounded-lg bg-white p-6 shadow-sm sm:flex sm:justify-start">
      <div className="flex flex-col items-center">
        <img
          src={product.product.img}
          alt={name + "-wishlist" + "-image"}
          className="w-full h-80  md:w-44  md:h-44  overflow-clip  rounded-lg "
        />

        <button
          onClick={handleCart}
          className="px-3  mt-10 text-sm py-1 bg-black text-white  rounded-md"
        >
          add to cart
        </button>
      </div>

      <div className="my-0 md:my-3  sm:ml-4 sm:flex sm:w-full sm:justify-between">
        <div className="mt-5 sm:mt-0">
          <h2 className="text-lg font-bold text-gray-900">
            {product.product.name}
          </h2>
          <p className="mt-2 text-md text-gray-700">{product.product.brand}</p>
          <div className="flex items-center gap-2 mt-2 text-md text-gray-700">
            <span
              className="size-5 rounded-full "
              style={{
                backgroundColor: product.color,
              }}
            />
            {product.size}
          </div>
          <p className="mt-2 text-md text-gray-700">
            MRP {product.price} per pcs
          </p>
          <p className="text-sm mt-2">MRP {product.price * _quantity} </p>

          <div className="inline-flex mt-5   items-center border-gray-100  ">
            <button
              className="cursor-pointer rounded-full flex items-center justify-center  bg-black text-white size-7   hover:opacity-60 transition-all duration-500"
              onClick={decrementCartItem}
            >
              <FaMinus className="size-1/2" />
            </button>
            <div className="size-7  bg-white flex justify-center items-center outline-none mx-5 ">
              {_quantity >= 0 && _quantity}
            </div>
            <button
              className="cursor-pointer rounded-full flex items-center justify-center bg-black text-white size-7  hover:opacity-60 transition-all duration-500"
              onClick={incrementCartItem}
            >
              <FaPlus className="size-1/2" />
            </button>
          </div>
        </div>

        <div className="mt-4 flex justify-between text-sm sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
          <div className="md:absolute md:bottom-5 md:right-5  flex items-center space-x-4">
            <button
              onClick={() => deleteItem(id)}
              className="bg-red-50 text-red-600 px-4 py-2 rounded-md "
            >
              <RiDeleteBinFill className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishListItem;
