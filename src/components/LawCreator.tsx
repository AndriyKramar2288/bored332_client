import { useEffect, useState } from "react"
import type { CreateModelLaw } from "../services/dto"
import MainPageHeader from "./mainPage/MainPageHeader"
import Tip from "./Tip"
import { INPUT_STYLES } from "./InputBox"
import remarkGfm from "remark-gfm"
import MdGuide from "./MdGuide"
import ReactMarkdown from "react-markdown"

export default function LawCreator({ setLaw, index, onDelete } : { setLaw : (law : CreateModelLaw) => void, index? : number, onDelete? : () => void}) {

    const [localLaw, setLocalLaw] = useState<CreateModelLaw>({ description: "", name: "", text: "" })
    const [isMdGuideVisible, setMdGuideVisible] = useState(false)

    useEffect(() => {
        setLaw(localLaw)
    }, [localLaw])

    return (
        <div>
            <MainPageHeader time={0.5}>
                {index !== undefined ? `додавання закону №${index + 1}...` : "додавання закону..."}
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
                        value={localLaw.name}
                        onChange={(e) => setLocalLaw(prev => ({...prev, name: e.target.value}))}
                        placeholder="Введіть назву закону..."
                    />
                    <Tip>SSS</Tip>
                    <textarea
                        rows={2}
                        className={INPUT_STYLES}
                        value={localLaw.description}
                        onChange={(e) => setLocalLaw(prev => ({...prev, description: e.target.value}))}
                        placeholder="Введіть опис закону..."
                    />
                    <Tip>SSSSS</Tip>
                    <div />
                    <button
                      onClick={() => setMdGuideVisible(!isMdGuideVisible)} 
                      className="bg-red button-bg duration-200 px-4 py-2 rounded-sm text-gray-200">
                      Про синтаксис
                    </button>
                </div>
                <MdGuide isVisible={isMdGuideVisible} />
                <hr className="my-2 w-lvh border-2 border-white/40 rounded-md" />
                <div className="w-full grid grid-cols-2">
                  <h1 className="text-center text-lg roboto-slab text-white/50">Сирий текст</h1>
                  <h1 className="text-center text-lg roboto-slab text-white/50">Прев'ю</h1>
                  <textarea
                      rows={7}
                      className={INPUT_STYLES}
                      value={localLaw.text}
                      onChange={(e) => setLocalLaw(prev => ({...prev, text: e.target.value}))}
                      placeholder="Введіть текст закону..."
                  />
                  <div className={`markdown-content ${INPUT_STYLES}`}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {localLaw.text}
                    </ReactMarkdown>
                  </div>
                </div>
            </div>
        </div>
    )
}