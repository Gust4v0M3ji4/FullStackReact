import type DataDS from "@/api/domain/ds/DataDS";
import type {
  CreateEventSchema,
  EventType,
  UpdateEventSchema,
} from "@/types/event";
import type { UserType } from "@/types/user";

class DataRepoImpl {
  constructor(private data: DataDS) {}

  async getEvents(): Promise<Array<EventType>> {
    return await this.data.getEvents();
  }

  async getEvent(id: string): Promise<EventType> {
    return await this.data.getEvent(id);
  }

  async saveEvent(event: CreateEventSchema): Promise<boolean> {
    return await this.data.saveEvent(event);
  }

  async updateEvent(event: UpdateEventSchema): Promise<boolean> {
    return await this.data.updateEvent(event);
  }

  async deleteEvent(id: string): Promise<boolean> {
    return await this.data.deleteEvent(id);
  }

  async UpdateUser(user: UpdateEventSchema): Promise<boolean> {
    return await this.data.UpdateUser(user);
  }

  async getUser(): Promise<UserType> {
    return await this.data.getUser();
  }
}

export default DataRepoImpl;
