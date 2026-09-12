import React from 'react';
import { Phone, Mail, Wrench, Clock, Calculator, MessageSquareText } from 'lucide-react';

interface HeaderProps {
  activeTab: 'home' | 'services' | 'estimator' | 'inquiry';
  setActiveTab: (tab: 'home' | 'services' | 'estimator' | 'inquiry') => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Banner - Phone & Email Highlight */}
      <div className="bg-slate-900 text-slate-100 text-xs sm:text-sm py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
            <a
              href="tel:+447879334977"
              className="flex items-center gap-1.5 hover:text-blue-400 transition-colors font-medium text-slate-200"
            >
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <span>+44 7879 334977</span>
            </a>
            <span className="hidden sm:inline text-slate-700">|</span>
            <a
              href="mailto:nuafsolutions@gmail.com"
              className="flex items-center gap-1.5 hover:text-blue-400 transition-colors text-slate-300"
            >
              <Mail className="w-3.5 h-3.5 text-blue-400" />
              <span>nuafsolutions@gmail.com</span>
            </a>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              24/7 Emergency Response Available
            </span>
            <span className="hidden md:flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" /> Rapid Local Arrival
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 text-left group"
        >
          <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:bg-blue-700 transition-colors">
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-xl text-slate-900 tracking-tight">Nuaf Solutions</span>
              <span className="hidden sm:inline-block text-[10px] font-semibold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-200 uppercase tracking-wider">
                Certified
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">Professional Plumbing & Handyman</p>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => setActiveTab('home')}
            className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'home'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'services'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            Services
          </button>
          <button
            onClick={() => setActiveTab('estimator')}
            className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'estimator'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Calculator className="w-4 h-4 text-blue-600" />
            Rate Estimator
          </button>
          <button
            onClick={() => setActiveTab('inquiry')}
            className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'inquiry'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-700 hover:text-blue-700 hover:bg-white'
            }`}
          >
            <MessageSquareText className="w-4 h-4" />
            Send Inquiry
          </button>
        </nav>

        {/* Fast Call Button Mobile */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setActiveTab('inquiry')}
            className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold shadow-xs flex items-center gap-1"
          >
            Inquire
          </button>
          <a
            href="tel:+447879334977"
            className="p-2 bg-emerald-600 text-white rounded-lg shadow-xs flex items-center justify-center"
            title="Call Nuaf Solutions"
          >
            <Phone className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Sub-navigation bar on small screens */}
      <div className="md:hidden flex items-center justify-around bg-slate-50 border-t border-slate-200 px-2 py-2 text-xs font-medium text-slate-600">
        <button
          onClick={() => setActiveTab('home')}
          className={`px-2 py-1 rounded ${activeTab === 'home' ? 'bg-blue-100 text-blue-700 font-bold' : ''}`}
        >
          Home
        </button>
        <button
          onClick={() => setActiveTab('services')}
          className={`px-2 py-1 rounded ${activeTab === 'services' ? 'bg-blue-100 text-blue-700 font-bold' : ''}`}
        >
          Services
        </button>
        <button
          onClick={() => setActiveTab('estimator')}
          className={`px-2 py-1 rounded ${activeTab === 'estimator' ? 'bg-blue-100 text-blue-700 font-bold' : ''}`}
        >
          Estimator
        </button>
        <button
          onClick={() => setActiveTab('inquiry')}
          className={`px-2 py-1 rounded ${activeTab === 'inquiry' ? 'bg-blue-600 text-white font-bold' : ''}`}
        >
          Inquiry Form
        </button>
      </div>
    </header>
  );
};
