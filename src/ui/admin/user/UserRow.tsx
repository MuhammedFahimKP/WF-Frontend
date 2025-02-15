import { Typography, Avatar } from "@material-tailwind/react";

import { AdminUserModel } from "@/types";

import BlockSwitch from "@/components/user/BlockSwitch";

import { getDateAndTime } from "../../../utils/other-utils";
import apiClient from "@/services/api-client";

interface Props {
  user: AdminUserModel;
  classes: string;
}

const UserRow = ({ user, classes }: Props) => {
  const {
    auth_type,
    avatar: avatarImg,
    date_joined,
    email,
    first_name,
    id,
    is_active,
    is_logedin,
    is_blocked,
    last_login,
    last_name,
    role,
  } = user;

  const handleBlock = async () => {
    try {
      await apiClient.patch(`admin/user/${id}/`);
    } catch {
      return false;
    }

    return true;
  };

  return (
    <tr key={id}>
      <td className={classes}>
        <div className="flex items-center gap-3">
          <Avatar
            src={avatarImg}
            alt=""
            className="rounded-md object-cover size-12 mr-5"
            placeholder={`avatar${id}`}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />

          <div className="flex flex-col">
            <Typography
              placeholder={undefined}
              variant="small"
              color="blue-gray"
              className="font-normal"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {first_name + " " + last_name}
            </Typography>
            <Typography
              placeholder={undefined}
              variant="small"
              color="blue-gray"
              className="font-normal opacity-70"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {role}
            </Typography>
          </div>
        </div>
      </td>

      <td className={classes}>
        <Typography
          placeholder={undefined}
          variant="small"
          color="blue-gray"
          className="font-normal"
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {email}
        </Typography>
      </td>

      <td className={classes}>
        <Typography
          placeholder={undefined}
          variant="small"
          color="blue-gray"
          className="font-normal"
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {auth_type}
        </Typography>
      </td>

      <td className={classes}>
        <div className="w-max">
          {is_logedin ? (
            <div className="text-white bg-green-500 px-2 rounded-lg">
              Logged
            </div>
          ) : (
            <div className="text-white bg-red-500 px-2 rounded-lg">
              Logged Out{" "}
            </div>
          )}
        </div>
      </td>

      <td className={classes}>
        <div className="w-max">
          {is_active ? (
            <div className="text-white bg-green-500 px-2 rounded-lg">
              active
            </div>
          ) : (
            <div className="text-white bg-red-500 px-2 rounded-lg">
              not activated
            </div>
          )}
        </div>
      </td>

      <td className={classes}>
        <div className="w-max">
          <BlockSwitch
            switched={is_blocked}
            onClick={async () => await handleBlock()}
          />
        </div>
      </td>

      <td className={classes}>
        <Typography
          placeholder={undefined}
          variant="small"
          color="blue-gray"
          className="font-normal"
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {date_joined && getDateAndTime(date_joined)}
        </Typography>
      </td>

      <td className={classes}>
        <Typography
          placeholder={undefined}
          variant="small"
          color="blue-gray"
          className="font-normal"
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {last_login && getDateAndTime(last_login)}
        </Typography>
      </td>
    </tr>
  );
};

export default UserRow;
