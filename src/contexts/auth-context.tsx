"use client";
import { createContext, useContext } from "react";
import { AuthContextType } from "@/types/api/auth-context.type";

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
