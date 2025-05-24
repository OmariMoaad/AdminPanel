import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { AppService } from "@/services/AppService";

type App = {
  id: number;
  name: string;
  description: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  initialData?: App | null;
  onRefetch: () => void;
};

export default function AppFormDialog({
  open,
  onClose,
  initialData,
  onRefetch,
}: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.description);
    } else {
      setName("");
      setDescription("");
    }
  }, [initialData, open]);

  const handleSubmit = async () => {
    if (!name.trim() || !description.trim()) return;

    setLoading(true);
    try {
      if (initialData) {
        await AppService.update(initialData.id, {
          name: name.trim(),
          description: description.trim(),
        });
      } else {
        await AppService.create({
          name: name.trim(),
          description: description.trim(),
        });
      }
      onRefetch();
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Application" : "Add Application"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />
          </div>
          <div>
            <Label>Description</Label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={loading}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading || !name.trim() || !description.trim()}
          >
            {initialData ? "Update" : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
