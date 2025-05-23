'use client';

import NavigationDashboard from '@/components/pages/TrainDashboard/NavigationDashboard';
import DivContainer from '@/components/UI/Containers/DivContainer';
import SecondaryHeading from '@/components/UI/Typography/SecondaryHeading';
import SearchInput from '@/components/UI/FormControls/SearchInput';
import { useState } from 'react';
import BadgeButton from '@/components/UI/Buttons/BadgeButton';
import trainScheduleData from '@/utils/data/dummy-data';
import TrainScheduleCard from '@/components/UI/Cards/TrainScheduleCard';

export type ActiveTrainScheduleFilterType =
  `all`
  | `on-time`
  | `delayed`
  | `departed`
  | `cancelled`
  | `in-transit`
  | `complete`;

type AvailableFilterOptionsType = {
  label: string;
  filter: ActiveTrainScheduleFilterType;
}

const availableFilterOptions: AvailableFilterOptionsType[] = [
  {
    label: `All`,
    filter: `all`
  },
  {
    label: `On Time`,
    filter: `on-time`
  },
  {
    label: `Delayed`,
    filter: `delayed`
  },
  {
    label: `Departed`,
    filter: `departed`
  },
  {
    label: `Cancelled`,
    filter: `cancelled`
  },
  {
    label: `In Transit`,
    filter: `in-transit`
  },
  {
    label: `Complete`,
    filter: `complete`
  }
];

export default function Home() {
  const [inputValue, setInputValue] = useState(``);
  const [activeTrainScheduleFilter, setActiveTrainScheduleFilter] = useState<ActiveTrainScheduleFilterType>(`all`);

  function handleChangeFilter(filterOption: ActiveTrainScheduleFilterType) {
    setActiveTrainScheduleFilter(filterOption);
    console.info('inputValue:', inputValue);
    /* TODO: FETCH THE DATA FROM DB filtered. */
  }

  function handleEditSchedule(id: string) {
    console.info(`Edit the card with id ${id}`);
  }

  return (
    <main className={`container m-auto px-8 mt-4`}>
      <NavigationDashboard />
      <DivContainer className={`mt-5 flex justify-center flex-col gap-4`}>
        <SecondaryHeading>Here we are! Let’s begin our train journey :D</SecondaryHeading>
        <SearchInput onChange={(e) => setInputValue(e.currentTarget.value || ``)} />
        <DivContainer className={`flex items-center gap-3`}>
          {availableFilterOptions.map((option, index) =>
            <BadgeButton
              key={index}
              onClick={() => handleChangeFilter(option.filter)}
              active={activeTrainScheduleFilter === option.filter}>
              {option.label}
            </BadgeButton>
          )}
        </DivContainer>
        <DivContainer className={`flex items-center gap-3 mt-4 overflow-x-auto pb-10`}>
          {trainScheduleData.map((schedule) =>
            <TrainScheduleCard
              key={schedule.id}
              {...schedule}
              onEditClick={handleEditSchedule}
            />
          )}
        </DivContainer>
      </DivContainer>
    </main>
  );
}
