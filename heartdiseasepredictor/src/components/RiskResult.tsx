import { AlertTriangle, Heart, Shield } from 'lucide-react';
import { PredictionResult } from '../types';

interface RiskResultProps {
  result: PredictionResult | null;
  isLoading: boolean;
}

export function RiskResult({ result, isLoading }: RiskResultProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-12">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-slate-600 font-medium">Analyzing patient data...</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-12 text-center">
        <div className="p-4 bg-slate-100 rounded-full mb-4">
          <Heart className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-700 mb-2">Ready to Assess</h3>
        <p className="text-slate-500 text-sm max-w-xs">
          Complete the patient information form to receive a heart disease risk assessment.
        </p>
      </div>
    );
  }

  const riskConfig = {
    low: {
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-700',
      icon: Shield
    },
    medium: {
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      textColor: 'text-yellow-700',
      icon: AlertTriangle
    },
    high: {
      color: 'bg-red-500',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-700',
      icon: AlertTriangle
    }
  };

  const config = riskConfig[result.riskLevel];
  const Icon = config.icon;
  const percentage = Math.round(result.probability * 100);

  return (
    <div className="h-full flex flex-col">
      {/* Risk Badge */}
      <div className={`${config.bgColor} ${config.borderColor} border-2 rounded-xl p-6 mb-6`}>
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2 ${config.color} rounded-lg`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <span className={`text-sm font-bold uppercase tracking-wide ${config.textColor}`}>
            {result.riskLevel} Risk
          </span>
        </div>
        
        <div className="text-center py-4">
          <div className="text-6xl font-bold text-slate-900 mb-2">
            {percentage}%
          </div>
          <p className="text-slate-600 text-sm">Probability of Heart Disease</p>
        </div>
      </div>

      {/* Explanation */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 flex-1">
        <h4 className="font-semibold text-slate-900 mb-3">Assessment Summary</h4>
        <p className="text-slate-600 text-sm leading-relaxed mb-6">
          {result.message}
        </p>

        {/* Risk Factors Visual */}
        <div className="space-y-3">
          <h5 className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
            Risk Indicators
          </h5>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Clinical Factors</span>
              <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${config.color} rounded-full transition-all duration-500`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Overall Score</span>
              <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${config.color} rounded-full transition-all duration-500`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-lg">
        <p className="text-xs text-slate-500 leading-relaxed">
          <strong>Disclaimer:</strong> This prediction is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider.
        </p>
      </div>
    </div>
  );
}