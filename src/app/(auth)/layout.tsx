"use client";

import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import React, { FC, useEffect } from "react";

type AuthLayoutProps = {
  children: React.ReactNode;
  redirectTo?: string;
};

const AuthLayout: FC<AuthLayoutProps> = ({ children, redirectTo = "/" }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace(redirectTo);
    }
  }, [isLoading, isAuthenticated, router, redirectTo]);

  return <>{children}</>;
};

export default AuthLayout;
