import { useState, useEffect } from "react";
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
import { PermissionService } from "@/services/PermissionService";
import { AppService } from "@/services/AppService";
import { UsersService, type User } from "@/services/UsersService";

type Application = { id: number; name: string };
type Permission = {
  id: number;
  userId: number;
  applicationId: number;
  role: "viewer" | "admin";
};

type Props = {
  userRole: "admin" | "viewer";
};

export default function PermissionsPage({ userRole }: Props) {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [apps, setApps] = useState<Application[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [usersData, appsData, permissionsData] = await Promise.all([
        UsersService.findAll(),
        AppService.getAll(),
        PermissionService.list(),
      ]);
      setUsers(usersData);
      setApps(appsData);
      setPermissions(permissionsData);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenDialog = (userId: number) => {
    setSelectedUser(userId);
    setDialogOpen(true);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

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
                  (p) => p.userId === user.id && p.applicationId === app.id
                );
                return <TableCell key={app.id}>{perm?.role || "-"}</TableCell>;
              })}
              <TableCell>
                <Button
                  size="sm"
                  onClick={() => handleOpenDialog(user.id)}
                  disabled={userRole === "viewer"}
                >
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
          onClose={() => {
            setDialogOpen(false);
            fetchData();
          }}
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
