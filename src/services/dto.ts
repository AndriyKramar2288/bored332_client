// ГОЛОВНА СТОРІНКА

export interface Country_MainPage {
    name: string;
    flagSrc: string;
    description: string;
    lawCount: number;
    location: {
        universe: {
            desc: string;
            name: string;
            photos: string[]   
        }
        coordinates: string;
        regions: string[];
    }
    implementations: {
        currentRate: number;
        law: { name : string };
        institute: { name : string };
    }[]
}

// СТОРІНКА ВСЕСВІТІВ

export interface Universe_LocationsPage {
    desc: string;
    name: string;
    photos: string[]   
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