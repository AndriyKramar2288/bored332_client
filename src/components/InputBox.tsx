import type { ReactNode } from "react"

export default function InputBox({ children, label } : { children? : ReactNode, label? : string }) {
  return (
    <div className="mt-5 bg-[#37373721] px-4 py-2 rounded-sm">
        <h1 className="text-gray-200/40">{label}</h1>
        {children}
    </div>
  )
}

export const INPUT_STYLES = "w-full my-2 rounded-xs py-1 px-3 bg-white/80 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-800 duration-200"