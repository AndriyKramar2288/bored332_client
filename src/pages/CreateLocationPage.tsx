import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/authContext";
import type { CreateUniverseForm } from "../services/dto";
import { currentAPI, photoPlaceholderSrc } from "../services/MainAPI";
import MainPageHeader from "../components/mainPage/MainPageHeader";
import { INPUT_STYLES } from "../components/InputBox";

export default function CreateLocationPage() {
  const navigate = useNavigate();
  const { userProfile } = useAuth();

  const [form, setForm] = useState<CreateUniverseForm>({
    name: "",
    desc: "",
    photos: [photoPlaceholderSrc],
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (key: keyof CreateUniverseForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handlePhotoChange = (index: number, value: string) => {
    const updated = [...form.photos];
    updated[index] = value;
    setForm((prev) => ({ ...prev, photos: updated }));
  };

  const addPhotoField = () => {
    setForm((prev) => ({ ...prev, photos: [...prev.photos, ""] }));
  };

  const removePhotoField = (index: number) => {
    setForm((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.desc.trim()) return alert("Заповни всі поля!");
    setLoading(true);
    try {
      await currentAPI.createUniverse(form);
      navigate("/location"); // після успіху — на сторінку локацій
    } catch (err) {
      console.error(err);
      alert("Помилка при створенні всесвіту.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="flex flex-col px-24">
        <section className="flex my-12 flex-col">
          <MainPageHeader time={0.4}>
            Створити локацію
          </MainPageHeader>

          <motion.form
            onSubmit={handleSubmit}
            className="grid grid-cols-3 gap-6 p-6 pb-10 bg-[#7575754c]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex flex-col">
                {/* Назва */}
                <div>
                <label className="block text-lg text-gray-800 font-semibold mb-1">Назва</label>
                <input
                    type="text"
                    className={INPUT_STYLES}
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="Введіть назву всесвіту..."
                />
                </div>

                {/* Опис */}
                <div>
                <label className="block text-lg text-gray-800 font-semibold my-1">Опис</label>
                <textarea
                    className={INPUT_STYLES}
                    value={form.desc}
                    onChange={(e) => handleChange("desc", e.target.value)}
                    placeholder="Опишіть ваш всесвіт..."
                    rows={4}
                />
                </div>
            </div>

            {/* Фото */}
            <div>
              <label className="block text-lg text-gray-800 font-semibold mb-2">Фото</label>
              <div className="flex flex-col gap-3">
                {form.photos.map((photo, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3 bg-white/70 p-2 rounded-md shadow-sm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <img
                      src={photo || photoPlaceholderSrc}
                      alt="preview"
                      className="w-16 h-16 object-cover rounded-md border border-gray-300"
                    />
                    <input
                      type="text"
                      className={INPUT_STYLES}
                      value={photo}
                      onChange={(e) => handlePhotoChange(index, e.target.value)}
                      placeholder="URL фото..."
                    />
                    {form.photos.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removePhotoField(index)}
                        className="text-red-500 hover:text-red-700 font-bold"
                      >
                        ×
                      </button>
                    )}
                  </motion.div>
                ))}
                <button
                  type="button"
                  onClick={addPhotoField}
                  className="px-4 py-2 bg-[#5823235c] text-white rounded-sm hover:bg-[#58232374] transition"
                >
                  ➕ Додати фото
                </button>
              </div>
            </div>

            {/* Кнопка відправки */}
            <div className="flex justify-center items-center">
                <button
                type="submit"
                disabled={loading}
                className={`mt-4 px-6 py-3 rounded-md text-white font-semibold ${
                    loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700 transition"
                }`}
                >
                {loading ? "Створюється..." : "✅ Створити Всесвіт"}
                </button>
            </div>
          </motion.form>
        </section>
      </div>
    </main>
  );
}
