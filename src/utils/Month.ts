import type { EventType } from "@/types/event";
import dayjs from "dayjs";

export type GroupedMonth = {
  month: string;
  key: string;
  events: EventType[];
};

export function groupEventByMonth(events: EventType[]): GroupedMonth[] {
  const grouped = events.reduce(
    (acc, event) => {
      const key = dayjs(event.date).format("YYYY-MM");
      const month = dayjs(event.date).format("MMMM YYYY");

      if (!acc[key]) {
        acc[key] = { key, month, events: [] };
      }

      acc[key].events.push(event);
      return acc;
    },
    {} as Record<string, GroupedMonth>
  );

  return Object.values(grouped).sort((a, b) => a.key.localeCompare(b.key));
}
