import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import type { Bundle } from '@shared/types';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/stores/app-store';
import { ConfirmationDialog } from '@/components/ConfirmationDialog';
import { toast } from 'sonner';
interface BundleCardProps {
  bundle: Bundle;
}
const getStatusBadgeClass = (status: Bundle['status']) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 border-green-300 dark:border-green-700';
    case 'draft':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700/50 dark:text-gray-300 border-gray-300 dark:border-gray-600';
    default:
      return '';
  }
};
export function BundleCard({ bundle }: BundleCardProps) {
  const updateBundle = useAppStore((state) => state.updateBundle);
  const deleteBundle = useAppStore((state) => state.deleteBundle);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const handleStatusToggle = () => {
    const newStatus = bundle.status === 'active' ? 'draft' : 'active';
    updateBundle(bundle.id, { status: newStatus });
    toast.success(`Bundle "${bundle.name}" status updated to ${newStatus}.`);
  };
  const handleDelete = () => {
    deleteBundle(bundle.id);
    toast.error(`Bundle "${bundle.name}" has been deleted.`);
  };
  return (
    <>
      <Card className="flex flex-col transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div>
              <CardTitle>{bundle.name}</CardTitle>
              <CardDescription>
                {bundle.products.length} products
              </CardDescription>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost" className="h-8 w-8 flex-shrink-0">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">More</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={handleStatusToggle}>
                  {bundle.status === 'active' ? 'Set as Draft' : 'Activate'}
                </DropdownMenuItem>
                <DropdownMenuItem>View Analytics</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                  onClick={() => setIsDeleteDialogOpen(true)}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="flex items-center -space-x-4">
            {bundle.products.slice(0, 3).map((product, index) => (
              <img
                key={product.id}
                src={product.image}
                alt={product.name}
                className="h-16 w-16 rounded-full object-cover border-4 border-background"
                style={{ zIndex: bundle.products.length - index }}
              />
            ))}
            {bundle.products.length > 3 && (
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted border-4 border-background" style={{ zIndex: 0 }}>
                <span className="text-sm font-medium">
                  +{bundle.products.length - 3}
                </span>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center bg-muted/50 p-4 rounded-b-lg">
          <div className="text-sm">
            <p className="font-semibold text-foreground">
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(bundle.revenueGenerated)}
            </p>
              <p className="text-muted-foreground">Revenue</p>
          </div>
          <Badge variant="outline" className={cn('capitalize', getStatusBadgeClass(bundle.status))}>
            {bundle.status}
          </Badge>
        </CardFooter>
      </Card>
      <ConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDelete}
        title="Are you sure you want to delete this bundle?"
        description="This action cannot be undone. This will permanently delete the bundle and its associated data."
        confirmText="Yes, delete bundle"
      />
    </>
  );
}