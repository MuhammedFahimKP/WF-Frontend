import {
  lazy,
  Suspense,
  type ComponentType,
  type LazyExoticComponent,
} from "react";
import { createBrowserRouter } from "react-router-dom";

import { ShopFilterSideBarProvider } from "@/context";
import Home from "@/pages/user/Home.tsx";
import Suspensed from "./Suspensed.tsx";
import NotFound from "../components/NotFound";

export function lazyImport<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  defaultDelay: number = 500
): LazyExoticComponent<T> {
  return lazy(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        importFn().then(resolve);
      }, defaultDelay);
    });
  });
}

const Shop = lazyImport(() => import("../pages/user/Shop.tsx"));
const SignUp = lazyImport(() => import("../pages/user/SignUp"));
const Socket = lazyImport(() => import("../components/Socket.tsx"));
const NewSignin = lazyImport(() => import("../components/user/NewSignin.tsx"));
const Colors = lazyImport(() => import("../components/Colors.tsx"));
const WishList = lazyImport(() => import("../pages/user/WishList.tsx"));
const NewCheckout = lazyImport(() => import("@/pages/user/NewCheckout.tsx"));
const Accounts = lazyImport(() => import("@/pages/user/Accounts.tsx"));
const Cart = lazyImport(() => import("@/pages/user/Cart.tsx"));

const OrderHistory = lazyImport(() => import("@/pages/user/OrderHistory.tsx"));
const SingleOrderPage = lazyImport(
  () => import("@/pages/user/SingleOrderPage.tsx")
);

const SingleProduct = lazyImport(
  () => import("../pages/user/SingleProduct.tsx")
);

const ForgetPassword = lazyImport(
  () => import("@/pages/user/ForgotPassword.tsx")
);

const ProductDetails = lazyImport(
  () => import("../pages/user/ProductDetials.tsx")
);
const ProductDetailPage = lazyImport(
  () => import("../pages/user/ProductSeePage.tsx")
);

const Checkout = lazyImport(() => import("../pages/user/Checkout.tsx"));

const Orders = lazy(() => import("@/pages/user/Orders.tsx"));

const Address = lazy(() => import("@/pages/user/Address.tsx"));
const ProfileSettings = lazy(() => import("@/pages/user/ProfileSettings.tsx"));

const routePatterns = [
  {
    path: "/",

    element: <Home />,
  },

  {
    path: "forget-password",
    element: (
      <Suspense>
        <ForgetPassword />
      </Suspense>
    ),
  },

  {
    path: "order/:id/",
    element: (
      <Suspensed>
        <SingleOrderPage />
      </Suspensed>
    ),
  },
  {
    path: "orderHistory",
    element: (
      <Suspensed>
        <OrderHistory />
      </Suspensed>
    ),
  },

  {
    path: "signin/",
    element: (
      <Suspensed>
        <NewSignin />
      </Suspensed>
    ),
  },
  {
    path: "account/",
    element: (
      <Suspensed>
        <Accounts />
      </Suspensed>
    ),
    children: [
      {
        path: "orders/",
        element: (
          <Suspense>
            <Orders />
          </Suspense>
        ),
      },
      {},
      {
        path: "profile/",
        element: (
          <Suspense>
            <ProfileSettings />
          </Suspense>
        ),
      },
      {
        path: "address/",
        element: (
          <Suspense>
            <Address />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "signup/",
    element: (
      <Suspensed>
        <SignUp />
      </Suspensed>
    ),
  },
  {
    path: "/",

    element: (
      <Suspensed>
        <Home />
      </Suspensed>
    ),
  },
  {
    path: "shop/",
    element: (
      <Suspensed>
        <ShopFilterSideBarProvider>
          <Shop />
        </ShopFilterSideBarProvider>
      </Suspensed>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "single/:slug/",
    element: (
      <Suspensed>
        <SingleProduct />
      </Suspensed>
    ),
  },
  {
    path: "/color",
    element: (
      <Suspensed>
        <Colors />
      </Suspensed>
    ),
  },
  {
    path: "details",
    element: (
      <Suspensed>
        <ProductDetails />
      </Suspensed>
    ),
  },
  {
    path: "dt",
    element: (
      <Suspensed>
        <ProductDetailPage />
      </Suspensed>
    ),
  },
  // {
  //   path: "checkout/",
  //   element: (
  //     <Suspensed>
  //       <Checkout />
  //     </Suspensed>
  //   ),
  // },
  {
    path: "wishlist/",
    element: (
      <Suspensed>
        <WishList />
      </Suspensed>
    ),
  },
  {
    path: "socket/",
    element: (
      <Suspensed>
        <Socket />
      </Suspensed>
    ),
  },

  {
    path: "checkout/",
    element: (
      <Suspensed>
        <NewCheckout />
      </Suspensed>
    ),
  },
  {
    path: "cart/",
    element: (
      <Suspensed>
        <Cart />
      </Suspensed>
    ),
  },
];

const routes = createBrowserRouter(routePatterns);

export default routes;
