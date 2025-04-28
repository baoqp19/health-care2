
// ==========================

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


