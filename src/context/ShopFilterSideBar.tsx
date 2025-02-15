import { createContext, ReactNode, useState } from "react";

export const shopFilterSideBarContext = createContext({
  showFilter: false,
  handleFilter: () => {},
});

export const ShopFilterSideBarProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [showFilter, setShowFilter] = useState(false);

  return (
    <shopFilterSideBarContext.Provider
      value={{
        showFilter,
        handleFilter: () => setShowFilter(!showFilter),
      }}
    >
      {children}
    </shopFilterSideBarContext.Provider>
  );
};
