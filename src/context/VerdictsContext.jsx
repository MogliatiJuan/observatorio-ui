import React, { useMemo, useState } from "react";

const Context = React.createContext({});

export function VerdictsContextProvider({ children }) {
  const [verdict, setVerdict] = useState(null);

  const contextValue = useMemo(
    () => ({ verdict, setVerdict }),
    [verdict, setVerdict]
  );

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}

export default Context;
