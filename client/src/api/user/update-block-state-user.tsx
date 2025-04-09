import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import { getUsersQueryOptions } from "./get-users";
import axios from "../../axios/axios-customize";
import { ROW_PER_PAGE } from "../../config/constants";

export const updateBlockStateUser = (id: number): Promise<void> => {
    return axios.put(`/users/${id}`);
};

export const useUpdateBlockStateUser = (options?: UseMutationOptions<void, Error, number>) => {
    const { onSuccess, onError, ...restConfig } = options || {};

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateBlockStateUser,
        onSuccess: (data, ...args) => {
            queryClient.invalidateQueries({
                queryKey: getUsersQueryOptions({ page: 1, size: ROW_PER_PAGE, keyword: "" }).queryKey,
            });
            onSuccess?.(data, ...args);
        },
        onError: (error, ...args) => {
            onError?.(error, ...args);
        },
        ...restConfig,
    });
};