import React, { useState } from "react";

const Context = React.createContext({});

export function VerdictsContextProvider({ children }) {
  const [verdict, setVerdict] = useState(null);
  return (
    <Context.Provider value={{ verdict, setVerdict }}>
      {children}
    </Context.Provider>
  );
}

export default Context;
