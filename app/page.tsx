'use client';

import NavigationDashboard from '@/components/pages/TrainDashboard/NavigationDashboard';
import DivContainer from '@/components/UI/Containers/DivContainer';
import SecondaryHeading from '@/components/UI/Typography/SecondaryHeading';
import SearchInput from '@/components/UI/FormControls/SearchInput';
import { useEffect, useState } from 'react';
import BadgeButton from '@/components/UI/Buttons/BadgeButton';
import trainScheduleData, { TrainScheduleDataType } from '@/utils/data/dummy-data';
import TrainScheduleCard from '@/components/UI/Cards/TrainScheduleCard';
import SkeletonCardLoading from '@/components/UI/Cards/SkeletonCardLoading';

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

  const [loading, setLoading] = useState(true);
  const [trainScheduleItems, setTrainScheduleItems] = useState<TrainScheduleDataType[]>();

  const [activeTrainScheduleFilter, setActiveTrainScheduleFilter] = useState<ActiveTrainScheduleFilterType>(`all`);

  useEffect(() => {
    new Promise((resolve) => setTimeout(resolve, 2000)).then(() => {
      setLoading(false);
      setTrainScheduleItems(trainScheduleData);
    });
  }, []);

  function handleChangeFilter(filterOption: ActiveTrainScheduleFilterType) {
    setActiveTrainScheduleFilter(filterOption);
    console.info('inputValue:', inputValue);
    /* TODO: FETCH THE DATA FROM DB filtered. */
  }

  function handleEditSchedule(id: string) {
    console.info(`Edit the card with id ${id}`);
  }

  function handleCreateNewTrainSchedule() {
    /* TODO: OPEN THE MODAL DIALOG TO CREATE NEW TRAIN SCHEDULE */
  }

  return (
    <>
      <main>
        <DivContainer className={`container m-auto px-8 mt-4`}>
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
          </DivContainer>
        </DivContainer>

        {!loading &&
          <>
            <DivContainer className={`flex items-center gap-3 mt-6 overflow-x-auto pb-10 px-4`}>
              {trainScheduleItems?.map((schedule) =>
                <TrainScheduleCard
                  key={schedule.id}
                  {...schedule}
                  onEditClick={handleEditSchedule}
                />
              )}
            </DivContainer>
          </>
        }
        {loading && <SkeletonCardLoading />}

      </main>
      <DivContainer
        className={`mt-4 container m-auto px-6`}>
        <button onClick={handleCreateNewTrainSchedule} className={`border-1 cursor-pointer 
              border-dashed border-zinc-300 w-[362px] h-36 rounded-lg
              transition-all duration-300 hover:text-white hover:bg-zinc-950
              hover:border-transparent`}>Create New Schedule
        </button>
      </DivContainer>
    </>
  );
}
