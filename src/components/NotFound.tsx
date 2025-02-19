import animationData from "../assets/lotties/Animation - 1716014519998.json";
import Lottie from "react-lottie";

const options = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const NotFound = () => {
  return (
    <section className="bg-white dark:bg-gray-900 ">
      <div className="container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12 justify-center">
        <div className="relative w-full mt-12 lg:w-1/2 lg:mt-0">
          <Lottie options={options} />
        </div>
      </div>
    </section>
  );
};

export default NotFound;
