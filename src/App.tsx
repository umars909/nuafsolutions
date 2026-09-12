import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { InquiryForm } from './components/InquiryForm';
import { CostEstimator } from './components/CostEstimator';
import { ServicesGrid } from './components/ServicesGrid';
import { ReviewsAndCoverage } from './components/ReviewsAndCoverage';
import { Footer } from './components/Footer';
import { InquiryFormData } from './types';
import { Phone, MessageSquareText, ArrowUp } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'services' | 'estimator' | 'inquiry'>('home');
  const [prefillMessage, setPrefillMessage] = useState('');
  const [prefillService, setPrefillService] = useState('Leak Repairs');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectServiceFromGrid = (serviceTitle: string) => {
    setPrefillService(serviceTitle);
    setPrefillMessage(`I would like to inquire about booking ${serviceTitle}. Please get back to me with availability.`);
    setActiveTab('inquiry');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSendEstimateToInquiry = (summaryText: string, serviceTitle: string) => {
    setPrefillService(serviceTitle);
    setPrefillMessage(`Job Details / Estimate Quote Breakdown:\n${summaryText}\n\nPlease contact me to finalize this appointment.`);
    setActiveTab('inquiry');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInquirySubmitted = (data: InquiryFormData) => {
    // Inquiry successfully submitted
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans flex flex-col selection:bg-blue-600 selection:text-white">
      
      {/* Header Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div>
            <Hero
              onInquireClick={() => {
                setActiveTab('inquiry');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onEstimateClick={() => {
                setActiveTab('estimator');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Services Overview */}
            <ServicesGrid onSelectService={handleSelectServiceFromGrid} />

            {/* Quick Estimator Preview */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
              <CostEstimator onSendEstimateToInquiry={handleSendEstimateToInquiry} />
            </div>

            {/* Inquiry Form Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="inquiry-section">
              <InquiryForm
                onSubmissionSuccess={handleInquirySubmitted}
                prefillMessage={prefillMessage}
                prefillService={prefillService}
              />
            </div>

            {/* Reviews & Guarantee */}
            <ReviewsAndCoverage />
          </div>
        )}

        {activeTab === 'services' && (
          <div className="py-8">
            <ServicesGrid onSelectService={handleSelectServiceFromGrid} />
          </div>
        )}

        {activeTab === 'estimator' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <CostEstimator onSendEstimateToInquiry={handleSendEstimateToInquiry} />
          </div>
        )}

        {activeTab === 'inquiry' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <InquiryForm
              onSubmissionSuccess={handleInquirySubmitted}
              prefillMessage={prefillMessage}
              prefillService={prefillService}
            />
          </div>
        )}
      </main>

      {/* Floating Action Bar on Mobile/Desktop */}
      <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2">
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="p-3 bg-slate-900 text-white rounded-full shadow-lg border border-slate-700 hover:bg-slate-800 transition-all"
            title="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}

        <div className="flex items-center gap-2 bg-slate-900/90 backdrop-blur-md text-white p-2 rounded-2xl shadow-2xl border border-slate-800">
          <a
            href="tel:+447879334977"
            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">+44 7879 334977</span>
            <span className="sm:hidden">Call</span>
          </a>

          <button
            onClick={() => {
              setActiveTab('inquiry');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <MessageSquareText className="w-4 h-4" />
            <span>Send Inquiry</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
