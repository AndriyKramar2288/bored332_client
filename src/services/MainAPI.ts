import type { BasicCountry, RegisterForm, UserProfile } from "./dto";
import { FirebaseAPI } from "./FirebaseAPI";

export interface MainAPI {
    getAllCountries(): Promise<BasicCountry[]>;
    login(email : string, password : string): Promise<UserProfile>;
    getCurrentUser(): Promise<UserProfile>;
    signin(registerForm : RegisterForm): Promise<void>;
}

export const photoPlaceholderSrc = "https://www.transitionshealthcarellc.com/wp-content/uploads/2022/12/placeholder-male-square.png"
export const currentAPI = new FirebaseAPI()