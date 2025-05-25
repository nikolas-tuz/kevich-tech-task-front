export type ActiveSortingOptionsType = {
  sortBy: {
    label: string;
    value: string;
  }[],
  order: {
    label: string;
    value: string;
  }[]
}

export enum SortByEnum {
  DATE_CREATED = `createdAt`,
  TRAIN_NUMBER = `trainNumber`
}

export enum OrderEnum {
  DESC = `desc`,
  ASC = `asc`
}

export type ActiveSortingStateType = {
  sortBy: SortByEnum;
  order: OrderEnum;
}
