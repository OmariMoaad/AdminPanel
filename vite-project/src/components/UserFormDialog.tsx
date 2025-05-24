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
import { UsersService, type User } from "@/services/UsersService";
import { toast } from "sonner"; 

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
  const [formData, setFormData] = useState<Partial<User>>({
    name: "",
    email: "",
    role: "viewer",
    isActive: true,
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
    setErrorMessage(null);
  }, [initialData, open]);

  const handleChange = (field: keyof User | "password", value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setErrorMessage(null);
    setLoading(true);

    try {
      if (!formData.email) {
        setErrorMessage("Email is required");
        setLoading(false);
        return;
      }

      if (initialData?.id) {
        const updateData = { ...formData };
        if (!formData.password) {
          delete updateData.password;
        }
        await new UsersService().update(initialData.id, updateData);
        toast.success("Utilisateur mis à jour avec succès");
      } else {
        if (!formData.password) {
          setErrorMessage("Password is required");
          setLoading(false);
          return;
        }
        await UsersService.create(formData);
        toast.success("Nouvel utilisateur créé avec succès");
      }

      onSave();
      onClose();
    } catch (error) {
      console.error("Failed to submit form", error);
      setErrorMessage("Échec de l'enregistrement.");
      toast.error("Échec de l'enregistrement");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="space-y-4">
        <div>
          <Label>Name</Label>
          <Input
            value={formData.name || ""}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </div>
        <div>
          <Label>Email</Label>
          <Input
            type="email"
            value={formData.email || ""}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>
        <div>
          <Label>
            Password
            {initialData ? " (laisser vide pour ne pas changer)" : ""}
          </Label>
          <Input
            type="password"
            value={formData.password || ""}
            onChange={(e) => handleChange("password", e.target.value)}
            placeholder={
              initialData ? "Laissez vide pour ne pas modifier" : undefined
            }
          />
        </div>
        <div>
          <Label>Role</Label>
          <Select
            value={formData.role || "viewer"}
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
            checked={formData.isActive ?? true}
            onCheckedChange={(value) => handleChange("isActive", value)}
          />
        </div>
        <div className="flex justify-between items-center">
          {errorMessage && (
            <span className="text-sm text-red-600">{errorMessage}</span>
          )}
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
