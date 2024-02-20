import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Egresos() {
   return (
    <div className="mx-auto mt-10 max-w-[80%]">
        <h2 className="text-2xl bg-customBlue p-2 rounded-md text-white">Egresos</h2>
    </div>
   )
};

export default Egresos;