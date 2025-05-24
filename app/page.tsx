'use client';

import NavigationDashboard from '@/components/pages/TrainDashboard/NavigationDashboard';
import LottieAnimationTrainJSON from '@/animations/animation_train.json';

import DivContainer from '@/components/UI/Containers/DivContainer';
import SecondaryHeading from '@/components/UI/Typography/SecondaryHeading';
import SearchInput from '@/components/UI/FormControls/SearchInput';
import { FormEvent, ReactNode, useState, useTransition } from 'react';
import BadgeButton from '@/components/UI/Buttons/BadgeButton';
import TrainScheduleCard from '@/components/UI/Cards/TrainScheduleCard';
import SkeletonCardLoading from '@/components/UI/Cards/SkeletonCardLoading';
import MUIDialog from '@/components/UI/Dialogs/MUIDialog';
import Input from '@/components/UI/FormControls/Input';
import Button from '@/components/UI/Buttons/Button';
import Paragraph from '@/components/UI/Typography/Paragraph';
import { AvailableStatusesEnum } from '@/utils/enums/available-statuses.enum';
import Select from '@/components/UI/FormControls/Select';
import { formatStatus } from '@/utils/functions/formatStatus';
import { formatCustomDatetimeToISO, formatDatetime, isValidCustomDatetimeFormat } from '@/utils/functions/formatDate';
import SnackbarMUI from '@/components/UI/Snackbars/SnackbarMUI';
import { trainScheduleSchema } from '@/utils/schemas/train-schedule.schema';
import { useHandleDialogState } from '@/hooks/useHandleDialogState';
import { useHandleSnackbarState } from '@/hooks/useHandleSnackbarState';
import { useFetchScheduleData } from '@/hooks/useFetchScheduleData';
import MUIBackdrop from '@/components/UI/Backdrops/MUIBackdrop';
import { AxiosErrorInterface, AxiosResponseInterface } from '@/utils/interfaces/AxiosResponse.interface';
import axios from 'axios';
import { getAccessToken } from '@/utils/auth/getAccessToken';
import { CircularProgress } from '@mui/material';
import Lottie from 'lottie-react';

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
  id: string;
  departureStation: string;
  arrivalStation: string;
  departureTime: string; // ISO 8601 datetime format
  arrivalTime: string;   // ISO 8601 datetime format
  status: string;
};

