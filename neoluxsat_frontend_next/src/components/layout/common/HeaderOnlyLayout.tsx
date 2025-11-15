import Header from "./Header";

const HeaderOnlyLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-[16px] md:mx-[30px] w-auto">
        <div className="mx-auto w-full max-w-[1380px] pt-[110px]">
          {children}
        </div>
      </main>
    </div>
  );
};

export default HeaderOnlyLayout;
