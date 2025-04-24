import { create } from "zustand"


export interface Note {
    noteID: number
    userID: number
    title: string
    content: string
    createAt: string
    noteIndex: number
}

export interface NoteC {
    title: string
    content: string
    createAt: string
    noteIndex: number
}

type NoteUpdateProps = {
    noteIndex?: number;
    createAt?: string;
    title: string;
    content: string;
}

export interface UpdateNoteParams {
    noteId: number;
    data: NoteUpdateProps;
}


interface NotesStore {
    note: Note | null;
    isLoading: boolean;
    error: string | null;
    openCreateModal: boolean;
    openUpdateModal: boolean;
    openDeleteModal: boolean;

    setNote: (note: Note) => void;
    setLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
    setOpenCreateModal: (open: boolean) => void;
    setOpenUpdateModal: (open: boolean) => void;
    setOpenDeleteModal: (open: boolean) => void;

}





export const useNotesStore = create<NotesStore>((set) => ({
    note: null,
    isLoading: false,
    error: null,
    openCreateModal: false,
    openUpdateModal: false,
    openDeleteModal: false,


    setNote: (note) => set({ note }),
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
    setOpenCreateModal: (openCreateModal) => set({ openCreateModal }),
    setOpenUpdateModal: (openUpdateModal) => set({ openUpdateModal }),
    setOpenDeleteModal: (openDeleteModal) => set({ openDeleteModal }),


}));