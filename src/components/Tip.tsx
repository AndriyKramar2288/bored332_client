import type { ReactNode } from "react";
import { ExpandingButton } from "./mainPage/ExpandingButton";

export default function Tip({ children } : { children? : ReactNode }) {
  return (
    <ExpandingButton iconSrc="https://www.svgrepo.com/show/535588/question-mark.svg">
      <div className="bg-[#6b6b6b6c] shadow rounded-md px-4 py-2 text-amber-50 max-w-72 ml-2">
        {children}
      </div>
    </ExpandingButton>
  )
}