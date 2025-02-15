import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: String;
}

const ScreenContainer = ({ children, className = "" }: Props) => {
  return (
    <div className={`h-screen  flex flex-col p-0 m-0 ${className} `}>
      {children}
    </div>
  );
};

export default ScreenContainer;
