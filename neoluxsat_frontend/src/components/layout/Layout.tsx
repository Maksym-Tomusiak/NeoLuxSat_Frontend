import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="flex flex-col layout-container w-full max-w-[1380px] mx-auto pt-[110px] flex justify-center min-h-screen">
      <Header />
      <div className="w-full">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
