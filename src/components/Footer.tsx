import React from 'react';
import { Wrench, Phone, Mail, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2.5 text-white">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Wrench className="w-4 h-4" />
              </div>
              <span className="font-bold text-lg text-white">Nuaf Solutions</span>
            </div>
            <p className="text-slate-400 text-xs max-w-md leading-relaxed">
              Nuaf Solutions is a leading provider of professional plumbing and handyman services, offering reliable and efficient solutions for all your needs. We specialize in leak repairs, pipe installations, and general plumbing maintenance, ensuring your home or business runs smoothly.
            </p>
          </div>

          {/* Quick Contact */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">Direct Contact</h4>
            <div className="space-y-2">
              <a href="tel:+447879334977" className="text-slate-300 hover:text-emerald-400 flex items-center gap-2 font-medium">
                <Phone className="w-4 h-4 text-emerald-500" />
                <span>+44 7879 334977</span>
              </a>
              <a href="mailto:nuafsolutions@gmail.com" className="text-slate-300 hover:text-blue-400 flex items-center gap-2 font-medium">
                <Mail className="w-4 h-4 text-blue-500" />
                <span>nuafsolutions@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Services List */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">Services Offered</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>Leak Repairs & Sealing</li>
              <li>Pipe Installations & Repiping</li>
              <li>General Plumbing Maintenance</li>
              <li>Handyman & Bathroom Fittings</li>
              <li>Drain & Trap Clearance</li>
              <li>24/7 Emergency Response</li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <p>© {new Date().getFullYear()} Nuaf Solutions. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Professional Plumbing & Handyman Services</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
