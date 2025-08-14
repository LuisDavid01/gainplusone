import MainFooter from "~/components/MainFooter";

export default  function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      
      <main className="flex-1">{children}</main>
      <MainFooter/>
    </div>
  );
}
