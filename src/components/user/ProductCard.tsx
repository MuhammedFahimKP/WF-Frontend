import { useWindowDimensions } from "../../hooks";

import type { ProductResponseData as Props } from "../../types";

import { Link } from "react-router-dom";

import VariationCard from "./VariationCard";

const ProductCard = ({
  name,
  img,
  categoery,
  brand,
  colors,
  min_price,
  slug,
}: Props) => {
  const { width } = useWindowDimensions();

  return (
    <div className="bg-white shadow-md font-ubuntu   group transition-all duration-500 overflow-hidden w-72   rounded-2xl  ">
      <Link to={`/single/${slug}/`}>
        <img
          src={img}
          alt="Product image"
          className={`${
            width < 769 ? "object-fill w-full h-80  " : "portrait"
          }`}
        />
      </Link>
      <div className="px-4 py-3 w-72">
        <span className="text-gray-400 mr-3 uppercase text-xs">{brand}</span>
        <p className="text-lg  font-ubuntu  md:text-lg text-center text-black group-hover:text-pretty    truncate block capitalize  ">
          {name}
        </p>
        <span className="text-gray-400 mr-3 uppercase text-xs">
          {categoery}
        </span>

        {colors.length != 0 && (
          <VariationCard slug={slug} colors={colors} min_price={min_price} />
        )}
      </div>
    </div>
  );
};

export default ProductCard;
