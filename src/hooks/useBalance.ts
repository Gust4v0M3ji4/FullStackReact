import { useState, useMemo } from "react";
import { groupEventByMonth } from "@/utils/Month";
import type { EventType } from "@/types/event";

export type Summary = {
  income: number;
  expense: number;
  monthly: number;
  global: number;
};

export function useBalance(events: EventType[]) {
  const [initialBalance, setInitialBalance] = useState<number>(100);

  const grouped = useMemo(() => groupEventByMonth(events), [events]);

  const summaries = useMemo(() => {
    let global = initialBalance;
    const map: Record<string, Summary> = {};

    for (const group of grouped) {
      const income = group.events
        .filter((e) => e.type === "Ingreso")
        .reduce((sum, e) => sum + e.amount, 0);

      const expense = group.events
        .filter((e) => e.type === "Egreso")
        .reduce((sum, e) => sum + e.amount, 0);

      const monthly = income - expense;
      global += monthly;

      map[group.key] = { income, expense, monthly, global };
    }

    return map;
  }, [grouped, initialBalance]);

  return {
    initialBalance,
    setInitialBalance,
    summaries,
    grouped,
  };
}
