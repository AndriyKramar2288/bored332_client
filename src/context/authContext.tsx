import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { UserProfile } from "../services/dto";
import { currentAPI } from "../services/MainAPI";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

// Тип контексту
interface AuthContextType {
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem("userProfile");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const profile = await currentAPI.getCurrentUser();
        setUserProfile(profile);
        localStorage.setItem("userProfile", JSON.stringify(profile));
      } else {
        setUserProfile(null);
        localStorage.removeItem("userProfile");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ userProfile, setUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};