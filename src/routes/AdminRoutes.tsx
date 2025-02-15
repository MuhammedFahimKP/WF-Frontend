import { lazy, Suspense } from "react";
import { createBrowserRouter, RouteObject } from "react-router-dom";

import { NotFoundProvider } from "@/context";

const AdminHome = lazy(() => import("@/pages/admin/Home.tsx"));
const Product = lazy(() => import("@/pages/admin/Product.tsx"));
const Brand = lazy(() => import("@/pages/admin/Brand.tsx"));
const Category = lazy(() => import("@/pages/admin/Category.tsx"));
const Color = lazy(() => import("@/pages/admin/Color.tsx"));
const Size = lazy(() => import("@/pages/admin/Size.tsx"));
const User = lazy(() => import("@/pages/admin/User.tsx"));

const AddVaraitonPage = lazy(() => import("@/pages/admin/AddVaraitonPage.tsx"));
const EditProduct = lazy(() => import("@/pages/admin/EditProduct.tsx"));
const ProductViewPage = lazy(() => import("@/pages/admin/ProductViewPage.tsx"));
const VariationViewPage = lazy(
  () => import("@/pages/admin/VariationViewPage.tsx")
);
const CreateProduct = lazy(() => import("@/pages/admin/CreateProduct.tsx"));
const Orders = lazy(() => import("@/pages/admin/Orders.tsx"));
const SingleOrderView = lazy(() => import("@/pages/admin/SingleOrderView.tsx"));

// Routs
const routes: RouteObject[] = [
  {
    id: "admin-home",
    path: "admin/",
    element: (
      <Suspense>
        <NotFoundProvider>
          <AdminHome />
        </NotFoundProvider>
      </Suspense>
    ),
    children: [
      {
        path: "product/",
        element: (
          <Suspense>
            <Product />
          </Suspense>
        ),
        children: [
          {
            path: "add/",
            element: (
              <Suspense>
                <CreateProduct />
              </Suspense>
            ),
          },
          {
            path: "view/:id/",
            element: (
              <Suspense>
                <ProductViewPage />
              </Suspense>
            ),
          },
          {
            path: "edit/:id",
            element: (
              <Suspense>
                <EditProduct />
              </Suspense>
            ),
          },

          {
            path: "varaition/:varid/",
            element: (
              <Suspense>
                <VariationViewPage />
              </Suspense>
            ),
          },

          {
            path: "variation/:pid/add/",
            element: (
              <Suspense>
                <AddVaraitonPage />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "orders/",
        element: (
          <Suspense>
            <Orders />
          </Suspense>
        ),

        children: [
          {
            path: ":id/",
            element: (
              <Suspense>
                <SingleOrderView />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "brand/",
        element: (
          <Suspense>
            <Brand />
          </Suspense>
        ),
      },

      {
        path: "category",
        element: (
          <Suspense>
            <Category />
          </Suspense>
        ),
      },

      {
        path: "size",
        element: (
          <Suspense>
            <Size />
          </Suspense>
        ),
      },
      {
        path: "color",
        element: (
          <Suspense>
            <Color />
          </Suspense>
        ),
      },

      {
        path: "user",
        element: (
          <Suspense>
            <User />
          </Suspense>
        ),
      },
    ],
  },
];

export default createBrowserRouter(routes);
