import { message } from 'antd';
import { create } from 'zustand';
import { Document, MedicalRecord, Medication, MemberSummary123 } from '../types';




export interface MedicalRecordUpdateProps {
    member: MemberSummary123
    date: string
    doctor: string
    symptoms: string
    diagnosis: string
    treatment: string
    facilityName: string
}

export interface UpdateMedicalRecordParams {
    recordID: number | null;
    data: MedicalRecordUpdateProps;
}

interface MedicalRecordsStore {
    medicalRecord: MedicalRecord | null;
    isLoading: boolean;
    error: string | null;
    openCreateModal: boolean;
    openUpdateModal: boolean;
    openDeleteModal: boolean;
    listMedications: Medication[];
    listDocuments: Document[];

    setMedicalRecord: (medicalRecord: MedicalRecord | null) => void;
    setLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
    setOpenCreateModal: (open: boolean) => void;
    setOpenUpdateModal: (open: boolean) => void;
    setOpenDeleteModal: (open: boolean) => void;
    setListDocument: (listDocuments: Document[]) => void;
    setListMedication: (listMedications: Medication[]) => void;
    clearListDocument: () => void;
    addMedication: () => void;
    clearListMedication: () => void;


    removeMedication: (position: number) => void;
    handleInputMedicationChange: (
        position: number,
        field: keyof Medication,
        value: string
    ) => void;

    addDocument: () => void;
    removeDocument: (position: number) => void;
    handleFileChange: (position: number, file: File) => void;
    handleUrlFileChange: (position: number, url: string) => void;
    handleInputDocumentChange: (
        position: number,
        field: keyof Document,
        value: string | number
    ) => void;
}


export const useMedicalRecordsStore = create<MedicalRecordsStore>((set) => ({
    medicalRecord: null,
    isLoading: false,
    error: null,
    openCreateModal: false,
    openUpdateModal: false,
    openDeleteModal: false,
    listMedications: [],
    listDocuments: [],

    setMedicalRecord: (medicalRecord) => set({ medicalRecord }),
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
    setOpenCreateModal: (open) => set({ openCreateModal: open }),
    setOpenUpdateModal: (open) => set({ openUpdateModal: open }),
    setOpenDeleteModal: (open) => set({ openDeleteModal: open }),
    setListDocument: (listDocuments) => set({ listDocuments }),
    setListMedication: (listMedications) => set({ listMedications }),
    clearListDocument: () => set({ listDocuments: [] }),
    clearListMedication: () => set({ listMedications: [] }),

    addMedication: () =>
        set((state) => ({
            listMedications: [
                ...state.listMedications,
                {
                    position: state.listMedications.length + 1,
                    name: "",
                    frequency: "",
                    startDate: "",
                    endDate: "",
                },
            ],
        })),

    removeMedication: (position) =>
        set((state) => ({
            listMedications: state.listMedications.filter((m) => m.position !== position),
        })),

    handleInputMedicationChange: (position, field, value) =>
        set((state) => ({
            listMedications: state.listMedications.map((m) =>
                m.position === position ? { ...m, [field]: value } : m
            ),
        })),

    addDocument: () =>
        set((state) => ({
            listDocuments: [
                ...state.listDocuments,
                {
                    position: state.listDocuments.length + 1,
                    name: "",
                    type: "",
                    size: 0,
                    path: "",
                },
            ],
        })),

    removeDocument: (position) =>
        set((state) => ({
            listDocuments: state.listDocuments.filter((d) => d.position !== position),
        })),

    handleFileChange: (position, file) => {
        if (!file) return;
        if (file.size > 5 * 1024 * 1024) {
            message.error("File không được vượt quá 5MB");
            return;
        }
        set((state) => ({
            listDocuments: state.listDocuments.map((d) =>
                d.position === position
                    ? {
                        ...d,
                        name: file.name,
                        type: file.type,
                        size: file.size,
                        path: URL.createObjectURL(file),
                    }
                    : d
            ),
        }));
    },

    handleUrlFileChange: (position, url) =>
        set((state) => ({
            listDocuments: state.listDocuments.map((d) =>
                d.position === position ? { ...d, path: url } : d
            ),
        })),

    handleInputDocumentChange: (position, field, value) =>
        set((state) => ({
            listDocuments: state.listDocuments.map((d) =>
                d.position === position ? { ...d, [field]: value } : d
            ),
        })),
}));