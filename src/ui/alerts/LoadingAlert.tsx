import { useWindowDimensions } from "@/hooks";

interface Props {
  loadingShowText?: string;
}

const LoadingAlert = ({ loadingShowText }: Props) => {
  const { width } = useWindowDimensions();
  return (
    <div
      id="toast-success"
      className={`flex  absolute ${
        width > 900 ? "right-2" : ""
      } top-5  z-30  items-center w-full max-w-xs p-4 mb-4 text-gray-500  bg-sky-50 rounded-xl  shadow-lg border border-sky-100   dark:text-gray-400 dark:bg-gray-800 `}
      role="alert"
    >
      <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500  rounded-lg dark:bg-green-800 dark:text-green-200">
        {/* <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
        </svg> */}

        <div
          className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
          role="status"
          aria-label="loading"
        >
          <span className="sr-only">Loading...</span>
        </div>
        <span className="sr-only">Check icon</span>
      </div>
      <div className="ms-3 text-sm font-normal text-blue-500">
        {loadingShowText ? loadingShowText : "Loading"}....
      </div>
      {/* <button
        type="button"
        onClic
        className="ms-auto -mx-1.5 -my-1.5 bg-inherit text-teal-500   inline-flex items-center justify-center h-8 w-8 "
        data-dismiss-target="#toast-success"
        aria-label="Close"
      >
        <span className="sr-only">Close</span>
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button> */}
    </div>
  );
};

export default LoadingAlert;
