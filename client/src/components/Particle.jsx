import { motion } from "framer-motion"

export const Particle = ({ size, color }) => {
  const angle = Math.random() * 360 // Random angle in degrees
  const distance = 50 + Math.random() * 50 // Random distance from center (50-100)

  const initialX = Math.cos((angle * Math.PI) / 180) * distance
  const initialY = Math.sin((angle * Math.PI) / 180) * distance

  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        top: "50%",
        left: "50%",
      }}
      initial={{
        x: `${initialX}vw`,
        y: `${initialY}vh`,
        opacity: 0,
      }}
      animate={{
        x: 0,
        y: 0,
        opacity: [0, 1, 0],
      }}
      transition={{
        duration: Math.random() * 3 + 2, // Random duration between 2 and 5 seconds
        repeat: Number.POSITIVE_INFINITY,
        repeatDelay: Math.random() * 2, // Random delay before repeating
        ease: "easeInOut",
      }}
    />
  )
}

