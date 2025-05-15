import { useState } from "react";
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

const mockApps: App[] = [
  {
    id: 1,
    name: "MonApp",
    description: "Application interne RH",
  },
];

export default function ApplicationsPage() {
  const [apps, setApps] = useState<App[]>(mockApps);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingApp, setEditingApp] = useState<App | null>(null);

  const handleSave = (app: App) => {
    setApps((prev) => {
      const exists = prev.some((a) => a.id === app.id);
      if (exists) {
        return prev.map((a) => (a.id === app.id ? app : a));
      } else {
        return [...prev, app];
      }
    });
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
                  onClick={() => setApps(apps.filter((a) => a.id !== app.id))}
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
        onClose={() => setDialogOpen(false)}
        onSave={handleSave}
        initialData={editingApp}
      />
    </Card>
  );
}
