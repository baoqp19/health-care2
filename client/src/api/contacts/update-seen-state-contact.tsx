import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import axios from "../../axios/axios-customize";
import { getContactsQueryOptions } from "./get-contacts";
import { ROW_PER_PAGE } from "../../config/constants";


export const updateSeenStateContact = (id: number): Promise<void> => {
    return axios.put(`/contacts/${id}`);
};

export const useUpdateSeenStateContact = (options?: UseMutationOptions<void, Error, number>) => {
    const { onSuccess, onError, ...restConfig } = options || {};

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateSeenStateContact,
        onSuccess: (data, ...args) => {
            queryClient.invalidateQueries({
                queryKey: getContactsQueryOptions({ page: 1, size: ROW_PER_PAGE, keyword: "" }).queryKey,
            });
            onSuccess?.(data, ...args);
        },
        onError: (error, ...args) => {
            onError?.(error, ...args);
        },
        ...restConfig,
    });
};