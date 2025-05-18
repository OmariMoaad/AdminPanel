import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { AppSidebar } from "@/components/App-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar"; // Assure-toi que ce chemin est correct

type LayoutProps = {
  children: ReactNode;
  setView: (view: "users" | "applications" | "permissions") => void;
  onLogout?: () => void;
};

export default function Layout({ children, setView, onLogout }: LayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        {/* Sidebar with logout */}
        <div className="flex flex-col w-64 border-r bg-muted">
          <div className="flex-1 overflow-y-auto">
            <AppSidebar setView={setView} />
          </div>
          {onLogout && (
            <div className="p-4">
              <Button
                variant="destructive"
                className="w-full"
                onClick={onLogout}
              >
                Logout
              </Button>
            </div>
          )}
        </div>

        {/* Main content */}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </SidebarProvider>
  );
}
