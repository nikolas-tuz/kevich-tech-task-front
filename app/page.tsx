'use client';

import NavigationDashboard from '@/components/pages/TrainDashboard/NavigationDashboard';
import DivContainer from '@/components/UI/Containers/DivContainer';
import SecondaryHeading from '@/components/UI/Typography/SecondaryHeading';
import SearchInput from '@/components/UI/FormControls/SearchInput';
import { FormEvent, ReactNode, useEffect, useState } from 'react';
import BadgeButton from '@/components/UI/Buttons/BadgeButton';
import trainScheduleData, { TrainScheduleDataType } from '@/utils/data/dummy-data';
import TrainScheduleCard from '@/components/UI/Cards/TrainScheduleCard';
import SkeletonCardLoading from '@/components/UI/Cards/SkeletonCardLoading';
import MUIDialog from '@/components/UI/Dialogs/MUIDialog';
import Input from '@/components/UI/FormControls/Input';
import Button from '@/components/UI/Buttons/Button';
import Paragraph from '@/components/UI/Typography/Paragraph';
import { AvailableStatusesEnum } from '@/utils/enums/available-statuses.enum';
import Select from '@/components/UI/FormControls/Select';
import { formatStatus } from '@/utils/functions/formatStatus';
import {
  formatCustomDatetimeToISO,
  formatISOToCustomDatetime,
  isValidCustomDatetimeFormat
} from '@/utils/functions/formatISOToDatetime';
import SnackbarMUI from '@/components/UI/Snackbars/SnackbarMUI';
import { trainScheduleSchema } from '@/utils/schemas/train-schedule.schema';
import { useHandleDialogState } from '@/hooks/useHandleDialogState';
import { undefined } from 'zod';
import { useHandleSnackbarState } from '@/hooks/useHandleSnackbarState';

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
    filter: AvailableStatusesEnum.OnTime
  },
  {
    label: `Delayed`,
    filter: AvailableStatusesEnum.Delayed
  },
  {
    label: `Departed`,
    filter: AvailableStatusesEnum.Departed
  },
  {
    label: `Cancelled`,
    filter: AvailableStatusesEnum.Cancelled
  },
  {
    label: `In Transit`,
    filter: AvailableStatusesEnum.InTransit
  },
  {
    label: `Complete`,
    filter: AvailableStatusesEnum.Complete
  }
];


type TrainNumberFromDBType = {
  trainNumber: number;
}

type TrainNumberFromForm = {
  trainNumber: string;
}

type TrainScheduleInputsType = {
  departureStation: string;
  arrivalStation: string;
  departureTime: string; // ISO 8601 datetime format
  arrivalTime: string;   // ISO 8601 datetime format
  status: string;
};

