import { StatCard } from '@/components/dashboard/StatCard';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { DollarSign, ShoppingCart, Users, Zap } from 'lucide-react';
import type { StatCardData } from '@shared/types';
import { PageHeader } from '@/components/layout/PageHeader';
const stats: StatCardData[] = [
  {
    title: 'Total Revenue Recovered',
    value: '$45,231.89',
    change: '+20.1%',
    changeType: 'increase',
    icon: DollarSign,
  },
  {
    title: 'Upsell Revenue',
    value: '$12,831.00',
    change: '+15.2%',
    changeType: 'increase',
    icon: ShoppingCart,
  },
  {
    title: 'New Subscribers',
    value: '+2,350',
    change: '+180.1%',
    changeType: 'increase',
    icon: Users,
  },
  {
    title: 'Active Campaigns',
    value: '12',
    change: '+2 since last week',
    changeType: 'increase',
    icon: Zap,
  },
];
export function OverviewPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        description="Here's a quick overview of your store's performance."
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
        <RevenueChart />
        {/* Other components like recent activity or top products can go here */}
      </div>
    </div>
  );
}