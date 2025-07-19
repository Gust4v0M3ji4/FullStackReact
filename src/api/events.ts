import type { EventType } from "@/types/event";

const data: Array<EventType> = [
  {
    id: "evt-1",
    name: "Sueldo mensual",
    description: "Pago del salario por trabajo remoto",
    amount: 1500,
    date: new Date("2025-07-01"),
    type: "Ingreso",
    category: "Trabajo",
  },
  {
    id: "evt-2",
    name: "Renta del departamento",
    description: "Pago mensual de alquiler",
    amount: 500,
    date: new Date("2025-07-05"),
    type: "Egreso",
    category: "Vivienda",
  },
  {
    id: "evt-3",
    name: "Compra de supermercado",
    description: "Gastos del hogar",
    amount: 200,
    date: new Date("2025-06-20"),
    type: "Egreso",
    category: "Alimentación",
  },
  {
    id: "evt-4",
    name: "Venta de bicicleta",
    description: "Ingreso extra por venta de objeto",
    amount: 300,
    date: new Date("2025-06-10"),
    type: "Ingreso",
    category: "Ventas",
  },
  {
    id: "evt-5",
    name: "Factura de internet",
    description: "Pago mensual del servicio",
    amount: 40,
    date: new Date("2025-07-02"),
    type: "Egreso",
    category: "Servicios",
  },
];

export const getEvents = (): Array<EventType> => {
  return data;
};

export const getEvent = (id: string): EventType => {
  const event = data.find((e) => e.id === id);
  if (!event) {
    throw new Error("Event not found");
  }
  return event;
};
