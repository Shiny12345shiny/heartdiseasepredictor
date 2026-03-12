export interface PatientData {
  age: number;
  sex: 'male' | 'female';
  chestPainType: 'typical' | 'atypical' | 'non-anginal' | 'asymptomatic';
  restingBP: number;
  cholesterol: number;
  fastingBloodSugar: boolean;
  restingECG: 'normal' | 'st-t-abnormal' | 'lv-hypertrophy';
  maxHeartRate: number;
}

export interface PredictionResult {
  probability: number;
  riskLevel: 'low' | 'medium' | 'high';
  message: string;
}

export interface FormErrors {
  age?: string;
  restingBP?: string;
  cholesterol?: string;
  maxHeartRate?: string;
}