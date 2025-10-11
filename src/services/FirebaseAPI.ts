import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import type { BasicCountry, RegisterForm, UserProfile } from "./dto";
import type { MainAPI } from "./MainAPI"
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, updateProfile, type User } from "firebase/auth";

export class FirebaseAPI implements MainAPI {
    
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

    getAllCountries(): Promise<BasicCountry[]> {
        throw new Error("Method not implemented.");
    }

    async login(email: string, password: string): Promise<UserProfile> {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return this.getUserProfile(userCredential.user.uid);
    }
}