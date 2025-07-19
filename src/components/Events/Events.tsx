import type { EventType } from "@/types/event";
import { AddEventButton } from "./AddEventButton";
import { InitialBalanceInput } from "./BalanceInput";
import { EventCard } from "./EventCard";
import { groupEventByMonth } from "@/utils/Month";
import { createBalanceFunction } from "./Balance";

type Props = {
  events: EventType[];
  initialBalance: number;
  onChangeBalance: (val: number) => void;
};

const Events = ({ events, initialBalance, onChangeBalance }: Props) => {
  const grouped = groupEventByMonth(events);
  const balances = createBalanceFunction(events, initialBalance);
  console.log("Eventos recibidos:", events);
  console.log("Eventos agrupados:", grouped);

  return (
    <>
      <div className="flex flex-row m-[2rem] justify-between items-end">
        <InitialBalanceInput onCalculate={onChangeBalance} />
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
