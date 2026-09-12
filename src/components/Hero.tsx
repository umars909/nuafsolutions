import React from 'react';
import { Phone, ArrowRight, ShieldCheck, CheckCircle2, Clock, Wrench, Droplets, Hammer, Sparkles } from 'lucide-react';

interface HeroProps {
  onInquireClick: () => void;
  onEstimateClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onInquireClick, onEstimateClick }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white pt-12 pb-16 lg:pt-20 lg:pb-24">
      {/* Decorative background grid and ambient lighting */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs sm:text-sm font-semibold backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span>Nuaf Solutions • Professional Plumbing & Handyman Services</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Reliable Plumbing & <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-teal-300">
                Handyman Repairs
              </span> when you need them.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Nuaf Solutions is a leading provider of professional plumbing and handyman services, offering reliable and efficient solutions for all your needs. We specialize in leak repairs, pipe installations, and general plumbing maintenance, ensuring your home or business runs smoothly.
            </p>

            {/* Quick Contact & Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href="tel:+447879334977"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
              >
                <Phone className="w-5 h-5" />
                <span>Call +44 7879 334977</span>
              </a>

              <button
                onClick={onInquireClick}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-base shadow-lg shadow-blue-900/30 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
              >
                <span>Send Online Inquiry</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onEstimateClick}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700 font-semibold text-sm transition-all"
              >
                Calculate Rate Quote
              </button>
            </div>

            {/* Key Trust Highlights */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-slate-800/80 text-left">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Leak Repairs & Sealing</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Pipe Installations</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Handyman Fixes</span>
              </div>
            </div>
          </div>

          {/* Right Card / Service Box */}
          <div className="lg:col-span-5">
            <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative">
              <div className="absolute -top-3 -right-3 bg-blue-600 text-white text-[11px] font-extrabold uppercase px-3 py-1 rounded-full shadow-md tracking-wider">
                Direct Dispatch
              </div>

              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <Wrench className="w-5 h-5 text-blue-400" />
                Need Emergency Assistance?
              </h3>
              <p className="text-sm text-slate-300 mb-6">
                Active burst pipe, overflowing drain, or urgent repair required? Get direct priority response from Nuaf Solutions.
              </p>

              <div className="space-y-4 mb-6">
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-700/60 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                    <Droplets className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Plumbing & Leak Repairs</h4>
                    <p className="text-xs text-slate-400">Tap drips, stopcocks, pipe joints, radiators & drain clearouts.</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-700/60 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400">
                    <Hammer className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Handyman Maintenance</h4>
                    <p className="text-xs text-slate-400">Bathroom fittings, silicone resealing, appliance setup & fixes.</p>
                  </div>
                </div>
              </div>

              {/* Direct Call Highlight */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-blue-900/60 to-slate-900 border border-blue-500/30 text-center">
                <p className="text-xs font-medium text-blue-200 mb-1">Direct Phone Contact:</p>
                <a
                  href="tel:+447879334977"
                  className="text-xl sm:text-2xl font-black text-emerald-400 hover:text-emerald-300 transition-colors tracking-wide block"
                >
                  +44 7879 334977
                </a>
                <p className="text-[11px] text-slate-400 mt-1">Email: nuafsolutions@gmail.com</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
