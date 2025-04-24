
import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import axios from "../../axios/axios-customize"
import { ROW_PER_PAGE } from "../../config/constants";
import { getNotesQueryOptions } from "./get-note";



export const deleteNote = (id: number): Promise<void> => {
    return axios.delete(`/notes/${id}`);
};


export const useDeleteNote = (options: UseMutationOptions<void, Error, number> = {}) => {

    const { onSuccess, onError, ...restConfig } = options;
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteNote,
        onSuccess: (data, ...args) => {
            queryClient.invalidateQueries({
                queryKey: getNotesQueryOptions({ page: 1, size: ROW_PER_PAGE, keyword: "" }).queryKey,  // là hàm nên truyền đối số
            });
            onSuccess?.(data, ...args);
        },
        onError: (error, ...args) => {
            onError?.(error, ...args);
        },
        ...restConfig,
    });
};