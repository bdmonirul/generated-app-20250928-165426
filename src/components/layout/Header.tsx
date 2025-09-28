import {
  Bell,
  Menu,
  Search,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Rocket,
  ShoppingBasket,
  Settings as SettingsIcon,
  Bell as BellIcon,
  Zap,
} from 'lucide-react';
const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Cart Recovery', href: '/campaigns', icon: Rocket },
  { name: 'AI Bundles', href: '/bundles', icon: ShoppingBasket },
  { name: 'Stock Alerts', href: '/alerts', icon: BellIcon },
  { name: 'Settings', href: '/settings', icon: SettingsIcon },
];
export function Header() {
  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b bg-background px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col bg-slate-900 text-white border-r-0">
          <nav className="grid gap-4 text-lg font-medium">
            <div className="flex h-16 shrink-0 items-center gap-x-3 border-b border-slate-700 mb-4">
              <div className="bg-green-500 p-2 rounded-lg">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-white text-xl font-bold font-display">Revenue Engine</h1>
            </div>
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-white ${
                    isActive ? 'bg-green-500 text-white' : 'text-slate-300'
                  }`
                }
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1">
        {/* Breadcrumbs could go here */}
      </div>
      <div className="flex items-center gap-x-4 lg:gap-x-6">
        <Button variant="ghost" size="icon" className="w-8 h-8">
          <Bell className="h-5 w-5" />
          <span className="sr-only">View notifications</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 p-1 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://avatar.vercel.sh/merchant.png" alt="Merchant" />
                <AvatarFallback>M</AvatarFallback>
              </Avatar>
              <span className="hidden lg:flex lg:items-center">
                <span className="text-sm font-semibold">Shopify Merchant</span>
                <ChevronDown className="ml-2 h-4 w-4 text-muted-foreground" />
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}