import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Sales from "./views/Sales/Sales";
import Accounting from "./views/Accounting/Accounting";
import Providers from "./views/Purchases/Providers";
import Shopping from "./views/Purchases/Shopping";
import Stock from "./views/Stock/Stock";
import Sell from "./views/Sales/Sell";
import SideBar from "./components/SideBar";
import Customers from "./views/Sales/Customers";
import Buy from "./views/Purchases/Buy";
import CreateProduct from "./views/Stock/CreateProduct";
import CreateProvider from "./views/Purchases/CreateProvider";

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
          path="/buy"
          element={
            <MainLayout showSidebar={true}>
              <Buy />
            </MainLayout>
          }
        />
        <Route
          path="/shopping"
          element={
            <MainLayout showSidebar={true}>
              <Shopping />
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
          path="/customers"
          element={
            <MainLayout showSidebar={true}>
              <Customers />
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
          path="/stock"
          element={
            <MainLayout showSidebar={true}>
              <Stock />
            </MainLayout>
          }
        />
        <Route
          path="/createProduct"
          element={
            <MainLayout showSidebar={true}>
              <CreateProduct />
            </MainLayout>
          }
        />
        <Route
          path="/createProvider"
          element={
            <MainLayout showSidebar={true}>
              <CreateProvider />
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
