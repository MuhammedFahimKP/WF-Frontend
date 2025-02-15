import { useEffect, useContext, useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSwipe, useWindowDimensions, useStoreProduct } from "@/hooks";

import { shopFilterSideBarContext } from "@/context";

import { getAllSearchParams } from "@/utils/other-utils";

import { LiaFilterSolid } from "react-icons/lia";

import NoData from "@/ui/animations/NoData";
import PaginationBtn from "@/ui/user/PaginationBtn";

import Navbar from "@/components/user/Navbar";
import BottmNavbar from "@/components/user/BottmNavbar";
import FilterSideBar from "@/components/user/FilterSideBar";
import SearchBox from "@/components/user/SearchBox";
import DelayComponent from "@/components/DelayComponent";
import ProductCard from "@/components/user/ProductCard";
import NoNetwork from "@/components/NoNetwork";
import ProductCardSkeleton from "@/components/skeletons/ProductCardSkeleton";

const Shop = () => {
  const [productFilterParams, setProductFilterParams] = useSearchParams({});
  const [filterCount, setFilterCount] = useState(0);
  const { showFilter, handleFilter } = useContext(shopFilterSideBarContext);

  const { width } = useWindowDimensions();
  const limit = 6;
  const { data, currentPage, pages, next, prev, error, isLoading } =
    useStoreProduct(
      limit,
      2000,
      { params: getAllSearchParams(productFilterParams) },
      [productFilterParams]
    );

  const handleFilterSideBar = useCallback(() => {
    if (showFilter && width < 900) {
      handleFilter();
    }
  }, [showFilter, width]);

  useEffect(() => {
    // count the number of filters applied

    setFilterCount(() => {
      const filterParams = [];

      for (const [_, value] of productFilterParams.entries()) {
        filterParams.push(...value.split(","));
      }

      return filterParams.length;
    });
  }, [productFilterParams]);

  useEffect(() => {
    handleFilterSideBar();
  }, [width]);

  const { handleTouchEnd, handleTouchMove, handleTouchStart } = useSwipe({
    direction: "both",
    onSwipe: () => handleFilterSideBar(),
  });

  const clearParams = (key: string) =>
    setProductFilterParams((prevParam: URLSearchParams) => {
      const newParams = new URLSearchParams(prevParam);
      newParams.delete(key);

      return newParams;
    });

  const resetAll = () => {
    const newParams = new URLSearchParams();
    setProductFilterParams(newParams);
  };

  const setSearchValues = (value: string) => {
    setProductFilterParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);

      if (value === "") {
        if (newParams.has("search")) {
          newParams.delete("search");
        }
      } else {
        newParams.set("search", value);
      }

      return newParams;
    });
  };

  const setFilterParams = (key: string, value: string) =>
    setProductFilterParams((prevParam: URLSearchParams) => {
      const newParams = new URLSearchParams(prevParam);

      if (newParams.has(key)) {
        // If the key exists, append the new value with a comma
        const existingValue = newParams.get(key);
        newParams.set(key, `${existingValue},${value}`);
      } else {
        // If the key does not exist, add the key-value pair
        newParams.set(key, value);
      }

      return newParams;
    });
  const removeFilterParams = (key: string, value: string) =>
    setProductFilterParams((prevParams: URLSearchParams) => {
      const newParams = new URLSearchParams(prevParams);

      if (newParams.has(key)) {
        // Get the existing values for the key
        const existingValue = newParams.get(key);
        const valuesArray = existingValue?.split(",");

        // Remove the specified value
        const newValuesArray = valuesArray
          ? valuesArray.filter((param) => param !== value)
          : null;

        // If the new array is empty, remove the key; otherwise, update it
        if (newValuesArray && newValuesArray.length > 0) {
          newParams.set(key, newValuesArray.join(","));
        } else {
          newParams.delete(key);
        }
      }

      return newParams;
    });

  return (
    <div className="h-[100vh]">
      <div className="lg:h-20   h-16 bg-black mb-0 fixed  top-0 z-50 w-full">
        <Navbar />
      </div>
      <div className="">
        <aside
          id="default-sidebar"
          className={`fixed top-16 lg:h-20     z-20  w-full lg:w-64  min-h-screen transition-transform duration-300  ${
            showFilter && width < 900
              ? "translate-x-0 backdrop-blur-none"
              : "-translate-x-full backdrop-blur-none"
          } lg:translate-x-0 `}
          aria-label="Sidebar"
          onClick={handleFilterSideBar}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <FilterSideBar
            resetAll={resetAll}
            clearItem={clearParams}
            removeParams={removeFilterParams}
            setParams={setFilterParams}
            searchParams={productFilterParams}
          />
        </aside>

        <div className="lg:pl-2  lg:ml-64 mt-5 lg:mt-10 ">
          <div className="flex flex-col  w-full static     pt-14  px-2">
            <div className="bg-white flex flex-col-reverse items-center lg:items-start  lg:mx-14 py-4 normal gap-4 ">
              <DelayComponent delay={4000}>
                {" "}
                {!error && !isLoading && (
                  <h1 className="pl-4 text-3xl font-ubuntu">
                    Results {pages * data.length}
                  </h1>
                )}
              </DelayComponent>
              <div className="flex flex-row items-center gap-4  w-full">
                <button
                  onClick={() => handleFilter()}
                  className="bg-black left-[2px] top-1/2  z-10 font-ubuntu   lg:hidden relative 
                    text-white py-1   px-4 flex items-center gap-2 text-md  rounded-md "
                >
                  <LiaFilterSolid /> Filters
                  <span className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-black border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                    {filterCount}
                  </span>
                </button>
                <SearchBox onChange={setSearchValues} />
              </div>
            </div>

            <div className="my-2">
              {data.length > 0 && pages > 0 && (
                <PaginationBtn
                  currentPage={currentPage}
                  onNext={next}
                  onPrev={prev}
                  totalPages={pages}
                />
              )}
            </div>

            <div className="lg:my-10 my-28   w-full px-4 h-1/2">
              {!isLoading && error && error === "Network Error" && (
                <div className="flex font-ubuntu  overflow-hidden  md:mx-8 lg:mx-16 border md:border-none  md:broder-gray h-full  border-gray-200  shadow-lg md:shadow-none  rounded-2xl    mx-auto ">
                  <NoNetwork reasone="failed to fetch products " />
                </div>
              )}
            </div>

            {!isLoading && error === null && data.length === 0 && (
              <DelayComponent delay={1000}>
                <NoData
                  text={`No ${
                    Array.from(productFilterParams.keys()).length > 0
                      ? "Results"
                      : "Products"
                  } `}
                />
              </DelayComponent>
            )}

            {!error && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center  min-w-sm   md:mx-auto mb-5 mt-5 gap-3 md:gap-2 lg:gap-5 ">
                {isLoading &&
                  Array.from({ length: limit }, (_, index) => index + 1).map(
                    (index) => (
                      <ProductCardSkeleton
                        key={`shop-product-skeleton-${index}`}
                      />
                    )
                  )}
                {data.map(
                  ({
                    id,
                    brand,
                    categoery,
                    colors,
                    discription,
                    img,
                    min_price,
                    name,
                    slug,
                  }) => (
                    <ProductCard
                      key={`shop-product-${id}`}
                      id={id}
                      brand={brand}
                      categoery={categoery}
                      discription={discription}
                      colors={colors}
                      min_price={min_price}
                      name={name}
                      img={img}
                      slug={slug}
                    />
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <BottmNavbar />
    </div>
  );
};

export default Shop;
