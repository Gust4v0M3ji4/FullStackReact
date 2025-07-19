import type { EventType } from "@/types/event";
import { groupEventByMonth } from "@/utils/Month";

let cachedBalances: Record<string, React.ReactNode> = {};

export function createBalanceFunction(events: EventType[], initial: number) {
  const grouped = groupEventByMonth(events);
  let currentGlobal = initial;

  const newBalances: Record<string, React.ReactNode> = {};

  for (const group of grouped) {
    const ingresos = group.events.filter((e) => e.type === "Ingreso");
    const egresos = group.events.filter((e) => e.type === "Egreso");

    const income = ingresos.reduce((sum, e) => sum + e.amount, 0);
    const expense = egresos.reduce((sum, e) => sum + e.amount, 0);
    const monthly = income - expense;

    currentGlobal += monthly;

    newBalances[group.key] = (
      <div>
        <div className="flex text-sm flex-row justify-between">
          <p className="capitalize font-semibold text-gray-700 dark:text-gray-200">
            Income
          </p>
          <p className="text-gray-700 dark:text-gray-200">${income}</p>
        </div>
        <div className="flex text-sm flex-row justify-between">
          <p className="capitalize font-semibold text-gray-700 dark:text-gray-200">
            Expense
          </p>
          <p className="text-gray-700 dark:text-gray-200">${expense}</p>
        </div>
        <div className="flex text-sm flex-row justify-between">
          <p className="capitalize font-semibold text-gray-700 dark:text-gray-200">
            Monthly
          </p>
          <p className="text-gray-700 dark:text-gray-200">${monthly}</p>
        </div>
        <div className="flex text-sm flex-row justify-between">
          <p className="capitalize font-semibold text-gray-700 dark:text-gray-200">
            Global
          </p>
          <p className="text-gray-700 dark:text-gray-200">${currentGlobal}</p>
        </div>
      </div>
    );
  }

  cachedBalances = newBalances;
  return cachedBalances;
}
