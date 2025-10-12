import type { Country_MainPage, CreateUniverseForm, RegisterForm, Universe_LocationsPage } from "./dto";
import { FirebaseAPI } from "./FirebaseAPI";

export interface MainAPI {
    getAllCountries(): Promise<Country_MainPage[]>;
    login(email : string, password : string): Promise<UserProfile>;
    logout(): Promise<void>;
    getCurrentUser(): Promise<UserProfile>;
    signin(registerForm : RegisterForm): Promise<void>;
    createUniverse(form : CreateUniverseForm): Promise<void>;
    getAllUniverses(): Promise<Universe_LocationsPage[]>;
}

export const photoPlaceholderSrc = "https://www.transitionshealthcarellc.com/wp-content/uploads/2022/12/placeholder-male-square.png"
export const currentAPI = new FirebaseAPI()

export interface UserProfile {
    id: string;
    email: string;
    password: string;
    username: string;
    avatarSrc?: string;
}