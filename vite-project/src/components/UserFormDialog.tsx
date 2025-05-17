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

type User = {
  id?: number;
  name: string;
  email: string;
  role: "admin" | "viewer";
  isActive: boolean;
  password?: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (user: User) => void;
  initialData: User | null;
};

export default function UserFormDialog({
  open,
  onClose,
  onSave,
  initialData,
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
  }, [initialData]);

  const handleChange = (field: keyof User, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const dataToSubmit = { ...formData };
    if (initialData) {
      delete dataToSubmit.password;
    }
    onSave(dataToSubmit);
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
