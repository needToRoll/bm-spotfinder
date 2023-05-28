export interface RopeLength {
  name: string
  value: number
}

export const AVAILABLE_ROPE_LENGTHS: RopeLength[] = [
  {name: "16m", value: 16},
  {name: "20m", value: 20},
  {name: "24m", value: 24},
  {name: "30m", value: 30},
]
