import React, { useState } from 'react';
import { Calculator, Check, Send, ArrowRight, Info, Shield, HelpCircle } from 'lucide-react';
import { CostCalculation } from '../types';

interface CostEstimatorProps {
  onSendEstimateToInquiry: (summary: string, service: string) => void;
}

export const CostEstimator: React.FC<CostEstimatorProps> = ({ onSendEstimateToInquiry }) => {
  const [serviceType, setServiceType] = useState<'leak' | 'pipe' | 'maintenance' | 'handyman' | 'drain'>('leak');
  const [jobSize, setJobSize] = useState<'Small Fix' | 'Medium Job' | 'Large / Multi-Room'>('Small Fix');
  const [urgency, setUrgency] = useState<'Standard (1-2 Days)' | 'Same Day Urgent' | '24/7 Emergency'>('Standard (1-2 Days)');
  const [needsMaterials, setNeedsMaterials] = useState(true);

  const calculateEstimate = (): CostCalculation => {
    let baseMin = 50;
    let baseMax = 80;
    let serviceName = 'Leak Repair & Sealing';

    if (serviceType === 'leak') {
      baseMin = 65;
      baseMax = 110;
      serviceName = 'Leak Repair & Sealing';
    } else if (serviceType === 'pipe') {
      baseMin = 120;
      baseMax = 220;
      serviceName = 'Pipe Installation & Repiping';
    } else if (serviceType === 'maintenance') {
      baseMin = 55;
      baseMax = 95;
      serviceName = 'General Plumbing Maintenance';
    } else if (serviceType === 'handyman') {
      baseMin = 50;
      baseMax = 90;
      serviceName = 'Handyman Fitting & Repairs';
    } else if (serviceType === 'drain') {
      baseMin = 75;
      baseMax = 140;
      serviceName = 'Drain & Trap Unblocking';
    }

    // Job Size multiplier
    if (jobSize === 'Medium Job') {
      baseMin *= 1.5;
      baseMax *= 1.6;
    } else if (jobSize === 'Large / Multi-Room') {
      baseMin *= 2.5;
      baseMax *= 2.8;
    }

    // Urgency add-on
    if (urgency === 'Same Day Urgent') {
      baseMin += 30;
      baseMax += 45;
    } else if (urgency === '24/7 Emergency') {
      baseMin += 60;
      baseMax += 85;
    }

    // Materials add-on
    if (needsMaterials) {
      baseMin += 20;
      baseMax += 40;
    }

    const minRounded = Math.round(baseMin);
    const maxRounded = Math.round(baseMax);

    const summaryText = `Quote Estimate: £${minRounded} - £${maxRounded} for ${serviceName} (${jobSize}, ${urgency}, ${needsMaterials ? 'materials included' : 'labor only'}).`;

    return {
      serviceType: serviceName,
      jobSize,
      urgency,
      needsMaterials,
      estimatedCostMin: minRounded,
      estimatedCostMax: maxRounded,
      summaryText
    };
  };

  const estimate = calculateEstimate();

  return (
    <div className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 rounded-3xl my-8 border border-slate-800 shadow-2xl">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-400/30 px-3 py-1 rounded-full text-blue-300 text-xs font-semibold mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>Nuaf Solutions Instant Rate Estimator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Estimate Your Plumbing or Handyman Job Cost
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl mx-auto">
            Select your required service and parameters to generate an instant transparent cost estimate in GBP (£).
          </p>
        </div>

        <div className="grid md:grid-cols-12 gap-8 items-start">
          {/* Controls */}
          <div className="md:col-span-7 bg-slate-800/80 p-6 rounded-2xl border border-slate-700/80 space-y-6">
            
            {/* Service Type */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                1. Select Service Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: 'leak', label: 'Leak Repair' },
                  { id: 'pipe', label: 'Pipe Fitting' },
                  { id: 'maintenance', label: 'Maintenance' },
                  { id: 'handyman', label: 'Handyman' },
                  { id: 'drain', label: 'Drain Clear' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setServiceType(item.id as any)}
                    className={`py-2.5 px-3 rounded-lg text-xs font-bold transition-all border text-left ${
                      serviceType === item.id
                        ? 'bg-blue-600 text-white border-blue-500 shadow-sm'
                        : 'bg-slate-900/60 text-slate-300 border-slate-700 hover:bg-slate-700/60'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Job Size */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                2. Job Scope & Complexity
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Small Fix', 'Medium Job', 'Large / Multi-Room'] as const).map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setJobSize(size)}
                    className={`py-2 px-2.5 rounded-lg text-xs font-medium border text-center transition-all ${
                      jobSize === size
                        ? 'bg-blue-600 text-white border-blue-500'
                        : 'bg-slate-900/60 text-slate-300 border-slate-700 hover:bg-slate-700/60'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Urgency */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                3. Urgency & Arrival
              </label>
              <div className="space-y-2">
                {(['Standard (1-2 Days)', 'Same Day Urgent', '24/7 Emergency'] as const).map((urg) => (
                  <button
                    key={urg}
                    type="button"
                    onClick={() => setUrgency(urg)}
                    className={`w-full py-2 px-3 rounded-lg text-xs font-medium border flex items-center justify-between transition-all ${
                      urgency === urg
                        ? 'bg-blue-600 text-white border-blue-500'
                        : 'bg-slate-900/60 text-slate-300 border-slate-700 hover:bg-slate-700/60'
                    }`}
                  >
                    <span>{urg}</span>
                    {urgency === urg && <Check className="w-4 h-4 text-white" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Include Materials */}
            <div className="pt-2 flex items-center justify-between border-t border-slate-700/60">
              <span className="text-xs font-semibold text-slate-300">Include standard replacement parts/materials?</span>
              <button
                type="button"
                onClick={() => setNeedsMaterials(!needsMaterials)}
                className={`px-3 py-1 rounded-full text-xs font-bold border transition-colors ${
                  needsMaterials
                    ? 'bg-emerald-600/30 text-emerald-300 border-emerald-500/50'
                    : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}
              >
                {needsMaterials ? 'Yes (+Parts)' : 'Labor Only'}
              </button>
            </div>

          </div>

          {/* Result Card */}
          <div className="md:col-span-5 bg-gradient-to-b from-blue-900/60 to-slate-900 border border-blue-500/40 p-6 rounded-2xl shadow-xl space-y-6">
            <div>
              <span className="text-xs text-blue-300 font-semibold uppercase tracking-wider block">Estimated Price Range</span>
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 mt-1">
                £{estimate.estimatedCostMin} – £{estimate.estimatedCostMax}
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Inclusive of labor, diagnostics, and requested options.
              </p>
            </div>

            <div className="space-y-2.5 text-xs text-slate-300 border-t border-slate-800 pt-4">
              <div className="flex justify-between">
                <span className="text-slate-400">Selected Service:</span>
                <span className="font-semibold text-white">{estimate.serviceType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Scope:</span>
                <span className="font-semibold text-white">{estimate.jobSize}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Urgency:</span>
                <span className="font-semibold text-white">{estimate.urgency}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onSendEstimateToInquiry(estimate.summaryText, estimate.serviceType)}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Attach Quote & Inquire Now</span>
            </button>

            <p className="text-[11px] text-slate-400 text-center italic m-0">
              *Estimates are indicative. Final binding quotes are confirmed upon inspecting job details or on-site arrival.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
