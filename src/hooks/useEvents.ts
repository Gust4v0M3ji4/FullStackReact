// src/hooks/useEvents.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import DataRepo from "@/api/datasource";
import type { CreateEventSchema } from "@/types/event";

export function useEvents() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["events"],
    queryFn: () => DataRepo.getEvents(),
    refetchOnWindowFocus: true,
    retry: 2,
  });

  // Listo para usar después cuando tengas el form de creación
  const mutation = useMutation({
    mutationFn: (newEvent: CreateEventSchema) => DataRepo.saveEvent(newEvent), // ⬅️ cambiar aquí
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });

  return {
    ...query,
    addEvent: mutation.mutate, // <- Lo puedes usar en el formulario luego
  };
}
