import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ExpandingButtonProps {
    children? : ReactNode;
    iconSrc? : string;
    text?: string;
    className? : string;
    style? : "default" | "green" | "red" | "location" | "laws" | "institutes";
    displayNumber?: number;
    offed?: boolean;
}

export function ExpandingButton ({ children, iconSrc, text, className, displayNumber, offed, style } : ExpandingButtonProps) {
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
  
  const contentRef = useRef<HTMLDivElement>(null);
  const [offsetRight, setOffsetRight] = useState(0);
  const [offsetBottom, setOffsetBottom] = useState(0);

  useLayoutEffect(() => {
    if (contentRef.current && expanded) {
      const rect = contentRef.current.getBoundingClientRect();

      const overflow = rect.right - window.innerWidth;
      setOffsetRight(overflow > 0 ? rect.width + 6 : 0);

      const overflowBottom = rect.bottom - window.innerHeight;
      setOffsetBottom(overflowBottom > 0 ? overflowBottom + 6 : 0);
    }
    
    if (!expanded) {
      setOffsetRight(0)
      setOffsetBottom(0)
    }

  }, [expanded]);

  return (
    <motion.div
        layout
        transition={{ layout: { duration: 0.4, type: "spring" } }}
        className={`${className} ${expanded ? colors.expanded : colors.base} rounded-md p-4`}
        onMouseEnter={() => !offed && setExpanded(true)}
        onMouseLeave={() => !offed && setExpanded(false)}
        // onClick={() => setExpanded(true)}
      >
        <AnimatePresence>
          {expanded ? (
            <motion.div
              key="content"
              ref={contentRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.1, ease: "easeOut" }}
              className="absolute ml-7 z-30"
              style={{
                translateX: `${offsetRight ? -offsetRight : 0}px`,
                translateY: `${offsetBottom ? -offsetBottom : 0}px`
              }}
            >
              {children}
            </motion.div>
          ) : (
            <></>
          )}
        </AnimatePresence>
        <div className={`${!text && "max-w-5 max-h-5"}`}>
            {iconSrc && <img src={iconSrc} />}
            {text && <span className="text-white">{text}</span>}
            <span className="relative right-3 bottom-2 text-xs text-black font-semibold">{displayNumber}</span>
        </div>
      </motion.div>
  );
};
