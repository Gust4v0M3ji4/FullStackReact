// src/routes/index.tsx
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { useUser } from "@/hooks/useUser";
import DataRepo from "@/api/datasource";

import User from "@/components/User/User";
import Events from "@/components/Events/Events";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const [initialBalance, setInitialBalance] = useState(100);

  // Traer el usuario (puedes dejarlo en el componente User si prefieres)
  const {
    user,
    isLoading: isLoadingUser,
    isError: isErrorUser,
    error: userError,
  } = useUser();

  // Traer los eventos
  const {
    isPending: isPendingEvents,
    error: eventsError,
    data: events,
  } = useQuery({
    queryKey: ["events"],
    queryFn: () => DataRepo.getEvents(),
    retry: 2,
    refetchOnWindowFocus: true,
  });

  if (isLoadingUser || isPendingEvents) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-violet-500 mb-4"></div>
        <p className="p-4 text-lg font-semibold text-gray-700 dark:text-gray-200  dark:bg-zinc-800 rounded shadow border border-gray-200 dark:border-zinc-700">
          Cargando datos...
        </p>
      </div>
    );
  }

  if (isErrorUser || eventsError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh]">
        
        <div className="p-4 text-lg font-semibold text-red-600  dark:bg-zinc-800 rounded shadow border border-red-200 dark:border-red-600">
          Error: {userError?.message || eventsError?.message}
        </div>
      </div>
    );
  }

  // Ya puedes pasar los datos como props si prefieres
  return (
    <main className=" px-6 bg-gray-100 dark:bg-gray-800">
      <User user={user!} />
      <Events
        events={events}
        initialBalance={initialBalance}
        onChangeBalance={setInitialBalance}
      />
    </main>
  );
}
