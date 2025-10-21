import type { Country_MainPage, CreateModelForm, CreateUniverseForm, Model_ModelsPage, RegisterForm, Universe_LocationsPage } from "./dto";
import { FirebaseAPI } from "./FirebaseAPI";

export interface MainAPI {
    // країни
    getAllCountries(): Promise<Country_MainPage[]>;
    // ауф
    login(email : string, password : string): Promise<UserProfile>;
    logout(): Promise<void>;
    getCurrentUser(): Promise<UserProfile>;
    signin(registerForm : RegisterForm): Promise<void>;
    // всесвіти
    createUniverse(form : CreateUniverseForm): Promise<void>;
    getAllUniverses(): Promise<Universe_LocationsPage[]>;
    // моделі
    createModel(form : CreateModelForm): Promise<void>;
    getAllModels(): Promise<Model_ModelsPage[]>;
}

export const photoPlaceholderSrc = "https://www.transitionshealthcarellc.com/wp-content/uploads/2022/12/placeholder-male-square.png"
export const currentAPI : MainAPI = new FirebaseAPI()

export interface UserProfile {
    id: string;
    email: string;
    password: string;
    username: string;
    avatarSrc?: string;
}