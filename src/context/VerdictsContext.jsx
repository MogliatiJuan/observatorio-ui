import React, { useMemo, useState } from "react";

const Context = React.createContext({});

export function VerdictsContextProvider({ children }) {
  const [verdict, setVerdict] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    setToken(null);
    window.location.reload();
  };

  const contextValue = useMemo(
    () => ({ verdict, setVerdict, token, setToken, logout }),
    [verdict, setVerdict, token, setToken]
  );

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}

export default Context;
