import { useState, useEffect } from "react";
import { Switch } from "@material-tailwind/react";

interface Props {
  switched: boolean;
  onClick: () => Promise<boolean>;
}

const BlockSwitch = ({ switched, onClick }: Props) => {
  const [_switched, setSwitched] = useState(false);

  useEffect(() => {
    setSwitched(switched);
  }, []);

  const handleClick = async () => {
    const result = await onClick();
    result && setSwitched(!_switched);
  };

  return (
    <Switch
      className="bg-green-200"
      color="red"
      checked={_switched}
      crossOrigin={undefined}
      onClick={async () => await handleClick()}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    />
  );
};

export default BlockSwitch;
