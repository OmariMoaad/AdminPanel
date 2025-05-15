import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (permission: {
    userId: number;
    appId: number;
    role: "viewer" | "admin";
  }) => void;
  userId: number;
  existingPermissions: {
    userId: number;
    appId: number;
    role: "viewer" | "admin";
  }[];
  apps: { id: number; name: string }[];
};

export default function PermissionFormDialog({
  open,
  onClose,
  onSave,
  userId,
  existingPermissions,
  apps,
}: Props) {
  const [selectedRoles, setSelectedRoles] = useState<
    Record<number, "viewer" | "admin" | "">
  >({});

  useEffect(() => {
    const initial: Record<number, "viewer" | "admin" | ""> = {};
    apps.forEach((app) => {
      const existing = existingPermissions.find((p) => p.appId === app.id);
      initial[app.id] = existing?.role || "";
    });
    setSelectedRoles(initial);
  }, [apps, existingPermissions]);

  const handleSave = () => {
    for (const [appIdStr, role] of Object.entries(selectedRoles)) {
      if (role) {
        onSave({
          userId,
          appId: parseInt(appIdStr),
          role,
        });
      }
    }
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manage Permissions</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {apps.map((app) => (
            <div key={app.id}>
              <Label>{app.name}</Label>
              <Select
                value={selectedRoles[app.id]}
                onValueChange={(value) =>
                  setSelectedRoles((prev) => ({
                    ...prev,
                    [app.id]: value as "viewer" | "admin",
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="viewer">Viewer</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
