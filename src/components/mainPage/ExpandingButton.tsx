import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ExpandingButtonProps {
    children? : ReactNode;
    iconSrc : string;
    className? : string;
    style? : "default" | "green" | "red" | "location" | "laws" | "institutes";
    displayNumber?: number;
    offed?: boolean;
}

export function ExpandingButton ({ children, iconSrc, className, displayNumber, offed, style } : ExpandingButtonProps) {
  const [expanded, setExpanded] = useState(false);

  const colorVariants = {
    default: { base: "bg-gray-600", expanded: "bg-gray-700" },
    green: { base: "bg-green-300", expanded: "bg-green-400" },
    red: { base: "bg-red-300", expanded: "bg-red-400" },
    location: { base: "bg-amber-600", expanded: "bg-amber-700" },
    laws: { base: "bg-amber-400", expanded: "bg-amber-500" },
    institutes: { base: "bg-amber-700", expanded: "bg-amber-800" }
  };

  const colors = colorVariants[style || "default"];
  
  return (
    <motion.div
        layout
        transition={{ layout: { duration: 0.4, type: "spring" } }}
        className={`${className} ${expanded ? colors.expanded : colors.base} rounded-md p-4`}
        onMouseEnter={() => !offed && setExpanded(true)}
        onMouseLeave={() => !offed && setExpanded(false)}
      >
        <AnimatePresence>
          {expanded ? (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.1, ease: "easeOut" }}
              className="overflow-hidden absolute ml-7 z-10"
            >
              {children}
            </motion.div>
          ) : (
            <></>
          )}
        </AnimatePresence>
        <div className="w-5 h-5">
            <img src={iconSrc} />
            <span className="relative right-3 bottom-2 text-xs text-black font-semibold">{displayNumber}</span>
        </div>
      </motion.div>
  );
};
