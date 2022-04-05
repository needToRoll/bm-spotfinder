export interface SpotDifficultyLevel {
  name: string
  value: number
}

export const SPOT_DIFFICULTIES: SpotDifficultyLevel[] = [
  {name: "Beginner", value: 1},
  {name: "Intermediate", value: 2},
  {name: "Pro", value: 3},
]
