import Header from "./Header";
import Footer from "./Footer";
import ScrollToSectionButton from "./ScrollToSectionButton";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-[16px] md:mx-[30px] w-auto">
        <div className="mx-auto w-full max-w-[1380px] pt-[110px] scroll-mt-[110px]">
          {children}
        </div>
      </main>
      <Footer />

      <div className="pointer-events-none fixed bottom-8 z-1000 w-full">
        <div className="mx-auto w-full max-w-[1380px] px-[16px] md:px-[30px]">
          <ScrollToSectionButton />
        </div>
      </div>
    </div>
  );
};

export default Layout;
