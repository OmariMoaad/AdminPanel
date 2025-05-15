import { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PermissionFormDialog from "@/components/PermissionFormDialog";

// Dummy data
const users = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
];

const apps = [
  { id: 1, name: "MonApp" },
  { id: 2, name: "FinanceApp" },
];

type Permission = {
  userId: number;
  appId: number;
  role: "viewer" | "admin";
};

export default function PermissionsPage() {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);

  const handleOpenDialog = (userId: number) => {
    setSelectedUser(userId);
    setDialogOpen(true);
  };

  const handleSavePermission = (newPermission: Permission) => {
    setPermissions((prev) => {
      const exists = prev.find(
        (p) =>
          p.userId === newPermission.userId && p.appId === newPermission.appId
      );
      if (exists) {
        return prev.map((p) =>
          p.userId === newPermission.userId && p.appId === newPermission.appId
            ? newPermission
            : p
        );
      } else {
        return [...prev, newPermission];
      }
    });
    setDialogOpen(false);
  };

  return (
    <Card className="p-4">
      <h2 className="text-xl font-semibold mb-4">Permissions</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            {apps.map((app) => (
              <TableHead key={app.id}>{app.name}</TableHead>
            ))}
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              {apps.map((app) => {
                const perm = permissions.find(
                  (p) => p.userId === user.id && p.appId === app.id
                );
                return <TableCell key={app.id}>{perm?.role || "-"}</TableCell>;
              })}
              <TableCell>
                <Button size="sm" onClick={() => handleOpenDialog(user.id)}>
                  Manage
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedUser !== null && (
        <PermissionFormDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onSave={handleSavePermission}
          userId={selectedUser}
          existingPermissions={permissions.filter(
            (p) => p.userId === selectedUser
          )}
          apps={apps}
        />
      )}
    </Card>
  );
}
