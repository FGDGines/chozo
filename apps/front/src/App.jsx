import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./views/Home";
import Sales from "./views/Sales/Sales";
import Accounting from "./views/Accounting/Accounting";
import Providers from "./views/Providers/Providers";
import Shopping from "./views/Purchases/Shopping";
import Stock from "./views/Stock/Stock";
import Sell from "./views/Sales/Sell";
import SideBar from "./components/SideBar";
import Customers from "./views/Customers/Customers";
import Buy from "./views/Purchases/Buy";
import CreateProduct from "./views/Stock/CreateProduct";
import CreateProvider from "./views/Providers/CreateProvider";
import CreateCustomer from "./views/Customers/CreateCustomer";
import PendingToCollect from "./views/Sales/PendingToCollect";
import Login from "./views/Login/Login";
import PendingReceipt from "./views/Purchases/PendingReceipt";

function App() {
  const [isAuthenticated, setAuthenticated] = useState(true);

  // Función para manejar la autenticación
  const handleLogin = (username, password) => {
    // Lógica de autenticación aquí
    // Si las credenciales son válidas, establece isAuthenticated en true
    setAuthenticated(true);
  };

  const handleLogout = () => {
    // Puedes agregar aquí la lógica para cerrar la sesión del usuario
    setAuthenticated(false);
  };
  return (
    <div className="flex">
      <Routes>
        <Route
          exact
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/home" />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        {/* <Route
          path="/home"
          element={isAuthenticated ? <Outlet /> : <Navigate to="/" />}
        /> */}
        <Route
          path="/home"
          element={
            isAuthenticated ? (
              <MainLayout showSidebar={false}>
                <Home handleLogout={handleLogout} />
              </MainLayout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        {/* <Route path="/" element={<MainLayout showSidebar={false} />} />
        <Route path="/home" element={<Home />} /> */}
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
          path="/pendingReceipt"
          element={
            <MainLayout showSidebar={true}>
              <PendingReceipt />
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
          path="/createCustomer"
          element={
            <MainLayout showSidebar={true}>
              <CreateCustomer />
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
          path="/pendingToCollect"
          element={
            <MainLayout showSidebar={true}>
              <PendingToCollect />
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
