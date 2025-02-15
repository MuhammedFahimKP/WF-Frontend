import Lottie from "lottie-react";
import noDataAnimation from "../../assets/lotties/noData.json";

interface Props {
  text?: string;
}

const NoData = ({ text }: Props) => {
  return (
    <div className="w-full mt-28 mx-auto  flex flex-col items-center  gap-0">
      <Lottie
        className="size-40 md:size-72  "
        animationData={noDataAnimation}
      />
      <h1 className="text-2xl  font-ubuntu">
        {" "}
        {text ? text : "No Data Found"}{" "}
      </h1>
    </div>
  );
};

export default NoData;
