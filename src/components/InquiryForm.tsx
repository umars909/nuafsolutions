import React, { useState } from 'react';
import { Phone, Mail, Send, AlertCircle, CheckCircle2, ShieldAlert, Sparkles, Clock, Wrench } from 'lucide-react';
import { InquiryFormData } from '../types';

interface InquiryFormProps {
  onSubmissionSuccess?: (data: InquiryFormData) => void;
  prefillMessage?: string;
  prefillService?: string;
}

export const InquiryForm: React.FC<InquiryFormProps> = ({
  onSubmissionSuccess,
  prefillMessage = '',
  prefillService = 'Leak Repairs'
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(prefillService);
  const [urgency, setUrgency] = useState('Standard');
  const [message, setMessage] = useState(prefillMessage);

  const [loading, setLoading] = useState(false);
  const [statusState, setStatusState] = useState<{
    show: boolean;
    type: 'success' | 'error';
    text: string;
  }>({
    show: false,
    type: 'success',
    text: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setStatusState({ show: false, type: 'success', text: '' });

    const formData = {
      name,
      email,
      phone,
      service,
      urgency,
      message
    };

    // First try standard local/relative endpoint /api/submit-inquiry, fallback to /submit-inquiry
    const primaryEndpoint = '/api/submit-inquiry';
    const fallbackEndpoint = '/submit-inquiry';

    let success = false;
    let resultMessage = '';

    try {
      let response = await fetch(primaryEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Bypass-Tunnel-Reminder': 'true'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        // Try secondary legacy route
        response = await fetch(fallbackEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Bypass-Tunnel-Reminder': 'true'
          },
          body: JSON.stringify(formData)
        });
      }

      const result = await response.json().catch(() => ({}));

      if (response.ok && (result.status === 'success' || result.success)) {
        success = true;
        resultMessage = '✅ Inquiry sent successfully!';
        if (result.emailSent === false) {
          resultMessage = '✅ Inquiry received & logged in Nuaf Solutions dispatch system!';
        }
      } else {
        resultMessage = '❌ Backend Error: ' + (result.message || 'Processing failed.');
      }
    } catch (error) {
      console.error('Connection Error:', error);
      resultMessage = '❌ Unable to connect backend server.';
    }

    setLoading(false);
    if (success) {
      setStatusState({
        show: true,
        type: 'success',
        text: resultMessage
      });
      // Reset input fields
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      if (onSubmissionSuccess) {
        onSubmissionSuccess(formData);
      }
    } else {
      setStatusState({
        show: true,
        type: 'error',
        text: resultMessage
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-8 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 border-b border-slate-800">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
            <Wrench className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white m-0">Nuaf Solutions</h2>
        </div>
        <p className="text-blue-300 text-xs sm:text-sm font-medium">
          Professional Plumbing & Handyman Services
        </p>
      </div>

      <div className="p-6 sm:p-8 space-y-6">
        {/* Exact Introductory Paragraphs requested by User */}
        <div className="space-y-3">
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed m-0 font-normal">
            Nuaf Solutions is a leading provider of professional plumbing and handyman services, offering reliable and efficient solutions for all your needs.
          </p>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed m-0 font-normal">
            We specialize in leak repairs, pipe installations, and general plumbing maintenance, ensuring your home or business runs smoothly.
          </p>
          
          {/* Highlight Contact Banner matching exact user prompt text */}
          <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-lg text-blue-900 font-semibold text-sm sm:text-base flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 shadow-xs">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Call us at <a href="tel:+447879334977" className="underline font-bold hover:text-blue-700">+447879334977</a>, or email us at <a href="mailto:nuafsolutions@gmail.com" className="underline font-bold hover:text-blue-700">nuafsolutions@gmail.com</a>.</span>
            </div>
          </div>
        </div>

        {/* Inquiry Form */}
        <form id="inquiryForm" onSubmit={handleSubmit} className="space-y-5 pt-2">
          
          {/* Your Name */}
          <div className="form-group">
            <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-1.5">
              Your Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Umar"
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 placeholder:text-slate-400 text-base transition-all"
            />
          </div>

          {/* Email Address & Phone Number */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="form-group">
              <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-1.5">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 placeholder:text-slate-400 text-base transition-all"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone" className="block text-sm font-bold text-slate-700 mb-1.5">
                Phone Number <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+44 7000 000000"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 placeholder:text-slate-400 text-base transition-all"
              />
            </div>
          </div>

          {/* Service Category & Urgency */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="form-group">
              <label htmlFor="service" className="block text-sm font-bold text-slate-700 mb-1.5">
                Service Required
              </label>
              <select
                id="service"
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-medium"
              >
                <option value="Leak Repairs">Leak Repairs & Sealing</option>
                <option value="Pipe Installations">Pipe Installations & Repiping</option>
                <option value="General Plumbing Maintenance">General Plumbing Maintenance</option>
                <option value="Handyman Services">Handyman & Fixture Fitting</option>
                <option value="Drain Unblocking">Drain Cleaning & Unblocking</option>
                <option value="Emergency Callout">24/7 Emergency Callout</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="urgency" className="block text-sm font-bold text-slate-700 mb-1.5">
                Urgency Level
              </label>
              <select
                id="urgency"
                value={urgency}
                onChange={(e) => setUrgency(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-medium"
              >
                <option value="Standard">Standard Schedule (1-3 Days)</option>
                <option value="Same Day Urgent">Same Day Urgent</option>
                <option value="Emergency (24 Hours)">Emergency (Immediate Callout)</option>
              </select>
            </div>
          </div>

          {/* Issue Details */}
          <div className="form-group">
            <label htmlFor="message" className="block text-sm font-bold text-slate-700 mb-1.5">
              Plumbing / Handyman Issue Details <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe the leak, job, or installation needed..."
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 placeholder:text-slate-400 text-base transition-all resize-y"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            id="submitBtn"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-lg text-base shadow-md transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Sending...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Send Inquiry</span>
              </>
            )}
          </button>
        </form>

        {/* Status Message Display */}
        {statusState.show && (
          <div
            id="status-message"
            className={`p-4 rounded-lg font-bold text-center text-sm sm:text-base flex items-center justify-center gap-2 ${
              statusState.type === 'success'
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-red-100 text-red-800 border border-red-300'
            }`}
          >
            {statusState.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            )}
            <span>{statusState.text}</span>
          </div>
        )}
      </div>
    </div>
  );
};
