import { ReactNode, createContext, useState } from "react";

const AdminSideBarContext = createContext<{
  isMobileOpen: boolean;
  handleOpen: () => void;
} | null>(null);

const AdminSideBarContextProvider = ({ children }: { children: ReactNode }) => {
  const [showSide, setShowSideBar] = useState(false);

  return (
    <AdminSideBarContext.Provider
      value={{
        isMobileOpen: showSide,
        handleOpen: () => setShowSideBar(!showSide),
      }}
    >
      {children}
    </AdminSideBarContext.Provider>
  );
};

export { AdminSideBarContextProvider, AdminSideBarContext };
