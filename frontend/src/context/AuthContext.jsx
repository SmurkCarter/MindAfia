import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Load token safely
  const [token, setToken] = useState(
    localStorage.getItem("access") ||
    sessionStorage.getItem("access")
  );

  // Load user safely
  const [user, setUser] = useState(() => {
    const storedUser =
      localStorage.getItem("user") ||
      sessionStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // LOGIN
  const login = (jwtToken, userData, remember = true) => {
    if (remember) {
      localStorage.setItem("access", jwtToken);
      localStorage.setItem("user", JSON.stringify(userData));
    } else {
      sessionStorage.setItem("access", jwtToken);
      sessionStorage.setItem("user", JSON.stringify(userData));
    }

    setToken(jwtToken);
    setUser(userData);
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("user");
    sessionStorage.removeItem("access");
    sessionStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = Boolean(token && user);
  const isClinician = user?.role === "clinician";
  const isPatient = user?.role === "patient";

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated,
        isClinician,
        isPatient,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};