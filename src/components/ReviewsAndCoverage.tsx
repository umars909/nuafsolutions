import React from 'react';
import { TESTIMONIALS_DATA } from '../data/services';
import { Star, ShieldCheck, Clock, MapPin, Phone, Mail, CheckCircle, Award } from 'lucide-react';

export const ReviewsAndCoverage: React.FC = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Testimonials */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Client Satisfaction
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              What Customers Say About Nuaf Solutions
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Read real feedback from homeowners and businesses who rely on our prompt plumbing and handyman services.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS_DATA.map((item) => (
              <div key={item.id} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 text-xs sm:text-sm italic leading-relaxed">
                  "{item.comment}"
                </p>
                <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-slate-900">{item.name}</p>
                    <p className="text-slate-500">{item.location} • {item.serviceUsed}</p>
                  </div>
                  <span className="text-slate-400">{item.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coverage & Guarantees Banner */}
        <div className="bg-gradient-to-r from-blue-900 to-slate-900 text-white p-8 rounded-3xl border border-blue-800 shadow-xl grid md:grid-cols-4 gap-6 items-center">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-blue-400">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Quality Assurance</span>
            </div>
            <h4 className="text-lg font-bold text-white">Guaranteed Workmanship</h4>
            <p className="text-xs text-slate-300">All leak repairs and pipe fittings are fully backed by our satisfaction warranty.</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-blue-400">
              <Clock className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Speed</span>
            </div>
            <h4 className="text-lg font-bold text-white">Rapid Dispatch</h4>
            <p className="text-xs text-slate-300">Same-day service slots for urgent pipe issues and handyman tasks.</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-blue-400">
              <Award className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Pricing</span>
            </div>
            <h4 className="text-lg font-bold text-white">Transparent Rates</h4>
            <p className="text-xs text-slate-300">Clear upfront quotes with zero hidden callout surprise fees.</p>
          </div>

          <div className="p-4 bg-slate-800/90 rounded-2xl border border-slate-700 text-center space-y-2">
            <p className="text-xs font-bold text-slate-300">Direct Contact Line</p>
            <a href="tel:+447879334977" className="text-lg font-extrabold text-emerald-400 hover:underline block">
              +44 7879 334977
            </a>
            <p className="text-[11px] text-slate-400">nuafsolutions@gmail.com</p>
          </div>
        </div>

      </div>
    </section>
  );
};
