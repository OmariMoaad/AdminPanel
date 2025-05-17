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
import AppFormDialog from "@/components/AppFormDialog";

type App = {
  id: number;
  name: string;
  description: string;
};

export default function ApplicationsPage() {
  const [apps, setApps] = useState<App[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingApp, setEditingApp] = useState<App | null>(null);

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

  return (
    <Card className="p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Applications</h2>
        <Button onClick={openCreate}>Add Application</Button>
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
          {apps.map((app) => (
            <TableRow key={app.id}>
              <TableCell>{app.name}</TableCell>
              <TableCell>{app.description}</TableCell>
              <TableCell>
                <Button
                  size="sm"
                  variant="outline"
                  className="mr-2"
                  onClick={() => openEdit(app)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(app.id)}
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
