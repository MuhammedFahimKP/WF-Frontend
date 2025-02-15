import { useContext, memo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

import { AdminSideBarContext } from "@/context";

import Logo from "@/assets/blackLogo.svg";

import { TbMenu2 } from "react-icons/tb";
import { FaUser } from "react-icons/fa";

const Navbar = () => {
  const adminContext = useContext(AdminSideBarContext);
  const auth = useSelector((state: RootState) => state.persistedReducer.auth);

  const navigate = useNavigate();

  return (
    <div className="h-20 w-full fixed bg-white   flex  items-center z-50  align-baseline  px-3 gap-4   justify-start  md:justify-between   md:px-36 border-b-[1px]">
      <div className="flex items-center justify-center mt-3">
        <button
          className=" lg:invisible "
          onClick={() => adminContext?.handleOpen()}
        >
          <TbMenu2 className="size-8" />
        </button>
      </div>
      <div className="flex items-center justify-center align-middle">
        <img src={Logo} className="h-32  w-32 object-fill align-middle" />
      </div>
      <div className="flex items-center  gap-4  md:mr-0  md:ml-0  mr-0 ml-auto ">
        <button className="mt-2">
          {auth?.user?.img ? (
            <img
              src={auth.user.img}
              className="size-8 rounded-full"
              onClick={() => navigate("/account/profile/")}
            />
          ) : (
            <FaUser className="size-6 " />
          )}
        </button>
      </div>
    </div>
  );
};

export default memo(Navbar);
