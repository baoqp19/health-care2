import { useMutation, UseMutationOptions, } from "@tanstack/react-query";
import axios from "../../axios/axios-customize"
import { useAuthStore } from "../../stores/auth/authStore";
import { AxiosResponse } from "axios";

export const login = async ({ email, password }: any) => {

    const response = await axios.post("/auth/login", {
        email,
        password,
    });

    const result = response.data
    console.log(result)
    return result; // Lấy dữ liệu từ response

};

interface LoginResponse {
    user: {
        id: number;
        email: string;
        firstName: string;
        lastName: string;
    };
    access_token: string;
};


interface UseLoginOptions {
    onSuccess?: (data: LoginResponse, ...args: any[]) => void;
    onError?: (error: unknown, ...args: any[]) => void;
}

export const useLogin = (options: UseLoginOptions = {}) => {
    const { onSuccess, onError, ...restConfig } = options;
    const { setUser, setIsAuthenticated } = useAuthStore((state) => state);

    return useMutation<LoginResponse, unknown, Parameters<typeof login>[0]>({
        mutationFn: login,
        onSuccess: (data, ...args) => {
            const result = data;
            setUser(result.user);
            localStorage.setItem("access_token", result.access_token)
            setIsAuthenticated(true);
            onSuccess?.(data, ...args);
        },
        onError: (error, ...args) => {
            onError?.(error, ...args);
            setIsAuthenticated(false);
            localStorage.removeItem("access_token")
        },
        ...restConfig,
    });
};

// // ✅ Kiểu dữ liệu chuẩn
export type GoogleLoginRequest = {
    credential?: string;
    select_by?: string;
    clientId?: string;
};

export type GoogleLoginResponse = {
    credential: string;
};

export type GoogleLoginData = {
    data: GoogleLoginRequest;
};

type MutationConfig = {
    onSuccess?: (data: GoogleLoginResponse) => void;
    onError?: (error: any) => void;
}

// Cập nhật hàm `useGoogleLogin` để nhận `GoogleLoginData`
export const googleLogin = async ({ data }: GoogleLoginData): Promise<GoogleLoginResponse> => {
    const response: AxiosResponse<GoogleLoginResponse> = await axios.post<GoogleLoginResponse>(`/oauth2/google`, data);
    return response.data;
};


// ✅ Hook mutation
export const useGoogleLoginMutation = ({
    mutationConfig,
}: {
    mutationConfig: MutationConfig;
}) => {
    const { onSuccess, ...restConfig } = mutationConfig || {};

    return useMutation<GoogleLoginResponse, any, GoogleLoginData>({
        mutationFn: googleLogin,
        onSuccess: (data, variables, context) => {
            onSuccess?.(data);
        },
        ...restConfig,
    });
};


