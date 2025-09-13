import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="layout-container">
      <Header />
      <div className="layout-content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
