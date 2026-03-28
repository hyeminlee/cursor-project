import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import type { Flower } from "../data/flowers"

type FlowerBloomProps = {
  flower: Flower
  totalPetals: number
  remainingPetals: number
}

const R_CORE = 20

function petalAngle(i: number, m: number) {
  return (i / m) * 360 - 90
}

/** 데이지 — 길고 가늘고 끝이 둥근 잎 */
function DaisyPetal({
  angleDeg,
  fill,
  stroke,
  index,
}: {
  angleDeg: number
  fill: string
  stroke: string
  index: number
}) {
  const len = 44
  const w = 6.5
  const cy = -(R_CORE + len)
  const reduce = useReducedMotion()
  return (
    <g transform={`rotate(${angleDeg})`}>
      <motion.g
        initial={{ opacity: 0, scale: 0.75, y: 8 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
          rotate: reduce ? 0 : [0, 1.2, -1.2, 0],
          transition: {
            opacity: { delay: index * 0.015, duration: 0.35 },
            scale: { type: "spring", stiffness: 380, damping: 28 },
            rotate: { repeat: Infinity, duration: 5 + (index % 5) * 0.3, ease: "easeInOut" },
          },
        }}
        exit={{
          opacity: 0,
          y: 48,
          rotate: reduce ? 0 : -12,
          scale: 0.85,
          transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
        }}
        style={{ transformOrigin: `0px ${cy}px` }}
      >
        <ellipse cx={0} cy={cy} rx={w} ry={len} fill={fill} stroke={stroke} strokeWidth={1.2} className="drop-shadow-sm" />
        <ellipse cx={0} cy={cy - len * 0.35} rx={w * 0.45} ry={len * 0.2} fill="#ffffff" opacity={0.45} />
      </motion.g>
    </g>
  )
}

/** 장미 — 물결 곡선 잎, 겹침 느낌으로 반지름 살짝 변주 */
function RosePetal({
  angleDeg,
  fill,
  stroke,
  index,
  layerBoost,
}: {
  angleDeg: number
  fill: string
  stroke: string
  index: number
  layerBoost: number
}) {
  const reduce = useReducedMotion()
  const scale = 1 + (index % 3) * 0.04 + layerBoost * 0.02
  return (
    <g transform={`rotate(${angleDeg})`}>
      <motion.g
        initial={{ opacity: 0, scale: 0.4, rotate: -20 }}
        animate={{
          opacity: 1,
          scale,
          rotate: 0,
          transition: {
            delay: index * 0.018,
            type: "spring",
            stiffness: 260,
            damping: 22,
          },
        }}
        exit={{
          opacity: 0,
          y: 58,
          rotate: reduce ? 0 : 28,
          scale: 0.45,
          x: reduce ? 0 : (index % 2 === 0 ? 12 : -12),
          transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] },
        }}
        style={{ transformOrigin: "0px -42px" }}
      >
        <path
          d="M 0,-58 C 16,-44 20,-24 14,-8 C 8,2 0,6 0,6 C 0,6 -8,2 -14,-8 C -20,-24 -16,-44 0,-58 Z"
          fill={fill}
          stroke={stroke}
          strokeWidth={1.15}
          className="drop-shadow-md"
          transform={`scale(${scale})`}
        />
        <path
          d="M 0,-52 C 10,-38 12,-22 6,-12"
          fill="none"
          stroke="white"
          strokeWidth={0.9}
          opacity={0.35}
          transform={`scale(${scale})`}
        />
      </motion.g>
    </g>
  )
}

/** 수국 — 작은 별꽃 송이(중심 + 방사형 잎). 한 송이씩 제거 */
function HydrangeaMiniBloom({
  angleDeg,
  fill,
  stroke,
  index,
  petalId,
  flowerId,
}: {
  angleDeg: number
  fill: string
  stroke: string
  index: number
  petalId: number
  flowerId: string
}) {
  const dist = 50
  const reduce = useReducedMotion()
  const gradId = `h-petal-${flowerId}-${petalId}`
  const petals = 5

  return (
    <g transform={`rotate(${angleDeg})`}>
      <motion.g
        initial={{ opacity: 0, scale: 0.5, rotate: -25 }}
        animate={{
          opacity: 1,
          scale: 1,
          rotate: 0,
          transition: {
            delay: index * 0.012,
            type: "spring",
            stiffness: 340,
            damping: 22,
          },
        }}
        exit={{
          opacity: 0,
          scale: 0.35,
          y: 40,
          rotate: reduce ? 0 : (index % 2 === 0 ? 22 : -22),
          transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] },
        }}
        style={{ transformOrigin: `0px ${-dist}px` }}
      >
        <g transform={`translate(0 ${-dist})`}>
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="45%" stopColor={fill} />
              <stop offset="100%" stopColor={stroke} />
            </linearGradient>
          </defs>
          {[...Array(petals)].map((_, j) => (
            <g key={j} transform={`rotate(${j * (360 / petals)})`}>
              <ellipse
                cx={0}
                cy={-12}
                rx={5}
                ry={12}
                fill={`url(#${gradId})`}
                stroke={stroke}
                strokeWidth={0.85}
                className="drop-shadow-sm"
              />
              <ellipse cx={0} cy={-8} rx={2.2} ry={5} fill="#ffffff" opacity={0.35} />
            </g>
          ))}
          <circle r={5} cx={0} cy={0} fill="#fffbeb" stroke={stroke} strokeWidth={0.7} />
          <circle r={2.8} cx={0} cy={0} fill="#fde68a" opacity={0.95} />
          <circle r={1.2} cx={-1} cy={-1} fill="#ffffff" opacity={0.7} />
        </g>
      </motion.g>
    </g>
  )
}

