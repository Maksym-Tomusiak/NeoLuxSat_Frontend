import { Outlet } from 'react-router-dom';
import Header from './Header';

const HeaderOnlyLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-[16px] md:mx-[30px] w-auto">
        <div className="mx-auto w-full max-w-[1380px] pt-[110px]">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default HeaderOnlyLayout;
