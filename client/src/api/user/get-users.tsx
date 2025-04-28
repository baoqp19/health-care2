import { queryOptions, useQuery } from "@tanstack/react-query";
import axios from "../../axios/axios-customize"
import { GetContactsParams } from "../emergencyContacts/get-emergencyContact";
import { UseContactProps } from "../contacts/get-contacts";
import { UserResponse } from "../../stores/userStore";


export type GetUsersResponse = {
    statusCode: number;
    message: string;
    data: UserResponse;
};


export const getUsers = async ({ page, size, keyword = "" }: GetContactsParams): Promise<UserResponse> => {
    const response = await axios.get(`/users`, {
        params: {
            page,
            size,
            keyword,
        },
    });
    return response.data;
};

export const getUsersQueryOptions = ({ page, size, keyword }: GetContactsParams) => {
    return queryOptions({
        queryKey: page ? ["users", { page, size, keyword }] : ["users"],
        queryFn: () => getUsers({ page, size, keyword }),
    });
};


export const useUsers = ({ queryConfig, page, size, keyword }: UseContactProps) => {
    return useQuery({
        ...getUsersQueryOptions({ page, size, keyword }),
        ...queryConfig,
    });
};