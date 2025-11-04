import { GroundTruthResponse } from "../models/GroundTruthResponse";

export const testAiResponses: GroundTruthResponse[] = [
  {
    id: 1,
    aiResponse: "Good memory recall with minor omissions",
    rememberScore: 8,
    details: {
      presentEntities: ["patient", "doctor", "hospital", "medication"],
      missingEntities: ["appointment time", "diagnosis date"],
      incorrectDetails: ["medication dosage"],
      confabulatedDetails: ["doctor's name"],
      rawScores: {
        presence: 0.85,
        accuracy: 0.8,
        omission: 0.15,
        commission: 0.1
      },
      explanation: "The patient recalled most key entities correctly but missed some specific details and introduced minor inaccuracies."
    }
  },
  {
    id: 2,
    aiResponse: "Excellent memory recall with high accuracy",
    rememberScore: 9,
    details: {
      presentEntities: ["patient name", "appointment date", "diagnosis", "treatment plan"],
      missingEntities: [],
      incorrectDetails: [],
      confabulatedDetails: [],
      rawScores: {
        presence: 1,
        accuracy: 0.95,
        omission: 0,
        commission: 0.05
      },
      explanation: "Outstanding recall performance with all key entities present and highly accurate details."
    }
  },
  {
    id: 3,
    aiResponse: "Moderate recall with several missing elements",
    rememberScore: 5,
    details: {
      presentEntities: ["doctor", "condition"],
      missingEntities: ["medication name", "appointment date", "symptoms"],
      incorrectDetails: ["patient age"],
      confabulatedDetails: ["hospital location", "treatment duration"],
      rawScores: {
        presence: 0.4,
        accuracy: 0.6,
        omission: 0.6,
        commission: 0.25
      },
      explanation: "Several important details were missing and some inaccuracies were present in the recall."
    }
  },
  {
    id: 4,
    aiResponse: "Poor recall with significant gaps",
    rememberScore: 3,
    details: {
      presentEntities: ["patient"],
      missingEntities: ["doctor name", "diagnosis", "treatment", "appointment details"],
      incorrectDetails: ["patient condition", "date"],
      confabulatedDetails: ["hospital name", "medication"],
      rawScores: {
        presence: 0.2,
        accuracy: 0.35,
        omission: 0.8,
        commission: 0.45
      },
      explanation: "Minimal recall with many key entities missing and significant inaccuracies or confabulated details."
    }
  }
];
