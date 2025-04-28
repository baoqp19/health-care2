import { AxiosResponse } from "axios";
import axios from "../../axios/axios-customize"
import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import { ROW_PER_PAGE } from "../../config/constants";
import { getAppointmentsQueryOptions } from "./get-appointment";
import { UpdateAppointmentParams } from "../../stores/appointments/appointmentStore";
import { Appointment123 } from "../../types";

export const updateApppointment = async ({ id, data }: UpdateAppointmentParams): Promise<Appointment123> => {
    const response: AxiosResponse<Appointment123> = await axios.put(`/appointments/${id}`, data);
    console.log(response.data)
    return response.data;

};

export const useUpdateAppointment = (options?: UseMutationOptions<Appointment123, Error, UpdateAppointmentParams>) => {
    const { onSuccess, onError, ...restConfig } = options || {};
    const queryClient = useQueryClient();

    return useMutation<Appointment123, Error, UpdateAppointmentParams>({
        mutationFn: updateApppointment,
        onSuccess: (data, ...args) => {
            queryClient.invalidateQueries({
                queryKey: getAppointmentsQueryOptions({ page: 1, size: ROW_PER_PAGE, keyword: "" }).queryKey,  // là hàm nên truyền đối số
            });
            onSuccess?.(data, ...args);
        },

        onError: (error, ...args) => {
            onError?.(error, ...args);
        },
        ...restConfig,
    });
};

