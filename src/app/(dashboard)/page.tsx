"use client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import Image from "next/image";

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-50">
      <div className="rounded-2xl border bg-white p-6 shadow text-center">
        <Image
          src={user?.picture ?? ""}
          alt={user?.name ?? "User Avatar"}
          width={96}
          height={96}
          className="mx-auto mb-4 h-24 w-24 rounded-full shadow object-cover"
        />
        <h1 className="mb-2 text-2xl font-bold">👋 Welcome, {user?.name}!</h1>
        <p className="mb-6 text-gray-500">{user?.email}</p>

        <Button onClick={logout} variant="destructive">
          Logout
        </Button>
      </div>
    </div>
  );
}
