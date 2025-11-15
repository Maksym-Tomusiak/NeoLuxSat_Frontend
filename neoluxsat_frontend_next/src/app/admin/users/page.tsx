import UsersTable from "@/components/pages/admin/Crud/Users/UsersTable";
import ProtectedRoute from "@/router/ProtectedRoute";

const roles = {
  admin: "Admin",
};
const usersAccess = [roles.admin];

export default function UsersPage() {
  return (
    <ProtectedRoute allowedRoles={usersAccess}>
      <UsersTable />
    </ProtectedRoute>
  );
}
