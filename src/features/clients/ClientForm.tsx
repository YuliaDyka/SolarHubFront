import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { type ClientPayload } from "./api";
import { type Client } from "./types";
import AutoResizeTextarea from "@/components/ui/AutoResizeTextarea";

interface ClientFormProps {
  initialData?: Client;
  onSubmit: (data: ClientPayload) => void;
  loading?: boolean;
}

export function ClientForm({
  initialData,
  onSubmit,
  loading,
}: ClientFormProps) {
  const [form, setForm] = useState<ClientPayload>({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: ""
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name,
        email: initialData.email || "",
        phone: initialData.phone || "",
        address: initialData.address || "",
        notes: initialData.notes || "",
      });
    }
  }, [initialData]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium">
          Name
        </label>
        <input
          name="name"
          required
          value={form.name}
          onChange={handleChange}
          className="w-full rounded-md border px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Email
        </label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className="w-full rounded-md border px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Phone
        </label>
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full rounded-md border px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Address
        </label>
        <input
          name="address"
          value={form.address}
          onChange={handleChange}
          className="w-full rounded-md border px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Notes
        </label>
        <AutoResizeTextarea
          minRows={3}
          maxRows={5}
          name="notes"
          value={form.notes}
          onChange={handleChange}
        />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button
          type="submit"
          disabled={loading}
        >
          {initialData ? "Save changes" : "Create client"}
        </Button>
      </div>
    </form>
  );
}
