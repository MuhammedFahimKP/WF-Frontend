import { useData } from "../../hooks";

import { makeArrayFromRange } from "../../utils/other-utils";

import { Link } from "react-router-dom";

import { AdminCategory } from "../../types";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import CategorySekeleton from "../skeletons/CategorySekeleton";

import NoNetwork from "../NoNetwork";

import "swiper/css";

const Category = () => {
  const { data, error, isLoading } = useData<AdminCategory>(
    "shop/categoery/",
    2000
  );

  const loadingArray = makeArrayFromRange(15);

  return (
    <div className=" flex  items-center justify-center ">
      {!isLoading && error && error === "Network Error" && (
        <div className="flex font-ubuntu  md:pb-4  mx-4      md:mx-8 lg:mx-16 border md:border-none  md:broder-gray  border-gray-200  shadow-lg md:shadow-none  rounded-2xl  w-full  items-center md:justify-center overflow-hidden ">
          <NoNetwork reasone="failed to fetch category " />
        </div>
      )}

      <Swiper
        autoplay={{
          delay: 1000,
          reverseDirection: false,
        }}
        modules={[Autoplay]}
        loop={true}
        breakpoints={{
          340: {
            slidesPerView: 5,
            spaceBetween: 15,
          },
          700: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          900: {
            slidesPerView: 5,
            spaceBetween: 15,
          },
        }}
        className="max-w-full "
      >
        <div className="flex gap-5">
          {isLoading &&
            loadingArray.map((itemIndex) => (
              <SwiperSlide key={"Skeleton-Category-" + itemIndex.toString()}>
                <div className="animate-pulse my-6">
                  <CategorySekeleton />
                </div>
              </SwiperSlide>
            ))}
        </div>
        {data.map((item: AdminCategory) => (
          <SwiperSlide key={item.name}>
            <Link
              to={`/shop/?category=${item.name}`}
              className="relative  flex flex-col items-center  w-full py-6 truncate "
            >
              <img
                src={item.img}
                className="md:h-[200px]  shadow-lg  lg:h-[300px]  rounded-lg "
                alt={`category-img-${item.name}`}
              />
              <h1 className="font-ubuntu mt-4 text-xs lg:text-5xl text-black  ">
                {item.name}
              </h1>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Category;
