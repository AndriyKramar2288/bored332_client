import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/authContext";
import type { CreateCountryForm } from "../services/dto";
import MainPageHeader from "../components/mainPage/MainPageHeader";
import InputBox, { INPUT_STYLES } from "../components/InputBox";
import Tip from "../components/Tip";

export default function CreateCountryPage() {
  const navigate = useNavigate();
  const { userProfile } = useAuth();

  const [form, setForm] = useState<CreateCountryForm>({
    name: "",
    description: "",
    flagSrc: "",
    location: {
        coordinates: "",
        regions: [],
        universe_id: ""
    }
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (key: keyof CreateCountryForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
        !form.name.trim() || 
        !form.description.trim() || 
        !form.flagSrc.trim() || 
        !form.location.coordinates.trim() || 
        !form.location.regions.length || 
        form.location.universe_id
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
            Створити державу
          </MainPageHeader>

          <motion.form
            onSubmit={handleSubmit}
            className="grid grid-cols-[2fr_2fr_1fr] gap-6 p-6 pb-10 bg-[#7575754c]"
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
                        placeholder="Введіть назву держави..."
                    />
                </InputBox>

                {/* Опис */}
                <div className="mt-5 bg-[#37373721] px-4 py-2 rounded-sm">
                    <h1 className="text-gray-200/40">опис...</h1>
                    <textarea
                        className={INPUT_STYLES}
                        value={form.description}
                        onChange={(e) => handleChange("description", e.target.value)}
                        placeholder="Дайте загальний опис вашої держави..."
                        rows={4}
                    />
                </div>
            </div>

            {/* Фото */}
            <div className="flex flex-col">
              <div className="mt-5 bg-[#37373721] px-4 py-2 rounded-sm">
                <h1 className="text-gray-200/40">прапор...</h1>
                <div className="flex items-center gap-3 my-2">
                  <img
                    src={form.flagSrc || "https://cdn-icons-png.flaticon.com/512/25/25369.png"}
                    alt="preview"
                    className="w-16 h-16 p-4 object-cover rounded-md border-2 border-gray-300 bg-gray-300/75"
                  />
                  <input
                    type="text"
                    className="w-full rounded-xs py-1 px-3 bg-white/80 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-800 duration-200"
                    value={form.flagSrc}
                    onChange={(e) => handleChange("flagSrc", e.target.value)}
                    placeholder="URL фото стягу..."
                  />
                </div>
              </div>

              {/* Розташування */}
              <div className="mt-5 bg-[#37373721] px-4 py-2 rounded-sm">
                <h1 className="text-gray-200/40">розташування держави...</h1>
                <div className="grid grid-cols-[1fr_2fr_auto] my-2 gap-2 items-center">
                    <label className="block text-lg text-gray-50/30 font-semibold py-1 rounded-xs whitespace-nowrap">- координати</label>
                    <input
                        type="text"
                        className={INPUT_STYLES}
                        value={form.location.coordinates}
                        onChange={(e) => setForm(prev => ({...prev, location: { ...prev.location, coordinates: e.target.value }}))}
                        placeholder="Приблизні координати"
                    />
                    <Tip>Тут слід ввести приблизні координати столиці (або іншого 'керівного' місця) вашої держави.</Tip>
                    <label className="block text-lg text-gray-50/30 font-semibold py-1 rounded-xs whitespace-nowrap">- регіони</label>

                    <button 
                      type="button" 
                      onClick={(e) => form.location.regions.length < 10 && 
                                setForm(prev => ({...prev, location: {...prev.location, regions: [...prev.location.regions, ""]}}))} 
                      className="flex justify-center bg-[#6b6b6b6c] hover:bg-[#5454546c] shadow-[#6b6b6b6c] duration-200 cursor-pointer p-2 rounded-xs shadow">
                      <img className="max-w-6" src="https://www.svgrepo.com/show/312862/plus.svg" />
                    </button>
                    <Tip>Тут слід вказати перелік регіонів, що орієнтовно входять в межі вашої держави (в контексті конкретного всесвіту)</Tip>
                    {!form.location.regions.length && <div />}
                    {form.location.regions.map((region, index) => (
                      <>
                      <div />
                      <input
                          key={index}
                          type="text"
                          className={INPUT_STYLES}
                          value={region}
                          onChange={(e) =>
                            setForm(prev => {
                              const newRegions = [...prev.location.regions];
                              newRegions[index] = e.target.value;
                              return { ...prev, location: { ...prev.location, regions: newRegions } };
                            })
                          }
                          placeholder={`Регіон №${1 + index}`}
                      />
                      <button 
                        type="button" 
                        onClick={(e) => setForm(prev => ({...prev, location: {...prev.location, regions: prev.location.regions.filter((r, i) => i !== index)}}))} 
                        className="bg-red button-bg duration-200 cursor-pointer p-2 rounded-xs shadow">
                        X
                      </button>
                      </>
                    ))}
                </div>
              </div>
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
                {loading ? "Створюється..." : "✅ Створити державу"}
                </button>
                <img className="p-8" src="https://www.svgrepo.com/show/505172/community-service-station.svg" />
            </div>
          </motion.form>
        </section>
      </div>
    </main>
  );
}
