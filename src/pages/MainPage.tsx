import CountryList from "../components/mainPage/CountryList";
import type { BasicCountry } from "../services/dto";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import MainPageHeader from "../components/mainPage/MainPageHeader";

const mockCountries: BasicCountry[] = [
  {
    id: "ua",
    name: "Україна",
    flagSrc:
      "https://upload.wikimedia.org/wikipedia/commons/4/49/Flag_of_Ukraine.svg",
    location: {
        coordinates: "1488x1488",
        id: "testzz",
        regions: ["вульгардія", "пісюновщина"],
        universe: {
          id: "aa",
          name: "юаполіт",
          desc: "qwewqeqwewqeweqwewqqweq",
          photos: []
        }
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
        id: "testzz",
        regions: ["вульгардія", "пісюновщина"],
        universe: {
          id: "aa",
          name: "юаполіт",
          desc: "qwewqeqwewqeweqwewqqweq",
          photos: []
        }
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
        id: "testzz",
        regions: ["вульгардія", "пісюновщина"],
        universe: {
          id: "aa",
          name: "юаполіт",
          desc: "qwewqeqwewqeweqwewqqweq",
          photos: []
        }
    },
    description:
      "Японія поєднує традиційне законодавство з передовими технологічними рішеннями.",
    lawCount: 198,
    implementations: [],
  },
];

function MainPageCreateButton({ children, link, img } : { children? : ReactNode, link : string, img? : string }) {
  return (
    <Link to={link} className="bg-gray-300 hover:bg-gray-400 duration-300 rounded-sm p-4 flex flex-col items-center">
      <img className="h-16" src={img || "https://yt3.googleusercontent.com/g3LI0vVGpjXj0C77yJ1-dTeja7Bk0Gj3iAvPgi9AhYKk572e1Wgb5hViRMxI37fk-wkn-yGEq5g=s900-c-k-c0x00ffffff-no-rj"} />
      <p className="text-xl text-center libertinus-sans text-[#222222]">
        {children}
      </p>
    </Link>
  )
}

export default function MainPage () {
    return (
        <main>
            <div className="flex flex-col px-24">
                <section className="flex my-12 flex-col">
                  <MainPageHeader time={0.2}>
                    Про нас
                  </MainPageHeader>
                  <div className="p-4 pb-10 bg-[#7575754c]">
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
                <section className="flex my-12 flex-col">
                  <MainPageHeader time={0.6}>
                    Створити власну державу
                  </MainPageHeader>
                  <div className="p-4 px-15 pb-10 bg-[#7575754c] flex justify-center">
                    <div className="grid grid-cols-[3fr_0.2fr_3fr_0.2fr_3fr] items-center">
                        <MainPageCreateButton link="/location" img="https://www.svgrepo.com/show/505170/foreign-law-firm.svg">
                        Локація
                      </MainPageCreateButton>
                      <div className="bg-gray-500 rounded-xs h-16 w-1 mx-5" />
                      <MainPageCreateButton link="/model/create" img="https://www.svgrepo.com/show/505174/community-corrections-bureau.svg">
                        Модель управління
                      </MainPageCreateButton>
                      <div className="bg-gray-500 rounded-xs h-16 w-1 mx-5" />
                      <MainPageCreateButton link="/state/create" img="https://www.svgrepo.com/show/505172/community-service-station.svg">
                        Державне утворення
                      </MainPageCreateButton>
                    </div>
                  </div>
                </section>
            </div>
        </main>
    )
}