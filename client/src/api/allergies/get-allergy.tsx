import axios from "../../axios/axios-customize"
import { queryOptions, useQuery } from "@tanstack/react-query";
import { GetAllergiesResponse } from "../../types";

export type GetAllergiesParams = {
    page: number;
    size: number;
    keyword?: string;
    memberId?: number;
}

export type UseMembersProps = {
    queryConfig?: object; // Có thể dùng Partial<UseQueryOptions>
} & GetAllergiesParams;

export const getAllergies = async ({ page, size, keyword, memberId }: GetAllergiesParams): Promise<GetAllergiesResponse> => {
    const response = await axios.get(`/allergies`, {
        params: {
            page,
            size,
            keyword,
            memberId
        },
    });
    return response.data
};

export const getAllergiesQueryOptions = ({
    page,
    size,
    keyword,
    memberId
}: GetAllergiesParams) => {
    return queryOptions({
        queryKey: page ? ["allergies", { page, size, keyword, memberId }] : ["allergies"], // cache dữ liệu
        queryFn: () => getAllergies({ page, size, keyword, memberId }), // gọi API 
    });

};



export const useAllergies = ({ queryConfig = {}, page, size, keyword, memberId }: UseMembersProps) => {
    return useQuery({
        ...getAllergiesQueryOptions({ page, size, keyword, memberId }),
        ...queryConfig, // nếu không truyền `queryConfig`, nó sẽ là object rỗng {}
    });
};