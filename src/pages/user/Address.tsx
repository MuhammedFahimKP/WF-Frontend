import { useState, Fragment } from "react";

import { ShippingAddress } from "../../types";
import ShippingAddressShow from "../../components/user/ShippingAddressShow";
import ShippingAddressCardSkeletons from "../../components/skeletons/ShippingAddressCardSkeletons";
import { makeArrayFromRange } from "../../utils/other-utils";
import { useData } from "../../hooks";
import ShippingAddressCreateForm from "../../components/user/ShippingAddressCreateForm";
import { LuPlus } from "react-icons/lu";
import ShippingAddressEditForm from "../../components/user/ShippingAddressEditForm";
import NoNetwork from "@/components/NoNetwork";
const Address = () => {
  const { data, isLoading, error, setData } = useData<ShippingAddress>(
    "users/shipping-address/",
    1000,
    undefined,
    true
  );

  const [showForm, setShowForm] = useState(false);

  const [editItem, setEditItem] = useState<string | null>(null);

  const loadingArray = makeArrayFromRange(6);

  const addEdit = (item: string) => {
    setEditItem(item);
  };

  const removeEdit = () => {
    setEditItem(null);
  };

  const handleEdit = (item: string) => {
    editItem !== item ? addEdit(item) : removeEdit();
  };

  return (
    <div className="w-full lg:w-3/4">
      <div className="flex flex-col md:flex-row  justify-between items-start md:items-center mb-4 space-y-4 md:space-y-0">
        <div className="w-full md:w-auto">
          <div className="relative border-2 rounded-lg overflow-hidden border-gray-200 shadow-lg"></div>
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full md:w-auto"></div>
      </div>

      <div className="space-y-4">
        {!isLoading && error && error === "Network Error" && (
          <div className="lg:my-10 my-28 text-black   w-full px-4 h-1/2">
            <div className="flex font-ubuntu  overflow-hidden  md:mx-8 lg:mx-16 border md:border-none  md:broder-gray h-full  border-gray-200  shadow-lg md:shadow-none  rounded-2xl    mx-auto ">
              <NoNetwork reasone="failed to fetch products " />
            </div>
          </div>
        )}

        <div className="max-w-2xl flex flex-col gap-4">
          {isLoading &&
            loadingArray.map((value) => (
              <ShippingAddressCardSkeletons
                key={"account-address-skeleton-" + value}
              />
            ))}

          {!isLoading && error === null && (
            <div className="">
              <button
                onClick={() => {
                  setShowForm(!showForm);
                }}
                className=" bg-white flex items-center px-4
              gap-2 text-sm  rounded-md py-1  text-md text-black  "
              >
                <LuPlus className="text-gray-400" />
                <p className="cursor-pointer text underline">
                  {" "}
                  Add new Addreess
                </p>
              </button>
            </div>
          )}

          {data.map(
            ({
              alter_phone_no,
              city,
              id,
              landmark,
              phone_no,
              pin_code,
              place,
              state,
            }: ShippingAddress) => (
              <Fragment key={id}>
                <ShippingAddressShow
                  alter_phone_no={alter_phone_no}
                  city={city}
                  id={id}
                  onEditClick={() => handleEdit(id)}
                  landmark={landmark}
                  phone_no={phone_no}
                  pin_code={pin_code}
                  place={place}
                  state={state}
                />
                {editItem === id && (
                  <ShippingAddressEditForm
                    handleOpen={() => handleEdit(id)}
                    id={id}
                    open={editItem === id}
                    setShippingAddress={setData}
                  />
                )}
              </Fragment>
            )
          )}
        </div>

        {/* Repeat for other orders */}
      </div>
      {showForm && (
        <ShippingAddressCreateForm
          handleOpen={() => setShowForm(!showForm)}
          open={showForm}
          setShippingAddress={setData}
        />
      )}
    </div>
  );
};

export default Address;
