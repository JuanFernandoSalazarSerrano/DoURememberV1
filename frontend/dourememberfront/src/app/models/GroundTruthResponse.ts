export interface RawScores {
  presence: number
  accuracy: number
  omission: number
  commission: number
}

export interface Details {
  presentEntities: string[]
  missingEntities: string[]
  incorrectDetails: string[]
  confabulatedDetails: string[]
  rawScores: RawScores
  explanation: string
}

export class GroundTruthResponse {
  id: number = 0
  aiResponse: string = ''
  rememberScore: number = 0
  details: Details = {
    presentEntities: [],
    missingEntities: [],
    incorrectDetails: [],
    confabulatedDetails: [],
    rawScores: {
      presence: 0,
      accuracy: 0,
      omission: 0,
      commission: 0
    },
    explanation: ''
  }
}
