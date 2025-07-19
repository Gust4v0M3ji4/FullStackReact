import { useState } from "react";
import type { EventFormInput } from "@/types/event";

interface EventFormProps {
  defaultValues: Partial<EventFormInput>;
  onSubmit: (data: EventFormInput) => void;
  mode: "create" | "update";
}

export function EventForm({ defaultValues, onSubmit, mode }: EventFormProps) {
  const [formData, setFormData] = useState<EventFormInput>({
    name: defaultValues.name || "",
    description: defaultValues.description || "",
    amount: defaultValues.amount || 0,
    date: defaultValues.date ? new Date(defaultValues.date) : new Date(),
    type: defaultValues.type || "Ingreso",
    category: defaultValues.category || "Otro",
    image: defaultValues.image || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        placeholder="Nombre"
      />
      <input
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
        placeholder="Descripción"
      />
      <input
        name="amount"
        type="number"
        value={formData.amount}
        onChange={handleChange}
        required
        placeholder="Monto"
      />
      <input
        name="date"
        type="date"
        value={formData.date.toISOString().split("T")[0]}
        onChange={(e) =>
          setFormData({ ...formData, date: new Date(e.target.value) })
        }
        required
      />
      <select name="type" value={formData.type} onChange={handleChange}>
        <option value="Ingreso">Ingreso</option>
        <option value="Egreso">Egreso</option>
      </select>
      <select name="category" value={formData.category} onChange={handleChange}>
        <option value="Trabajo">Trabajo</option>
        <option value="Vivienda">Vivienda</option>
        <option value="Alimentación">Alimentación</option>
        <option value="Servicios">Servicios</option>
        <option value="Transporte">Transporte</option>
        <option value="Educación">Educación</option>
        <option value="Ocio">Ocio</option>
        <option value="Salud">Salud</option>
        <option value="Ventas">Ventas</option>
        <option value="Otro">Otro</option>
      </select>
      <input
        name="image"
        value={formData.image}
        onChange={handleChange}
        placeholder="URL de Imagen (opcional)"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        {mode === "create" ? "Crear" : "Actualizar"}
      </button>
    </form>
  );
}
