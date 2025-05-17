// src/pages/UsersPage.tsx
import { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import UserFormDialog from "@/components/UserFormDialog";

type User = {
  id?: number;
  name: string;
  email: string;
  role: "admin" | "viewer";
  isActive: boolean;
  createdAt?: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:3000/user");
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSave = async (user: User) => {
    const isEditing = Boolean(user.id);
    const method = isEditing ? "PUT" : "POST";
    const url = isEditing
      ? `http://localhost:3000/user/${user.id}`
      : "http://localhost:3000/user";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const updatedUser = await res.json();

    setUsers((prev) => {
      if (isEditing) {
        return prev.map((u) => (u.id === updatedUser.id ? updatedUser : u));
      } else {
        return [...prev, updatedUser];
      }
    });

    setDialogOpen(false);
  };

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:3000/user/${id}`, {
      method: "DELETE",
    });
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const openCreate = () => {
    setEditingUser(null);
    setDialogOpen(true);
  };

  const openEdit = (user: User) => {
    setEditingUser(user);
    setDialogOpen(true);
  };

  return (
    <Card className="p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Users</h2>
        <Button onClick={openCreate}>Add User</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.isActive ? "Active" : "Inactive"}</TableCell>
              <TableCell>
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "-"}
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openEdit(user)}
                  className="mr-2"
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(user.id!)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <UserFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSave}
        initialData={editingUser}
      />
    </Card>
  );
}
