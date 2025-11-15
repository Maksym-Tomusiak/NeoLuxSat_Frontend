"use client"; // <-- 1. This component must be a client component

import React, { useEffect } from "react";
// 2. Import hooks from 'next/navigation'
import { useRouter, usePathname } from "next/navigation";
import { Ban } from "lucide-react";
import { useUser } from "@/contexts/userContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const { role, isLoading } = useUser();
  // 3. Use the Next.js router hooks
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading) {
      if (!role) {
        // 4. Use 'pathname' and 'router.replace'
        const returnUrl = encodeURIComponent(pathname);
        // Use replace() to avoid a redirect loop in browser history
        router.replace(`/login?returnUrl=${returnUrl}`);
      }
    }
    // 5. Update dependencies
  }, [isLoading, role, router, pathname]);

  if (isLoading) {
    return null; // Or a loader
  }

  // 6. Check if the role is allowed
  if (!allowedRoles.includes(role!)) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[80vh] gap-[16px]">
        <Ban className="w-[64px] h-[64px] text-iconsRed" />
        <div className="flex flex-col gap-[12px] justify-center items-center">
          <h1 className="font-manrope text-[24px]/[120%] font-semibold text-primaryBlue">
            Access Denied
          </h1>
          <p className="font-noto text-[16px]/[120%] tracking-[-0.32px] text-primaryBlue/80">
            You do not have permission to view this page.
          </p>
        </div>
        <button
          className="bg-primaryOrange border-primaryOrange text-primaryWhite hover:text-primaryBlue border border-[2px] rounded-[10px] py-[14px] px-[20px] h-[40px] flex items-center text-[18px]/[120%] align-middle max-h-fit hover:bg-transparent transition duration-300 ease-in-out cursor-pointer font-noto font-semibold "
          // 7. Use router.push() for the button click
          onClick={() => router.push("/admin")}
        >
          Go to Main Page
        </button>
      </div>
    );
  }

  // 8. If everything is fine, render the children
  return <>{children}</>;
};

export default ProtectedRoute;
