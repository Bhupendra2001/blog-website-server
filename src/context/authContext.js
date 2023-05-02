import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContexProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user") || null)
  );

  const login = async (inputs) => {
    const res = await axios.post("https://blog-website-server-henna.vercel.app/api/auth/login", inputs);
    setCurrentUser(res.data);
  };

  const logout = async (nevigate) => {
    await axios.post("https://blog-website-server-henna.vercel.app/api/auth/logout");
    setCurrentUser(null);
    nevigate('/login')
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
