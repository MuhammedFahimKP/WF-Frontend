import { createBrowserRouter, RouteObject } from "react-router-dom";

import AdminHome from "@/pages/admin/Home";

import Product from "@/pages/admin/Product.tsx";
import AddVaraitonPage from "@/pages/admin/AddVaraitonPage.tsx";
import EditProduct from "@/pages/admin/EditProduct.tsx";
import ProductViewPage from "@/pages/admin/ProductViewPage.tsx";
import VariationViewPage from "@/pages/admin/VariationViewPage.tsx";
import CreateProduct from "@/pages/admin/CreateProduct.tsx";
import Orders from "@/pages/admin/Orders";
import SingleOrderView from "@/pages/admin/SingleOrderView.tsx";

import Brand from "@/pages/admin/Brand";
import Category from "@/pages/admin/Category";
import Color from "@/pages/admin/Color";
import Size from "@/pages/admin/Size.tsx";
import User from "@/pages/admin/User.tsx";

// Routs
const routes: RouteObject[] = [
  {
    id: "admin-home",
    path: "admin/",
    Component: AdminHome,
    children: [
      {
        path: "product/",
        Component: Product,
        children: [
          {
            path: "add/",
            Component: CreateProduct,
          },
          {
            path: "view/:id/",
            Component: ProductViewPage,
          },
          {
            path: "edit/:id",
            Component: EditProduct,
          },

          {
            path: "varaition/:varid/",
            Component: VariationViewPage,
          },

          {
            path: "variation/:pid/add/",
            Component: AddVaraitonPage,
          },
        ],
      },
      {
        path: "orders/",
        Component: Orders,

        children: [
          {
            path: ":id/",
            Component: SingleOrderView,
          },
        ],
      },
      {
        path: "brand/",
        Component: Brand,
      },

      {
        path: "category",
        Component: Category,
      },

      {
        path: "size",
        Component: Size,
      },
      {
        path: "color",
        Component: Color,
      },

      {
        path: "user",
        Component: User,
      },
    ],
  },
];

export default createBrowserRouter(routes);
