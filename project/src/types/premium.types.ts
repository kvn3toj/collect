import { User } from './user.types';

export interface ConsultationReservation {
  id: string;
  userId: string;
  date: string;
  time: string;
  type: 'virtual' | 'in-person';
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Certification {
  id: string;
  productId: string;
  certificateNumber: string;
  issueDate: string;
  validUntil: string;
  documentUrl: string;
  status: 'active' | 'expired';
  metadata: {
    gemType: string;
    weight: number;
    dimensions: string;
    origin: string;
    grade: string;
  };
}

export interface PackagingOption {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  type: 'standard' | 'premium' | 'luxury';
  features: string[];
}

export interface CareProgram {
  id: string;
  userId: string;
  productId: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'expired' | 'cancelled';
  services: {
    type: 'cleaning' | 'inspection' | 'repair';
    scheduledDate?: string;
    completedDate?: string;
    status: 'pending' | 'scheduled' | 'completed';
  }[];
}

export interface InsuranceOption {
  id: string;
  name: string;
  description: string;
  coverage: {
    type: string;
    amount: number;
    duration: number;
  };
  price: number;
  features: string[];
}

export interface CraftsmanshipShowcase {
  id: string;
  title: string;
  description: string;
  media: {
    type: 'image' | 'video';
    url: string;
    caption?: string;
  }[];
  steps: {
    title: string;
    description: string;
    imageUrl: string;
  }[];
  artisanQuote?: {
    text: string;
    author: string;
    role: string;
  };
}

// Request/Response Types
export interface ConsultationReservationRequest {
  date: string;
  time: string;
  type: 'virtual' | 'in-person';
  notes?: string;
}

export interface PackagingSelectionRequest {
  packagingId: string;
  giftMessage?: string;
}

export interface CareServiceRequest {
  type: 'cleaning' | 'inspection' | 'repair';
  preferredDate?: string;
  notes?: string;
}

export interface InsuranceSelectionRequest {
  insuranceId: string;
  productId: string;
}

// Store Types
export interface PremiumFeaturesState {
  consultations: ConsultationReservation[];
  certifications: Certification[];
  carePrograms: CareProgram[];
  selectedPackaging?: PackagingOption;
  selectedInsurance?: InsuranceOption;
  isLoading: boolean;
  error: string | null;
}

// API Response Types
export interface PremiumFeaturesResponse<T> {
  data: T;
  message: string;
  status: 'success' | 'error';
} 