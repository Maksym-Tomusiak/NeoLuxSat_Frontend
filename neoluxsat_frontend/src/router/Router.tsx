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

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="support" element={<SupportPage />} />
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
          <Route index element={<AdminPage />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
