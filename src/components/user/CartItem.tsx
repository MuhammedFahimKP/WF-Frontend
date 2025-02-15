import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import { RootState, AppDispact } from "../../store";

import { updateCartItem, deletCartItem } from "../../thunks";

import { CartItem as Props } from "../../types";

import toast from "react-hot-toast";

import { FaMinus, FaPlus } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";

import ErrorText from "../../ui/user/ErrorText";
import SuccessAlert from "../../ui/alerts/SuccessAlert";

const CartItem = ({
  id,
  brand,
  color,
  img,
  name,
  price,
  quantity,
  size,
  subtotal,
}: Props) => {
  const { itemErrors } = useSelector((state: RootState) => state.cartSlice);
  const [_quantity, setQuantity] = useState(0);

  const dispatch = useDispatch<AppDispact>();

  useEffect(() => {
    setQuantity(quantity);
  }, [quantity]);

  const deleteItem = (id: string) => {
    toast.custom((t) => <SuccessAlert successText="Item Removed" toast={t} />);
    dispatch(deletCartItem(id));
  };

  const handleUpdatedQuantity = (qunt: number) => {
    if (qunt === 0) {
      deleteItem(id);
      return;
    }

    dispatch(updateCartItem({ id, quantity: qunt }));
  };

  const incrementCartItem = () => handleUpdatedQuantity(_quantity + 1);

  const decrementCartItem = () => handleUpdatedQuantity(_quantity - 1);

  return (
    <div className="relative border-2 border-gray-200 justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
      <img
        src={img}
        alt={name + "-cart" + "-image"}
        className="w-full h-80  md:w-44  md:h-44  overflow-clip  rounded-lg "
      />

      <div className="my-0 md:my-3  sm:ml-4 sm:flex sm:w-full sm:justify-between">
        <div className="mt-5 sm:mt-0">
          <h2 className="text-lg font-bold text-gray-900">{name}</h2>
          <p className="mt-2 text-md text-gray-700">{brand}</p>
          <div className="flex items-center gap-2 mt-2 text-md text-gray-700">
            <span
              className="size-5 rounded-full "
              style={{
                backgroundColor: color,
              }}
            />
            {size}
          </div>
          <p className="mt-2 text-md text-gray-700">MRP {price} per pcs</p>
          <p className="text-sm mt-2">MRP {subtotal} </p>

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

      {itemErrors[id] && (
        <div className="md:absolute   md:bottom-10 md:right-5 mt-2  flex items-center space-x-4">
          <ErrorText>{itemErrors[id]} </ErrorText>
        </div>
      )}
    </div>
  );
};

export default CartItem;
