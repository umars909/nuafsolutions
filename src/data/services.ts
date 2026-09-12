import { ServiceItem, Testimonial } from '../types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'leak-repairs',
    title: 'Leak Repairs & Water Loss Control',
    category: 'Plumbing',
    description: 'Rapid diagnostic and repair for burst pipes, leaking joints, dripping taps, radiator leaks, and water pressure loss.',
    iconName: 'Droplet',
    basePrice: 65,
    priceUnit: 'from £65',
    estimatedTime: '1 - 2 Hours',
    features: [
      'Non-invasive leak detection',
      'Copper & PEX pipe repair',
      'Under-sink & wall pipe sealing',
      'Water pressure testing'
    ],
    popular: true
  },
  {
    id: 'pipe-installations',
    title: 'Pipe Installations & Repiping',
    category: 'Installation',
    description: 'New pipe route fittings, waste pipe installations, appliance water line connections, and modern piping upgrades.',
    iconName: 'Wrench',
    basePrice: 120,
    priceUnit: 'from £120',
    estimatedTime: '2 - 4 Hours',
    features: [
      'Kitchen & bathroom repiping',
      'Washing machine & dishwasher feeds',
      'Main water valve replacement',
      'Corrosion resistant materials'
    ]
  },
  {
    id: 'plumbing-maintenance',
    title: 'General Plumbing Maintenance',
    category: 'Plumbing',
    description: 'Comprehensive routine plumbing checkups, valve replacements, flush mechanism repairs, and radiator bleeding.',
    iconName: 'Activity',
    basePrice: 55,
    priceUnit: 'from £55',
    estimatedTime: '1 - 3 Hours',
    features: [
      'Toilet flush mechanism fixes',
      'Stopcock replacement & repair',
      'Radiator valve fitting (TRV)',
      'Preventative system checks'
    ]
  },
  {
    id: 'handyman-fitting',
    title: 'Bathroom & Kitchen Handyman Services',
    category: 'Handyman',
    description: 'Professional handyman assistance for tap fitting, silicone re-sealing, vanity unit installation, and general fixes.',
    iconName: 'Hammer',
    basePrice: 50,
    priceUnit: 'from £50/hr',
    estimatedTime: 'Flexible',
    features: [
      'Silicone seal re-caulking',
      'Sanitaryware & sink fitting',
      'TV mounting & shelving',
      'Cabinet & fixture repairs'
    ],
    popular: true
  },
  {
    id: 'drain-cleaning',
    title: 'Drain & Trap Unblocking',
    category: 'Plumbing',
    description: 'Fast removal of blockages in kitchen sinks, shower traps, external gully traps, and slow-draining pipes.',
    iconName: 'Zap',
    basePrice: 75,
    priceUnit: 'from £75',
    estimatedTime: '1 Hour',
    features: [
      'Sink & shower drain clearing',
      'Trap disassembly & cleaning',
      'Odor eliminating flush',
      'Flow testing'
    ]
  },
  {
    id: 'emergency-callout',
    title: 'Emergency 24/7 Callout',
    category: 'Emergency',
    description: 'Immediate priority callouts for catastrophic pipe bursts, severe flooding, and urgent water shutoffs.',
    iconName: 'PhoneCall',
    basePrice: 95,
    priceUnit: 'from £95',
    estimatedTime: 'Under 1 Hour Arrival',
    features: [
      '24/7 Rapid response team',
      'Emergency water isolation',
      'Temporary pipe patching',
      'Immediate damage mitigation'
    ]
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 't-1',
    name: 'David H.',
    location: 'London',
    serviceUsed: 'Leak Repair & Pipe Sealing',
    rating: 5,
    date: '2 days ago',
    comment: 'Umar from Nuaf Solutions arrived within 45 minutes of my call about a leaking pipe under the sink. Fixed it promptly and cleanly. Highly recommended!'
  },
  {
    id: 't-2',
    name: 'Amina B.',
    location: 'Birmingham',
    serviceUsed: 'General Maintenance & Radiator Valves',
    rating: 5,
    date: '1 week ago',
    comment: 'Extremely professional handyman & plumbing service. Replaced two radiator valves and fixed our toilet flush. Fair transparent pricing.'
  },
  {
    id: 't-3',
    name: 'Robert C.',
    location: 'Manchester',
    serviceUsed: 'Washing Machine Pipe Fitting',
    rating: 5,
    date: '2 weeks ago',
    comment: 'Nuaf Solutions responded to my email inquiry instantly. New water intake pipe was fitted cleanly and tested thoroughly. Great experience.'
  }
];
