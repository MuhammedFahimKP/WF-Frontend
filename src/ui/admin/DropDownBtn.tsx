import { useState, type ReactNode } from "react";
import { FaCaretRight } from "react-icons/fa6";

interface Props {
  title: string;
  children: ReactNode;
  icon: ReactNode;
}

const DropDownBtn = ({ children, icon, title }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDropDown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full   relative inline-block text-left">
      <button
        className="flex flex-row mx-auto
          md:hover:bg-gray-200  gap-2 items-center w-[95%] transition-all   rounded-lg text-slate-500 text-lg pl-2 py-[1px]  "
        onClick={() => handleDropDown()}
      >
        {icon}
        {title}
        <span className="pl-[50%]  ">
          <FaCaretRight
            className={` transition-all duration-700 transform ${
              isOpen ? "rotate-90" : "rotate-0"
            }`}
          />
        </span>
      </button>

      <div
        className={`ml-2 bg-white   overflow-hidden transition-all duration-700 ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default DropDownBtn;
