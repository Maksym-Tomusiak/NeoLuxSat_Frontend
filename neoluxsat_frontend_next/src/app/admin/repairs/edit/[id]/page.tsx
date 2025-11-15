import RepairFormPage from "@/components/pages/admin/Crud/Repairs/RepairFormPage";
import ProtectedRoute from "@/router/ProtectedRoute";

const roles = {
  admin: "Admin",
  headManager: "HeadManager",
  manager: "Manager",
  master: "Master",
};
const repairsAccess = [
  roles.admin,
  roles.headManager,
  roles.manager,
  roles.master,
];

export default function EditRepairPage() {
  return (
    <ProtectedRoute allowedRoles={repairsAccess}>
      <RepairFormPage />
    </ProtectedRoute>
  );
}
