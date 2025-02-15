import { Typography } from "@material-tailwind/react";
import Logo from "@/assets/whiteLogo.svg";
const NewFooter = () => {
  return (
    <footer className="w-full bg-black p-8">
      <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12  text-center md:justify-between">
        <img src={Logo} alt="logo-ct" className="size-48" />
        <ul className="flex flex-wrap items-center gap-y-2 gap-x-8 text-white font-ubuntu">
          <li>
            <h1 className="font-normal transition-colors text-white hover:text-blue-500 focus:text-blue-500">
              About Us
            </h1>
          </li>
          <li>
            <h1 className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500">
              License
            </h1>
          </li>
          <li>
            <h1 className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500">
              Contribute
            </h1>
          </li>
          <li>
            <h1 className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500">
              Contact Us
            </h1>
          </li>
        </ul>
      </div>
      <hr className="my-8 border-blue-gray-50" />
      <h1 className="text-center font-normal text-white  font-ubuntu ">
        &copy; 2025 WildFab
      </h1>
    </footer>
  );
};

export default NewFooter;
