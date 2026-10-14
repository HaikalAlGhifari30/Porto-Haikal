"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnimatedScrollIndicatorProps {
  onClick?: () => void;
  className?: string;
  label?: string;
}

export function AnimatedScrollIndicator({
  onClick,
  className,
  label = "SCROLL",
}: AnimatedScrollIndicatorProps) {
  const letters = label.split("");

  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label="Scroll down to next section"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95, y: 2 }}
      className={cn(
        "group flex flex-col items-center justify-center gap-1",
        "bg-transparent border-0 p-1.5",
        "text-zinc-600 dark:text-zinc-400",
        "hover:text-black dark:hover:text-[#FACC15]",
        "transition-all duration-200 cursor-pointer select-none",
        className
      )}
    >
      {/* Living Animated Text: Waving letters with golden sheen */}
      <span className="flex items-center gap-[3px] font-pixel font-bold text-[10px] sm:text-xs tracking-[0.25em] uppercase leading-none">
        {letters.map((char, idx) => (
          <motion.span
            key={idx}
            className="inline-block"
            animate={{
              y: [0, -3.5, 0],
              color: [
                "currentColor",
                "#FACC15",
                "currentColor",
              ],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: idx * 0.12,
              ease: "easeInOut",
            }}
          >
            {char}
          </motion.span>
        ))}
      </span>

      {/* Living Animated Down Arrow */}
      <motion.div
        animate={{
          y: [0, 4, 0],
          opacity: [0.65, 1, 0.65],
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="flex items-center justify-center text-[#FACC15] group-hover:text-black dark:group-hover:text-[#FACC15] transition-colors"
      >
        <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3]" />
      </motion.div>
    </motion.button>
  );
}
