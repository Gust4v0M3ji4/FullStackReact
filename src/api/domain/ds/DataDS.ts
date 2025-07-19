import type {
  CreateEventSchema,
  EventType,
  UpdateEventSchema,
} from "@/types/event";
import type { UserType } from "@/types/user";

abstract class DataDS {
  abstract getEvents(): Promise<Array<EventType>>;
  abstract getEvent(id: string): Promise<EventType>;
  abstract saveEvent(event: CreateEventSchema): Promise<boolean>;
  abstract updateEvent(event: UpdateEventSchema): Promise<boolean>;
  abstract deleteEvent(id: string): Promise<boolean>;

  abstract getUser(): Promise<UserType>;
  abstract UpdateUser(user: UpdateEventSchema): Promise<boolean>;
}
export default DataDS;
