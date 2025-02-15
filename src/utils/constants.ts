import { getState } from "../store";

interface LinkType {
  to: string;
  text: string;
}

interface AdminProductSortProps {
  label: string;
  query: string;
}

const navlinks: LinkType[] = [
  {
    to: "/",
    text: "Home",
  },
  {
    to: "/signup",
    text: "Collections",
  },
  {
    to: "/signin",
    text: "About",
  },
  {
    to: "/signin",
    text: "SignIn",
  },
];

const AdminProductSortData: AdminProductSortProps[] = [
  {
    label: "Created",
    query: "created",
  },
  {
    label: "Name",
    query: "name",
  },
  {
    label: "Updated",
    query: "updated",
  },
  {
    label: "Published",
    query: "is_active",
  },
];

const VALID_FILE_EXTENTIONS = {
  image: ["jpg", "gif", "png", "jpeg", "svg", "webp"],
};

const FILE_REQUEST_CONFIG = {
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: "Bearer " + getState().persistedReducer.auth.access,
  },
};

const DELIVERY_AVAILABLE_STATES = ["Kerala", "TamilNadu", "Karnataka"];

export {
  VALID_FILE_EXTENTIONS,
  FILE_REQUEST_CONFIG,
  DELIVERY_AVAILABLE_STATES,
};
export { navlinks, AdminProductSortData };
