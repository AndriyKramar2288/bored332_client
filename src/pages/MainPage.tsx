import CountryList from "../components/mainPage/CountryList";
import { motion } from "framer-motion";
import type { BasicCountry } from "../services/dto";
import type { ReactNode } from "react";
import bgImage from '../assets/g116.svg';

const mockCountries: BasicCountry[] = [
  {
    id: "ua",
    name: "Україна",
    flagSrc:
      "https://upload.wikimedia.org/wikipedia/commons/4/49/Flag_of_Ukraine.svg",
    location: {
        coordinates: "1488x1488",
        desc: "Десь далеко",
        id: "testzz",
        regions: ["вульгардія", "пісюновщина"],
        universe: "юаполіт"
    },
    description:
      "Україна активно впроваджує сучасні цифрові реформи у сфері державного управління та права.",
    lawCount: 245,
    implementations: [],
  },
  {
    id: "de",
    name: "Німеччина",
    flagSrc:
      "https://upload.wikimedia.org/wikipedia/en/b/ba/Flag_of_Germany.svg",
    location: {
        coordinates: "1488x1488",
        desc: "Десь далеко",
        id: "testzz",
        regions: ["вульгардія", "пісюновщина"],
        universe: "юаполіт"
    },
    description:
      "Одна з провідних держав Європи з розвиненою системою права та інновацій у публічному секторі.",
    lawCount: 310,
    implementations: [],
  },
  {
    id: "jp",
    name: "Японія",
    flagSrc:
      "https://upload.wikimedia.org/wikipedia/en/9/9e/Flag_of_Japan.svg",
    location: {
        coordinates: "1488x1488",
        desc: "Десь далеко",
        id: "testzz",
        regions: ["вульгардія", "пісюновщина"],
        universe: "юаполіт"
    },
    description:
      "Японія поєднує традиційне законодавство з передовими технологічними рішеннями.",
    lawCount: 198,
    implementations: [],
  },
];

function MainPageHeader({ children, time } : { children? : ReactNode, time? : number }) {
  return (
    <>
    <div className="flex justify-center">
      <h1 className="font-bold text-2xl roboto-slab px-8 pt-3 text-amber-950 bg-red text-center">
          {children}
      </h1>
    </div>
    <motion.hr initial={{ width: 0 }} animate={{ width: "auto" }} transition={{ duration: time || 0.1 }} className="border-1 border-red" />
    </>
  )
}

export default function MainPage () {
    return (
        <main className="bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }}>
            <div className="flex flex-col px-24">
                <section className="flex my-6 flex-col">
                  <MainPageHeader time={0.2}>
                    Про нас
                  </MainPageHeader>
                  <div className="p-4 pb-10 bg-[#8f8f8fb0]">
                    <p className="text-xl text-center libertinus-sans text-[#222222]">
                      Дана платформа дозволить усім охочим забезпечити фундамент лору свого державного утворення.
                    </p>
                  </div>
                </section>
                <section className="flex flex-col">
                    <MainPageHeader time={0.4}>
                      Рейтинг держав
                    </MainPageHeader>
                    <CountryList countries={mockCountries} />
                </section>
                <section className="flex mt-6 flex-col" style={{ marginBottom: "300px" }}>
                  <MainPageHeader time={0.6}>
                    Створити власну державу
                  </MainPageHeader>
                </section>
            </div>
        </main>
    )
}