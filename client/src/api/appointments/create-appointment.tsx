import { AxiosResponse } from "axios";
import axios from "../../axios/axios-customize"
import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import { getAppointmentsQueryOptions } from "./get-appointment";
import { ROW_PER_PAGE } from "../../config/constants";
import { Appointment123 } from "../../types";

export const createAppointment = async (appointment: Appointment123): Promise<Appointment123> => {
    try {
        const response: AxiosResponse<Appointment123> = await axios.post("/appointments", appointment);
        console.log("Created Appointment:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error creating Appointment:", error);
        throw error;
    }
};

export const useCreateAppointment = (
    options: UseMutationOptions<Appointment123, Error, Appointment123> = {}
) => {
    const { onSuccess, onError, ...restConfig } = options;

    const queryClient = useQueryClient();


    return useMutation({
        mutationFn: createAppointment,
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
