
// ==========================

import { Member } from "../stores/MemberStore";

export type Meta = {
    current_page: number;
    per_page: number;
    total_pages: number;
    total_elements: number;
};



export type User = {
    id: number;
    firstName: string;
    lastName: string;
};

export type MemberAndUser = {
    id: number;
    user: User;
    fullName: string;
    dateOfBirth: string; // hoặc Date nếu bạn parse lúc nhận về
    gender: "MALE" | "FEMALE" | string;
    relationship: string;
    bloodType: "A" | "B" | "AB" | "O" | string;
    height: number;
    weight: number;
};


// =======================

export type MemberSummary = {
    memberId: number;
    fullName: string;
};

export type Appointment123 = {
    id: number;
    member: MemberSummary;
    time: string; // ISO datetime string
    doctor: string;
    location: string;
};


export interface AppointmentUpdateProps {
    memberId: number
    time: string
    doctor: string
    location: string
}

export type AppointmentResponse = {
    items: Appointment123[];
    meta: Meta;
};


export interface Vaccination123 {
    id: number;
    member: MemberSummary;
    vaccineName: string;
    dateAdministered: string; // ISO date string
}

export interface GetVaccinationsResponse {
    items: Vaccination123[];
    meta: Meta;
}


export interface Allergy123 {
    id: number;
    member: MemberSummary;
    allergyType: string;
    severity: string;
    symptoms: string;
}

export interface GetAllergiesResponse {
    items: Allergy123[];
    meta: Meta;
}




// Định nghĩa kiểu cho User
interface MemberSeleter {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role: string;
    refreshToken: string;
    _block: boolean;
    _verify: boolean;
}

// Định nghĩa kiểu cho Member
export interface MemberAndUserSelecter {
    id: number;
    user: MemberSeleter;  // Lồng kiểu User vào Member
    fullName: string;
    dateOfBirth: string;
    gender: string;
    relationship: string;
    bloodType: string;
    height: number;
    weight: number;
}


export type MemberSummary123 = {
    memberId: number;
    fullName: string;
};

export interface Medication {
    id?: number;
    position: number;
    name: string;
    frequency?: string;
    startDate: string;
    endDate?: string;
}

export interface Document {
    id?: number;
    position: number;
    size: number;
    name: string;
    type: string;
    path: string;
}



export interface PaginatedMedicalRecordResponse {
    items: MedicalRecord[];
    meta: Meta;
}




export interface MedicalRecord {
    id: number;
    member: MemberSummary123;
    date: string;
    doctor: string;
    symptoms: string;
    diagnosis: string;
    treatment: string;
    facilityName: string;
    medications: Medication[];
    documents: Document[];
}


