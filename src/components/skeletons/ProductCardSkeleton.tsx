import { useWindowDimensions } from "@/hooks";

const ProductCardSkeleton = () => {
  const { width } = useWindowDimensions();

  const styles = {
    shimmerPrimarayBg: "bg-gray-300",
  };

  return (
    <div className="bg-white shadow-md  animate-pulse font-ubuntu duration-500 overflow-hidden w-72   rounded-2xl  ">
      <div>
        <div className="w-full overflo-hidden h-full">
          <div
            className={`${
              width < 769 ? "object-fill w-full h-80  " : "portrait"
            } ${
              styles.shimmerPrimarayBg
            }  overflow-hidden delay-200   relative before:absolute before:bg-shimmer-gradient before:h-full before:w-full  before:skew-x-[-20deg]  before:animate-shimmer`}
          />
        </div>
      </div>
      <div className="px-4 py-3 w-72 flex flex-col gap-2 my-4 ">
        <div className={`${styles.shimmerPrimarayBg}  w-4/5 h-2 rounded-sm`} />
        <div className={`${styles.shimmerPrimarayBg}  w-full h-3 rounded-sm`} />
        <div className={`${styles.shimmerPrimarayBg}  w-4/5 h-2 rounded-sm`} />
        <div className={`${styles.shimmerPrimarayBg}  w-4/5 h-2 rounded-sm`} />
        <div className={`${styles.shimmerPrimarayBg}  w-2/3 h-2 rounded-sm`} />
        <div className={`${styles.shimmerPrimarayBg}  w-2/3 h-2 rounded-sm`} />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
