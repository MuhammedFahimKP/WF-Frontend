import LatestOrder from "./LatestOrder";

import SalesDashboard from "./SalesDashBoard";
import DashBoardTopSec from "./DashBoardTopSec";

const DashBoard = () => {
  return (
    <div className="w-full px-8 bg-white  min-h-screen ">
      <DashBoardTopSec />

      <SalesDashboard />
    </div>
  );
};

export default DashBoard;
