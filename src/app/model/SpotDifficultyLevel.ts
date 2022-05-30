export interface SpotDifficultyLevel {
  name: string
  value: number
}

export const SPOT_DIFFICULTIES: SpotDifficultyLevel[] = [
  {name: $localize`:Surfer with little experience|One word slug used for filtering:Beginner`, value: 1},
  {
    name: $localize`:Surfer with intermediate experience|One word slug used for filtering:Intermediate`,
    value: 2
  },
  {name: $localize`:Surfer with high experience|One word slug used for filtering:Pro`, value: 3}
]
