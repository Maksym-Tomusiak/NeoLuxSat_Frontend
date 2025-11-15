import AdminHeader from "./AdminHeader";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <AdminHeader />
      <main className="mx-[16px] md:mx-[30px] w-auto">
        <div className="mx-auto w-full max-w-[1380px] pt-[110px]">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
