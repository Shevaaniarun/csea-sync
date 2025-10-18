import React from "react";
import { motion } from "framer-motion";

export interface SplitTextProps {
  text: string;
  delay?: number;
  scrollTrigger?: boolean;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  className?: string;
  textAlign?: React.CSSProperties["textAlign"];
  staggerDelay?: number;
  animationFrom?: { opacity: number; y: number };
  animationTo?: { opacity: number; y: number };
  duration?: number;
  ease?: string | ((t: number) => number);
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  delay = 0,
  scrollTrigger = false,
  tag = "span",
  className = "",
  textAlign = "center",
  staggerDelay = 0.1,
  animationFrom = { opacity: 0, y: 20 },
  animationTo = { opacity: 1, y: 0 },
  duration = 0.5,
  ease = "easeOut",
}) => {
  // Split text into words
  const words = text.split(" ");

  const renderContent = () => (
    <span style={{ textAlign }} className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={animationFrom}
          animate={scrollTrigger ? animationTo : {}}
          transition={{
            duration,
            delay: delay + i * staggerDelay,
            ease: ease as any, // Fix for TypeScript error
          }}
          style={{
            display: "inline-block",

            whiteSpace: "nowrap",
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );

  // Render based on tag prop
  switch (tag) {
    case "h1":
      return <h1 className={className}>{renderContent()}</h1>;
    case "h2":
      return <h2 className={className}>{renderContent()}</h2>;
    case "h3":
      return <h3 className={className}>{renderContent()}</h3>;
    case "h4":
      return <h4 className={className}>{renderContent()}</h4>;
    case "h5":
      return <h5 className={className}>{renderContent()}</h5>;
    case "h6":
      return <h6 className={className}>{renderContent()}</h6>;
    case "p":
      return <p className={className}>{renderContent()}</p>;
    case "span":
      return <span className={className}>{renderContent()}</span>;
    case "div":
      return <div className={className}>{renderContent()}</div>;
    default:
      return <span className={className}>{renderContent()}</span>;
  }
};

export default SplitText;
