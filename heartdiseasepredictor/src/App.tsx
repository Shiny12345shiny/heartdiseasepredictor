import { useState } from 'react';
import { Heart } from 'lucide-react';
import { PatientForm } from './components/PatientForm';
import { RiskResult } from './components/RiskResult';
import { PatientData, PredictionResult } from './types';
import { predictHeartRisk } from './utils/prediction';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);

  const handleSubmit = async (data: PatientData) => {
    setIsLoading(true);
    
    // Simulate processing delay for better UX
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const prediction = predictHeartRisk(data);
    setResult(prediction);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-blue-600 border-b border-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg">
              <Heart className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">HeartRisk Predictor</h1>
              <p className="text-blue-100 text-sm">Clinical Assessment Tool</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Form */}
          <div className="lg:max-w-md">
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
              <PatientForm onSubmit={handleSubmit} isLoading={isLoading} />
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="lg:max-w-md">
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sticky top-8">
              <RiskResult result={result} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-slate-500">
            For educational purposes only. Not a substitute for professional medical advice.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;