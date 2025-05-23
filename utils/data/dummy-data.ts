export type TrainScheduleDataType = {
  id: string;
  trainNumber: number;
  departureStation: string;
  arrivalStation: string;
  departureTime: string;
  arrivalTime: string;
  status: string;
}

export const trainScheduleData: TrainScheduleDataType[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440000',
    trainNumber: 101,
    departureStation: 'Station A',
    arrivalStation: 'Station B',
    departureTime: '2023-08-13T08:00:00Z',
    arrivalTime: '2023-08-13T10:00:00Z',
    status: 'on-time'
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    trainNumber: 102,
    departureStation: 'Station C',
    arrivalStation: 'Station D',
    departureTime: '2023-08-13T09:30:00Z',
    arrivalTime: '2023-08-13T11:45:00Z',
    status: 'delayed'
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    trainNumber: 103,
    departureStation: 'Station E',
    arrivalStation: 'Station F',
    departureTime: '2023-08-13T12:00:00Z',
    arrivalTime: '2023-08-13T14:30:00Z',
    status: 'departed'
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440003',
    trainNumber: 104,
    departureStation: 'Station G',
    arrivalStation: 'Station H',
    departureTime: '2023-08-13T15:00:00Z',
    arrivalTime: '2023-08-13T17:15:00Z',
    status: 'cancelled'
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440004',
    trainNumber: 105,
    departureStation: 'Station I',
    arrivalStation: 'Station J',
    departureTime: '2023-08-13T18:00:00Z',
    arrivalTime: '2023-08-13T20:30:00Z',
    status: 'in-transit'
  }
];

export default trainScheduleData;