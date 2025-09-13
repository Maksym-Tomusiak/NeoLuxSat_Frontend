import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminPage from '@/components/pages/admin/AdminPage';
import HomePage from '@/components/pages/home/HomePage';
import Layout from '@/components/layout/Layout';
import NotFoundPage from '@/components/common/NotFoundPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
