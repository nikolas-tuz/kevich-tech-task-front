import { z } from 'zod';
import { AvailableStatusesEnum } from '@/utils/enums/available-statuses.enum';

export const trainScheduleSchema = z.object({
  trainNumber: z.number().positive(),
  departureStation: z.string(),
  arrivalStation: z.string(),
  departureTime: z.string(),
  arrivalTime: z.string(),
  status: z.enum(Object.values(AvailableStatusesEnum) as [string, ...string[]], { message: `Status specified is incorrect.` })
});