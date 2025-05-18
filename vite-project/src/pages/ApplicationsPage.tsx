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
import { Input } from "@/components/ui/input";
import AppFormDialog from "@/components/AppFormDialog";

type App = {
  id: number;
  name: string;
  description: string;
};

type Props = {
  userRole: "admin" | "viewer";
};

export default function ApplicationsPage({ userRole }: Props) {
  const [apps, setApps] = useState<App[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingApp, setEditingApp] = useState<App | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const isViewer = userRole === "viewer";

  const fetchApps = async () => {
    const res = await fetch("http://localhost:3000/application");
    const data = await res.json();
    setApps(data);
  };

  useEffect(() => {
    fetchApps();
  }, []);

  const handleSave = async (app: Partial<App>) => {
    const isEdit = !!editingApp;

    const res = await fetch(
      isEdit
        ? `http://localhost:3000/application/${editingApp?.id}`
        : "http://localhost:3000/application",
      {
        method: isEdit ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: app.name,
          description: app.description,
        }),
      }
    );

    if (!res.ok) {
      console.error("Failed to save application");
      return;
    }

    const updatedApp = await res.json();

    setApps((prev) => {
      if (isEdit) {
        return prev.map((a) => (a.id === updatedApp.id ? updatedApp : a));
      } else {
        return [...prev, updatedApp];
      }
    });

    setDialogOpen(false);
    setEditingApp(null);
  };

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:3000/application/${id}`, {
      method: "DELETE",
    });
    setApps((prev) => prev.filter((a) => a.id !== id));
  };

  const openCreate = () => {
    setEditingApp(null);
    setDialogOpen(true);
  };

  const openEdit = (app: App) => {
    setEditingApp(app);
    setDialogOpen(true);
  };

  const filteredApps = apps.filter((app) =>
    (app.name + app.description)
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="p-4">
      <div className="flex justify-between mb-4 items-center">
        <h2 className="text-xl font-semibold">Applications</h2>
        <Button onClick={openCreate} disabled={isViewer}>
          Add Application
        </Button>
      </div>

      <div className="mb-4">
        <Input
          placeholder="Filter by name or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredApps.map((app) => (
            <TableRow key={app.id}>
              <TableCell>{app.name}</TableCell>
              <TableCell>{app.description}</TableCell>
              <TableCell>
                <Button
                  size="sm"
                  variant="outline"
                  className="mr-2"
                  onClick={() => openEdit(app)}
                  disabled={isViewer}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(app.id)}
                  disabled={isViewer}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AppFormDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setEditingApp(null);
        }}
        onSave={handleSave}
        initialData={editingApp}
      />
    </Card>
  );
}
