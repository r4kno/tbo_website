import { AnimatePresence, motion } from "framer-motion"
import { Particle } from "./Particle"

export const LoadingScreen = ({ isLoading }) => {
  const particleColors = ["#007BFF ", "#00D1FF  ", "0A192F", "#008CFF ", "#00AEEF ", "#10316B "]
  const particleSizes = [2, 3, 4, 5, 6]
  
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
        className="fixed inset-0 flex items-center justify-center bg-gray-900/70 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        style={{ pointerEvents: isLoading ? 'auto' : 'none' }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full">
              {[...Array(200)].map((_, index) => (
                <Particle
                key={index}
                size={particleSizes[index % particleSizes.length]}
                color={particleColors[index % particleColors.length]}
                />
              ))}
            </div>
          </div>
          <div className="relative z-10 flex flex-col items-center">
            <div className="relative">
              <motion.div
                className="absolute inset-0 rounded-full bg-white opacity-20"
                animate={{
                  scale: [1, 1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
              <div className="relative w-24 h-24 flex items-center justify-center">
                {/* <motion.div
                  className="w-full h-full border-4 border-blue-500 rounded-full border-t-transparent"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                /> */}
                <motion.div
                  className="absolute w-3/4 h-3/4 border-4 border-[#f26b25] rounded-full border-t-transparent"
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                />
              </div>
            </div>
            <motion.h2 
              className="text-4xl font-bold text-white mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Gathering Data...
            </motion.h2>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

