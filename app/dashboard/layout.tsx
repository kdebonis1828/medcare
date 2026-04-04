import { NavbarDesktop } from "@/components/layout/NavbarDesktop";
import { NavbarMobile } from "@/components/layout/NavbarMobile";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col lg:flex-row">
      <NavbarDesktop />
      <NavbarMobile />

      {/* 
        Main content wrapper.
        On mobile, we leave padding at the bottom so content isn't hidden under the nav.
        On desktop, we leave margin at the left to clear the sidebar.
      */}
      <main className="flex-1 flex flex-col min-h-screen pb-16 lg:pb-0 lg:ml-64 relative">
        {children}
      </main>
    </div>
  );
}
