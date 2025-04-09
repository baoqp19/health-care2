import { create } from "zustand";


export interface Users {
    id: number
    firstname: string
    lastname: string
    is_verify: boolean
    is_block: boolean
    email: string
}

export interface MetaData {
    current_page: number;
    per_page: number;
    total_pages: number;
    total_elements: number;
}

export interface UserResponse {
    items: Users[];
    meta: MetaData;
}

interface UsersStore {
    user: Users | null;
    isLoading: boolean;
    error: string | null;
    openCreateModal: boolean;
    openUpdateModal: boolean;
    openDeleteModal: boolean;

    setUsers: (user: Users) => void;
    setLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
    setOpenCreateModal: (open: boolean) => void;
    setOpenUpdateModal: (open: boolean) => void;
    setOpenDeleteModal: (open: boolean) => void;

}


export const useUsersStore = create<UsersStore>((set) => ({
    user: null,
    isLoading: false,
    error: null,
    openCreateModal: false,
    openUpdateModal: false,
    openDeleteModal: false,

    setUsers: (user) => set({ user }),
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
    setOpenCreateModal: (openCreateModal) => set({ openCreateModal }),
    setOpenUpdateModal: (openUpdateModal) => set({ openUpdateModal }),
    setOpenDeleteModal: (openDeleteModal) => set({ openDeleteModal }),
}));