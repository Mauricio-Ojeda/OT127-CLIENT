import React from "react";
import { bubble as Menu } from "react-burger-menu";

//TODO Desinstalar MUI ICONS, no fue necesario

const BackofficeHeader = () => {
  return (
    <Menu isOpen={false} className={"sidebar"}>
      <h1>ONG - Somos más</h1>
      {/*LINKS DE REACT ROUTER ??*/}
    </Menu>
  );
};

export default BackofficeHeader;
