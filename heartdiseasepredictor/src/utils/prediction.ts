import { PatientData, PredictionResult } from '../types';

// Hardcoded logistic regression coefficients based on Cleveland heart disease dataset
// These are simplified weights for demonstration purposes
const COEFFICIENTS = {
  intercept: -4.5,
  age: 0.05,
  sex: 0.8,
  chestPainTypical: -1.2,
  chestPainAtypical: -0.8,
  chestPainNonAnginal: -0.5,
  chestPainAsymptomatic: 1.2,
  restingBP: 0.02,
  cholesterol: 0.005,
  fastingBloodSugar: 0.4,
  restingECGNormal: 0,
  restingECGSTAbnormal: 0.5,
  restingECGLVHypertrophy: 0.8,
  maxHeartRate: -0.02
};

export function predictHeartRisk(data: PatientData): PredictionResult {
  let logit = COEFFICIENTS.intercept;
  
  // Age
  logit += COEFFICIENTS.age * data.age;
  
  // Sex (male = 1, female = 0)
  logit += COEFFICIENTS.sex * (data.sex === 'male' ? 1 : 0);
  
  // Chest pain type
  switch (data.chestPainType) {
    case 'typical':
      logit += COEFFICIENTS.chestPainTypical;
      break;
    case 'atypical':
      logit += COEFFICIENTS.chestPainAtypical;
      break;
    case 'non-anginal':
      logit += COEFFICIENTS.chestPainNonAnginal;
      break;
    case 'asymptomatic':
      logit += COEFFICIENTS.chestPainAsymptomatic;
      break;
  }
  
  // Resting blood pressure
  logit += COEFFICIENTS.restingBP * data.restingBP;
  
  // Cholesterol
  logit += COEFFICIENTS.cholesterol * data.cholesterol;
  
  // Fasting blood sugar
  logit += COEFFICIENTS.fastingBloodSugar * (data.fastingBloodSugar ? 1 : 0);
  
  // Resting ECG
  switch (data.restingECG) {
    case 'normal':
      logit += COEFFICIENTS.restingECGNormal;
      break;
    case 'st-t-abnormal':
      logit += COEFFICIENTS.restingECGSTAbnormal;
      break;
    case 'lv-hypertrophy':
      logit += COEFFICIENTS.restingECGLVHypertrophy;
      break;
  }
  
  // Maximum heart rate
  logit += COEFFICIENTS.maxHeartRate * data.maxHeartRate;
  
  // Convert logit to probability using sigmoid function
  const probability = 1 / (1 + Math.exp(-logit));
  
  // Determine risk level
  let riskLevel: 'low' | 'medium' | 'high';
  let message: string;
  
  if (probability < 0.3) {
    riskLevel = 'low';
    message = 'Your risk appears low. Maintain a healthy lifestyle with regular exercise and a balanced diet.';
  } else if (probability < 0.6) {
    riskLevel = 'medium';
    message = 'Your risk is moderate. Consider consulting a healthcare provider for a comprehensive evaluation.';
  } else {
    riskLevel = 'high';
    message = 'Your risk is elevated. Please consult a cardiologist for professional medical assessment.';
  }
  
  return {
    probability,
    riskLevel,
    message
  };
}

export function validatePatientData(data: PatientData): boolean {
  return (
    data.age > 0 && data.age <= 120 &&
    data.restingBP > 0 && data.restingBP <= 300 &&
    data.cholesterol > 0 && data.cholesterol <= 600 &&
    data.maxHeartRate > 0 && data.maxHeartRate <= 250
  );
}