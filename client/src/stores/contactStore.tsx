import { create } from "zustand";


export interface Contacts {
    contactID: number
    userID: number
    email: string
    content: string
    date: string
    status: number

}

export interface MetaData {
    current_page: number;
    per_page: number;
    total_pages: number;
    total_elements: number;
}

export interface ContactResponse {
    items: Contacts[];
    meta: MetaData;
}

interface ContactsStore {
    contact: Contacts | null;
    isLoading: boolean;
    error: string | null;
    openCreateModal: boolean;
    openUpdateModal: boolean;
    openDeleteModal: boolean;

    setContacts: (contact: Contacts) => void;
    setLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
    setOpenCreateModal: (open: boolean) => void;
    setOpenUpdateModal: (open: boolean) => void;
    setOpenDeleteModal: (open: boolean) => void;

}


export const useContactsStore = create<ContactsStore>((set) => ({
    contact: null,
    isLoading: false,
    error: null,
    openCreateModal: false,
    openUpdateModal: false,
    openDeleteModal: false,

    setContacts: (contact) => set({ contact }),
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
    setOpenCreateModal: (openCreateModal) => set({ openCreateModal }),
    setOpenUpdateModal: (openUpdateModal) => set({ openUpdateModal }),
    setOpenDeleteModal: (openDeleteModal) => set({ openDeleteModal }),
  
}));