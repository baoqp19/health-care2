import axios from "../../axios/axios-customize"
import { queryOptions, useQuery } from "@tanstack/react-query";
import { AppointmentResponse } from "../../types";



export type GetAppointmentsParams = {
    page: number;
    size: number;
    keyword?: string;
    memberId?: number;
}

export type UseAppointmentProps = {
    queryConfig?: object; // Có thể dùng Partial<UseQueryOptions>
} & GetAppointmentsParams;

export const getAppointments = async ({ page, size, keyword, memberId }: GetAppointmentsParams): Promise<AppointmentResponse> => {
    const response = await axios.get("/appointments", {
        params: {
            page,
            size,
            keyword,
            memberId
        }
    })
    console.log(response.data)
    return response.data
}


export const getAppointmentsQueryOptions = ({
    page,
    size,
    keyword,
    memberId
}: GetAppointmentsParams) => {
    return queryOptions({
        queryKey: page ? ["Appointments", { page, size, keyword, memberId }] : ["Appointments"], // cache dữ liệu
        queryFn: () => getAppointments({ page, size, keyword, memberId }), // gọi API 
    });
}


export const useAppointments = ({ queryConfig = {}, page, size, keyword, memberId }: UseAppointmentProps) => {
    return useQuery({
        ...getAppointmentsQueryOptions({ page, size, keyword, memberId }),
        ...queryConfig, // nếu không truyền `queryConfig`, nó sẽ là object rỗng {}
    });
};