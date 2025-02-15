import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";

interface Props {
  title: string;
  selectedItem: string | null;
  menuItems: {
    [key: string | number]: string | number;
  } & Object;
  showTitle: boolean;

  handleParamChange: (value: string) => void;

  //   onItemClick:(key:string,value:string) => void
}

const DropDownBtn = ({
  title,
  menuItems,
  showTitle,
  selectedItem,
  handleParamChange,
}: Props) => {
  console.log(menuItems);

  return (
    <Menu>
      <MenuHandler>
        <Button
          placeholder={"dropt-item-btn" + title}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {" "}
          {title} {showTitle && selectedItem && menuItems[selectedItem]}
        </Button>
      </MenuHandler>
      <MenuList
        placeholder={`drop-item-list-${title}`}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        {Object.entries(menuItems).map(([key, value]) => (
          <MenuItem
            key={key}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            onClick={() => {
              alert(`${key} ${value}`);
              handleParamChange(key);
            }}
            placeholder={`drop-item-list-item-${value}`}
          >
            {value}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default DropDownBtn;
