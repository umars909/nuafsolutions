export interface ServiceItem {
  id: string;
  title: string;
  category: 'Plumbing' | 'Handyman' | 'Emergency' | 'Installation';
  description: string;
  iconName: string;
  basePrice: number;
  priceUnit: string;
  estimatedTime: string;
  features: string[];
  popular?: boolean;
}

export interface InquiryFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  urgency: string;
  message: string;
}

export interface InquiryRecord extends InquiryFormData {
  id: string;
  status: 'New' | 'Contacted' | 'Scheduled' | 'Completed';
  createdAt: string;
  emailSent: boolean;
  emailError?: string;
}

export interface CostCalculation {
  serviceType: string;
  jobSize: 'Small Fix' | 'Medium Job' | 'Large / Multi-Room';
  urgency: 'Standard (1-2 Days)' | 'Same Day Urgent' | '24/7 Emergency';
  needsMaterials: boolean;
  estimatedCostMin: number;
  estimatedCostMax: number;
  summaryText: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  serviceUsed: string;
  rating: number;
  date: string;
  comment: string;
}
