export interface BasicCountry {
    id?: string;
    name: string;
    flagSrc: string;
}

export interface RegisterForm {
    email: string;
    password: string;
    username: string;
}

export interface UserProfile {
    email: string;
    password: string;
    username: string;
    avatarSrc: string;
}