// src/components/RoleSwitcher.tsx
import { useState } from "react";

export function RoleSwitcher() {
  const [isAdmin, setIsAdmin] = useState(true);

  const toggleRole = () => {
    setIsAdmin((prev) => !prev);
  };

  return (
    <div>
      <button onClick={toggleRole}>
        {isAdmin ? "Switch to Viewer" : "Switch to Admin"}
      </button>
    </div>
  );
}
