import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

  // Load token safely
  const [token, setToken] = useState(
    localStorage.getItem("token") || sessionStorage.getItem("token")

  );

  // Load user safely
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // LOGIN
   const login = (jwtToken, userData, remember = true) => {
  if (remember) {
    localStorage.setItem("token", jwtToken);
    localStorage.setItem("user", JSON.stringify(userData));
  } else {
    sessionStorage.setItem("token", jwtToken);
    sessionStorage.setItem("user", JSON.stringify(userData));
  }

  setToken(jwtToken);
  setUser(userData);
};


  // LOGOUT
  const logout = () => {
  localStorage.clear();
  sessionStorage.clear();
  setToken(null);
  setUser(null);
};


  // More accurate authentication check
  const isAuthenticated = Boolean(token && user);

  // Optional role helpers (no logic change, just convenience)
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
