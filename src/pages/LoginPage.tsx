import { useState } from "react";
import { currentAPI } from "../services/MainAPI";
import type { RegisterForm } from "../services/dto";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { setUserProfile } = useAuth();
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password || (mode === "register" && !username)) {
      setError("Заповніть всі поля");
      return;
    }

    setLoading(true);
    try {
      if (mode === "login") {
        const userProfileGetted = await currentAPI.login(email, password);
        setUserProfile(userProfileGetted)
        navigate("/")

      } else {
        const form: RegisterForm = { email, password, username };
        await currentAPI.signin(form);
      }
      // після успіху можна редіректити або оновити сторінку
    } catch (err: any) {
      setError(err?.message || "Щось пішло не так");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-red shadow-lg py-6">
        <div className="flex justify-center mb-6 gap-4">
          <button
            className={`px-4 py-2 rounded-lg font-medium ${
              mode === "login" ? "bg-gray-500 text-white" : "bg-red button-bg"
            }`}
            onClick={() => setMode("login")}
          >
            Увійти
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-medium ${
              mode === "register" ? "bg-gray-500 text-white" : "bg-red button-bg"
            }`}
            onClick={() => setMode("register")}
          >
            Зареєструватися
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col">
          {error && <div className="text-red-700 bg-red-50 p-2 rounded">{error}</div>}

          {mode === "register" && (
            <label className="flex flex-col">
              <span className="text-sm text-slate-300 ml-5">Ім'я користувача</span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 px-3 py-2 outline-none duration-200 bg-[#4f2222] focus:bg-[#522424] hover:bg-[#4a1f1f] text-slate-300"
              />
            </label>
          )}

          <label className="flex flex-col mt-5">
            <span className="text-sm text-slate-300 ml-5">Електронна скринька</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 px-3 py-2 outline-none duration-200 bg-[#4f2222] focus:bg-[#522424] hover:bg-[#4a1f1f] text-slate-300"
              placeholder="email@example.com"
            />
          </label>

          <label className="flex flex-col my-5">
            <span className="text-sm text-slate-300 ml-5">Пароль</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 px-3 py-2 outline-none duration-200 bg-[#4f2222] focus:bg-[#522424] hover:bg-[#4a1f1f] text-slate-300"
            />
          </label>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-red button-bg font-medium px-4 py-2 rounded-md transition disabled:opacity-60"
            >
              {loading ? "Завантаження..." : mode === "login" ? "Увійти" : "Зареєструватися"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

