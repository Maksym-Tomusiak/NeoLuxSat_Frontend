import PropositionsTable from "@/components/pages/admin/Crud/Propositions/PropositionsTable";
import ProtectedRoute from "@/router/ProtectedRoute";

const roles = {
  admin: "Admin",
  headManager: "HeadManager",
};
const staticContentAccess = [roles.admin, roles.headManager];

export default function PropositionsPage() {
  return (
    <ProtectedRoute allowedRoles={staticContentAccess}>
      <PropositionsTable />
    </ProtectedRoute>
  );
}
