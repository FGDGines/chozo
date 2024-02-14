
import React from 'react';
import { useState } from 'react';
import HeaderContab from "../../components/HeaderContab";

function Accounting() {
  const today = new Date();
  const formattedDate = `${today.getDate()}/${
    today.getMonth() + 1
  }/${today.getFullYear()}`;

  const infoHeader = {
    title: "Comprobante Contable",
    person1: "Fuente",
    person2: "Tercero",
    isViewSale: true,
  };

  return (
    <>
      <div className="ml-[80px] font-SFRegular h-screen w-[92%] flex flex-col">

      </div>
    </>
  )
}

export default Accounting
