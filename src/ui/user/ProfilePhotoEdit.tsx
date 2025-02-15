import { useState, forwardRef } from "react";

import AvatarEditor from "react-avatar-editor";
import { FaArrowRotateRight } from "react-icons/fa6";
import { Slider } from "@material-tailwind/react";

interface Props {
  src: string;
  setImage: (image: any) => void;
}

const ProfilePhotoEdit = forwardRef<AvatarEditor, Props>(({ src }, ref) => {
  const [slideValue, setSlideValue] = useState(10);
  const [roation, setRotation] = useState(0);

  const handleRotation = () => {
    setRotation((prev) => (prev === 360 ? 0 : prev + 90));
  };

  return (
    <div className="flex flex-col gap-2">
      <AvatarEditor
        ref={ref}
        image={src}
        scale={slideValue / 10}
        rotate={roation}
        className="overflow-hidden w-full  rounded-md"
        //   style={{ width: "100%", height: "100%" }}
        border={50}
        borderRadius={150}
        disableBoundaryChecks={false}
        disableCanvasRotation={true}
        disableHiDPIScaling={false}
      />

      <div className="mb-2">
        <button
          onClick={handleRotation}
          type="button"
          className="bg-black text-white w-full py-2 flex items-center justify-center rounded-md"
        >
          <FaArrowRotateRight className="size-5" />
        </button>
      </div>

      <div className="mt-3">
        <Slider
          min={10}
          onChange={(event) => setSlideValue(parseInt(event.target.value))}
          defaultValue={slideValue}
          value={slideValue}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          className="text-black m-auto w-[80%]"
          barClassName="rounded-none bg-black"
          thumbClassName="[&::-moz-range-thumb]:rounded-sm [&::-webkit-slider-thumb]:rounded-sm [&::-moz-range-thumb]:-mt-[4px] [&::-webkit-slider-thumb]:-mt-[4px]"
          trackClassName="[&::-webkit-slider-runnable-track]:bg-transparent [&::-moz-range-track]:bg-transparent rounded-none !bg-[#2ec946]/10 border border-[#2ec946]/20"
        />
      </div>
    </div>
  );
});

export default ProfilePhotoEdit;
