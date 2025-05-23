import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { UsersService } from "@/services/UsersService";
import type { User } from "@/pages/UsersPage";

type Props = {
  open: boolean;
  onClose: () => void;
  initialData: User | null;
  onSave: () => void;
};

export default function UserFormDialog({
  open,
  onClose,
  initialData,
  onSave,
}: Props) {
  const [formData, setFormData] = useState<User>({
    name: "",
    email: "",
    role: "viewer",
    isActive: true,
    password: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({ ...initialData, password: "" });
    } else {
      setFormData({
        name: "",
        email: "",
        role: "viewer",
        isActive: true,
        password: "",
      });
    }
  }, [initialData, open]);

  const handleChange = (field: keyof User, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (initialData?.id) {
        const { password, ...dataToUpdate } = formData;
        await new UsersService().update(initialData.id, dataToUpdate);
      } else {
        await UsersService.create(formData);
      }
      onSave();
      onClose();
    } catch (error) {
      console.error("Failed to submit form", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="space-y-4">
        <div>
          <Label>Name</Label>
          <Input
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </div>
        <div>
          <Label>Email</Label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>
        {!initialData && (
          <div>
            <Label>Password</Label>
            <Input
              type="password"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
            />
          </div>
        )}
        <div>
          <Label>Role</Label>
          <Select
            value={formData.role}
            onValueChange={(value) => handleChange("role", value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="viewer">Viewer</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Label>Status</Label>
          <Switch
            checked={formData.isActive}
            onCheckedChange={(value) => handleChange("isActive", value)}
          />
        </div>
        <div className="flex justify-end">
          <Button onClick={handleSubmit}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
