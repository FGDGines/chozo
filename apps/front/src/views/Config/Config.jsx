import React from 'react';
import { useState } from 'react';
import HeaderConfig from "../../components/HeaderConfig";

function Config() {
  const today = new Date();
  const formattedDate = `${today.getDate()}/${
    today.getMonth() + 1
  }/${today.getFullYear()}`;

  const infoHeader = {
    title: "Fuentes",
    person1: "Fuente",
    person2: "Tercero",
    isViewSale: true,
  };

  return (
    <>
      <div className="ml-[80px] font-SFRegular h-screen w-[92%] flex flex-col">
         <HeaderConfig formattedDate={formattedDate} infoHeader={infoHeader} />
      </div>
    </>
  )
}

export default Config;
