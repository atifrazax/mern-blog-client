import { createContext, useEffect, useState } from "react";
import getUser from "../utils/getUser";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    getUser(setUser);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
 export {AuthProvider, AuthContext};