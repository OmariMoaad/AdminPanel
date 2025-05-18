import { useState } from "react";
import Layout from "@/app/layout";
import UsersPage from "@/pages/UsersPage";
import ApplicationsPage from "@/pages/ApplicationsPage";
import PermissionsPage from "@/pages/PermissionsPage";
import LoginPage from "@/pages/LoginPage";

type View = "users" | "applications" | "permissions";

type User = {
  id: number;
  name: string;
  email: string;
  role: "admin" | "viewer";
};

function App() {
  const [view, setView] = useState<View>("users");
  const [user, setUser] = useState<User | null>(null);

  const renderView = () => {
    switch (view) {
      case "users":
        return <UsersPage userRole={user?.role ?? "viewer"} />;
      case "applications":
        return <ApplicationsPage userRole={user?.role ?? "viewer"} />;
      case "permissions":
        return <PermissionsPage userRole={user?.role ?? "viewer"} />;
      default:
        return null;
    }
  };

  if (!user) {
    return <LoginPage onLoginSuccess={setUser} />;
  }
  return (
    <Layout setView={setView} onLogout={() => setUser(null)}>
      {renderView()}
    </Layout>
  );

}

export default App;
