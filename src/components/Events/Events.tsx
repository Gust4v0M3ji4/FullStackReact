import type { EventType } from "@/types/event";
import { useState } from "react";
import { AddEventButton } from "./AddEventButton";
import { InitialBalanceInput } from "./BalanceInput";
import { EventCard } from "./EventCard";
import { groupEventByMonth } from "@/utils/Month";
import { createBalanceFunction } from "./Balance";
import { Select } from "@/components/form/Select";

type Props = {
  events: EventType[];
  initialBalance: number;
  onChangeBalance: (val: number) => void;
};

const Events = ({ events, initialBalance, onChangeBalance }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // Obtén todas las categorías únicas
  const categories = Array.from(new Set(events.map(e => e.category)));

  // Filtra los eventos por categoría si hay una seleccionada
  const filteredEvents = selectedCategory
    ? events.filter(e => e.category === selectedCategory)
    : events;

  const grouped = groupEventByMonth(filteredEvents);
  const balances = createBalanceFunction(filteredEvents, initialBalance);
  console.log("Eventos recibidos:", events);
  console.log("Eventos agrupados:", grouped);

  return (
    <>
      <div className="flex flex-row m-[2rem] items-end justify-between">
        <div className="flex flex-row gap-4 items-end">
          <InitialBalanceInput onCalculate={onChangeBalance} />
          <div className="w-60">
            <Select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              options={[
                { value: "", label: "Todas las categorías" },
                ...categories.map(cat => ({ value: cat, label: cat })),
              ]}
              className="bg-white dark:bg-zinc-800 dark:text-white border border-gray-300 dark:border-zinc-700"
              label="Filtrar por categoría"
            />
          </div>
        </div>
        <AddEventButton />
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {grouped.map((group) => (
          <EventCard
            key={group.key}
            month={group.month}
            events={group.events}
            balance={() => balances[group.key]}
          />
        ))}
      </div>
    </>
  );
};

export default Events;
