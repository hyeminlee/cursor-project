import { motion, useReducedMotion } from "framer-motion"
import type { Flower } from "../data/flowers"
import { FlowerBloom } from "./FlowerBloom"

type FlowerStageProps = {
  flower: Flower
  totalPetals: number
  remainingPetals: number
  onPetalClick: () => void
  interactive: boolean
}

const VIEW = 120

export function FlowerStage({
  flower,
  totalPetals,
  remainingPetals,
  onPetalClick,
  interactive,
}: FlowerStageProps) {
  const reduceMotion = useReducedMotion()
  const total = totalPetals
  const remainingRatio = total > 0 ? remainingPetals / total : 0

  return (
    <div className="flex w-full flex-col items-center">
      <motion.button
        type="button"
        disabled={!interactive || remainingPetals <= 0}
        onClick={onPetalClick}
        aria-label={
          remainingPetals > 0 ? "꽃을 눌러 꽃잎 한 장씩 떼기" : "꽃잎이 모두 떨어졌습니다"
        }
        whileTap={interactive && remainingPetals > 0 ? { scale: 0.97 } : undefined}
        className="relative flex aspect-square w-[min(100vw-2rem,20rem)] max-w-[320px] items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dream-500 disabled:cursor-default"
      >
        <motion.div
          className="relative h-full w-full"
          animate={
            interactive && remainingPetals > 0 && !reduceMotion
              ? {
                  scale: [1, 1.028, 1],
                  rotate: flower.kind === "rose" ? [0, -1.8, 1.8, 0] : [0, 2.2, -2.2, 0],
                }
              : { scale: 1, rotate: 0 }
          }
          transition={{
            repeat: Infinity,
            duration: flower.kind === "hydrangea" ? 5.2 : 4.1,
            ease: "easeInOut",
          }}
        >
          <svg
            viewBox={`-${VIEW} -${VIEW} ${VIEW * 2} ${VIEW * 2}`}
            className="h-full w-full overflow-visible"
            role="img"
            aria-hidden={remainingPetals <= 0}
          >
            <FlowerBloom flower={flower} totalPetals={totalPetals} remainingPetals={remainingPetals} />
          </svg>
        </motion.div>
      </motion.button>

      <div className="mt-6 w-full max-w-xs px-1" aria-hidden>
        <div className="mb-3 h-2 overflow-hidden rounded-full bg-dream-200/80">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-sky-400 via-dream-400 to-indigo-400"
            initial={false}
            animate={{ scaleX: remainingRatio }}
            style={{ originX: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 32 }}
          />
        </div>
      </div>

      <div className="flex w-full max-w-xs flex-col items-center gap-1 text-center">
        <p className="text-lg font-semibold text-dream-900">{flower.name}</p>
        {interactive && remainingPetals > 0 ? (
          <p className="text-xs text-dream-500">꽃을 눌러 한 장씩 떼어 보세요</p>
        ) : null}
      </div>
    </div>
  )
}
