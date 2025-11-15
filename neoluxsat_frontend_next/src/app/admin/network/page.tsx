import NetworkProblemsTable from "@/components/pages/admin/Crud/NetworkProblems/NetworkProblemsTable";
import ProtectedRoute from "@/router/ProtectedRoute";

const roles = {
  admin: "Admin",
  headManager: "HeadManager",
};
const staticContentAccess = [roles.admin, roles.headManager];

export default function NetworkProblemsPage() {
  return (
    <ProtectedRoute allowedRoles={staticContentAccess}>
      <NetworkProblemsTable />
    </ProtectedRoute>
  );
}