function FlowerCenter({ flower }: { flower: Flower }) {
  const id = flower.id
  const reduceMotion = useReducedMotion()
  if (flower.kind === "daisy") {
    return (
      <>
        <defs>
          <radialGradient id={`c-${id}`} cx="45%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#fef9c3" />
            <stop offset="55%" stopColor={flower.centerColor} />
            <stop offset="100%" stopColor={flower.centerColor2 ?? flower.centerColor} />
          </radialGradient>
        </defs>
        <circle cx={0} cy={0} r={R_CORE + 2} fill={`url(#c-${id})`} className="drop-shadow-md" />
        <circle cx={-4} cy={-4} r={4} fill="#fff" opacity={0.45} />
      </>
    )
  }
  if (flower.kind === "rose") {
    return (
      <>
        <defs>
          <radialGradient id={`c-${id}`} cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#f43f5e" />
            <stop offset="50%" stopColor={flower.centerColor} />
            <stop offset="100%" stopColor={flower.centerColor2 ?? "#881337"} />
          </radialGradient>
        </defs>
        <circle cx={0} cy={0} r={R_CORE} fill={`url(#c-${id})`} className="drop-shadow-lg" />
        <motion.g
          animate={reduceMotion ? { rotate: 0 } : { rotate: 360 }}
          transition={{ repeat: Infinity, duration: 48, ease: "linear" }}
        >
          {[0, 72, 144, 216, 288].map((deg) => (
            <ellipse
              key={deg}
              cx={0}
              cy={0}
              rx={5}
              ry={10}
              fill="#881337"
              opacity={0.35}
              transform={`rotate(${deg}) translate(0 -8)`}
            />
          ))}
        </motion.g>
      </>
    )
  }
  return (
    <>
      <defs>
        <radialGradient id={`c-${id}`} cx="40%" cy="38%" r="72%">
          <stop offset="0%" stopColor="#eef2ff" />
          <stop offset="55%" stopColor={flower.centerColor} />
          <stop offset="100%" stopColor={flower.centerColor2 ?? "#4f46e5"} />
        </radialGradient>
      </defs>
      <circle cx={0} cy={0} r={R_CORE + 2} fill={`url(#c-${id})`} className="drop-shadow-md" />
      <ellipse cx={-6} cy={-6} rx={8} ry={10} fill="#c7d2fe" opacity={0.35} transform="rotate(-25)" />
      <ellipse cx={6} cy={5} rx={7} ry={9} fill="#a5b4fc" opacity={0.28} transform="rotate(18)" />
      <circle r={4} fill="#ffffff" opacity={0.4} cx={-5} cy={-5} />
      <circle r={2.5} fill="#e0e7ff" opacity={0.65} cx={5} cy={4} />
    </>
  )
}

export function FlowerBloom({ flower, totalPetals, remainingPetals }: FlowerBloomProps) {
  const m = Math.max(remainingPetals, 1)
  const startId = totalPetals - remainingPetals
  const petalIds = Array.from({ length: Math.max(remainingPetals, 0) }, (_, i) => startId + i)

  return (
    <>
      <defs>
        <filter id={`glow-${flower.id}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <AnimatePresence mode="popLayout">
        {petalIds.map((pid, i) => {
          const angleDeg = petalAngle(i, m)
          if (flower.kind === "daisy") {
            return (
              <DaisyPetal
                key={pid}
                angleDeg={angleDeg}
                fill={flower.petalFill}
                stroke={flower.petalStroke}
                index={i}
              />
            )
          }
          if (flower.kind === "rose") {
            return (
              <RosePetal
                key={pid}
                angleDeg={angleDeg}
                fill={flower.petalFill}
                stroke={flower.petalStroke}
                index={i}
                layerBoost={pid % 3}
              />
            )
          }
          return (
            <HydrangeaMiniBloom
              key={pid}
              angleDeg={angleDeg}
              fill={flower.petalFill}
              stroke={flower.petalStroke}
              index={i}
              petalId={pid}
              flowerId={flower.id}
            />
          )
        })}
      </AnimatePresence>

      <g filter={`url(#glow-${flower.id})`}>
        <FlowerCenter flower={flower} />
      </g>
    </>
  )
}
