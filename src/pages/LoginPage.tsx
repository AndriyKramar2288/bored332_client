import { useState } from "react";
import { currentAPI } from "../services/MainAPI";
import type { RegisterForm } from "../services/dto";
import { useAuth } from "../context/authContext";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { setUserProfile } = useAuth();

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
      <div className="w-full max-w-md bg-white dark:bg-slate-800 shadow-lg p-6">
        <div className="flex justify-center mb-6 gap-4">
          <button
            className={`px-4 py-2 rounded-lg font-medium ${
              mode === "login" ? "bg-amber-500 text-white" : "bg-gray-200 dark:bg-slate-700"
            }`}
            onClick={() => setMode("login")}
          >
            Login
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-medium ${
              mode === "register" ? "bg-amber-500 text-white" : "bg-gray-200 dark:bg-slate-700"
            }`}
            onClick={() => setMode("register")}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="text-red-700 bg-red-50 p-2 rounded">{error}</div>}

          {mode === "register" && (
            <label className="block">
              <span className="text-sm text-slate-700 dark:text-slate-300">Username</span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full rounded-md border border-slate-300 dark:border-slate-700 px-3 py-2 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
                placeholder="Username"
              />
            </label>
          )}

          <label className="block">
            <span className="text-sm text-slate-700 dark:text-slate-300">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border border-slate-300 dark:border-slate-700 px-3 py-2 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="email@example.com"
            />
          </label>

          <label className="block">
            <span className="text-sm text-slate-700 dark:text-slate-300">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border border-slate-300 dark:border-slate-700 px-3 py-2 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="••••••••"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 rounded-md transition disabled:opacity-60"
          >
            {loading ? "Завантаження..." : mode === "login" ? "Увійти" : "Зареєструватися"}
          </button>
        </form>
      </div>
    </main>
  );
}

