import RepairsTable from "@/components/pages/admin/Crud/Repairs/RepairsTable";
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

export default function RepairsPage() {
  return (
    <ProtectedRoute allowedRoles={repairsAccess}>
      <RepairsTable />
    </ProtectedRoute>
  );
}
