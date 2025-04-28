import { queryOptions, useQuery } from "@tanstack/react-query";
import axios from "../../axios/axios-customize"
import { GetVaccinationsResponse } from "../../types";


export type GetVaccinationParams = {
    page: number;
    size: number;
    keyword?: string;
    memberId?: number;
}


export type UseVaccinationProps = {
    queryConfig?: object; // Có thể dùng Partial<UseQueryOptions>
} & GetVaccinationParams;



export const getVaccinations = async ({ page, size, keyword, memberId }: GetVaccinationParams): Promise<GetVaccinationsResponse> => {
    const response = await axios.get(`/vaccinations`, {
        params: {
            page,
            size,
            keyword,
            memberId
        },
    });
    return response.data
};


export const getVaccinationsQueryOptions = ({
    page,
    size,
    keyword,
    memberId
}: GetVaccinationParams) => {
    return queryOptions({
        queryKey: page ? ["vaccinations", { page, size, keyword, memberId }] : ["vaccinations"], // cache dữ liệu
        queryFn: () => getVaccinations({ page, size, keyword }), // gọi API 
    });

};

export const useVaccinations = ({ queryConfig = {}, page, size, keyword, memberId }: UseVaccinationProps) => {
    return useQuery({
        ...getVaccinationsQueryOptions({ page, size, keyword, memberId }),
        ...queryConfig, // nếu không truyền `queryConfig`, nó sẽ là object rỗng {}
    });
};


