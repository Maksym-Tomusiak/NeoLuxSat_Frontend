import FeedbacksTable from "@/components/pages/admin/Crud/Feedbacks/FeedbacksTable";
import ProtectedRoute from "@/router/ProtectedRoute";

const roles = {
  admin: "Admin",
  headManager: "HeadManager",
};
const staticContentAccess = [roles.admin, roles.headManager];

export default function FeedbacksPage() {
  return (
    <ProtectedRoute allowedRoles={staticContentAccess}>
      <FeedbacksTable />
    </ProtectedRoute>
  );
}
