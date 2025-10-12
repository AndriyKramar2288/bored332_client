import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MainPageHeader from "../components/mainPage/MainPageHeader";
import { Link } from "react-router-dom";
import { currentAPI } from "../services/MainAPI";
import type { Universe_LocationsPage } from "../services/dto";

export default function LocationsPage() {

  const [ locations, setLocations ] = useState<Universe_LocationsPage[]>([])
  const [ loading, setLoading ] = useState(true)

  useEffect(() => {
    currentAPI.getAllUniverses().then((result) => setLocations(result)).finally(() => setLoading(false))
  }, [])
  
  return (
    <main>
      <div className="flex flex-col px-24 py-12 gap-12">
        <section className="flex flex-col">
          <MainPageHeader time={0.3}>
            Існуючі локації
          </MainPageHeader>

          {!loading && locations.length === 0 ? (
            <h1>
                Схоже локацій ще нема . . .
            </h1>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4 pb-10 gap-5 bg-[#7575754c]">
            {loading ? (
                <>
                <div className="h-48 bg-gray-400/10" />
                <div className="h-48 bg-gray-400/10" />
                <div className="h-48 bg-gray-400/10" />
                </>
            ) : locations.map((universe, key) => (
              <UniverseCard key={key} index={key} universe={universe} />
            ))}
          </div>
          )}
        </section>

        <section className="flex flex-col">
          <MainPageHeader time={0.5}>
            Не знайшли необхідної - додайте!
          </MainPageHeader>

          <div className="flex justify-center items-center gap-6 p-4 pb-10 bg-[#7575754c]">
            <p className="text-center">Якщо ви не знайшли регіону, де знаходиться держава, яку ви бажаєте додати - створіть новий!</p>
            <Link to="/location/create" className="bg-gray-300 hover:bg-gray-400 duration-300 p-4 rounded-sm">
                Створити
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

// Компонент картки всесвіту
function UniverseCard({ universe, index }: { universe: Universe_LocationsPage, index: number }) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // циклічна зміна фото кожні 3 секунди
  useEffect(() => {
    if (universe.photos.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentPhotoIndex((prev) => (prev + 1) % universe.photos.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [universe.photos.length]);

  const currentPhoto = universe.photos[currentPhotoIndex];

  return (
    <motion.div
      className="relative h-48 overflow-hidden shadow-lg cursor-pointer"
      transition={{ duration: 0.4, delay: 0.1 * index }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <AnimatePresence mode="wait">
        {currentPhoto && (
          <motion.div
            key={currentPhoto}
            className="absolute inset-0 bg-cover bg-center blur-xs"
            style={{ backgroundImage: `url(${currentPhoto})` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.05 * index }}
          />
        )}
      </AnimatePresence>

      {/* Контент поверх фону */}
      <div className="relative z-10 p-4 h-full flex flex-col justify-end bg-black/30">
        <h3 className="text-white text-xl font-bold">{universe.name}</h3>
        <p className="text-white/90 text-sm">{universe.desc}</p>
      </div>
    </motion.div>
  );
}
