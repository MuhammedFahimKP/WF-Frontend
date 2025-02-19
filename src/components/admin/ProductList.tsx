// import { useEffect, useState } from "react";
// import type { AdminProduct } from "../../types";

// import ProductRow from "../../ui/admin/ProductRow";
// import apiClient from "../../services/api-client";

// const ProductList = () => {
//   useEffect(() => {
//     apiClient.get("admin/product/").then((res) => setData(res.data));
//   }, []);
//   const [data, setData] = useState<AdminProduct[] | []>([]);
//   return (
//     <div className="overflow-x mx-4 my-2 bg-green-300   overflow-x-scroll rounded-md no-scrollbar ">
//       <table className=" w-full font-ptsans  px-4 bg-gray-200 ">
//         <thead className="px-1 ">
//           <tr className=" px-4 font-medium rounded-md">
//             <th className="w-20 px-4 py-2 font-medium rounded-l-m"></th>
//             <th className="px-4 py-2 font-medium">Name</th>
//             <th className="px-4 py-2 font-medium">Category</th>
//             <th className="px-4 py-2 font-medium">Brand</th>
//             <th className="px-4 py-2 font-medium">Colors</th>
//             <th className="px-4 py-2 font-medium">Sizes</th>
//             <th className="px-4 py-2 font-medium">Published</th>
//             <th className="px-4 py-2 font-medium">Created</th>
//             <th className="px-4 py-2 font-medium">Updated</th>
//             {/* <th className="px-4 py-2">University Email</th>
//             <th className="px-4 py-2">University Password</th>
//             <th className="px-4 py-2">Students Files</th>
//             <th className="px-4 py-2">Actions</th> */}
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((product: AdminProduct) => (
//             <ProductRow
//               key={product.id}
//               img={product.img}
//               slug={product.slug}
//               id={product.id}
//               size={product.size}
//               color={product.color}
//               is_active={product.is_active}
//               brand={product.brand}
//               name={product.name}
//               category={product.category}
//               created={product.created}
//               updated={product.updated}
//             />
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ProductList;

import { useState } from "react";

import { usePaginatedAdminProduct } from "../../hooks/useProduct";

import { ChevronUpDownIcon } from "@heroicons/react/24/outline";

import {
  Card,
  Typography,
  Button,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";

import { AdminProduct } from "../../types";
import ProductRow from "../../ui/admin/ProductRow";

import AdminProductRowSkeleton from "../skeletons/AdminProductRowSkeleton";
import {
  makeArrayFromRange,
  getAllSearchParams,
} from "../../utils/other-utils";

// const TABS = [
//   {
//     label: "All",
//     value: "all",
//   },
//   {
//     label: "Monitored",
//     value: "monitored",
//   },
//   {
//     label: "Unmonitored",
//     value: "unmonitored",
//   },
// ];

const TABLE_HEAD = [
  "Product",
  "Category",
  "Published",
  "Created at",
  "Updated at",
  "",
];

interface Props {
  filterParams: URLSearchParams;
}

export default function SortableTable({ filterParams }: Props) {
  const [limit] = useState(4);

  const { data, currentPage, next, prev, pages, isLoading } =
    usePaginatedAdminProduct(
      3,
      1000,
      {
        params: getAllSearchParams(filterParams),
      },
      [filterParams]
    );

  const [loadingArray] = useState(makeArrayFromRange(limit));

  return (
    <div className="cursor-pointer h-full">
      <Card
        placeholder={undefined}
        className="h-full w-full rounded-none "
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <CardBody
          placeholder={undefined}
          className="overflow-scroll px-0 "
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head, index) => (
                  <th
                    key={head}
                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                  >
                    <Typography
                      placeholder={undefined}
                      variant="small"
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                      color="blue-gray"
                      className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                    >
                      {head}{" "}
                      {index !== TABLE_HEAD.length - 1 && (
                        <ChevronUpDownIcon
                          strokeWidth={2}
                          className="h-4 w-4"
                        />
                      )}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading &&
                loadingArray.map((_, index) => (
                  <AdminProductRowSkeleton
                    classes={"p-4"}
                    key={"Admin" + "product" + "skeleton" + index}
                  />
                ))}
              {data.map(
                (
                  {
                    id,
                    img,
                    name,
                    brand,
                    categoery,
                    is_active,
                    created,
                    updated,
                  }: AdminProduct,
                  index: number
                ) => {
                  const isLast = index === limit - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <ProductRow
                      id={id}
                      key={id}
                      name={name}
                      img={img}
                      brand={brand}
                      categoery={categoery}
                      is_active={is_active}
                      created={created}
                      updated={updated}
                      classes={classes}
                    />
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
        <CardFooter
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          className="flex items-center justify-between border-t border-blue-gray-50 p-4"
        >
          <Typography
            placeholder={undefined}
            variant="small"
            color="blue-gray"
            className="font-normal"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Page {pages > 0 ? currentPage : 0} of {pages}
          </Typography>
          <div className="flex gap-2">
            <Button
              placeholder={undefined}
              variant="outlined"
              size="sm"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              onClick={() => currentPage > 1 && prev()}
            >
              Previous
            </Button>
            <Button
              placeholder={undefined}
              variant="outlined"
              size="sm"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              onClick={next}
            >
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
