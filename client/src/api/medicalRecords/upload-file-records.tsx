import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import axios from "../../axios/axios-customize"
export const uploadFile = (file: File | Blob): Promise<any> => {
    const formData = new FormData();
    formData.append("file", file);

    return axios.post(`/files/upload`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const useUploadFile = (
    options: UseMutationOptions<any, Error, File | Blob> = {}
) => {
    const { onSuccess, onError, ...restConfig } = options;

    return useMutation<any, Error, File | Blob>({
        mutationFn: (file) => uploadFile(file),
        onSuccess: (data, ...args) => {
            onSuccess?.(data, ...args);
        },
        onError: (error, ...args) => {
            onError?.(error, ...args);
        },
        ...restConfig,
    });
};