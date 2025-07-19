import type DataDS from "@/api/domain/ds/DataDS";
import { getEvents } from "@/api/events";
import type {
  CreateEventSchema,
  EventType,
  UpdateEventSchema,
} from "@/types/event";
import type { UserType } from "@/types/user";

const EVENTS_KEY = "events";
const USER_KEY = "user";

const seedEvents = () => {
  const raw = localStorage.getItem(EVENTS_KEY);
  try {
    const events = raw ? JSON.parse(raw) : null;

    if (!Array.isArray(events) || events.length === 0) {
      localStorage.setItem(EVENTS_KEY, JSON.stringify(getEvents()));
    }
  } catch (error) {
    console.warn("Error leyendo eventos, sembrando por seguridad.");
    localStorage.setItem(EVENTS_KEY, JSON.stringify(getEvents()));
  }
};

const sleep = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

class LocalStorageDS implements DataDS {
  async getEvents() {
    try {
      await sleep();
      const eventsRaw = localStorage.getItem(EVENTS_KEY) ?? "[]";
      const events = JSON.parse(eventsRaw).map(
        (e: { date: string | number | Date }) => ({
          ...e,
          date: new Date(e.date),
        })
      ) as Array<EventType>;
      return events;
    } catch (error) {
      console.error(error);
      throw new Error("Error Loading Events");
    }
  }
  async getEvent(id: string): Promise<EventType> {
    try {
      await sleep();
      const eventsRaw = localStorage.getItem(EVENTS_KEY) ?? "[]";
      const events = JSON.parse(eventsRaw) as Array<EventType>;
      const found = events.find((e) => e.id === id);
      if (!found) throw new Error("Event Not Found");
      return { ...found, date: new Date(found.date) };
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching event");
    }
  }

  async saveEvent(event: CreateEventSchema): Promise<boolean> {
    try {
      await sleep();
      const eventsRaw = localStorage.getItem(EVENTS_KEY) ?? "[]";
      const events = JSON.parse(eventsRaw) as Array<EventType>;

      const newEvent: EventType = {
        ...event,
        id: crypto.randomUUID(),
        type: "Egreso",
      };

      events.push(newEvent);
      localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
      return true;
    } catch (error) {
      console.error(error);
      throw new Error("Error saving event");
    }
  }

  async updateEvent(event: UpdateEventSchema): Promise<boolean> {
    try {
      await sleep();
      const eventsRaw = localStorage.getItem(EVENTS_KEY) ?? "[]";
      const events = JSON.parse(eventsRaw) as Array<EventType>;
      const eventIndex = events.findIndex((e) => e.id === event.id);
      if (eventIndex === -1) {
        throw new Error("Event Not Found");
      }

      events[eventIndex] = {
        ...events[eventIndex],
        ...event,
      };

      localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
      return true;
    } catch (error) {
      console.error(error);
      throw new Error("Error Updating Event");
    }
  }

  async deleteEvent(id: string): Promise<boolean> {
    try {
      const eventsRaw = localStorage.getItem(EVENTS_KEY) ?? "[]";
      const events = JSON.parse(eventsRaw) as Array<EventType>;
      const eventIndex = events.findIndex((e) => e.id === id);
      if (eventIndex === -1) {
        throw new Error("Event Not Found");
      }
      events.splice(eventIndex, 1);
      localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
      return true;
    } catch (error) {
      console.error(error);
      throw new Error("Error deleting event");
    }
  }

  async getUser(): Promise<UserType> {
    try {
      await sleep();
      const usersRaw = localStorage.getItem(USER_KEY);
      if (!usersRaw) throw new Error("User not found");
      return JSON.parse(usersRaw) as UserType;
    } catch (error) {
      console.error(error);
      throw new Error("Error Loading User");
    }
  }

  async UpdateUser(user: UpdateEventSchema): Promise<boolean> {
    try {
      await sleep();

      localStorage.setItem(USER_KEY, JSON.stringify(user));
      return true;
    } catch (error) {
      console.error(error);
      throw new Error("Error Updating User");
    }
  }
}
seedEvents();

export default LocalStorageDS;
