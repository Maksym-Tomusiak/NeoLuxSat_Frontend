import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ScrollToSectionButton from './ScrollToSectionButton';

const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-[16px] md:mx-[30px] w-auto">
        <div className="mx-auto w-full max-w-[1380px] pt-[110px] scroll-mt-[110px]">
          <Outlet />
        </div>
      </main>
      <Footer />

      {/* --- NEW, SIMPLER WRAPPER --- */}
      {/* This wrapper is fixed 8 units (32px) from the bottom.
        It spans the full width and is invisible to mouse clicks.
      */}
      <div className="pointer-events-none fixed bottom-8 z-50 w-full">
        {/* This inner div matches your <main> element's layout
          (max-width, centered, and padding).
        */}
        <div className="mx-auto w-full max-w-[1380px] px-[16px] md:px-[30px]">
          {/* The button is now placed inside this layout-aware container */}
          <ScrollToSectionButton />
        </div>
      </div>
    </div>
  );
};

export default Layout;
