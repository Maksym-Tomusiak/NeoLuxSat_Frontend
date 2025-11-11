import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminPage from '@/components/pages/admin/AdminPage';
import HomePage from '@/components/pages/home/HomePage';
import Layout from '@/components/layout/common/Layout';
import NotFoundPage from '@/components/common/NotFoundPage';
import AboutPage from '@/components/pages/about/AboutPage';
import SupportPage from '@/components/pages/support/SupportPage';
import ProtectedRoute from './ProtectedRoute';
import AdminLayout from '@/components/layout/admin/AdminLayout';
import LoginPage from '@/components/pages/auth/LoginPage';
import FeedbacksTable from '@/components/pages/admin/Crud/Feedbacks/FeedbacksTable';
import UsersTable from '@/components/pages/admin/Crud/Users/UsersTable';
import FaqsTable from '@/components/pages/admin/Crud/Faqs/FaqsTable';
import ApplicationsTable from '@/components/pages/admin/Crud/Applications/ApplicationsTable';
import NetworkProblemsTable from '@/components/pages/admin/Crud/NetworkProblems/NetworkProblemsTable';
import InternetPage from '@/components/pages/services/Internet/InternetPage';
import IoTPage from '@/components/pages/services/IoT/IoTPage';
import TVPage from '@/components/pages/services/TV/TVPage';
import SecurityPage from '@/components/pages/services/Security/SecurityPage';
import PropositionsTable from '@/components/pages/admin/Crud/Propositions/PropositionsTable';
import HeaderOnlyLayout from '@/components/layout/common/HeaderOnlyLayout';
import RepairFormPage from '@/components/pages/admin/Crud/Repairs/RepairFormPage';
import RepairsTable from '@/components/pages/admin/Crud/Repairs/RepairsTable';

const Router = () => {
  // 💡 Визначимо ролі тут, додавши 'Master'
  const roles = {
    admin: 'Admin',
    headManager: 'HeadManager',
    manager: 'Manager',
    master: 'Master', // Додано нову роль
  };

  // 💡 Оновлені масиви доступу
  const allAdminAccess = [
    roles.admin,
    roles.headManager,
    roles.manager,
    roles.master, // Додано
  ];
  const staticContentAccess = [roles.admin, roles.headManager]; // Без змін
  const usersAccess = [roles.admin]; // Без змін

  const applicationsAccess = [roles.admin, roles.headManager];
  const repairsAccess = [
    roles.admin,
    roles.headManager,
    roles.manager,
    roles.master, // Додано
  ];

  return (
    <BrowserRouter>
      <Routes>
        {/* Public layout (Header, Content, Footer) */}
        <Route path="/" element={<Layout />}>
          {/* ... (public routes are unchanged) ... */}
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="support" element={<SupportPage />} />
          <Route path="services/internet" element={<InternetPage />} />
          <Route path="services/iot" element={<IoTPage />} />
          <Route path="services/tv" element={<TVPage />} />
          <Route path="services/security" element={<SecurityPage />} />
        </Route>

        {/* Admin layout (Admin Header, Content) */}
        <Route
          path="/admin"
          element={
            // Дозволяємо всім 4 ролям доступ до адмін-панелі
            <ProtectedRoute allowedRoles={allAdminAccess}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={
              // Дозволяємо всім 4 ролям доступ до дашборду
              <ProtectedRoute allowedRoles={allAdminAccess}>
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="feedbacks"
            element={
              <ProtectedRoute allowedRoles={staticContentAccess}>
                <FeedbacksTable />
              </ProtectedRoute>
            }
          />
          <Route
            path="users"
            element={
              <ProtectedRoute allowedRoles={usersAccess}>
                <UsersTable />
              </ProtectedRoute>
            }
          />
          <Route
            path="faqs"
            element={
              <ProtectedRoute allowedRoles={staticContentAccess}>
                <FaqsTable />
              </ProtectedRoute>
            }
          />
          <Route
            path="applications"
            element={
              // Дозволяємо всім 4 ролям доступ до заявок
              <ProtectedRoute allowedRoles={applicationsAccess}>
                <ApplicationsTable />
              </ProtectedRoute>
            }
          />
          <Route
            path="network"
            element={
              <ProtectedRoute allowedRoles={staticContentAccess}>
                <NetworkProblemsTable />
              </ProtectedRoute>
            }
          />
          <Route
            path="propositions"
            element={
              <ProtectedRoute allowedRoles={staticContentAccess}>
                <PropositionsTable />
              </ProtectedRoute>
            }
          />

          {/* --- Repair routes (Updated) --- */}
          {/* Дозволяємо всім 4 ролям доступ до ремонтів */}
          <Route
            path="repairs"
            element={
              <ProtectedRoute allowedRoles={repairsAccess}>
                <RepairsTable />
              </ProtectedRoute>
            }
          />
          <Route
            path="repairs/new"
            element={
              <ProtectedRoute allowedRoles={repairsAccess}>
                <RepairFormPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="repairs/edit/:id"
            element={
              <ProtectedRoute allowedRoles={repairsAccess}>
                <RepairFormPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="repairs/details/:id"
            element={
              <ProtectedRoute allowedRoles={repairsAccess}>
                <RepairFormPage />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Standalone pages (No layout) */}
        <Route path="/login" element={<LoginPage />} />

        {/* Public 404 layout (Header Only) */}
        <Route path="*" element={<HeaderOnlyLayout />}>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
