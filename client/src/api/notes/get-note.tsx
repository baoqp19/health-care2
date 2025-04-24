import { Note } from "../../stores/notes/noteStore"
import axios from "../../axios/axios-customize"
import { queryOptions, useQuery } from "@tanstack/react-query"


export type GetNotesResponse = {
    statusCode: number
    message: string
    data: Note[]
}


export type getNotesParams = {
    page?: number
    size?: number
    keyword?: string
}

export type UseNotesProps = {
    queryConfig?: Object;
} & getNotesParams


export const getNotes = async ({ page, size, keyword }: getNotesParams): Promise<Note[]> => {
    const response = await axios.get(`/notes`, {
        params: { page, size, keyword },
    })
    console.log(response.data)
    return response.data

}

export const getNotesQueryOptions = ({
    page,
    size,
    keyword,
}: getNotesParams) => {
    return queryOptions({
        queryKey: ["note", { page, size, keyword }],
        queryFn: () => getNotes({ page, size, keyword }),
    });
};

export const useNotes = ({ queryConfig = {}, page, size, keyword }: UseNotesProps) => {
    return useQuery({
        ...getNotesQueryOptions({ page, size, keyword }),
        ...queryConfig,
    })
}