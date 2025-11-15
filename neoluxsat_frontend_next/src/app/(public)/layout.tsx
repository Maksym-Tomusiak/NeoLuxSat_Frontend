import Layout from "@/components/layout/common/Layout";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout>{children}</Layout>;
}
