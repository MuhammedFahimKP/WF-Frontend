import { useNavigate } from "react-router-dom";
import { LuIndianRupee } from "react-icons/lu";

interface Props {
  colors: string[];
  min_price: number;
  slug: string;
}

const VariationCard = ({ colors, min_price, slug }: Props) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="z-50 w-full flex items-center justify-center px-4  gap-2">
        {colors.map((color) => (
          <span
            onClick={() =>
              navigate(`/single/${slug}/`, {
                state: {
                  color,
                },
              })
            }
            key={`${slug} + ${color}`}
            className="size-6 rounded-md cursor-pointer"
            style={{ backgroundColor: `${color}` }}
          />
        ))}
      </div>

      <div className="my-2 md:my-4 text-lg">
        <span className="flex flex-col items-start justify-between">
          <p className="text-sm text-gray-400">Starts From</p>
          <div className="text-lg flex items-center ">
            <LuIndianRupee />
            <h1 className="">{min_price}</h1>
          </div>
        </span>
      </div>
    </>
  );
};

export default VariationCard;
