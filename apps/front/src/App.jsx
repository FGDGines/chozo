import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Sales from "./views/Sales";
import Accounting from "./views/Accounting";
import Providers from "./views/Providers";
import Purchases from "./views/Purchases";
import Stock from "./views/Stock";
import Sell from "./views/Sell";
import SideBar from "./components/SideBar";

function App() {
  return (
    <div className="flex">
      <Routes>
        <Route path="/" element={<MainLayout showSidebar={false} />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/sales"
          element={
            <MainLayout showSidebar={true}>
              <Sales />
            </MainLayout>
          }
        />
        <Route
          path="/sell"
          element={
            <MainLayout showSidebar={true}>
              <Sell />
            </MainLayout>
          }
        />
        <Route
          path="/accounting"
          element={
            <MainLayout showSidebar={true}>
              <Accounting />
            </MainLayout>
          }
        />
        <Route
          path="/providers"
          element={
            <MainLayout showSidebar={true}>
              <Providers />
            </MainLayout>
          }
        />
        <Route
          path="/purchases"
          element={
            <MainLayout showSidebar={true}>
              <Purchases />
            </MainLayout>
          }
        />
        <Route
          path="/stock"
          element={
            <MainLayout showSidebar={true}>
              <Stock />
            </MainLayout>
          }
        />
      </Routes>
    </div>
  );
}

function MainLayout({ children, showSidebar }) {
  return (
    <>
      {showSidebar && <SideBar />}
      <div className="flex-1  ">{children}</div>
    </>
  );
}

export default App;
