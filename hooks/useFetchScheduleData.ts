import { useEffect, useState } from 'react';
import { TrainScheduleDataType } from '@/utils/data/dummy-data';
import { ActiveTrainScheduleFilterType } from '@/app/page';
import axios from 'axios';
import { getAccessToken } from '@/utils/auth/getAccessToken';
import { AxiosErrorInterface, AxiosResponseInterface } from '@/utils/interfaces/AxiosResponse.interface';

export function useFetchScheduleData() {
  const limit = 5;
  const [page, setPage] = useState(1);

  const [inputValue, setInputValue] = useState(``);

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(``);

  const [trainScheduleItems, setTrainScheduleItems] = useState<TrainScheduleDataType[]>();
  const [activeTrainScheduleFilter, setActiveTrainScheduleFilter] = useState<ActiveTrainScheduleFilterType>(`all`);

  function handleChangeFilter(filterOption: ActiveTrainScheduleFilterType) {
    setActiveTrainScheduleFilter(filterOption);
    console.info('inputValue:', inputValue);
    /* TODO: FETCH THE DATA FROM EXISTING DATA filtered. */
  }

  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/train-schedule?page=${page}&limit=${limit}`;

    async function fetchTrainScheduleData() {
      try {
        const trainSchedules = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${getAccessToken()}`
          }
        }).then(res => res.data as AxiosResponseInterface);

        if (trainSchedules?.status === `success`) {
          setTrainScheduleItems(trainSchedules.data.trainSchedules);
        } else {
          setErrorMessage(trainSchedules?.data?.error || `Failed to load train schedules. Please try again later.`);
        }
      } catch (e) {
        const error = e as AxiosErrorInterface;
        setErrorMessage(error?.response?.data?.message || `Failed to load train schedules. Please try again later.`);
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    fetchTrainScheduleData().catch((e) => {
      const error = e as AxiosErrorInterface;
      setLoading(false);
      setErrorMessage(error?.response?.data?.message || `Failed to load train schedules. Please try again later.`);
    });
  }, [page]);

  return {
    loading,
    errorMessage,
    trainScheduleItems,
    activeTrainScheduleFilter,
    setTrainScheduleItems,
    setInputValue,
    handleChangeFilter
  };
} 