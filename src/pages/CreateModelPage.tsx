import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/authContext";
import type { CreateModelForm } from "../services/dto";
import MainPageHeader from "../components/mainPage/MainPageHeader";
import InputBox, { INPUT_STYLES } from "../components/InputBox";
import Tip from "../components/Tip";
import LawCreator from "../components/LawCreator";

export default function CreateModelPage() {
  const navigate = useNavigate();
  const { userProfile } = useAuth();

  const [form, setForm] = useState<CreateModelForm>({
    name: "",
    description: "",
    laws: [],
    iconSrc: "",
    institutes: []
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (key: keyof CreateModelForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
        !form.name.trim() || 
        !form.description.trim() || 
        !form.iconSrc.trim() || 
        form.laws.some(law => !law.text || !law.name)
    ) return alert("Заповни всі поля!");
    setLoading(true);
    try {
      //await currentAPI.createUniverse(form);
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
            Створити модель управління
          </MainPageHeader>

          <motion.form
            onSubmit={handleSubmit}
            className="grid grid-cols-[2fr_2fr_1fr] gap-6 p-6 pb-10 mb-6 bg-[#7575754c]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex flex-col">
                {/* Назва */}
                <InputBox label="назва...">
                  <input
                        type="text"
                        className={INPUT_STYLES}
                        value={form.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        placeholder="Введіть назву моделі управління..."
                    />
                </InputBox>

                {/* Опис */}
                <InputBox label="опис...">
                    <textarea
                        className={INPUT_STYLES}
                        value={form.description}
                        onChange={(e) => handleChange("description", e.target.value)}
                        placeholder="Дайте загальний опис моделі..."
                        rows={4}
                    />
                </InputBox>
            </div>
              
            <div className="flex flex-col">
              <InputBox label="іконка моделі...">
                <div className="flex items-center gap-3 my-2">
                  <img
                    src={form.iconSrc || "https://cdn-icons-png.flaticon.com/512/25/25369.png"}
                    alt="preview"
                    className="w-16 h-16 p-4 object-cover rounded-md border-2 border-gray-300 bg-gray-300/75"
                  />
                  <input
                    type="text"
                    className="w-full rounded-xs py-1 px-3 bg-white/80 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-800 duration-200"
                    value={form.iconSrc}
                    onChange={(e) => handleChange("iconSrc", e.target.value)}
                    placeholder="URL іконки моделі..."
                  />
                </div>
              </InputBox>

              <InputBox label="закони та інститути...">
                <div className="grid grid-cols-[1fr_2fr_auto] my-2 gap-2 items-center">
                    <label className="block text-lg text-gray-50/30 font-semibold py-1 rounded-xs whitespace-nowrap">- закони</label>
                    <div className="flex items-center justify-end gap-2">
                        <p className="text-gray-50">кількість законів: {form.laws.length}</p>
                        <button 
                            type="button" 
                            onClick={(e) => form.laws.length < 25 && 
                                    setForm(prev => ({...prev, laws: [...prev.laws, {description: "", name: "", text: ""}] }))} 
                            className="flex justify-center bg-[#6b6b6b6c] hover:bg-[#5454546c] shadow-[#6b6b6b6c] duration-200 cursor-pointer p-2 rounded-xs shadow">
                            <img className="max-w-6" src="https://www.svgrepo.com/show/312862/plus.svg" />
                        </button>
                    </div>
                    <Tip>Тут слід ввести приблизні координати столиці (або іншого 'керівного' місця) вашої держави.</Tip>

                    <label className="block text-lg text-gray-50/30 font-semibold py-1 rounded-xs whitespace-nowrap">- інститути</label>
                    <div className="flex items-center justify-end gap-2">
                        <p className="text-gray-50">к-ть інститутів: {form.institutes.length}</p>
                        <button 
                            type="button" 
                            onClick={(e) => form.institutes.length < 10 && 
                                    setForm(prev => ({...prev, institutes: [...prev.institutes, {description: "", name: "", requirements: []}] }))} 
                            className="flex justify-center bg-[#6b6b6b6c] hover:bg-[#5454546c] shadow-[#6b6b6b6c] duration-200 cursor-pointer p-2 rounded-xs shadow">
                            <img className="max-w-6" src="https://www.svgrepo.com/show/312862/plus.svg" />
                        </button>
                    </div>
                    <Tip>Тут слід вказати перелік регіонів, що орієнтовно входять в межі вашої держави (в контексті конкретного всесвіту)</Tip>
                  </div>
              </InputBox>
            </div>

            {/* Кнопка відправки */}
            <div className="flex flex-col justify-between items-center">
                <button
                type="submit"
                disabled={loading}
                className={`mt-4 px-6 py-3 rounded-md text-white font-semibold ${
                    loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700 transition"
                }`}
                >
                {loading ? "Створюється..." : "✅ Створити модель управління"}
                </button>
                <img className="p-8" src="https://www.svgrepo.com/show/505174/community-corrections-bureau.svg" />
            </div>
          </motion.form>
          <div className="gap-5 flex flex-col">
            {form.laws.map((_, index) => (
                <LawCreator 
                  index={index} 
                  setLaw={(law) => setForm(prev => ({...prev, laws: prev.laws.map((l, i) => i === index ? law : l)}))}
                  onDelete={() => setForm(prev => ({ ...prev, laws: prev.laws.filter((law, i) => i !== index) }))} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
