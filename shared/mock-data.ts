import { Campaign, StockAlert, Bundle, Product } from './types';
export const mockCampaigns: Campaign[] = [
  {
    id: 'cam_1',
    name: 'Weekend Cart Recovery - SMS',
    status: 'active',
    channel: 'SMS',
    recovered: 12540.50,
    conversionRate: 15.2,
  },
  {
    id: 'cam_2',
    name: 'Holiday Sale Abandoned Carts',
    status: 'active',
    channel: 'Email',
    recovered: 28345.00,
    conversionRate: 12.8,
  },
  {
    id: 'cam_3',
    name: 'New Customer Welcome Flow',
    status: 'paused',
    channel: 'Email',
    recovered: 5200.00,
    conversionRate: 8.5,
  },
  {
    id: 'cam_4',
    name: 'High-Value Cart WhatsApp Push',
    status: 'active',
    channel: 'WhatsApp',
    recovered: 9850.75,
    conversionRate: 22.5,
  },
  {
    id: 'cam_5',
    name: 'Q2 Promo Draft',
    status: 'draft',
    channel: 'Email',
    recovered: 0,
    conversionRate: 0,
  },
  {
    id: 'cam_6',
    name: 'Black Friday Early Access - SMS',
    status: 'paused',
    channel: 'SMS',
    recovered: 45120.00,
    conversionRate: 18.9,
  },
  {
    id: 'cam_7',
    name: 'Default Email Recovery',
    status: 'active',
    channel: 'Email',
    recovered: 18930.25,
    conversionRate: 11.3,
  },
];
export const mockStockAlerts: StockAlert[] = [
  {
    id: 'alert_1',
    productName: 'Organic Cotton Crewneck T-Shirt',
    image: 'https://images.unsplash.com/photo-1581655353564-df123a164d2b?q=80&w=300&auto=format&fit=crop',
    subscribers: 128,
    revenueGenerated: 4480.00,
  },
  {
    id: 'alert_2',
    productName: 'Performance Running Sneakers',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=300&auto=format&fit=crop',
    subscribers: 256,
    revenueGenerated: 30720.00,
  },
  {
    id: 'alert_3',
    productName: 'Handmade Leather Wallet',
    image: 'https://images.unsplash.com/photo-1613025348193-5076a235f835?q=80&w=300&auto=format&fit=crop',
    subscribers: 78,
    revenueGenerated: 4680.00,
  },
  {
    id: 'alert_4',
    productName: 'Smart Fitness Tracker Watch',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=300&auto=format&fit=crop',
    subscribers: 312,
    revenueGenerated: 46800.00,
  },
  {
    id: 'alert_5',
    productName: 'Insulated Stainless Steel Water Bottle',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=300&auto=format&fit=crop',
    subscribers: 95,
    revenueGenerated: 2375.00,
  },
  {
    id: 'alert_6',
    productName: 'Noise-Cancelling Over-Ear Headphones',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=300&auto=format&fit=crop',
    subscribers: 150,
    revenueGenerated: 52500.00,
  },
];
export const mockProducts: { [key: string]: Product } = {
  tshirt: { id: 'prod_1', name: 'Organic T-Shirt', image: 'https://images.unsplash.com/photo-1581655353564-df123a164d2b?q=80&w=300&auto=format&fit=crop', price: 35.00 },
  sneakers: { id: 'prod_2', name: 'Running Sneakers', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=300&auto=format&fit=crop', price: 120.00 },
  wallet: { id: 'prod_3', name: 'Leather Wallet', image: 'https://images.unsplash.com/photo-1613025348193-5076a235f835?q=80&w=300&auto=format&fit=crop', price: 60.00 },
  watch: { id: 'prod_4', name: 'Fitness Watch', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=300&auto=format&fit=crop', price: 150.00 },
  bottle: { id: 'prod_5', name: 'Water Bottle', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=300&auto=format&fit=crop', price: 25.00 },
  headphones: { id: 'prod_6', name: 'Headphones', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=300&auto=format&fit=crop', price: 350.00 },
};
export const mockBundles: Bundle[] = [
  {
    id: 'bun_1',
    name: 'Fitness Starter Pack',
    products: [mockProducts.sneakers, mockProducts.watch, mockProducts.bottle],
    revenueGenerated: 15250.00,
    conversionRate: 8.5,
    status: 'active',
  },
  {
    id: 'bun_2',
    name: 'Everyday Carry Essentials',
    products: [mockProducts.tshirt, mockProducts.wallet, mockProducts.bottle],
    revenueGenerated: 8750.00,
    conversionRate: 12.3,
    status: 'active',
  },
  {
    id: 'bun_3',
    name: 'Audiophile Dream',
    products: [mockProducts.headphones],
    revenueGenerated: 22050.00,
    conversionRate: 6.2,
    status: 'draft',
  },
  {
    id: 'bun_4',
    name: 'Workout & Commute',
    products: [mockProducts.sneakers, mockProducts.headphones],
    revenueGenerated: 31200.00,
    conversionRate: 9.8,
    status: 'active',
  },
  {
    id: 'bun_5',
    name: 'Style & Tech',
    products: [mockProducts.tshirt, mockProducts.watch],
    revenueGenerated: 11300.00,
    conversionRate: 11.1,
    status: 'draft',
  },
];
export const mockSettings = {
  integrations: {
    twilio: {
      accountSid: 'ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      authToken: 'sk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      phoneNumber: '+15017122661'
    },
    postmark: {
      apiKey: 'pm_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
    }
  },
  branding: {
    logoUrl: 'https://tailwindui.com/img/logos/mark.svg?color=green&shade=500',
    primaryColor: '#16a34a' // rgb(22 163 74)
  },
  notifications: {
    backInStock: true,
    abandonedCart: true
  }
};