import { lazy, Suspense } from "react";
import { useWindowDimensions, useScrollPosition } from "../../hooks";

import Navbar from "../../components/user/Navbar";
import ScreenContainer from "../../ui/user/ScreenContainer";
import Footer from "../../components/user/Footer";
import Slider from "@/components/user/Slider";
import BottmNavbar from "../../components/user/BottmNavbar";

const Category = lazy(() => import("@/components/user/Category"));
const LatestArrivals = lazy(() => import("@/components/user/LatestArrivals"));

const Home = () => {
  const { width } = useWindowDimensions();

  const { scrollPosition } = useScrollPosition();

  const getBackGroundClass = (scrollLength: number) => {
    if (scrollLength > 180) {
      if (width < 769 && scrollLength < 500) {
        return "backdrop-blur-2xl";
      } else if (scrollLength < 1012) {
        return "backdrop-blur-2xl";
      }
    }

    if (width < 769 && scrollLength > 500) {
      return "bg-black";
    }

    if (
      (width > 769 && scrollLength > 1012) ||
      (width < 769 && scrollLength > 500)
    ) {
      return "bg-black";
    }
  };

  return (
    <div className="scroller">
      <ScreenContainer>
        <div
          className={`fixed z-50  h-16 w-full  top-0 left-0 right-0   ${getBackGroundClass(
            scrollPosition
          )}`}
        >
          <Navbar />
        </div>

        <div className="scrollbar-thumb-black scrollbar-thin scrollbar-track-gray-100">
          <Slider />
        </div>

        <Suspense>
          <Category />
        </Suspense>
        <Suspense>
          <LatestArrivals />
        </Suspense>

        <Footer />
        <BottmNavbar />
      </ScreenContainer>
    </div>
  );
};

export default Home;
