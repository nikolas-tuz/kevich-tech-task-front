import { useEffect, useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { TrainScheduleDataType } from '@/utils/data/dummy-data';
import { ActiveTrainScheduleFilterType } from '@/app/page';
import axios from 'axios';
import { getAccessToken } from '@/utils/auth/getAccessToken';
import { AxiosErrorInterface, AxiosResponseInterface } from '@/utils/interfaces/AxiosResponse.interface';

function mergeAndDeduplicateItems(
  existingItems: TrainScheduleDataType[],
  newItems: TrainScheduleDataType[]
): TrainScheduleDataType[] {
  const itemMap = new Map(existingItems.concat(newItems).map(item => [item.id, item]));
  return Array.from(itemMap.values());
}

export function useFetchScheduleData() {
  const limit = 5;

  const [page, setPage] = useState(1);
  const [nextPageLoading, setNextPageLoading] = useState(false);

  const [total, setTotal] = useState<number>(0);
  const [inputValue, setInputValue] = useState(``);
  const debouncedInputValue = useDebounce(inputValue, 400); // Use the custom hook
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(``);
  const [trainScheduleItems, setTrainScheduleItems] = useState<TrainScheduleDataType[]>([]);
  const [activeTrainScheduleFilter, setActiveTrainScheduleFilter] = useState<ActiveTrainScheduleFilterType>(`all`);

  function handleChangeFilter(filterOption: ActiveTrainScheduleFilterType) {
    if (activeTrainScheduleFilter !== filterOption) {
      setPage(1);
      setActiveTrainScheduleFilter(filterOption);
      setLoading(true);
      setTrainScheduleItems([]);
    }
  }

  useEffect(() => {
    let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/train-schedule?page=${page}&limit=${limit}`;

    if (activeTrainScheduleFilter !== `all`) {
      url += `&status=${activeTrainScheduleFilter}`;
    }

    if (debouncedInputValue) {
      url += `&searchTerm=${debouncedInputValue.toLowerCase()}`;
    }

    async function fetchTrainScheduleData() {
      try {
        const trainSchedules = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${getAccessToken()}`
          }
        }).then(res => res.data as AxiosResponseInterface);

        if (trainSchedules?.status === `success`) {
          setTrainScheduleItems(prevState => {
            const newItems = trainSchedules.data.trainSchedules as TrainScheduleDataType[];
            return mergeAndDeduplicateItems(page === 1 ? [] : prevState, newItems); // Preserve previous items unless it's the first page
          });

          setTotal(trainSchedules.data.total); // Update total count
          if (errorMessage) setErrorMessage(``);
        } else {
          setErrorMessage(trainSchedules?.data?.error || `Failed to load train schedules. Please try again later.`);
        }
      } catch (e) {
        const error = e as AxiosErrorInterface;
        setErrorMessage(error?.response?.data?.message || `Failed to load train schedules. Please try again later.`);
      } finally {
        setLoading(false);
        setNextPageLoading(false);
      }
    }

    // Reset page and clear items when a new search term is entered
    if (debouncedInputValue && page !== 1) {
      setPage(1);
      setTrainScheduleItems([]);
    } else {
      fetchTrainScheduleData().catch((e) => {
        const error = e as AxiosErrorInterface;
        setLoading(false);
        setErrorMessage(error?.response?.data?.message || `Failed to load train schedules. Please try again later.`);
      });
    }
  }, [activeTrainScheduleFilter, debouncedInputValue, page]);
  return {
    loading,
    errorMessage,
    trainScheduleItems,
    activeTrainScheduleFilter,
    total,
    nextPageLoading,
    setTrainScheduleItems,
    setInputValue,
    handleChangeFilter,
    setPage,
    setNextPageLoading
  };
}