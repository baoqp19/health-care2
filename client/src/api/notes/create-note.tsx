import { AxiosResponse } from "axios";
import { Note, NoteC } from "../../stores/notes/noteStore";
import axios from "../../axios/axios-customize"
import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import { getNotesQueryOptions } from "./get-note";
import { ROW_PER_PAGE } from "../../config/constants";

export const createNote = async (note: NoteC): Promise<Note> => {
    const response: AxiosResponse<Note> = await axios.post("/notes", note);
    return response.data;
};


export const useCreateNote = (
    options: UseMutationOptions<Note, Error, NoteC> = {}
) => {
    const { onSuccess, onError, ...restConfig } = options;

    const queryClient = useQueryClient();


    return useMutation({
        mutationFn: createNote,
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
