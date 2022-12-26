import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState("");
  const [page, setPage] = useState("home");

  return (
    <AuthContext.Provider value={{ auth, setAuth, page, setPage }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
