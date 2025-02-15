import { useState } from "react";

import { usePaginatedData } from "../../hooks";

import { AdminUserModel } from "../../types";

import {
  Card,
  Typography,
  Button,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";

import UserRow from "../../ui/admin/user/UserRow";

import { getAllSearchParams } from "../../utils/other-utils";

const TABLE_HEAD = [
  "name",
  "email",
  "login via ",
  "status",
  "active",
  "block",
  "date joined ",
  "last login",
];

interface Props {
  filterParams: URLSearchParams;
}
const UsersList = ({ filterParams }: Props) => {
  const [limit] = useState(4);

  const { data, currentPage, next, prev, pages } =
    usePaginatedData<AdminUserModel>(
      "admin/user/",
      8,
      0,
      {
        params: getAllSearchParams(filterParams),
      },
      true,
      [filterParams]
    );

  return (
    <div className="cursor-pointer ">
      <Card
        placeholder={undefined}
        className=" overflow-hidden  w-full rounded-none "
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <CardBody
          placeholder={undefined}
          className="overflow-scroll px-0 py-0  "
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <table className="w-full min-w-max table-auto text-left ">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                  >
                    <Typography
                      placeholder={undefined}
                      variant="small"
                      color="blue-gray"
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                      className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                    >
                      {head}{" "}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data?.map((user: AdminUserModel, index: number) => {
                const isLast = index === limit - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <UserRow
                    user={user}
                    key={user.email + "user-admin"}
                    classes={classes}
                  />
                );
              })}
            </tbody>
          </table>
        </CardBody>
        <CardFooter
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          className="flex items-center justify-between border-t border-blue-gray-50 p-4"
        >
          <Typography
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            variant="small"
            color="blue-gray"
            className="font-normal"
          >
            Page {pages > 0 ? currentPage : 0} of {pages}
          </Typography>
          <div className="flex gap-2">
            <Button
              placeholder={undefined}
              variant="outlined"
              size="sm"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              onClick={() => currentPage > 1 && prev()}
            >
              Previous
            </Button>
            <Button
              placeholder={undefined}
              variant="outlined"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              size="sm"
              onClick={next}
            >
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UsersList;
