import { useEffect, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MainPageHeader from "../components/mainPage/MainPageHeader";
import { Link } from "react-router-dom";
import { currentAPI } from "../services/MainAPI";
import type { Model_ModelsPage, Universe_LocationsPage } from "../services/dto";
import { ExpandingButton } from "../components/mainPage/ExpandingButton";

const mockList : Model_ModelsPage[] = [
  {
    name: "Модель правового регулювання",
    iconSrc: "/images/law-model.jpg",
    description: "Описує систему законів та їх взаємодію з державними інститутами.",
    law: [
      { name: "Закон про освіту", description: "Регулює освітню діяльність в державі." },
      { name: "Закон про працю", description: "Забезпечує права працівників." },
    ],
    institute: [
      {
        name: "Міністерство освіти",
        description: "Відповідає за державну політику у сфері освіти.wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        requirements: [
          { text: "Наявність освітньої ліцензії", format: "PDF" },
          { text: "Щорічна звітність", format: "DOCX" },
        ],
      },
      {
        name: "Міністерство освіти",
        description: "Відповідає за державну політику у сфері освіти.",
        requirements: [
          { text: "Наявність освітньої ліцензії", format: "PDF" },
          { text: "Щорічна звітність", format: "DOCX" },
        ],
      },
    ],
  },
  {
    name: "Модель судової системи",
    iconSrc: "/images/court.jpg",
    description: "Визначає структуру судів, їх компетенції та взаємодію з іншими органами.",
    law: [
      { name: "Закон про судоустрій", description: "Визначає повноваження судів." },
      { name: "Закон про прокуратуру", description: "Регулює діяльність прокурорів." },
    ],
    institute: [
      {
        name: "Верховний Суд",
        description: "Найвищий судовий орган країни.",
        requirements: [
          { text: "Юридична освіта", format: "PDF" },
          { text: "Стаж роботи не менше 10 років", format: "TEXT" },
        ],
      },
    ],
  },
].flatMap(e => [e, e, e])

export default function ModelsPage() {

  const [ models, setModels ] = useState<Model_ModelsPage[]>(mockList)
  const [ loading, setLoading ] = useState(false)

  useEffect(() => {
    //currentAPI.getAllUniverses().then((result) => setLocations(result)).finally(() => setLoading(false))
  }, [])
  
  return (
    <main>
      <div className="flex flex-col px-24 py-12 gap-12">
        <section className="flex flex-col">
            <MainPageHeader time={0.2}>
                Що це?
            </MainPageHeader>
            <div className="p-4 pb-10 bg-[#7575754c] flex justify-center items-center gap-6">
                <p className="flex-2">Модель управління - набір інститутів та законів, на основі якого вже можна створювати державу.</p>
                <img className="max-h-40 p-2 flex-1 bg-[#3838380f] shadow-[#3838380f] shadow-lg" src="https://www.svgrepo.com/show/505174/community-corrections-bureau.svg" />
            </div>
        </section>
        <section className="flex flex-col">
          <MainPageHeader time={0.4}>
            Існуючі моделі управління
          </MainPageHeader>

          {!loading && models.length === 0 ? (
            <h1>
                Схоже локацій ще нема . . .
            </h1>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4 pb-10 gap-5 bg-[#7575754c]">
            {loading ? (
                <>
                <div className="h-36 bg-gray-400/10" />
                <div className="h-36 bg-gray-400/10" />
                <div className="h-36 bg-gray-400/10" />
                </>
            ) : models.map((model, key) => (
              <ModelCard key={key} index={key} model={model} />
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
            <Link to="/model/create" className="bg-gray-300 hover:bg-gray-400 duration-300 p-4 rounded-sm">
                Створити
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

function SigmaButton({ children, photo, text } : { children : ReactNode, photo? : string, text? : string }) {
    return (
        <ExpandingButton iconSrc={photo} text={text}>
            <div className={`p-3 flex flex-col gap-1 bg-gray-200 rounded-sm shadow-sm shadow-black m-1.5`}>
                {children}
            </div>
        </ExpandingButton>
    )
}

export function ModelCard({ model, index }: { model: Model_ModelsPage, index: number }) {
  return (
    <motion.div
      className="shadow-lg bg-[#1212122d] flex flex-col px-4 justify-center"
      transition={{ duration: 0.4, delay: 0.1 * index }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
        <h3 className="text-white text-xl font-bold mb-1 mt-3">{model.name}</h3>
        <div className="flex gap-2 items-center">
            <SigmaButton photo="https://www.svgrepo.com/show/505183/judicial-examination.svg">
                <strong className="text-xs text-gray-900/70">Опис</strong>
                <p className="text-sm">{model.description}</p>
            </SigmaButton>
            {model.institute.length && (
                <SigmaButton photo="https://www.svgrepo.com/show/505179/online-notarization.svg">
                    <strong className="text-xs text-gray-900/70">Інститути</strong>
                    <div className="flex gap-3 flex-col">
                      {model.institute.map((institute) => (
                          <SigmaButton text={institute.name}>
                            <div className="grid grid-cols-[1fr_minmax(0,24rem)] w-max">
                                <span className="text-gray-400 whitespace-nowrap mx-2">- назва</span><p className="break-words">{institute.name}</p>
                                <span className="text-gray-400 whitespace-nowrap mx-2">- опис</span><p className="break-words">{institute.description}</p>
                            </div>
                            <span className="text-gray-400 mx-2">- вимоги</span>
                            <div className="gap-3 flex flex-col">
                              {institute.requirements.map((req) => (
                                  <div className="px-3 py-1 grid grid-cols-[1fr_auto] bg-[#3f3f3f12] rounded-xs">
                                      <strong className="text-xs text-gray-900/70">Текст</strong>
                                      <strong className="text-xs text-gray-900/70">Формат</strong>
                                      <p className="">{req.text}</p>
                                      <p className="">{req.format}</p>
                                  </div>
                              ))}
                            </div>
                          </SigmaButton>
                      ))}
                    </div>
                </SigmaButton>
            )}
            {model.law.length && (
                <SigmaButton photo="https://www.svgrepo.com/show/505179/online-notarization.svg">
                    <strong className="text-xs text-gray-900/70">Закони</strong>
                    <div className="flex gap-3 flex-col">
                      {model.law.map((law) => (
                          <SigmaButton text={law.name}>
                            <div className="grid grid-cols-[1fr_minmax(0,24rem)] w-max">
                                <span className="text-gray-400 whitespace-nowrap mx-2">- назва</span><p className="break-words">{law.name}</p>
                                <span className="text-gray-400 whitespace-nowrap mx-2">- опис</span><p className="break-words">{law.description}</p>
                            </div>
                          </SigmaButton>
                      ))}
                    </div>
                </SigmaButton>
            )}
            <img className="max-h-20 p-2 flex-1 bg-[#3838380f] shadow-[#3838380f] shadow-lg blur-xs" src="https://www.svgrepo.com/show/505174/community-corrections-bureau.svg" />
        </div>

        {/* Опціонально — показати закони або інститути */}
        <div className="mt-2 text-xs text-gray-300 flex justify-evenly items-center">
          <p>
            <strong>Законів:</strong> {model.law.length} |{" "}
            <strong>Інститутів:</strong> {model.institute.length}
          </p>
          <Link className="bg-red button-bg duration-200 p-3 rounded-xs" to={`/to`}>Застовувати</Link>
        </div>
    </motion.div>
  );
}
