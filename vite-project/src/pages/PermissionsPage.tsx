import { useState, useEffect } from "react";
import axios from "axios";
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

type User = {
  id: number;
  name: string;
  email: string;
};

type Application = {
  id: number;
  name: string;
};

type Permission = {
  id: number;
  userId: number;
  applicationId: number;
  role: "viewer" | "admin";
};

const API_BASE_URL = "http://localhost:3000";

export default function PermissionsPage() {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [apps, setApps] = useState<Application[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch users, apps, and permissions on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [usersResponse, appsResponse, permissionsResponse] =
          await Promise.all([
            axios.get(`${API_BASE_URL}/user`),
            axios.get(`${API_BASE_URL}/application`),
            axios.get(`${API_BASE_URL}/permission`),
          ]);
        console.log("Fetched users:", usersResponse.data); // Debug
        console.log("Fetched apps:", appsResponse.data); // Debug
        console.log("Fetched permissions:", permissionsResponse.data); // Debug
        if (
          !Array.isArray(usersResponse.data) ||
          !Array.isArray(appsResponse.data) ||
          !Array.isArray(permissionsResponse.data)
        ) {
          throw new Error("Invalid data format from server");
        }
        setUsers(usersResponse.data);
        setApps(appsResponse.data);
        setPermissions(permissionsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleOpenDialog = (userId: number) => {
    console.log("Opening dialog for user ID:", userId); // Debug
    setSelectedUser(userId);
    setDialogOpen(true);
  };

  const handleSavePermission = async (
    newPermission: Omit<Permission, "id">
  ) => {
    try {
      console.log("Saving permission:", newPermission); // Debug
      const existingPerm = permissions.find(
        (p) =>
          p.userId === newPermission.userId &&
          p.applicationId === newPermission.applicationId
      );

      if (existingPerm) {
        // Update existing permission
        const response = await axios.patch(
          `${API_BASE_URL}/permission/${existingPerm.id}`,
          newPermission
        );
        setPermissions((prev) =>
          prev.map((p) => (p.id === existingPerm.id ? response.data : p))
        );
      } else {
        // Create new permission
        const response = await axios.post(
          `${API_BASE_URL}/permission`,
          newPermission
        );
        setPermissions((prev) => [...prev, response.data]);
      }
      setDialogOpen(false);
    } catch (error) {
      console.error("Error saving permission:", error);
      setError("Failed to save permission");
    }
  };

  const handleDeletePermission = async (permissionId: number) => {
    try {
      console.log("Deleting permission ID:", permissionId); // Debug
      await axios.delete(`${API_BASE_URL}/permission/${permissionId}`);
      setPermissions((prev) => prev.filter((p) => p.id !== permissionId));
    } catch (error) {
      console.error("Error deleting permission:", error);
      setError("Failed to delete permission");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

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
          onDelete={handleDeletePermission}
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
