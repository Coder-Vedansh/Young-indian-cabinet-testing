"use client";

import React from "react";
import { useAuth } from "@/providers/AuthProvider";
import { Role, hasPermission } from "@/constants/roles";
import { useRouter } from "next/navigation";

interface RoleGuardProps {
  children: React.ReactNode;
  requiredRole?: Role;
  fallbackRoute?: string;
}

export function RoleGuard({ 
  children, 
  requiredRole = Role.MEMBER,
  fallbackRoute = "/auth/login"
}: RoleGuardProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!isLoading && !user) {
      router.push(fallbackRoute);
    }
  }, [user, isLoading, router, fallbackRoute]);

  if (isLoading) {
    return <div className="h-screen w-full flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  if (!hasPermission(user.role, requiredRole)) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center gap-4 bg-muted/20">
        <h2 className="text-2xl font-bold">Access Denied</h2>
        <p className="text-muted-foreground">You do not have permission to view this module.</p>
        <button onClick={() => router.push("/dashboard")} className="text-primary hover:underline">
          Return to Dashboard
        </button>
      </div>
    );
  }

  return <>{children}</>;
}
