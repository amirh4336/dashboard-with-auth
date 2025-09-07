"use client";

import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import React, { FC, useEffect } from "react";

type AuthLayoutProps = {
  children: React.ReactNode;
  redirectTo?: string;
};

const AuthLayout: FC<AuthLayoutProps> = ({ children, redirectTo = "/" }) => {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace(redirectTo);
    }
  }, [isLoading, isAuthenticated, router, redirectTo]);

  if (isLoading || isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthLayout;
