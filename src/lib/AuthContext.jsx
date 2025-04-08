/* eslint-disable react/prop-types */
// import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetLoggedInUser } from "./api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const {data}=useGetLoggedInUser()

  // Check localStorage for user on first load
  useEffect(() => {
    if (data) {
      setUser(data.user);
    }
  }, [data]);

  // Login function
  const login = (userData, token) => {
    localStorage.setItem("token", token);
    setUser(userData);
    navigate("/"); // Redirect after login
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/sign-in"); // Redirect to login page
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