export default function Home() {
  const [backdropState, setBackdropState] = useState(false);

  const { handleDialogState, dialogMode, dialogOpen, setDialogOpen, setDialogMode } = useHandleDialogState();
  const { handleSnackbarState, setSnackbarState, snackbarState, snackbarData } = useHandleSnackbarState();
  const {
    loading,
    trainScheduleItems,
    activeTrainScheduleFilter,
    total,
    nextPageLoading,
    setNextPageLoading,
    setPage,
    setTrainScheduleItems,
    setInputValue,
    handleChangeFilter,
    errorMessage
  } = useFetchScheduleData();

  const defaultInputs: TrainScheduleInputsType & TrainNumberFromDBType = {
    id: ``,
    trainNumber: 0,
    status: ``,
    departureStation: ``,
    departureTime: ``,
    arrivalStation: ``,
    arrivalTime: ``
  };

  const [trainScheduleInputs, setTrainScheduleInputs] = useState<TrainScheduleInputsType & TrainNumberFromDBType>(defaultInputs);

  const [isPending, startTransition] = useTransition();

  function handleDialogStateForEdit(id: string, state: boolean) {
    setDialogMode(`Edit`);
    const scheduleData = trainScheduleItems?.find(schedule => schedule.id === id);

    setTrainScheduleInputs(scheduleData!);
    setDialogOpen(state);
  }


  async function handleFormSubmission(e: FormEvent<HTMLFormElement>) {
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

    const finalResults = {
      trainNumber: Number(results.trainNumber),
      departureStation: results.departureStation,
      arrivalStation: results.arrivalStation,
      departureTime: results.departureTime,
      arrivalTime: results.arrivalTime,
      status: results.status
    };

    const validate = trainScheduleSchema.safeParse(finalResults);

    if (!validate.success) {
      handleSnackbarState(`error`, validate.error.errors[0].message);
      return;
    }

    if (dialogMode === `Edit`) {
      startTransition(async () => {
        try {
          async function handleEditTrainSchedule() {

            if (!trainScheduleInputs?.id) {
              handleSnackbarState(`error`, `Failed to determine the id of train schedule. Please retry,`);
              return;
            }
            setBackdropState(true);

            const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/train-schedule/${trainScheduleInputs!.id}`,
              finalResults,
              {
                headers: {
                  'Authorization': `Bearer ${getAccessToken()}`
                }
              }).then((res) => res.data as AxiosResponseInterface);

            if (response.status === `success`) {
              handleSnackbarState(`success`, `The Train Schedule for ${trainScheduleInputs.trainNumber} was successfully updated.`);
              setDialogOpen(false);

              const updatedSchedulesItems = [...trainScheduleItems!];

              const findIndex = updatedSchedulesItems.findIndex(schedule => schedule.id === trainScheduleInputs.id);

              // performing update on the UI.
              if (findIndex > -1) {
                updatedSchedulesItems[findIndex] = { ...finalResults, id: trainScheduleInputs.id };
                setTrainScheduleItems(updatedSchedulesItems);
              }

              return;
            } else {
              handleSnackbarState(`error`, `Failed to update the train schedule for ${finalResults.trainNumber} train.`);
            }

          }

          await handleEditTrainSchedule();

        } catch (e) {
          const error = e as AxiosErrorInterface;
          handleSnackbarState(`error`, error?.response?.data?.message || `Failed to update the train schedule for ${finalResults.trainNumber} train.`);

        } finally {
          setBackdropState(false);
        }
      });
      return;
    }

    if (dialogMode === `Create`) {
      handleSnackbarState(`success`, `New Train Schedule <12> was successfully created.`);
      setDialogOpen(false);
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
            defaultValue={trainScheduleInputs?.departureTime ? formatDatetime(trainScheduleInputs.departureTime) : ``}
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
            defaultValue={trainScheduleInputs?.arrivalTime ? formatDatetime(trainScheduleInputs.arrivalTime) : ``}
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
          <Button disabled={isPending} className={`w-full`}>
            {isPending ? <CircularProgress size={20}></CircularProgress> : `Save`}
          </Button>

          {dialogMode === `Edit` && (
            <>
              <Paragraph className={`text-center`}>Or</Paragraph>
              <Button disabled={isPending} type={`button`} mode={`red`} className={`w-full`}>Delete</Button>
            </>
          )}
        </DivContainer>
      </form>
    </DivContainer>
  );

  function handleNextPagination() {
    if (total === trainScheduleItems.length) return;
    setPage(prevState => prevState + 1);
    setNextPageLoading(true);
  }

  return (
    <>
      <MUIBackdrop state={{ open: backdropState, setOpen: setBackdropState }} />
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
      <main className={`pb-5`}>
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

        {!loading && !errorMessage &&
          <>
            <DivContainer className={`flex items-center gap-3 mt-6 overflow-x-auto pb-10 px-4`}>

              {trainScheduleItems?.length === 0 &&
                <DivContainer className={`text-center m-auto mt-5`}>
                  <Lottie animationData={LottieAnimationTrainJSON} />
                  <Paragraph className={`text-xl`}>No schedules to be seen! :D</Paragraph>
                </DivContainer>}
              {trainScheduleItems?.map((schedule) =>
                <TrainScheduleCard
                  key={schedule.id}
                  {...schedule}
                  onEditClick={() => handleDialogStateForEdit(schedule.id, true)}
                />
              )}
              {trainScheduleItems?.length !== total && (
                <DivContainer className={`flex items-center justify-center min-w-[200px]`}>
                  {nextPageLoading ?
                    <CircularProgress></CircularProgress> :
                    <Button disabled={isPending || nextPageLoading || total === trainScheduleItems.length}
                            mode={`static-white`} onClick={handleNextPagination} className={`px-10 rounded-lg`}>See
                      More</Button>
                  }

                </DivContainer>
              )}
            </DivContainer>
          </>
        }
        {loading && <SkeletonCardLoading />}

        {errorMessage &&
          <DivContainer className={`text-center m-auto mt-5 flex items-center justify-center flex-col`}>
            <Lottie className={`w-96 h-96`} animationData={LottieAnimationTrainJSON} />
            <Paragraph className={`text-xl`}>{errorMessage}</Paragraph>
          </DivContainer>
        }
        <DivContainer
          className={`mt-4 container m-auto px-6`}>
          <button onClick={() => {
            handleDialogState(`Create`, true);
            setTrainScheduleInputs(defaultInputs);

          }} className={`border-1 cursor-pointer 
              border-dashed border-zinc-300 w-[362px] h-36 rounded-lg
              transition-all duration-300 hover:text-white hover:bg-zinc-950
              hover:border-transparent`}>Create New Schedule
          </button>
        </DivContainer>

      </main>
    </>
  );
}
