import ApplicationsTable from "@/components/pages/admin/Crud/Applications/ApplicationsTable";
import ProtectedRoute from "@/router/ProtectedRoute";

const roles = {
  admin: "Admin",
  headManager: "HeadManager",
};
const applicationsAccess = [roles.admin, roles.headManager];

export default function ApplicationsPage() {
  return (
    <ProtectedRoute allowedRoles={applicationsAccess}>
      <ApplicationsTable />
    </ProtectedRoute>
  );
}
