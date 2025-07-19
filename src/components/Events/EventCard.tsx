import type { EventType } from "@/types/event";
import { EventList } from "./EventsList";
import type { ReactNode } from "react";

type Props = {
  month: string;
  events: EventType[];
  balance: () => ReactNode;
};

export const EventCard = ({ month, events, balance }: Props) => {
 

  return (
    <article className="p-[1rem] flex w-[22rem]">
      <div className="rounded-md shadow-lg gap-y-[0.5rem] flex flex-col justify-between border border-gray-100 dark:border-zinc-700 bg-white dark:bg-zinc-800 w-full">
        <div className="flex flex-col gap-y-[1rem]">
          <section className="flex px-[1rem] py-[0.5rem] ">
            <p className="text-lg font-semibold capitalize text-gray-800 dark:text-gray-200">
              <a>{month}</a>
            </p>
          </section>
        </div>

        <div className="border-b border-gray-200 w-full h-[1px] mb-0 dark:border-zinc-500"></div>

        <div className="gap-y-[1rem]">
          <section className="px-[0.5rem] max-h-[250px] overflow-y-auto">
            {events.map((event, i) => (
              <div key={event.id}>
                <EventList data={event} />
                {i !== events.length - 1 && (
                  <div className="border-b border-gray-200 w-full h-[1px] my-[0.5rem] dark:border-zinc-500"></div>
                )}
              </div>
            ))}
          </section>
        </div>

        <footer className="flex flex-col gap-y-[0.1rem] mt-auto">
          <div className="border-b border-gray-200 w-full h-[1px] mb-0 dark:border-zinc-500"></div>
          <div className="px-[1rem] pb-[1rem] pt-[1rem]">{balance()}</div>
        </footer>
      </div>
    </article>
  );
};
