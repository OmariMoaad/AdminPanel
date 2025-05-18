import type { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/App-sidebar";

type LayoutProps = {
  children: ReactNode;
  setView: (view: "users" | "applications" | "permissions") => void;
  onLogout?: () => void;
};

export default function Layout({ children, setView, onLogout }: LayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        {/* Sidebar section */}
        <aside className="w-64 flex flex-col border-r bg-muted">
          <AppSidebar setView={setView} onLogout={onLogout} />
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </SidebarProvider>
  );
}
