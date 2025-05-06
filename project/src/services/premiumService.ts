import { api } from './api';
import {
  ConsultationReservation,
  ConsultationReservationRequest,
  Certification,
  PackagingOption,
  CareProgram,
  CareServiceRequest,
  InsuranceOption,
  InsuranceSelectionRequest,
  CraftsmanshipShowcase,
  PremiumFeaturesResponse
} from '../types/premium.types';

class PremiumService {
  // Consultation Reservations
  async reserveConsultation(data: ConsultationReservationRequest): Promise<PremiumFeaturesResponse<ConsultationReservation>> {
    const response = await api.post('/api/consultations/reserve', data);
    return response.data;
  }

  async getConsultations(): Promise<PremiumFeaturesResponse<ConsultationReservation[]>> {
    const response = await api.get('/api/consultations');
    return response.data;
  }

  async cancelConsultation(id: string): Promise<PremiumFeaturesResponse<void>> {
    const response = await api.post(`/api/consultations/${id}/cancel`);
    return response.data;
  }

  // Certifications
  async getCertification(productId: string): Promise<PremiumFeaturesResponse<Certification>> {
    const response = await api.get(`/api/certifications/${productId}`);
    return response.data;
  }

  async downloadCertification(productId: string): Promise<Blob> {
    const response = await api.get(`/api/certifications/${productId}/download`, {
      responseType: 'blob'
    });
    return response.data;
  }

  // Packaging Options
  async getPackagingOptions(): Promise<PackagingOption[]> {
    try {
      const response = await api.get('/api/orders/packaging-options');
      return response.data;
    } catch (error) {
      console.error('Error fetching packaging options:', error);
      throw error;
    }
  }

  async selectPackaging(data: { orderId: string; packagingId: string }): Promise<void> {
    try {
      const response = await api.post('/api/packaging/select', data);
      return response.data;
    } catch (error) {
      console.error('Error selecting packaging:', error);
      throw error;
    }
  }

  // Care Program
  async getCarePrograms(): Promise<PremiumFeaturesResponse<CareProgram[]>> {
    const response = await api.get('/api/care-programs');
    return response.data;
  }

  async requestCareService(data: CareServiceRequest): Promise<PremiumFeaturesResponse<CareProgram>> {
    const response = await api.post('/api/care-programs/request', data);
    return response.data;
  }

  // Insurance Options
  async getInsuranceOptions(): Promise<InsuranceOption[]> {
    try {
      const response = await api.get('/api/orders/insurance-options');
      return response.data;
    } catch (error) {
      console.error('Error fetching insurance options:', error);
      throw error;
    }
  }

  async selectInsurance(data: { orderId: string; insuranceId: string }): Promise<void> {
    try {
      const response = await api.post('/api/insurance/select', data);
      return response.data;
    } catch (error) {
      console.error('Error selecting insurance:', error);
      throw error;
    }
  }

  // Craftsmanship Showcase
  async getCraftsmanshipShowcase(): Promise<PremiumFeaturesResponse<CraftsmanshipShowcase>> {
    const response = await api.get('/api/craftsmanship-showcase');
    return response.data;
  }
}

export const premiumService = new PremiumService();
export default premiumService; 