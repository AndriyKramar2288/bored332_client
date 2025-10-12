import type { ReactNode } from "react";
import { motion } from "framer-motion";

export default function MainPageHeader({ children, time } : { children? : ReactNode, time? : number }) {
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