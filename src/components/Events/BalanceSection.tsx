import { useState } from "react";
import { InitialBalanceInput } from "./BalanceInput";
import { createBalanceFunction } from "./Balance";
import { getEvents } from "@/api/events";
import { groupEventByMonth } from "@/utils/Month";
import { EventCard } from "./EventCard";

const events = getEvents();

export const BalanceSection = () => {
  const [initial, setInitial] = useState(100);

  const grouped = groupEventByMonth(events);
  const balanceMap = createBalanceFunction(events, initial);

  return (
    <div className="space-y-6">
      <InitialBalanceInput onCalculate={setInitial} />

      <div className="flex flex-wrap gap-6 justify-center">
        {grouped.map((group) => (
          <EventCard
            key={group.key}
            month={group.month}
            events={group.events}
            balance={() => balanceMap[group.month]} // o balance(group.month)
          />
        ))}
      </div>
    </div>
  );
};
