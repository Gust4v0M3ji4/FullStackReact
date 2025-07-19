import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { categoryOptions, type EventType } from "@/types/event";
import DataRepo from "@/api/datasource";
import { Input } from "@/components/form/Input";
import { Select } from "@/components/form/Select";

export const Route = createFileRoute("/form/$id")({
  component: EventFormRoute,
});

function EventFormRoute() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  const mode = id === "new" ? "create" : "update";

  const { data } = useQuery({
    enabled: mode === "update",
    queryKey: ["event", id],
    queryFn: () => DataRepo.getEvent(id),
  });

  const { mutate, isPending } = useMutation<boolean, Error, EventType>({
    mutationFn: (values) => {
      if (mode === "create") {
        return DataRepo.saveEvent(values); // sin id
      }
      return DataRepo.updateEvent({ ...values, id });
    },
    onSettled: (_, error) => {
      if (error) {
        alert(`Error al guardar: ${error.message}`);
      } else {
        alert(
          mode === "create"
            ? "Evento creado exitosamente"
            : "Evento actualizado exitosamente"
        );
        navigate({ to: "/" });
      }
    },
  });

  const [form, setForm] = useState<Omit<EventType, "id">>({
    name: "",
    description: "",
    amount: 0,
    date: new Date(),
    type: "Ingreso",
    category: "Otro",
    image: undefined,
  });

  useEffect(() => {
    if (data) {
      setForm({
        name: data.name,
        description: data.description,
        amount: data.amount,
        date: new Date(data.date),
        type: data.type,
        category: data.category,
        image: data.image,
      });
    }
  }, [data]);

  function handleChange(
    key: keyof typeof form,
    value: string | number | boolean | Date
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      handleChange("image", base64);
    };
    reader.readAsDataURL(file);
  };

  function submitForm() {
    if (mode === "create") {
      mutate({
        ...form,
        id: crypto.randomUUID(), // lo generamos aquí para cumplir con EventType
      });
    } else {
      mutate({
        ...(form as EventType), // forzamos que tenga id
        id: id, // viene de la URL
      });
    }
  }

  return (
    <div className="p-8 m-8 min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-black dark:text-white">
      <form
        className="w-full max-w-2xl p-6  rounded-xl shadow-xl space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          submitForm();
        }}
      >
        <h1 className="text-3xl font-bold text-center text-violet-600">
          {mode === "create" ? "Nuevo Evento" : "Editar Evento"}
        </h1>

        <Input
          type="text"
          label="Nombre"
          placeholder="Nombre del evento"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          required
        />

        <Input
          type="text"
          label="Descripción"
          placeholder="Describe el evento"
          value={form.description}
          onChange={(e) => handleChange("description", e.target.value)}
          required
        />

        <Input
          type="number"
          label="Monto"
          value={form.amount}
          onChange={(e) => handleChange("amount", parseFloat(e.target.value))}
          required
        />

        <Input
          type="date"
          label="Fecha"
          value={form.date.toISOString().split("T")[0]}
          onChange={(e) => handleChange("date", new Date(e.target.value))}
          required
        />

        <Select
          label="Tipo"
          value={form.type}
          options={[
            { value: "Ingreso", label: "Ingreso" },
            { value: "Egreso", label: "Egreso" },
          ]}
          onChange={(e) => handleChange("type", e.target.value)}
          required
        />

        <Select
          label="Categoría"
          value={form.category}
          options={categoryOptions.map((c) => ({ value: c, label: c }))}
          onChange={(e) => handleChange("category", e.target.value)}
          required
        />

        {/* Subir Imagen con botón estilizado */}
        <div className="flex flex-col gap-2">
          <label className="font-medium text-gray-700">Imagen</label>
          <input
            id="upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
          <button
            type="button"
            onClick={() => document.getElementById("upload")?.click()}
            className="ml-4 py-[0.5rem] px-[1rem] bg-violet-500 text-white rounded-md shadow-lg hover:bg-violet-600 transition duration-200 w-fit"
          >
            {form.image ? "Cambiar Imagen" : "Subir Imagen"}
          </button>
        </div>

        {form.image && (
          <img
            src={form.image}
            alt="preview"
            className="w-32 h-32 object-cover rounded border mx-auto"
          />
        )}

        <button
          type="submit"
          className="w-full ml-4 py-[0.5rem] px-[1rem] bg-violet-500 text-white rounded-md shadow-lg hover:bg-violet-600 transition duration-200"
        >
          {isPending
            ? "Guardando..."
            : mode === "create"
              ? "Crear Evento"
              : "Actualizar Evento"}
        </button>
      </form>
    </div>
  );
}
