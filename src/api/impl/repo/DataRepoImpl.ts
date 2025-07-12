import type DataDS from "@/api/domain/ds/DataDS";
import type { EventType } from "@/types/events";



class DataRepoImpl {
    constructor(private data: DataDS) {}

    async getEvents() : Promise<Array<EventType>> {
        return await this.data.getEvents()
    }


}