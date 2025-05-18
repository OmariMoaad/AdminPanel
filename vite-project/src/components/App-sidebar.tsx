import { Users, AppWindow, Shield, LogOut } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";

import { Button } from "./ui/button";

type View = "users" | "applications" | "permissions";

const items: { title: string; icon: any; view: View }[] = [
  {
    title: "Users",
    icon: Users,
    view: "users",
  },
  {
    title: "Applications",
    icon: AppWindow,
    view: "applications",
  },
  {
    title: "Permissions",
    icon: Shield,
    view: "permissions",
  },
];

export function AppSidebar({
  setView,
  onLogout,
}: {
  setView: (view: View) => void;
  onLogout?: () => void;
}) {
  return (
    <Sidebar>
      <div className="flex flex-col h-full">
        <SidebarContent className="flex-1">
          <SidebarGroup>
            <SidebarGroupLabel>Admin Console</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton onClick={() => setView(item.view)}>
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {onLogout && (
          <div className="p-4 border-t">
            <Button
              variant="destructive"
              className="w-full flex items-center justify-start"
              onClick={onLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        )}
      </div>
    </Sidebar>
  );
}
