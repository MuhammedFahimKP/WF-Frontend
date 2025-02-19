import { ReactNode, useLayoutEffect, useState } from "react";

interface Props {
  children: ReactNode;
  delay: number;
}

const DelayComponent = ({ children, delay }: Props) => {
  const [show, setShow] = useState(false);
  useLayoutEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, delay);
  }, [delay]);

  return show && children;
};

export default DelayComponent;
