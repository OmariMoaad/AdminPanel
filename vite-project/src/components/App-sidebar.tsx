import { Users, AppWindow, Shield } from "lucide-react";

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

export function AppSidebar({ setView }: { setView: (view: View) => void }) {
  return (
    <Sidebar>
      <SidebarContent>
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
    </Sidebar>
  );
}
