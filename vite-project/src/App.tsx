import { useEffect, useState } from "react";
import Layout from "@/app/layout";
import UsersPage from "@/pages/UsersPage";
import ApplicationsPage from "@/pages/ApplicationsPage";
import PermissionsPage from "@/pages/PermissionsPage";
import LoginPage from "@/pages/LoginPage";

type View = "users" | "applications" | "permissions";

type User = {
  id: string;
  role: "admin" | "viewer";
};

function App() {
  const [view, setView] = useState<View>("users");
  const [user, setUser] = useState<User | null>(null);

  // Load user from token at startup
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const base64Payload = token.split(".")[1];
        const payload = JSON.parse(atob(base64Payload));
        setUser({ id: payload.sub, role: payload.role });
      } catch {
        localStorage.removeItem("token");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

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
    <Layout setView={setView} onLogout={handleLogout}>
      {renderView()}
    </Layout>
  );
}

export default App;
