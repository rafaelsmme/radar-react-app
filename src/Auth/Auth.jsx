import { createContext, useContext, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { signIn as signInService } from "./authService";

export const AuthContext = createContext({ logged: false });

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const signIn = (password, callback) => {
    console.log("password", password);
    const logged = signInService(password);
    console.log("logged", logged);
    setLoggedIn(logged);
    callback();
  };

  const signOut = (callback) => {
    setLoggedIn(false);
    callback();
  };

  const value = { loggedIn, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const RequireAuth = ({ children }) => {
  let auth = useAuth();
  let location = useLocation();

  console.log("auth.loggedIn", auth.loggedIn);
  if (!auth.loggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
