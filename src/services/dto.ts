export interface BasicCountry extends Country_LocationPage {
    location: BasicLocation;
}

export interface BasicUniverse {
    id: string;
    desc: string;
    name: string;
    photos: string[]    
}

export interface BasicLocation {
    id: string;
    universe: BasicUniverse;
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

export interface UserProfile {
    id: string;
    email: string;
    password: string;
    username: string;
    avatarSrc?: string;
    positions: UserPosition[];
}

interface UserPosition {
    country: BasicCountry;
    role: string;
}

// СТОРІНКА ВСЕСВІТІВ

export interface Location_LocationPage extends BasicLocation {
   countries: Country_LocationPage[];
}

export interface Country_LocationPage {
    id: string;
    name: string;
    flagSrc: string;
    description: string;
    lawCount: number;
    implementations: BasicInstituteImplementation[];
}

// ФОРМИ

export interface RegisterForm {
    email: string;
    password: string;
    username: string;
}

export interface CreateUniverseForm {
    desc: string;
    name: string;
    photos: string[];
}