import { useDispatch } from "react-redux";
import { navigate } from "../routes/Routes";
import { logout } from "../slices/authenticationSlice";

const EmailChangeAfterModal = () => {
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logout());
    navigate("/signin/");
  };

  return (
    <div
      id="static-modal"
      data-modal-backdrop="static"
      tabIndex={-1}
      aria-hidden="true"
      className="font-ubuntu overflow-y-auto backdrop-blur-md border border-gray-200  h-[100vh] flex overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 max-h-full"
    >
      <div className="relative p-4 w-full max-w-sm max-h-full">
        {/* Modal content */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Email Changed
            </h3>
          </div>
          {/* Modal body */}
          <div className="p-4 md:p-5 space-y-4">
            <p className=" leading-relaxed  dark:text-gray-400">
              Email Changed Successfully
            </p>
            <p className=" leading-relaxed  dark:text-gray-400">
              please confirm that you have changed mail by clicking link sent to
              your mail and login again with new mail id
            </p>
          </div>
          {/* Modal footer */}
          <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
              data-modal-hide="static-modal"
              type="button"
              onClick={() => handleLogOut()}
              className="text-white  w-full bg-black py-2 rounded-lg"
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailChangeAfterModal;
