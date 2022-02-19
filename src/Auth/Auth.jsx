import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signin = (newUser, callback) => {
    return authService.signin(() => {
      setUser(newUser);
      callback();
    });
  };

  const signout = call;
};
