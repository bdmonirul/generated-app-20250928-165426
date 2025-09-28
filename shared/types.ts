import type { ElementType } from 'react';
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
// Demo types from boilerplate - can be removed later
export interface User {
  id: string;
  name: string;
}
export interface Chat {
  id: string;
  title: string;
}
export interface ChatMessage {
  id: string;
  chatId: string;
  userId: string;
  text: string;
  ts: number;
}
// New types for Revenue Engine
export interface StatCardData {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: ElementType;
}
export interface RevenueDataPoint {
  name: string;
  recovered: number;
  upsold: number;
}
export interface DashboardMetrics {
  stats: StatCardData[];
  revenueChartData: RevenueDataPoint[];
}
export interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'draft';
  channel: 'Email' | 'SMS' | 'WhatsApp';
  recovered: number;
  conversionRate: number;
}
export interface Bundle {
  id:string;
  name: string;
  products: Product[];
  revenueGenerated: number;
  conversionRate: number;
  status: 'active' | 'draft';
}
export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
}
export interface StockAlert {
  id: string;
  productName: string;
  image: string;
  subscribers: number;
  revenueGenerated: number;
}
export interface Settings {
  integrations: {
    twilio: {
      accountSid: string;
      authToken: string;
      phoneNumber: string;
    };
    postmark: {
      apiKey: string;
    };
  };
  branding: {
    logoUrl: string;
    primaryColor: string;
  };
  notifications: {
    backInStock: boolean;
    abandonedCart: boolean;
  };
}