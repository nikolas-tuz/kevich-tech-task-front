// 'use client';

import { ComponentPropsWithoutRef } from 'react';
import DivContainer from '@/components/UI/Containers/DivContainer';
import Paragraph from '@/components/UI/Typography/Paragraph';
import BadgeButton from '@/components/UI/Buttons/BadgeButton';
import { Tooltip } from '@mui/material';
import ArrowIcon from '@/components/UI/Icons/ArrowIcon';
import { formatDatetime } from '@/utils/functions/formatDate';
import { formatStatus } from '@/utils/functions/formatStatus';

type TrainScheduleCardType = {
  id: string;
  trainNumber: number;
  departureStation: string;
  arrivalStation: string;
  departureTime: string;
  arrivalTime: string;
  status: string;
  onEditClick?: (id: string) => void;
  // children: ReactNode;
} & ComponentPropsWithoutRef<'figure'>;

export default function
  TrainScheduleCard({
                      id,
                      trainNumber,
                      status,
                      className,
                      departureTime,
                      arrivalTime,
                      departureStation,
                      arrivalStation,
                      onEditClick,
                      ...props
                    }: TrainScheduleCardType) {

  const availableColors = [`bg-yellow-50`, `bg-blue-50`, `bg-green-50`, `bg-red-50`, `bg-zinc-50`];


  // Using a hash function to select a color deterministically
  const hash = Array.from(id).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const appliedColor = availableColors[hash % availableColors.length];

  return (
    <>
      <figure {...props}
              className={`${appliedColor} py-3 px-5 min-w-[362px] rounded-xl relative ${className}`}>
        <h3 className={`text-lg mb-1`}>Train Number: {trainNumber}</h3>
        <DivContainer className={`flex justify-center flex-col gap-1 mb-7`}>
          <Paragraph className={`text-sm`}>Departure station: {departureStation}</Paragraph>
          <Paragraph className={`text-sm`}>Arrival station: {arrivalStation}</Paragraph>
        </DivContainer>
        <DivContainer className={`flex flex-col gap-2 w-fit`}>
          <BadgeButton className={`text-sm`}>Departure time: {formatDatetime(departureTime)}</BadgeButton>
          <BadgeButton className={`text-sm`}>Arrival time: {formatDatetime(arrivalTime)}</BadgeButton>
        </DivContainer>
        <BadgeButton
          className={`absolute top-3 right-3 bg-white`}
          active={false}>{formatStatus(status)}
        </BadgeButton>
        <Tooltip title={`Click to edit this train schedule :D`} followCursor>
          <button
            onClick={onEditClick ? () => onEditClick(id) : undefined}
            className={`absolute bottom-3 right-4 bg-zinc-900 rounded-full w-8 h-8 flex items-center justify-center
              transition-all duration-300 hover:scale-105 cursor-pointer
               active:scale-95`}>
            <ArrowIcon />
          </button>
        </Tooltip>
      </figure>
    </>
  );
}
