import { create } from "zustand";
import { Allergy123 } from "../types";

// Định nghĩa kiểu dữ liệu cho store Zustand

export interface Allergy {
    id: number;
    memberId: number;
    allergyType: string,
    severity: string,
    symptoms: string,
}


export interface AllergyUpdateProps {
    memberId: number;
    allergyType: string,
    severity: string,
    symptoms: string,
}



// Định nghĩa kiểu dữ liệu cho hàm mutationFn
export interface UpdateAllergyProps {
    id: number | null;
    data: AllergyUpdateProps;
}



interface MembersStore {

    allergy: Allergy123 | null;
    isLoading: boolean;
    error: string | null;
    openCreateModal: boolean;
    openUpdateModal: boolean;
    openDeleteModal: boolean;

    setAllergy: (allergy: Allergy123) => void;
    setLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
    setOpenCreateModal: (open: boolean) => void;
    setOpenUpdateModal: (open: boolean) => void;
    setOpenDeleteModal: (open: boolean) => void;
}


// Tạo Zustand store với kiểu dữ liệu `MembersStore`
export const useAllergiesStore = create<MembersStore>((set) => ({
    allergy: null,
    isLoading: false,
    error: null,
    openCreateModal: false,
    openUpdateModal: false,
    openDeleteModal: false,


    setAllergy: (allergy) => set({ allergy }),
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
    setOpenCreateModal: (openCreateModal) => set({ openCreateModal }),
    setOpenUpdateModal: (openUpdateModal) => set({ openUpdateModal }),
    setOpenDeleteModal: (openDeleteModal) => set({ openDeleteModal }),


}));
