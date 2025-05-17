type LayoutProps = {
  children: React.ReactNode;
  setView: (view: "users" | "applications" | "permissions") => void;
  onLogout?: () => void;
};

export default function Layout({ children, setView, onLogout }: LayoutProps) {
  return (
    <div>
      <header className="p-4 bg-gray-100 flex justify-between">
        <nav className="space-x-4">
          <button onClick={() => setView("users")}>Users</button>
          <button onClick={() => setView("applications")}>Applications</button>
          <button onClick={() => setView("permissions")}>Permissions</button>
        </nav>
        {onLogout && (
          <button onClick={onLogout} className="text-red-500">
            Logout
          </button>
        )}
      </header>
      <main>{children}</main>
    </div>
  );
}
