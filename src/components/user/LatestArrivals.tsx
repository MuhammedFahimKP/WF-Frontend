import { lazy, Suspense } from "react";
import { useData } from "@/hooks";

import type { ProductResponseData } from "@/types";
import { makeArrayFromRange } from "@/utils/other-utils";

import NoNetwork from "../NoNetwork";

const ProductCard = lazy(() => import("./ProductCard"));
const ProductCardSkeleton = lazy(
  () => import("@/components/skeletons/ProductCardSkeleton")
);
const LatestArrivals = () => {
  const {
    data: latestArrivals,
    isLoading,
    error,
  } = useData<ProductResponseData>("shop/product-latest/");

  const skeletonArray = makeArrayFromRange(4);

  return (
    <>
      {/* title */}

      <div className="my-2 w-full px-4 ">
        {!isLoading && error && error === "Network Error" && (
          <div className="flex font-ubuntu  overflow-hidden  md:mx-8 lg:mx-16 border md:border-none  md:broder-gray  border-gray-200  shadow-lg md:shadow-none  rounded-2xl  items-center md:justify-center  ">
            <NoNetwork reasone="failed to fetch latest arrivals " />
          </div>
        )}
      </div>

      <div className="text-center p-10">
        {latestArrivals.length > 0 && !error && !isLoading && (
          <h1 className="bf text-3xl lg:text-6xl    mb-1 md:mb-4 font-ubuntu">
            Latest Arrivals
          </h1>
        )}
      </div>

      <div className="mb-10 grid grid-cols-1  md:grid-cols-2  lg:grid-cols-4 place-items-center   min-w-sm   mx-auto mt-0 md:mt-5 gap-2 lg:gap-5 ">
        {isLoading &&
          skeletonArray.map((nOf) => (
            <Suspense key={`latest-product-skeleton-${nOf}`}>
              <ProductCardSkeleton />
            </Suspense>
          ))}

        {latestArrivals.map((item: ProductResponseData) => (
          <Suspense key={"item-" + item.slug + item.id}>
            <ProductCard
              id={item.id}
              brand={item.brand}
              img={item.img}
              name={item.name}
              slug={item.slug}
              categoery={item.categoery}
              colors={item.colors}
              discription={item.discription}
              min_price={item.min_price}
              key={"item-" + item.slug + item.id}
            />
          </Suspense>
        ))}
      </div>
    </>
  );
};

export default LatestArrivals;
