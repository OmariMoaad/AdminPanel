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

type Permission = {
  id?: number;
  userId: number;
  applicationId: number;
  role: "viewer" | "admin";
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (permission: Permission) => void;
  onDelete: (permissionId: number) => void;
  userId: number;
  existingPermissions: Permission[];
  apps: { id: number; name: string }[];
};

export default function PermissionFormDialog({
  open,
  onClose,
  onSave,
  onDelete,
  userId,
  existingPermissions,
  apps,
}: Props) {
  const [selectedRoles, setSelectedRoles] = useState<
    Record<number, "viewer" | "admin" | "remove" | "none">
  >({});

  useEffect(() => {
    const initial: Record<number, "viewer" | "admin" | "remove" | "none"> = {};
    apps.forEach((app) => {
      const existing = existingPermissions.find(
        (p) => p.applicationId === app.id
      );
      initial[app.id] = existing?.role || "none";
    });
    console.log("Initial roles:", initial); // Debug
    setSelectedRoles(initial);
  }, [apps, existingPermissions]);

  const handleSave = () => {
    for (const [appIdStr, role] of Object.entries(selectedRoles)) {
      const applicationId = parseInt(appIdStr);
      if (role === "remove") {
        const existing = existingPermissions.find(
          (p) => p.applicationId === applicationId
        );
        if (existing?.id) {
          onDelete(existing.id);
        }
      } else if (role === "viewer" || role === "admin") {
        onSave({
          userId,
          applicationId,
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
                value={selectedRoles[app.id] || "none"}
                onValueChange={(value) =>
                  setSelectedRoles((prev) => ({
                    ...prev,
                    [app.id]: value as "viewer" | "admin" | "remove" | "none",
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="remove">Remove</SelectItem>
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
