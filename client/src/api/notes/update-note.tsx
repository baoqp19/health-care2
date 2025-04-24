import { AxiosResponse } from "axios";
import { Note, UpdateNoteParams } from "../../stores/notes/noteStore";
import axios from "../../axios/axios-customize"
import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import { getNotesQueryOptions } from "./get-note";
import { ROW_PER_PAGE } from "../../config/constants";

export const updateNote = async ({ noteId, data }: UpdateNoteParams): Promise<Note> => {
    const response: AxiosResponse<Note> = await axios.put(`/members/${noteId}`, data);
    return response.data;
};


export const useUpdateNote = (options?: UseMutationOptions<Note, Error, UpdateNoteParams>) => {
    const { onSuccess, onError, ...restConfig } = options || {};
    const queryClient = useQueryClient();

    return useMutation<Note, Error, UpdateNoteParams>({
        mutationFn: updateNote,
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
