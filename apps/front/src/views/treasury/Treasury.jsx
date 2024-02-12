
import React from 'react';
import { useState } from 'react';
import HeaderTreasury from '../../components/HeaderTreasury';

function Treasury() {
  const today = new Date();
  const formattedDate = `${today.getDate()}/${
    today.getMonth() + 1
  }/${today.getFullYear()}`;

  const infoHeader = {
    title: "Egresos",
    person1: "Fuente",
    person2: "Tercero",
    isViewSale: true,
  };

  return (
    <>
      <div className="ml-[80px] font-SFRegular h-screen w-[92%] flex flex-col">
         <HeaderTreasury formattedDate={formattedDate} infoHeader={infoHeader} />
      </div>
    </>
  )
}

export default Treasury
