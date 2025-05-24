export interface AxiosResponseInterface {
  status: `fail` | `error` | `success`,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any,
  message?: string
}

export interface AxiosErrorInterface {
  response: {
    data: {
      error: string;
      message: string;
      statusCode: number;
    }
  };
}

