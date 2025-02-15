import { useState } from "react";

import Navbar from "@/components/user/Navbar";
import Footer from "@/components/user/Footer";
import NotFound from "@/components/NotFound";
import SingleOrderView from "@/pages/admin/SingleOrderView";

const SingleOrderPage = () => {
  const [error, setError] = useState(false);

  const handleError = () => setError(true);

  return (
    <>
      {error ? (
        <NotFound />
      ) : (
        <>
          <div className="lg:h-20 bg-black h-16 mb-0 sticky top-0 z-50 w-full   ">
            <Navbar />
          </div>

          <div className="my-10 md:my-20">
            <SingleOrderView userSide={true} onUserSideError={handleError} />
          </div>

          <Footer />
        </>
      )}
    </>
  );
};

export default SingleOrderPage;
