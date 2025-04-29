import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios from "../../axios/axios-customize"
import { AxiosResponse } from "axios";

type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
};

export const getAccount = async (): Promise<User> => {
  const response: AxiosResponse<User> = await axios.get(`/auth/account`);
  console.log(response.data);
  return response.data;
};

export const useAccount = (options: Partial<UseQueryOptions<User, Error>> = {}) => {
  return useQuery<User, Error>({
    queryKey: ['me'],
    queryFn: getAccount,
    ...options,
  });
};
