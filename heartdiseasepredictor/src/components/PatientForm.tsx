import { useState } from 'react';
import { Heart, User } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { PatientData, FormErrors } from '../types';

interface PatientFormProps {
  onSubmit: (data: PatientData) => void;
  isLoading: boolean;
}

export function PatientForm({ onSubmit, isLoading }: PatientFormProps) {
  const [formData, setFormData] = useState<PatientData>({
    age: 0,
    sex: 'male',
    chestPainType: 'typical',
    restingBP: 0,
    cholesterol: 0,
    fastingBloodSugar: false,
    restingECG: 'normal',
    maxHeartRate: 0
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.age || formData.age <= 0) {
      newErrors.age = 'Age must be greater than 0';
    }
    if (!formData.restingBP || formData.restingBP <= 0) {
      newErrors.restingBP = 'Blood pressure must be greater than 0';
    }
    if (!formData.cholesterol || formData.cholesterol <= 0) {
      newErrors.cholesterol = 'Cholesterol must be greater than 0';
    }
    if (!formData.maxHeartRate || formData.maxHeartRate <= 0) {
      newErrors.maxHeartRate = 'Heart rate must be greater than 0';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
        <div className="p-2 bg-blue-600 rounded-lg">
          <Heart className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">Patient Information</h2>
          <p className="text-sm text-slate-500">Enter clinical metrics for assessment</p>
        </div>
      </div>

      {/* Personal Information */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-slate-400" />
          <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
            Personal Details
          </h3>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              placeholder="Years"
              value={formData.age || ''}
              onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 0 })}
              className={errors.age ? 'border-red-500' : ''}
            />
            {errors.age && <p className="text-xs text-red-500">{errors.age}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="sex">Sex</Label>
            <Select
              value={formData.sex}
              onValueChange={(value: 'male' | 'female') => setFormData({ ...formData, sex: value })}
            >
              <SelectTrigger id="sex">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Symptoms */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
          Symptoms & Measurements
        </h3>
        
        <div className="space-y-2">
          <Label htmlFor="chestPain">Chest Pain Type</Label>
          <Select
            value={formData.chestPainType}
            onValueChange={(value: any) => setFormData({ ...formData, chestPainType: value })}
          >
            <SelectTrigger id="chestPain">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="typical">Typical Angina</SelectItem>
              <SelectItem value="atypical">Atypical Angina</SelectItem>
              <SelectItem value="non-anginal">Non-Anginal Pain</SelectItem>
              <SelectItem value="asymptomatic">Asymptomatic</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="restingBP">Resting BP (mm Hg)</Label>
            <Input
              id="restingBP"
              type="number"
              placeholder="120"
              value={formData.restingBP || ''}
              onChange={(e) => setFormData({ ...formData, restingBP: parseInt(e.target.value) || 0 })}
              className={errors.restingBP ? 'border-red-500' : ''}
            />
            {errors.restingBP && <p className="text-xs text-red-500">{errors.restingBP}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="cholesterol">Cholesterol (mg/dl)</Label>
            <Input
              id="cholesterol"
              type="number"
              placeholder="200"
              value={formData.cholesterol || ''}
              onChange={(e) => setFormData({ ...formData, cholesterol: parseInt(e.target.value) || 0 })}
              className={errors.cholesterol ? 'border-red-500' : ''}
            />
            {errors.cholesterol && <p className="text-xs text-red-500">{errors.cholesterol}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="maxHeartRate">Max Heart Rate</Label>
            <Input
              id="maxHeartRate"
              type="number"
              placeholder="165"
              value={formData.maxHeartRate || ''}
              onChange={(e) => setFormData({ ...formData, maxHeartRate: parseInt(e.target.value) || 0 })}
              className={errors.maxHeartRate ? 'border-red-500' : ''}
            />
            {errors.maxHeartRate && <p className="text-xs text-red-500">{errors.maxHeartRate}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="restingECG">Resting ECG</Label>
            <Select
              value={formData.restingECG}
              onValueChange={(value: any) => setFormData({ ...formData, restingECG: value })}
            >
              <SelectTrigger id="restingECG">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="st-t-abnormal">ST-T Abnormal</SelectItem>
                <SelectItem value="lv-hypertrophy">LV Hypertrophy</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center space-x-2 pt-2">
          <input
            type="checkbox"
            id="fastingSugar"
            checked={formData.fastingBloodSugar}
            onChange={(e) => setFormData({ ...formData, fastingBloodSugar: e.target.checked })}
            className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
          />
          <Label htmlFor="fastingSugar" className="cursor-pointer">
            Fasting Blood Sugar > 120 mg/dl
          </Label>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 text-lg"
      >
        {isLoading ? 'Analyzing...' : 'Calculate Risk'}
      </Button>
    </form>
  );
}