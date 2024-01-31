import React, { createContext, useContext, useEffect, useState } from "react";

const TokenContext = createContext();

export const Token = ({ children }) => {
  const [token, setToken] = useState({ token: null });

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken({ token: storedToken });
    }
  }, []);

  return (
    <TokenContext.Provider value={token}>{children}</TokenContext.Provider>
  );
};

export const useToken = () => {
  const token = useContext(TokenContext);
  return token;
};
