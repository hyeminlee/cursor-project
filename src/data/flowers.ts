export type FlowerKind = "daisy" | "rose" | "hydrangea"

export type Flower = {
  id: string
  name: string
  kind: FlowerKind
  /** Tailwind gradient classes for card + flower accents */
  gradientFrom: string
  gradientTo: string
  centerColor: string
  centerColor2?: string
  petalFill: string
  petalStroke: string
  label: string
}

/** 꽃 종류·색만 정의합니다. 꽃잎 개수는 플레이마다 3~30장 랜덤입니다. */
export const flowers: Flower[] = [
  {
    id: "daisy",
    name: "데이지",
    kind: "daisy",
    gradientFrom: "from-amber-50",
    gradientTo: "to-yellow-100/90",
    centerColor: "#facc15",
    centerColor2: "#eab308",
    petalFill: "#fffbeb",
    petalStroke: "#fde68a",
    label: "따뜻함이 필요할 때",
  },
  {
    id: "rose",
    name: "장미",
    kind: "rose",
    gradientFrom: "from-rose-50",
    gradientTo: "to-pink-100/90",
    centerColor: "#be123c",
    centerColor2: "#9f1239",
    petalFill: "#fda4af",
    petalStroke: "#fb7185",
    label: "복잡한 마음에",
  },
  {
    id: "hydrangea",
    name: "수국",
    kind: "hydrangea",
    gradientFrom: "from-sky-50",
    gradientTo: "to-indigo-100/90",
    centerColor: "#6366f1",
    centerColor2: "#4f46e5",
    petalFill: "#c7d2fe",
    petalStroke: "#a5b4fc",
    label: "어려운 결정에",
  },
]
