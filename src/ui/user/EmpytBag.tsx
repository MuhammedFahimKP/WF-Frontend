import { useNavigate } from "react-router-dom";

import Lottie from "lottie-react";
import emptyCartAnimation from "../../assets/lotties/emptyCartLottie.json";

interface Props {
  context: string;
}

const EmpytBag = ({ context }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="w-full mt-2 mx-auto  flex flex-col items-center font-ubuntu  ">
      <Lottie className="size-72 " animationData={emptyCartAnimation} />
      <h1 className="text-2xl mt-4  ">{context}</h1>

      <button
        className="px-4 py-2  rounded-md bg-black  text-white my-3"
        onClick={() => navigate("/shop/")}
      >
        Go to Shop
      </button>
    </div>
  );
};

export default EmpytBag;
