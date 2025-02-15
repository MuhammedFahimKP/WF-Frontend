import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useWindowDimensions } from "@/hooks";

import { AdminSideBarContext } from "@/context";

import DropDownBtn from "@/ui/admin/DropDownBtn";

import {
  PiTrademark,
  PiPantsFill,
  PiTShirtLight,
  PiPackageFill,
} from "react-icons/pi";
import { FaShopify } from "react-icons/fa6";
import { FaUserGroup } from "react-icons/fa6";
import { AiFillProduct } from "react-icons/ai";
import { CgColorPicker } from "react-icons/cg";
import { HiOutlineChartBar } from "react-icons/hi";
const SideBar = () => {
  const navigate = useNavigate();
  const { width } = useWindowDimensions();
  const sideBarContext = useContext(AdminSideBarContext);
  // const [isLgDevice, setIsLgDevice] = useState(false);

  // useEffect(() => {
  //   setIsLgDevice(width > 900);
  // }, [width]);

  const { isMobileOpen, handleOpen } = sideBarContext ?? {
    isMobileOpen: false,
    handleOpen: () => null,
  };

  useEffect(() => {
    if (width > 900 && isMobileOpen) {
      handleOpen();
    }
  }, [width]);

  return (
    <div
      className={`w-64 lg:w-1/6 min-h-screen fixed mt-20   font-ubuntu  bg-white   z-50  my-4  flex flex-col items-center gap-4  py-4  border-r-[1px] transition-transform duration-300 ${
        isMobileOpen && width < 900 ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0  `}
    >
      <div
        onClick={() => navigate("/admin/")}
        className="flex flex-row  md:hover:bg-gray-200  hover:cursor-pointer gap-2 items-center w-[95%]    rounded-lg text-slate-500 text-lg  pl-2 py-[1px] mx-auto"
      >
        <HiOutlineChartBar className="" />
        Home
      </div>

      <DropDownBtn title="Store" icon={<FaShopify className="text-lg" />}>
        <div
          onClick={() => navigate("product/")}
          className="flex flex-row  md:hover:bg-gray-200  hover:cursor-pointer gap-2 items-center w-[95%]    rounded-lg text-slate-500 text-lg  pl-2 py-[1px] mx-auto"
        >
          <AiFillProduct className="" />
          Product
        </div>
        <div
          onClick={() => navigate("brand/")}
          className="flex flex-row  md:hover:bg-gray-200  hover:cursor-pointer gap-2 items-center w-[95%]    rounded-lg text-slate-500 text-lg  pl-2 py-[1px] mx-auto"
        >
          <PiTrademark className="" />
          Brands
        </div>

        <div
          onClick={() => navigate("category/")}
          className="flex flex-row  md:hover:bg-gray-200  hover:cursor-pointer gap-2 items-center w-[95%]    rounded-lg text-slate-500 text-lg  pl-2 py-[1px] mx-auto"
        >
          <PiPantsFill className="" />
          Categories
        </div>

        <div
          onClick={() => navigate("color/")}
          className="flex flex-row  md:hover:bg-gray-200  hover:cursor-pointer gap-2 items-center w-[95%]    rounded-lg text-slate-500 text-lg  pl-2 py-[1px] mx-auto"
        >
          <CgColorPicker className="" />
          Colors
        </div>

        <div
          onClick={() => navigate("size/")}
          className="flex flex-row  md:hover:bg-gray-200  hover:cursor-pointer gap-2 items-center w-[95%]    rounded-lg text-slate-500 text-lg  pl-2 py-[1px] mx-auto"
        >
          <div className="flex items-center gap-1">
            <PiTShirtLight className="h-5 w-4" />
            <PiTShirtLight className="h-3 w-4" />
          </div>
          Sizes
        </div>
      </DropDownBtn>

      <div
        onClick={() => navigate("user/")}
        className=" flex flex-row  md:hover:bg-gray-200  hover:cursor-pointer gap-2 items-center w-[95%]    rounded-lg text-slate-500 text-lg  pl-2 py-[1px] mx-auto"
      >
        <FaUserGroup className="" />
        Users
      </div>

      <div
        onClick={() => navigate("orders/")}
        className=" flex flex-row  md:hover:bg-gray-200  hover:cursor-pointer gap-2 items-center w-[95%]    rounded-lg text-slate-500 text-lg  pl-2 py-[1px] mx-auto"
      >
        <PiPackageFill className="" />
        Orders
      </div>
    </div>
  );
};

export default SideBar;
