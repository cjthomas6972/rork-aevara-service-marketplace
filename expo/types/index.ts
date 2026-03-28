export type UserRole = "client" | "provider" | "marketer" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  isActive: boolean;
}

export interface Service {
  id: string;
  categoryId: string;
  providerId: string;
  providerName: string;
  title: string;
  description: string;
  priceMin: number;
  priceMax?: number;
  serviceArea: string;
  rating?: number;
  totalReviews?: number;
  imageUrl?: string;
}

export interface Booking {
  id: string;
  serviceId: string;
  serviceName: string;
  clientId: string;
  clientName: string;
  providerId: string;
  providerName: string;
  marketerId?: string;
  marketerName?: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  bookingDate: string;
  totalAmount: number;
  platformFee: number;
  marketerCommission: number;
  providerPayout: number;
  createdAt: string;
}

export interface Commission {
  id: string;
  marketerId: string;
  clientId: string;
  clientName: string;
  bookingId: string;
  amount: number;
  percentage: number;
  date: string;
}

export interface Referral {
  id: string;
  marketerId: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  totalBookings: number;
  totalCommissionEarned: number;
  joinedAt: string;
}

export interface PlatformMetrics {
  totalGMV: number;
  totalCommissionsPaid: number;
  activeProviders: number;
  activeMarketers: number;
  activeClients: number;
  totalBookings: number;
  averageBookingValue: number;
}
