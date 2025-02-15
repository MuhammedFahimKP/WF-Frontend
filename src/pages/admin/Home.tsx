import { useContext } from "react";
import { useOutlet } from "react-router-dom";
import { NotFoundContext } from "@/context";

import NotFoundWrapper from "@/context/NotFoundContext";
import { AdminSideBarContextProvider } from "@/context/AdminSideBar";

import ScreenContainer from "@/ui/user/ScreenContainer";
import Navbar from "@/components/admin/Navbar";
import SideBar from "@/components/admin/SideBar";
import DashBoard from "@/components/admin/DashBoard";
import PageNotFound from "@/components/NotFound";

function Home() {
  const outlet = useOutlet();

  const notFound = useContext(NotFoundContext);

  return (
    <ScreenContainer className=" !font-ubuntu ">
      <AdminSideBarContextProvider>
        {notFound?.notFoundItem ? (
          <PageNotFound />
        ) : (
          <>
            <Navbar />
            <div className="flex font-ubuntu">
              <SideBar />
              <div className="lg:ml-64 w-full mt-20 overflow-hidden">
                {outlet ? outlet : <DashBoard />}
              </div>
            </div>
          </>
        )}
      </AdminSideBarContextProvider>
    </ScreenContainer>
  );
}

export default NotFoundWrapper(Home);
