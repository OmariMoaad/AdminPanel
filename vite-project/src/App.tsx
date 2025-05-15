import { useState } from "react";
import Layout from "@/app/layout";
import UsersPage from "@/pages/UsersPage";
import ApplicationsPage from "@/pages/ApplicationsPage";
import PermissionsPage from "@/pages/PermissionsPage";

type View = "users" | "applications" | "permissions";

function App() {
  const [view, setView] = useState<View>("users");

  const renderView = () => {
    switch (view) {
      case "users":
        return <UsersPage />;
      case "applications":
        return <ApplicationsPage />;
      case "permissions":
        return <PermissionsPage />;
      default:
        return null;
    }
  };

  return <Layout setView={setView}>{renderView()}</Layout>;
}

export default App;
