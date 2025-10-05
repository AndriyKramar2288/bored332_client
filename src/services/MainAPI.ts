import type { BasicCountry, RegisterForm, UserProfile } from "./dto";
import { FirebaseAPI } from "./FirebaseAPI";

export interface MainAPI {
    getAllCountries(): Promise<BasicCountry[]>;
    login(email : string, password : string): Promise<void>;
    signin(registerForm : RegisterForm): Promise<void>;
    getCurrentUser(): UserProfile | null;
}

export const currentAPI = new FirebaseAPI()