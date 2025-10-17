import { addDoc, collection, doc, getDoc, getDocs, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import type { MainAPI, UserProfile } from "./MainAPI"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";
import type { Country_MainPage, CreateUniverseForm, RegisterForm, Universe_LocationsPage } from "./dto";

interface BasicCountry {
    id: string;
    name: string;
    flagSrc: string;
    description: string;
    location: {
        id: string;
        universe_id: String;
        coordinates: string;
        regions: string[];
    }
}

interface BasicModel {
    id: string;
    name: string;
    iconSrc: string;
    desciption: string;
}

interface BasicUniverse {
    id: string;
    desc: string;
    name: string;
    photos: string[];
    author_id: string; 
}

interface BasicInstitute {
    id: string;
    name: string;
    description: string;
    type: "IN_COUNTRY" | "IN_MODEL";
    keeper_id: string;
}

interface BasicInstituteImplementation {
    id: string;
    institute_id: string;
    country_id: string;
    law_id: string;
    currentRate: number;
}

interface BasicLaw {
    id: string;
    date: Date;
    name: string;
    text: string;
    type: "IN_COUNTRY" | "IN_MODEL";
    keeper_id: string;
}

interface UserPosition {
    country: BasicCountry;
    role: string;
}

export class FirebaseAPI implements MainAPI {
    getAllCountries(): Promise<Country_MainPage[]> {
        throw new Error("Method not implemented.");
    }

    async getAllUniverses(): Promise<Universe_LocationsPage[]> {
        const querySnapshot = await getDocs(collection(db, "universes"));

        // перетворюємо документи Firestore у типізований масив BasicUniverse
        const universes: BasicUniverse[] = querySnapshot.docs.map((doc) => {
            const data = doc.data();

            return {
                author_id: data.author_id,
                id: doc.id, // автоматично згенерований Firestore ID
                name: data.name || "Без назви",
                desc: data.desc || "",
                photos: Array.isArray(data.photos) ? data.photos : [],
            };
        });

        return universes;
    }

    async createUniverse(form: CreateUniverseForm): Promise<void> {
        await addDoc(collection(db, "universes"), {
            ...form,
            createdAt: serverTimestamp(),
        });
    }

    async logout(): Promise<void> {
        await signOut(auth);
    }
    
    async getCurrentUser(): Promise<UserProfile> {
        if (auth.currentUser) {
            return this.getUserProfile(auth.currentUser.uid);
        } else {
            throw new Error("User profile not found! (there is no current user)");
        }
    }

    private async getUserProfile(uid: string) : Promise<UserProfile> {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data() as UserProfile;
        } else {
            throw new Error("User profile not found!");
        }
    }

    async signin(registerForm : RegisterForm): Promise<void> {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, registerForm.email, registerForm.password);
            const user = userCredential.user;

            // Оновлюємо профіль користувача (щоб у Auth теж було ім’я)
            await updateProfile(user, { displayName: registerForm.username });

            // Зберігаємо додаткову інформацію в Firestore
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                email: user.email,
                username: registerForm.username,
                avatarSrc: "",
                createdAt: serverTimestamp(),
            });

            console.log("✅ User created and profile saved:", user.uid);
        } catch (error) {
            console.error("❌ Signup error:", error);
            throw error;
        }
    }

    async login(email: string, password: string): Promise<UserProfile> {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return this.getUserProfile(userCredential.user.uid);
    }
}