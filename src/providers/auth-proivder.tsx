"use client";
import AuthContext from "@/contexts/auth-context";
import React, { useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/types/api/user.type";
import { AuthContextType } from "@/types/api/auth-context.type";

type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Initialize auth state from localStorage
  useEffect(() => {
    const initAuth = () => {
      try {
        const savedUser = localStorage.getItem("userData");
        if (savedUser) {
          const parsedUser: User | null = JSON.parse(savedUser);
          if (parsedUser && parsedUser?.email && parsedUser?.name) {
            setUser(parsedUser);
          } else {
            // Invalid user data, clear storage
            localStorage.removeItem("userData");
          }
        }
      } catch (error) {
        console.error("Error loading user data:", error);
        localStorage.removeItem("userData");
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("userData", JSON.stringify(userData));
    router.push("/");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("userData");
    router.push("/login");
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
