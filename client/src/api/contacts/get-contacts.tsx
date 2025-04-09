
import { queryOptions, useQuery } from "@tanstack/react-query";
import axios from "../../axios/axios-customize"
import { ContactResponse, Contacts } from "../../stores/contacts/contactStore";


export type GetContactsParams = {
    page: number;
    size: number;
    keyword?: string;
}

export type UseContactProps = {
    queryConfig?: object; // Có thể dùng Partial<UseQueryOptions>
} & GetContactsParams;


export const getContacts = async ({ page, size, keyword = "" }: GetContactsParams): Promise<ContactResponse> => {
    const response = await axios.get(`/contacts`, {
        params: {
            page,
            size,
            keyword,
        },
    });
    console.log(response.data)
    return response.data;


};

export const getContactsQueryOptions = ({ page, size, keyword }: GetContactsParams) => {
    return queryOptions({
        queryKey: page ? ["contacts", { page, size, keyword }] : ["contacts"],
        queryFn: () => getContacts({ page, size, keyword }),
    });
};


export const useContacts = ({ queryConfig = {}, page, size, keyword }: UseContactProps) => {
    return useQuery({
        ...getContactsQueryOptions({ page, size, keyword }),
        ...queryConfig,
    });
};