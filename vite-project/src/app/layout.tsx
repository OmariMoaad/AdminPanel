// src/app/layout.tsx
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/App-sidebar";

export default function Layout({
  children,
  setView,
}: {
  children: React.ReactNode;
  setView: (view: "users" | "applications" | "permissions") => void;
}) {
  return (
    <SidebarProvider>
      <div className="flex">
        <AppSidebar setView={setView} />
        <main className="flex-1 p-4">{children}</main>
      </div>
    </SidebarProvider>
  );
}
