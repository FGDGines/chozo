import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './Views/Home';
import Sales from './Views/Sales';
import Accounting from './Views/Accounting';
import Providers from './Views/Providers';
import Purchases from './Views/Purchases';
import Stock from './views/Stock';
import SideBar from './components/SideBar';

function App() {
  return (
    <div className="flex">
      <Routes>
        <Route
          path="/"
          element={<MainLayout />}
        />
        <Route
          path="/home"
          element={<Home />}
        />
        <Route
          path="/sales"
          element={<Sales />}
        />
        <Route
          path="/accounting"
          element={<Accounting />}
        />
        <Route
          path="/providers"
          element={<Providers />}
        />
        <Route
          path="/purchases"
          element={<Purchases />}
        />
        <Route
          path="/stock"
          element={<Stock />}
        />
      </Routes>
    </div>
  );
}

// Nuevo componente para el diseño principal (con SideBar)
function MainLayout({ children }) {
  return (
    <>
      <SideBar />
      <div className="flex-1">
        {children}
      </div>
    </>
  );
}

export default App;
