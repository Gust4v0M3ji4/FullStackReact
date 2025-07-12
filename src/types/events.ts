
import {z} from 'zod'
 
const EventSchema = z.object({
    id: z.string().uuid(),
    name: z.string().max(50),
    description: z.string().max(100),
    amount: z.number().positive(),
    date: z.date(),
    type: z.enum(['Egreso','Ingreso'])

})
export type EventType = z.infer<typeof EventSchema>



export const CreateEventSchema = EventSchema.omit({
    id: true,

})
export type CreateEventSchema = z.infer<typeof CreateEventSchema>





export const UpdateEventSchema = EventSchema.partial().extend({
    id: z.string(),
})
export type UpdateEventSchema = z.infer<typeof UpdateEventSchema>