export default function Home() {
  const [inputValue, setInputValue] = useState(``);
  const { handleDialogState, dialogMode, dialogOpen, setDialogOpen, setDialogMode } = useHandleDialogState();
  const { handleSnackbarState, setSnackbarState, snackbarState, snackbarData } = useHandleSnackbarState();

  const [trainScheduleInputs, setTrainScheduleInputs] = useState<TrainScheduleInputsType & TrainNumberFromDBType>();

  const [loading, setLoading] = useState(true);
  const [trainScheduleItems, setTrainScheduleItems] = useState<TrainScheduleDataType[]>();

  const [activeTrainScheduleFilter, setActiveTrainScheduleFilter] = useState<ActiveTrainScheduleFilterType>(`all`);

  useEffect(() => {
    new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
      setLoading(false);
      setTrainScheduleItems(trainScheduleData);
    });
  }, []);

  function handleDialogStateForEdit(id: string, state: boolean) {
    setDialogMode(`Edit`);
    const scheduleData = trainScheduleData.find(schedule => schedule.id === id);
    console.info('Executing scheduleData', scheduleData);
    setTrainScheduleInputs(scheduleData);
    setDialogOpen(state);
  }

  function handleChangeFilter(filterOption: ActiveTrainScheduleFilterType) {
    setActiveTrainScheduleFilter(filterOption);
    console.info('inputValue:', inputValue);
    /* TODO: FETCH THE DATA FROM EXISTING DATA filtered. */
  }

  function handleFormSubmission(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const currObject = e.currentTarget;
    const formData = new FormData(currObject);
    const results = Object.fromEntries(formData.entries()) as TrainScheduleInputsType & TrainNumberFromForm;

    if (!dialogMode) {
      handleSnackbarState(`error`, `Dialog mode was not opened. Please retry.`);
      return;
    }

    if (!isValidCustomDatetimeFormat(results.departureTime)) {
      handleSnackbarState(`error`, `Departure Time is not DD/MM/YYYY, HH:mm format.`);
      return;
    }

    if (!isValidCustomDatetimeFormat(results.arrivalTime)) {
      handleSnackbarState(`error`, `Arrival Time is not DD/MM/YYYY, HH:mm format.`);
      return;
    }

    results.departureTime = formatCustomDatetimeToISO(results.departureTime);
    results.arrivalTime = formatCustomDatetimeToISO(results.arrivalTime);

    const validate = trainScheduleSchema.safeParse({
      trainNumber: Number(results.trainNumber),
      departureStation: results.departureStation,
      arrivalStation: results.arrivalStation,
      departureTime: results.departureTime,
      arrivalTime: results.arrivalTime,
      status: results.status
    });

    if (!validate.success) {
      handleSnackbarState(`error`, validate.error.errors[0].message);
      return;
    }

    console.info('results:', results);

    if (dialogMode === `Edit`) {
      /* TODO: USE PUT METHOD TO EDIT THE CORRESPONDING SCHEDULE */
      return;
    }

    if (dialogMode === `Create`) {
      /* TODO: USE POST METHOD TO CREATE A NEW SCHEDULE; */
      return;
    }

  }

  const dialogContent: ReactNode = (
    <DivContainer className={`py-7 px-10`}>
      <SecondaryHeading
        className={`mb-5`}>{dialogMode === `Edit` ? `Edit the schedule for train <${trainScheduleInputs?.trainNumber}>` : `Let's Create New Train Schedule!`}</SecondaryHeading>
      <form onSubmit={handleFormSubmission} className={`flex flex-col gap-4`}>
        <DivContainer className={`flex items-center gap-3`}>
          <Input
            top
            defaultValue={trainScheduleInputs?.trainNumber || ``}
            className={`max-w-[220px] text-center`}
            // disabled={isPending}
            tooltip={`Train Number`}
            name={`trainNumber`}
            required
            type={`number`}
            placeholder={`Train Number`}
          />

          <Input
            top
            defaultValue={trainScheduleInputs?.departureStation || ``}
            className={`max-w-[220px] text-center`}
            // disabled={isPending}
            tooltip={`Departure Station`}
            name={`departureStation`}
            required
            type={`text`}
            placeholder={`Departure Station`}
          />

          <Input
            defaultValue={trainScheduleInputs?.arrivalStation || ``}
            top
            className={`max-w-[220px] text-center`}
            // disabled={isPending}
            tooltip={`Arrival Station`}
            name={`arrivalStation`}
            required
            type={`text`}
            placeholder={`Arrival Station`}
          />
        </DivContainer>

        <DivContainer className={`flex items-center gap-3 mb-10`}>
          <Input
            defaultValue={trainScheduleInputs?.departureTime ? formatISOToCustomDatetime(trainScheduleInputs.departureTime) : ``}
            top
            className={`max-w-[220px] text-center`}
            // disabled={isPending}
            tooltip={`Departure Time`}
            name={`departureTime`}
            required
            type={`text`}
            placeholder={`DD/MM/YYYY, HH:mm`}
          />

          <Input
            defaultValue={trainScheduleInputs?.arrivalTime ? formatISOToCustomDatetime(trainScheduleInputs.arrivalTime) : ``}
            top
            className={`max-w-[220px] text-center`}
            // disabled={isPending}
            tooltip={`Arrival Time`}
            name={`arrivalTime`}
            required
            type={`text`}
            placeholder={`DD/MM/YYYY, HH:mm`}
          />
          <Select className={`min-w-[220px] bg-zinc-100`} defaultValue={trainScheduleInputs?.status} name={`status`}
                  tooltip={`Status`}>
            {Object.values(AvailableStatusesEnum).map((status, index) =>
              <option key={index} value={status}>{formatStatus(status)}</option>)}
          </Select>
        </DivContainer>
        <DivContainer className={`flex items-center gap-3`}>
          <Button className={`w-full`}>Save</Button>

          {dialogMode === `Edit` && (
            <>
              <Paragraph className={`text-center`}>Or</Paragraph>
              <Button type={`button`} mode={`red`} className={`w-full`}>Delete</Button>
            </>
          )}
        </DivContainer>
      </form>
    </DivContainer>
  );

  return (
    <>
      <SnackbarMUI
        position={{ v: `bottom`, h: `center` }}
        severity={snackbarData?.severity}
        message={snackbarData?.message}
        state={{ open: snackbarState, setOpen: setSnackbarState }}
      />
      <MUIDialog modalState={{ open: dialogOpen, setOpen: setDialogOpen }}>
        <>
          {dialogContent}
        </>
      </MUIDialog>
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
                  onEditClick={() => handleDialogStateForEdit(schedule.id, true)}
                />
              )}
            </DivContainer>
            <DivContainer
              className={`mt-4 container m-auto px-6`}>
              <button onClick={() => {
                handleDialogState(`Create`, true);

                // The error would NOT occur.
                // The point of this line is to remove input data
                // so you won't see the data of the previous schedule.
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                setTrainScheduleInputs(undefined);
              }} className={`border-1 cursor-pointer 
              border-dashed border-zinc-300 w-[362px] h-36 rounded-lg
              transition-all duration-300 hover:text-white hover:bg-zinc-950
              hover:border-transparent`}>Create New Schedule
              </button>
            </DivContainer>
          </>
        }
        {loading && <SkeletonCardLoading />}

      </main>
    </>
  );
}
