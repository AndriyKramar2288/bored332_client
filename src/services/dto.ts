export interface BasicCountry {
    id: string;
    name: string;
    flagSrc: string;
    location: BasicLocation;
    description: string;
    lawCount: number;
    implementations: BasicInstituteImplementation[];
}

export interface BasicLocation {
    id: string;
    universe: string;
    desc: string;
    coordinates: string;
    regions: string[];
}

export interface BasicInstitute {
    id: string;
    name: string;
    description: string;
    implementedCountiesCount: number;
}

export interface BasicInstituteImplementation {
    id: string;
    institute: BasicInstitute;
    law: BasicLaw;
    currentRate: number;
}

export interface BasicLaw {
    id: string;
    date: Date;
    text: string;
}

export interface RegisterForm {
    email: string;
    password: string;
    username: string;
}

export interface UserProfile {
    id: string;
    email: string;
    password: string;
    username: string;
    avatarSrc?: string;
}