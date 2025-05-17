// src/pages/ManageUserPage.tsx

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ManageUserProps = {
  user?: {
    id?: number;
    name: string;
    email: string;
    role: "admin" | "viewer";
    isActive: boolean;
    password?: string;
  };
  onSave: (user: {
    id?: number;
    name: string;
    email: string;
    role: "admin" | "viewer";
    isActive: boolean;
    password?: string;
  }) => void;
  onCancel: () => void;
};

export default function ManageUserPage({
  user,
  onSave,
  onCancel,
}: ManageUserProps) {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [role, setRole] = useState<"admin" | "viewer">(user?.role || "admin");
  const [isActive, setIsActive] = useState(user?.isActive ?? true);
  const [password, setPassword] = useState(user?.password || "");

  const handleSubmit = () => {
    const payload = { name, email, role, isActive, password };
    if (user?.id) {
      onSave({ ...payload, id: user.id });
    } else {
      onSave(payload);
    }
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

        {!user && (
          <>
            <Label>Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </>
        )}

        <Label>Role</Label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as "admin" | "viewer")}
          className="w-full border rounded p-2"
        >
          <option value="admin">Admin</option>
          <option value="viewer">Viewer</option>
        </select>

        <Label>Status</Label>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
          <span>{isActive ? "Active" : "Inactive"}</span>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>
          {user ? "Save Changes" : "Create User"}
        </Button>
      </div>
    </div>
  );
}
