import axios from "../../axios/axios-customize"
import { queryOptions, useQuery } from "@tanstack/react-query";
import { GetAllergiesResponse } from "../../types";

export type GetAllergiesParams = {
    page: number;
    size: number;
    keyword?: string;
    memberID?: number;
}

export type UseMembersProps = {
    queryConfig?: object; // Có thể dùng Partial<UseQueryOptions>
} & GetAllergiesParams;

export const getAllergies = async ({ page, size, keyword, memberID }: GetAllergiesParams): Promise<GetAllergiesResponse> => {
    const response = await axios.get(`/allergies`, {
        params: {
            page,
            size,
            keyword,
            memberID
        },
    });
    return response.data
};

export const getAllergiesQueryOptions = ({
    page,
    size,
    keyword,
    memberID
}: GetAllergiesParams) => {
    return queryOptions({
        queryKey: page ? ["allergies", { page, size, keyword, memberID }] : ["allergies"], // cache dữ liệu
        queryFn: () => getAllergies({ page, size, keyword, memberID }), // gọi API 
    });

};



export const useAllergies = ({ queryConfig = {}, page, size, keyword, memberID }: UseMembersProps) => {
    return useQuery({
        ...getAllergiesQueryOptions({ page, size, keyword, memberID }),
        ...queryConfig, // nếu không truyền `queryConfig`, nó sẽ là object rỗng {}
    });
};