// src/pages/ManageUserPage.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Example: Using a basic form for adding a user.
export default function ManageUserPage({ user }: { user?: any }) {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [role, setRole] = useState(user?.role || "admin");
  const [isActive, setIsActive] = useState(user?.isActive || true);

  const handleSave = () => {
    // Save or update logic
    console.log("User saved:", { name, email, role, isActive });
    // Call an API or update state for real data
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">
        {user ? "Edit User" : "Create New User"}
      </h1>
      <div className="space-y-2">
        <Label>Name</Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} />

        <Label>Email</Label>
        <Input value={email} onChange={(e) => setEmail(e.target.value)} />

        <Label>Role</Label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border rounded p-2"
        >
          <option value="admin">Admin</option>
          <option value="viewer">Viewer</option>
        </select>

        <Label>Status</Label>
        <input
          type="checkbox"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
        />
        <span>{isActive ? "Active" : "Inactive"}</span>
      </div>
      <div className="flex justify-end">
        <Button onClick={handleSave}>
          {user ? "Save Changes" : "Create User"}
        </Button>
      </div>
    </div>
  );
}
