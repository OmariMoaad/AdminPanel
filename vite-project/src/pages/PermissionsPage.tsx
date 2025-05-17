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

type User = {
  id: number;
  name: string;
  email: string;
  role: "admin" | "viewer";
  isActive: boolean;
};

const API_BASE_URL = "http://localhost:3000"; // Adjust based on your backend URL

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]); // Initialize as empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch users on mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/user`);
        // Validate response data
        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          console.error("Expected an array, got:", response.data);
          setError("Invalid data format from server");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Placeholder for user actions (e.g., edit, delete)
  const handleEditUser = (userId: number) => {
    console.log(`Edit user with ID: ${userId}`);
    // Implement edit logic (e.g., open a dialog)
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      await axios.delete(`${API_BASE_URL}/user/${userId}`);
      setUsers((prev) => prev.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
      setError("Failed to delete user");
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
      <h2 className="text-xl font-semibold mb-4">Users</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
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
                <Button
                  size="sm"
                  className="mr-2"
                  onClick={() => handleEditUser(user.id)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
