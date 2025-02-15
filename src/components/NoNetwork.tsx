import Lottie, { Options } from "react-lottie";
import newNoNetwork from "../assets/lotties/newNoNetwork.json";

interface Props {
  reasone: string;
}

const options: Options = {
  loop: true,
  autoplay: true,
  animationData: newNoNetwork,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const NoNetwork = ({ reasone }: Props) => {
  return (
    <div className="flex  flex-col items-center    w-full     px-5  my-10">
      <div className="size-14 md:w-40 md:h-40 lg:w-44 lg:h-44 gap-2 ">
        <Lottie options={options} />
      </div>
      <div className=" flex mt-2   flex-col items-center   gap-1   ">
        <h1 className="text-lg md:text-3xl md:text-center ">No Network</h1>
        <p className="text-sm md:text-xl   line-clamp-3">{reasone}</p>
      </div>
    </div>
  );
};

export default NoNetwork;
