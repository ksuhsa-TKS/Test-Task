/* eslint-disable react-refresh/only-export-components */
import { observer } from "mobx-react";
import { Button, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import "./style.css";
import Storage from "../Storage/Storage";

const DropDownMenu = () => {
  const items = Storage.listMenu;
  const onClick = Storage.onClickMenu;

  return (
    <Dropdown menu={{ items, onClick }} placement="bottom">
      <Button className="menu">
        {Storage.defaultValueMenu}
        <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default observer(DropDownMenu);
