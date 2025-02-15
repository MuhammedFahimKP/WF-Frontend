import {
  useState,
  useContext,
  useEffect,
  createRef,
  type FormEvent,
  type ChangeEvent,
} from "react";
import { useDispatch } from "react-redux";

import { AppDispact } from "@/store";
import { updateUserData } from "@/slices/authenticationSlice";

import { ToastContext } from "@/context";
import toast from "react-hot-toast";

import { v4 as uuid } from "uuid";

import { genrateImageUrl } from "@/utils/image";
import { VALID_FILE_EXTENTIONS, FILE_REQUEST_CONFIG } from "@/utils/constants";

import {
  Dialog,
  DialogBody,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";

import ProfilePhotoEdit from "./ProfilePhotoEdit";
import AvatarEditor from "react-avatar-editor";

import { HiOutlinePlus } from "react-icons/hi2";
import NetworkErrorAlert from "../alerts/NetworkErrorAlert";
import SuccessAlert from "../alerts/SuccessAlert";
import apiClient, { ApiClientError } from "@/services/api-client";
import ErrorAlert from "../alerts/ErrorAlert";

interface Props {
  src: string;
}

const AvatarImg = ({
  src,
  handleDiscard,
}: {
  src?: string;
  show: boolean;
  handleDiscard: () => void;
}) => {
  const ref = createRef<AvatarEditor>();

  const dispatch = useDispatch<AppDispact>();

  const toastContext = useContext(ToastContext);

  const [isLoading, setIsLoading] = useState(false);

  const [blob, setBlob] = useState<Blob | null>(null);

  useEffect(() => {
    toastContext?.addAnotherToast();

    return () => {
      if (toastContext?.anotherToast) {
        toastContext?.removeAnotherToast();
      }
    };
  }, []);

  const handleError = () => {
    handleDiscard();
    toastContext?.removeAnotherToast();
    toast.custom((t) => (
      <ErrorAlert
        toast={t}
        errorText="Image size too high take another image"
      />
    ));
  };

  const handleSave = async () => {
    setIsLoading(true);

    let blobForFile: null | Blob = null;

    if (ref) {
      const dataUrl = ref?.current?.getImageScaledToCanvas()?.toDataURL();

      if (dataUrl) {
        const result = await fetch(dataUrl);
        const _blob = await result.blob();

        blobForFile = _blob;
      } else {
        handleError();

        return;
      }

      const data: any = {};

      let file: File | null = null;

      if (blobForFile) {
        const newFile = new File([blobForFile], uuid() + "avatar.png", {
          ...blobForFile,
        });

        console.log(newFile);
        file = newFile;
      }

      console.log(blob);

      if (file) {
        data["img"] = file;
      } else {
        handleError();
        return;
      }

      try {
        const response = await apiClient.patch(
          "users/user-update/",
          data,
          FILE_REQUEST_CONFIG
        );

        if (response.status === 200) {
          dispatch(updateUserData(response.data));
          handleDiscard();
          toastContext?.removeAnotherToast();
          toast.custom((t) => (
            <SuccessAlert toast={t} successText="Updated Profile Picture" />
          ));
        }
      } catch (err) {
        if ((err as ApiClientError).message === "Network Error") {
          toast.custom((t) => <NetworkErrorAlert toast={t} />);
        }
      } finally {
        setIsLoading(false);
      }
    } else {
      handleError();

      return;
    }
  };

  return (
    <Dialog
      placeholder={"name"}
      open={src ? true : false}
      handler={() => {}}
      size="xs"
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <DialogHeader
        className="font-ubuntu text-black  font-light"
        placeholder={"dailogou"}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        Set Profile Picture
      </DialogHeader>
      <DialogBody
        placeholder={"hdjhfhjk"}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <form
          className="w-full  flex  flex-col  gap-3 "
          onSubmit={async (event: FormEvent) => {
            event.preventDefault();
            await handleSave();
          }}
        >
          {src && (
            <div className="flex items-center justify-center ">
              <ProfilePhotoEdit
                ref={ref}
                src={src}
                setImage={(img) => setBlob(img)}
              />
            </div>
          )}
          <DialogFooter
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <button
              className="bg-red-50 ml-2  text-red-600 font-bold py-2 px-4 rounded-md hover:opacity-65 transition-all mr-2"
              onClick={() => {
                !isLoading
                  ? handleDiscard()
                  : toast.custom((t) => (
                      <ErrorAlert
                        toast={t}
                        errorText="Image size too high take another image"
                      />
                    ));
              }}
            >
              Discard
            </button>

            <button
              className={` bg-black text-white font-bold py-2 px-4 rounded-md hover:opacity-65 transition-all  ${
                isLoading && " opacity-50"
              }    `}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Updating" : "Update"}
            </button>
          </DialogFooter>
        </form>
      </DialogBody>
    </Dialog>
  );
};

const ProfileAvatar = ({ src }: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>("");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && VALID_FILE_EXTENTIONS.image.includes(files[0].type)) {
      console.log(files[0].type);

      setError("Invalid file type. Please select an image file.");
      return;
    }

    if (files) {
      if (error) {
        setError(null);
      }
      setFile(files[0]);
    }
  };

  const handleDiscard = () => {
    setFile(null);
  };

  return (
    <>
      <div className=" flex flex-col items-center ">
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg"
          src={src}
          referrerPolicy="no-referrer"
          alt="Bonnie image"
        />
        <div className="flex items-center mt-2 ">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center  text-white     bg-black   rounded-md cursor-pointer "
          >
            <div className="flex flex-col items-center justify-center px-6 py-2 ">
              <p className="text-sm font-ubuntu  text-white">Change</p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={handleFileChange}
              name=""
              accept="image/*"
            />
          </label>
        </div>

        {/* <button type="button" className="p-6">
          <div aria-label="Add a photo">
            <HiOutlinePlus className="text-4xl" />
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              className=""
            />
          </div>
        </button> */}
        {error && (
          <p className="text-red-500 text-sm font-bold mt-2">{error}</p>
        )}
      </div>

      <AvatarImg
        show={file ? true : false}
        src={file ? genrateImageUrl(file) : ""}
        handleDiscard={handleDiscard}
      />
    </>
  );
};

export default ProfileAvatar;
