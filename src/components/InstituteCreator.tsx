import { useEffect, useState } from "react"
import type { CreateModelInstitute } from "../services/dto"
import MainPageHeader from "./mainPage/MainPageHeader"
import Tip from "./Tip"
import InputBox, { INPUT_STYLES } from "./InputBox"
import { AnimatePresence, motion } from "framer-motion";

export default function InstituteCreator({ setInstitute, index, onDelete } : { setInstitute : (institute : CreateModelInstitute) => void, index? : number, onDelete? : () => void}) {

    const [localInstitute, setLocalInstitute] = useState<CreateModelInstitute>({ description: "", name: "", requirements: [] })
    const [isMdGuideVisible, setMdGuideVisible] = useState(false)

    useEffect(() => {
        setInstitute(localInstitute)
    }, [localInstitute])

    return (
        <div>
            <MainPageHeader time={0.5}>
                {index !== undefined ? `додавання інституту №${index + 1}...` : "додавання інституту..."}
            </MainPageHeader>
            <div className="bg-[#78131348] px-4 py-2 flex flex-col items-center">
                <div className="grid grid-cols-[2fr_1fr_3fr_auto_3fr_auto_1fr_2fr] gap-4 items-center">
                    {onDelete ? (
                        <button
                            className="bg-red button-bg duration-200 px-4 py-2 rounded-sm text-gray-200" 
                            onClick={() => onDelete()}>
                            Видалити
                        </button>
                    ) : (<div />)}
                    <div />
                    <input
                        type="text"
                        className={INPUT_STYLES}
                        value={localInstitute.name}
                        onChange={(e) => setLocalInstitute(prev => ({...prev, name: e.target.value}))}
                        placeholder="Введіть назву інституту..."
                    />
                    <Tip>Вичерпна назва інституту.</Tip>
                    <textarea
                        rows={2}
                        className={INPUT_STYLES}
                        value={localInstitute.description}
                        onChange={(e) => setLocalInstitute(prev => ({...prev, description: e.target.value}))}
                        placeholder="Введіть опис інституту..."
                    />
                    <Tip>Короткий опис / анотація до закону, що використовуватиметься скрізь при стислому відображенні закону.</Tip>
                    <div />
                    <button
                      onClick={() => setLocalInstitute(prev => ({...prev, requirements: [...prev.requirements, {format: "", text: "", id: crypto.randomUUID()}]}))} 
                      className="bg-red button-bg duration-200 px-4 py-2 rounded-sm text-gray-200">
                      Додати вимогу
                    </button>
                </div>
                {localInstitute.requirements.length > 0 && (
                    <>
                        <hr className="my-2 w-lvh border-2 border-white/40 rounded-md" />
                        <h1 className="text-center text-lg roboto-slab text-white/50">Вимоги</h1>
                    </>
                )}
                <div className="w-full grid grid-cols-3 gap-5">
                    <AnimatePresence mode="sync">
                          {localInstitute.requirements.map((requirment, index) => (
                            <motion.div
                                layout
                                key={requirment.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0, transition: { duration: 0.2 } }}
                                exit={{ opacity: 0, y: 10, transition: { duration: 0.1 } }}
                            >
                                <InputBox label={`вимога №${index}...`}>
                                    <div className="flex gap-3 items-start">
                                        <textarea
                                            rows={2}
                                            className={INPUT_STYLES}
                                            value={requirment.text}
                                            onChange={(e) =>
                                                setLocalInstitute(prev => {
                                                    const updatedRequirements = [...prev.requirements];
                                                    updatedRequirements[index].text = e.target.value;
                                                    return { ...prev, requirements: updatedRequirements };
                                                })
                                            }
                                            placeholder="текст..."
                                        />
                                        <Tip>
                                            Чітко, коротко і ясно описати те, що має реалізувати конкретний закон.
                                        </Tip>
                                    </div>
                                    <div className="flex gap-3 items-center">
                                        <input
                                            type="text"
                                            className={INPUT_STYLES}
                                            value={requirment.format}
                                            onChange={(e) =>
                                                setLocalInstitute(prev => {
                                                    const updatedRequirements = [...prev.requirements];
                                                    updatedRequirements[index].format = e.target.value;
                                                    return { ...prev, requirements: updatedRequirements };
                                                })
                                            }
                                            placeholder="формат..."
                                        />
                                        <Tip>
                                            Опціональна вимога: вказати те, яким чином / в якому форматі
                                            то діло має бути реалізоване.
                                        </Tip>
                                        <button
                                            onClick={() => setLocalInstitute(prev => ({...prev, requirements: prev.requirements.filter((ins, i) => i !== index)}))} 
                                            className="bg-red button-bg duration-200 px-4 py-2 rounded-sm text-gray-200">
                                            Видалити
                                        </button>
                                    </div>
                                </InputBox>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}