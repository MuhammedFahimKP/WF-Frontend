import React, { useState } from "react";
import { useWindowDimensions } from "@/hooks";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { RootState } from "../../store";

import Logo from "../../assets/whiteLogo.svg";
import { FiUser } from "react-icons/fi";
import { CiHeart } from "react-icons/ci";

import { RiMenu5Fill } from "react-icons/ri";
import { HiOutlineShoppingBag, HiOutlineChartBar } from "react-icons/hi2";
import { FaUserLock } from "react-icons/fa";

import useSocketData from "../../hooks/useSocketData";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { MenuLinks } from "@/types/index";

const Navbar = () => {
  const { width } = useWindowDimensions();
  const [open, setOpen] = useState(false);

  const auth = useSelector((state: RootState) => state.persistedReducer.auth);

  // const { auth_state, user } = auth;

  const navigate = useNavigate();

  const loginSwal = withReactContent(Swal);

  const showAlert = () => {
    loginSwal.fire({
      html: (
        <div className="">
          <div className="flex flex-col items-center justify-between ">
            <div className="size-20 text-black p-4 mt-4 mb-5 rounded-full bg-gray-200 ">
              <FaUserLock className="size-full" />
            </div>

            <h1 className="text-lg text-center mb-5 text-gray-700 font-medium   font-ubuntu ">
              Please Signin
            </h1>

            <p className="text-lg  text-center mb-5 text-gray-600   font-ubuntu w-3/4">
              if you dont have account please signup
            </p>

            <div className="flex flex-row mt-5 justify-between gap-4">
              <button
                onClick={() => handleModalBtnRedirection("/signin/")}
                className="text-white bg-black border font-ubuntu text-base px-6 py-2  rounded-lg "
              >
                SignIn{" "}
              </button>
              <button
                onClick={() => handleModalBtnRedirection("/signup/")}
                className="text-white bg-black border font-ubuntu text-base px-6 py-2  rounded-lg "
              >
                SignUp{" "}
              </button>
            </div>
          </div>
        </div>
      ),
      showConfirmButton: false,
      customClass: {
        popup: "rounded-2xl",
      },
    });
  };

  function handleModalBtnRedirection(link: string) {
    loginSwal.close();
    navigate(link);
  }

  const { data } =
    auth.auth_state === "LOGED IN"
      ? useSocketData<{ cart: number; wishlist: number }>(
          "user/cart-wishlist-count/",
          true
        )
      : { data: null };

  function openMobileMenu() {
    if (width > 900) return;
    console.log(open);
    setOpen(!open);
  }

  const handelMenuButtonClick = (link: keyof typeof MenuLinks) => {
    auth?.auth_state !== "LOGED IN" ? showAlert() : navigate(MenuLinks[link]);
  };

  return (
    <>
      {" "}
      <nav className="h-16  absolute top-0   w-full z-50 border-gray-50  flex items-center justify-between  px-10 lg:px-32 lg:py-4 ">
        <button
          className="flex  size-8 text-lg  overflow-hidden items-center justify-cente"
          onClick={() => openMobileMenu()}
        >
          <RiMenu5Fill className="text-white   hidden  text-2xl md:text-3xl  lg:text-4xl" />{" "}
        </button>

        <h1 className="flex items-center justify-center  text-4xl text-white ">
          <Link to="/" className="flex items-center justify-center pb-2">
            <img
              src={Logo}
              className="h-auto  w-40  hover:text-green-500 duration-200"
            />
          </Link>
        </h1>

        <div className=" flex justify-between items-center   gap-3">
          {auth?.user?.role === "admin" && (
            <button
              onClick={() => navigate("/admin/")}
              className="text-white text-3xl  invisible lg:visible"
            >
              <HiOutlineChartBar />
            </button>
          )}

          <button
            onClick={() => handelMenuButtonClick("Profile")}
            className="text-white text-3xl  invisible lg:visible"
          >
            {auth?.user?.img ? (
              <img className="size-8 rounded-full" src={auth?.user.img} />
            ) : (
              <FiUser />
            )}
          </button>

          <button
            className="relative  text-white text-3xl "
            onClick={() => handelMenuButtonClick("WishList")}
          >
            <CiHeart className="relative" />
            <span className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-black border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
              {data?.wishlist ? data?.wishlist : 0}
            </span>
          </button>

          <button
            className="relative text-white text-3xl "
            onClick={() => handelMenuButtonClick("Cart")}
          >
            <HiOutlineShoppingBag />
            <span className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-black border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
              {data?.cart ? data.cart : 0}
            </span>
          </button>
        </div>

        {/* <div className="hidden flex-1 lg:flex justify-end px-3">
          <LgMenu />
        </div> */}
      </nav>
    </>
  );
};

export default React.memo(Navbar);
