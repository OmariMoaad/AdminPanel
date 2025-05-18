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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import AppFormDialog from "@/components/AppFormDialog";

type App = {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
};

type Props = {
  userRole: "admin" | "viewer";
};

export default function ApplicationsPage({ userRole }: Props) {
  const [apps, setApps] = useState<App[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingApp, setEditingApp] = useState<App | null>(null);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [status, setStatus] = useState("all");

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
          isActive: app.isActive ?? true,
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

  const filteredApps = apps
    .filter((app) => {
      const keyword = search.toLowerCase();
      const matchesSearch =
        app.name.toLowerCase().includes(keyword) ||
        app.description.toLowerCase().includes(keyword);

      const matchesStatus =
        status === "all"
          ? true
          : status === "active"
          ? app.isActive
          : !app.isActive;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sort === "name-asc") return a.name.localeCompare(b.name);
      if (sort === "name-desc") return b.name.localeCompare(a.name);
      return 0;
    });

  return (
    <Card className="p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Applications</h2>
        <Button onClick={openCreate} disabled={isViewer}>
          Add Application
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Input
          placeholder="Search by name or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger>
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="name-asc">Name ↑</SelectItem>
            <SelectItem value="name-desc">Name ↓</SelectItem>
          </SelectContent>
        </Select>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredApps.map((app) => (
            <TableRow key={app.id}>
              <TableCell>{app.name}</TableCell>
              <TableCell>{app.description}</TableCell>
              <TableCell>{app.isActive ? "Active" : "Inactive"}</TableCell>
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
