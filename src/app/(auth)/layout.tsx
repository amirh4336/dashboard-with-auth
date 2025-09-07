"use client";

import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import React, { FC, useEffect } from "react";
import Loader from "../_components/loader";

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

  if (isLoading || isAuthenticated) return <Loader />;

  return <>{children}</>;
};

export default AuthLayout;
