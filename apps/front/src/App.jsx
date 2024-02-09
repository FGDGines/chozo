import React, { useEffect, useState } from "react";
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
import Lineas from "./views/Stock/Lineas";
import Sublineas from "./views/Stock/Sublineas";
import Grupos from "./views/Stock/Grupos";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const notify = () => toast.warning("¡Debe loguearse!");

  const [isAuthenticated, setAuthenticated] = useState(false);
  console.log("isAuthenticated", isAuthenticated);

  const handleLogin = (username, password) => {
    setAuthenticated(true);
  };

  const handleLogout = () => {
    setAuthenticated(false);
  };

  return (
    <div className="flex">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="colored"
      />
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
        <Route
          path="/sales"
          element={
            isAuthenticated ? (
              <MainLayout showSidebar={true}>
                <Sales handleLogout={handleLogout} />
              </MainLayout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/sell"
          element={
            isAuthenticated ? (
              <MainLayout showSidebar={true}>
                <Sell handleLogout={handleLogout} />
              </MainLayout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/buy"
          element={
            isAuthenticated ? (
              <MainLayout showSidebar={true}>
                <Buy handleLogout={handleLogout} />
              </MainLayout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/shopping"
          element={
            isAuthenticated ? (
              <MainLayout showSidebar={true}>
                <Shopping handleLogout={handleLogout} />
              </MainLayout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/pendingReceipt"
          element={
            isAuthenticated ? (
              <MainLayout showSidebar={true}>
                <PendingReceipt handleLogout={handleLogout} />
              </MainLayout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/accounting"
          element={
            isAuthenticated ? (
              <MainLayout showSidebar={true}>
                <Accounting handleLogout={handleLogout} />
              </MainLayout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/customers"
          element={
            isAuthenticated ? (
              <MainLayout showSidebar={true}>
                <Customers handleLogout={handleLogout} />
              </MainLayout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/createCustomer"
          element={
            isAuthenticated ? (
              <MainLayout showSidebar={true}>
                <CreateCustomer handleLogout={handleLogout} />
              </MainLayout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/providers"
          element={
            isAuthenticated ? (
              <MainLayout showSidebar={true}>
                <Providers handleLogout={handleLogout} />
              </MainLayout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/pendingToCollect"
          element={
            isAuthenticated ? (
              <MainLayout showSidebar={true}>
                <PendingToCollect handleLogout={handleLogout} />
              </MainLayout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/stock"
          element={
            isAuthenticated ? (
              <MainLayout showSidebar={true}>
                <Stock handleLogout={handleLogout} />
              </MainLayout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/createProduct"
          element={
            isAuthenticated ? (
              <MainLayout showSidebar={true}>
                <CreateProduct handleLogout={handleLogout} />
              </MainLayout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/createProvider"
          element={
            isAuthenticated ? (
              <MainLayout showSidebar={true}>
                <CreateProvider handleLogout={handleLogout} />
              </MainLayout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/Lineas"
          element={
            isAuthenticated ? (
              <MainLayout showSidebar={true}>
                <Lineas handleLogout={handleLogout} />
              </MainLayout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/Sublineas"
          element={
            isAuthenticated ? (
              <MainLayout showSidebar={true}>
                <Sublineas handleLogout={handleLogout} />
              </MainLayout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/Grupos"
          element={
            isAuthenticated ? (
              <MainLayout showSidebar={true}>
                <Grupos handleLogout={handleLogout} />
              </MainLayout>
            ) : (
              <Navigate to="/" />
            )
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
