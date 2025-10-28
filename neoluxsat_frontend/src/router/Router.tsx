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

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="support" element={<SupportPage />} />
          <Route path="services/internet" element={<InternetPage />} />
          <Route path="services/iot" element={<IoTPage />} />
          <Route path="services/tv" element={<TVPage />} />
          <Route path="services/security" element={<SecurityPage />} />
        </Route>

        {/* Admin layout (protected) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['Admin', 'Editor']}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={
              <ProtectedRoute allowedRoles={['Admin', 'Editor']}>
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="feedbacks"
            element={
              <ProtectedRoute allowedRoles={['Admin', 'Editor']}>
                <FeedbacksTable />
              </ProtectedRoute>
            }
          />
          <Route
            path="users"
            element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <UsersTable />
              </ProtectedRoute>
            }
          />
          <Route
            path="faqs"
            element={
              <ProtectedRoute allowedRoles={['Admin', 'Editor']}>
                <FaqsTable />
              </ProtectedRoute>
            }
          />
          <Route
            path="applications"
            element={
              <ProtectedRoute allowedRoles={['Admin', 'Editor']}>
                <ApplicationsTable />
              </ProtectedRoute>
            }
          />
          <Route
            path="network"
            element={
              <ProtectedRoute allowedRoles={['Admin', 'Editor']}>
                <NetworkProblemsTable />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
