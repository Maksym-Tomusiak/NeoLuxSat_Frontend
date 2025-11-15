// src/app/admin/layout.tsx
"use client"; // <-- Mark as client since layout is interactive

import AdminLayout from "@/components/layout/admin/AdminLayout";
import ProtectedRoute from "@/router/ProtectedRoute";

// Define roles once, just like your old Router.tsx
const roles = {
  admin: "Admin",
  headManager: "HeadManager",
  manager: "Manager",
  master: "Master",
};
const allAdminAccess = [
  roles.admin,
  roles.headManager,
  roles.manager,
  roles.master,
];

export default function AdminAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={allAdminAccess}>
      <AdminLayout>{children}</AdminLayout>
    </ProtectedRoute>
  );
}
