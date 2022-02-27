import { createContext, useContext, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getSession, authenticate, logout } from "./authService";

export const AuthContext = createContext({ logged: false });

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => getSession());

  const signIn = async (email, password) => {
    await authenticate(email, password).then(() => setIsLoggedIn(true));
  };

  const signOut = () => {
    logout();
    setIsLoggedIn(null);
  };

  const value = { isLoggedIn, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const RequireAuth = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (!isLoggedIn)
    return <Navigate to="/login" state={{ from: location }} replace />;

  return children;
};
