export interface SpotDifficultyLevel {
  name: string
  value: number
}

export const SPOT_DIFFICULTIES: SpotDifficultyLevel[] = [
  {
    name: 'i18n.difficulties.beginner',
    value: 1
  },
  {
    name: 'i18n.difficulties.intermediate',
    value: 2
  },
  {
    name: 'i18n.difficulties.expert',
    value: 3
  }
]
