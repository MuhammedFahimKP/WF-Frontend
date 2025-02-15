interface Props {
  heightClass?: string;
}

const Loader = ({ heightClass }: Props) => {
  return (
    <div
      className={`flex items-center justify-center  bg-white ${
        heightClass || "h-[100vh]"
      } `}
    >
      <div className="loader" />
    </div>
  );
};

export default Loader;
