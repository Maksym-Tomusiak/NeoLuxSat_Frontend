import ApplicationsTable from "@/components/pages/admin/Crud/Applications/ApplicationsTable";
import ProtectedRoute from "@/router/ProtectedRoute";

const roles = {
  admin: "Admin",
  headManager: "HeadManager",
  manager: "Manager",
  master: "Master",
};
const applicationsAccess = [
  roles.admin,
  roles.headManager,
  roles.manager,
  roles.master,
];

export default function ApplicationsPage() {
  return (
    <ProtectedRoute allowedRoles={applicationsAccess}>
      <ApplicationsTable />
    </ProtectedRoute>
  );
}
