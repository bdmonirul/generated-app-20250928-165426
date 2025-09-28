import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { mockCampaigns, mockBundles, mockStockAlerts, mockSettings } from '@shared/mock-data';
import type { Campaign, Bundle, StockAlert, Settings } from '@shared/types';
interface AppState {
  campaigns: Campaign[];
  bundles: Bundle[];
  stockAlerts: StockAlert[];
  settings: Settings;
}
interface AppActions {
  addCampaign: (campaign: Campaign) => void;
  updateCampaign: (campaignId: string, updates: Partial<Campaign>) => void;
  deleteCampaign: (campaignId: string) => void;
  addBundle: (bundle: Bundle) => void;
  updateBundle: (bundleId: string, updates: Partial<Bundle>) => void;
  deleteBundle: (bundleId: string) => void;
  deleteStockAlert: (alertId: string) => void;
  updateSettings: (settings: Settings) => void;
}
export const useAppStore = create<AppState & AppActions>()(
  persist(
    immer((set) => ({
      campaigns: mockCampaigns,
      bundles: mockBundles,
      stockAlerts: mockStockAlerts,
      settings: mockSettings,
      addCampaign: (campaign) =>
        set((state) => {
          state.campaigns.unshift(campaign);
        }),
      updateCampaign: (campaignId, updates) =>
        set((state) => {
          const campaignIndex = state.campaigns.findIndex((c) => c.id === campaignId);
          if (campaignIndex !== -1) {
            state.campaigns[campaignIndex] = { ...state.campaigns[campaignIndex], ...updates };
          }
        }),
      deleteCampaign: (campaignId) =>
        set((state) => {
          state.campaigns = state.campaigns.filter((c) => c.id !== campaignId);
        }),
      addBundle: (bundle) =>
        set((state) => {
          state.bundles.unshift(bundle);
        }),
      updateBundle: (bundleId, updates) =>
        set((state) => {
          const bundleIndex = state.bundles.findIndex((b) => b.id === bundleId);
          if (bundleIndex !== -1) {
            state.bundles[bundleIndex] = { ...state.bundles[bundleIndex], ...updates };
          }
        }),
      deleteBundle: (bundleId) =>
        set((state) => {
          state.bundles = state.bundles.filter((b) => b.id !== bundleId);
        }),
      deleteStockAlert: (alertId) =>
        set((state) => {
          state.stockAlerts = state.stockAlerts.filter((a) => a.id !== alertId);
        }),
      updateSettings: (settings) =>
        set((state) => {
          state.settings = settings;
        }),
    })),
    {
      name: 'revenue-engine-storage',
    }
  )
);