import FaqsTable from "@/components/pages/admin/Crud/Faqs/FaqsTable";
import ProtectedRoute from "@/router/ProtectedRoute";

const roles = {
  admin: "Admin",
  headManager: "HeadManager",
};
const staticContentAccess = [roles.admin, roles.headManager];

export default function FaqsPage() {
  return (
    <ProtectedRoute allowedRoles={staticContentAccess}>
      <FaqsTable />
    </ProtectedRoute>
  );
}
