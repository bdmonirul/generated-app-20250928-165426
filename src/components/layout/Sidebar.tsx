import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Rocket,
  ShoppingBasket,
  Bell,
  Settings,
  Zap,
} from 'lucide-react';
const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Cart Recovery', href: '/campaigns', icon: Rocket },
  { name: 'AI Bundles', href: '/bundles', icon: ShoppingBasket },
  { name: 'Stock Alerts', href: '/alerts', icon: Bell },
  { name: 'Settings', href: '/settings', icon: Settings },
];
export function Sidebar() {
  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:z-50 border-r bg-[hsl(var(--sidebar-background))]">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto px-4 pb-4">
        <div className="flex h-16 shrink-0 items-center gap-x-3 px-2">
          <div className="bg-green-500 p-2 rounded-lg">
            <Zap className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-[hsl(var(--sidebar-foreground))] text-xl font-bold font-display">
            Revenue Engine
          </h1>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <NavLink
                      to={item.href}
                      end={item.href === '/'}
                      className={({ isActive }) =>
                        cn(
                          'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition-all duration-200',
                          isActive
                            ? 'bg-[hsl(var(--sidebar-active-background))] text-[hsl(var(--sidebar-active-foreground))]'
                            : 'text-[hsl(var(--sidebar-muted-foreground))] hover:text-[hsl(var(--sidebar-foreground))] hover:bg-[hsl(var(--sidebar-hover-background))]'
                        )
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <item.icon
                            className={cn(
                              'h-5 w-5 shrink-0',
                              'group-hover:text-[hsl(var(--sidebar-foreground))]',
                              isActive
                                ? 'text-[hsl(var(--sidebar-active-foreground))]'
                                : 'text-[hsl(var(--sidebar-muted-foreground))]'
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}