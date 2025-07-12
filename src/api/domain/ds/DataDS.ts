import type { CreateEventSchema, EventType, UpdateEventSchema } from "@/types/events";

abstract class DataDS {
    abstract getEvents() : Promise<Array<EventType>>
    abstract getEventById(id: string): Promise <EventType>
    abstract saveEvent(event: CreateEventSchema): Promise<boolean>
    abstract updateEvent(event: UpdateEventSchema): Promise<boolean>
    abstract deleteEvent(id: string): Promise<boolean>
}
export default DataDS