import React from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAppStore } from '@/stores/app-store';
import { BundleCard } from '@/components/dashboard/BundleCard';
import { PageHeader } from '@/components/layout/PageHeader';
import { NewBundleForm, BundleFormData } from '@/components/dashboard/NewBundleForm';
import { mockProducts } from '@shared/mock-data';
import type { Bundle } from '@shared/types';
import { toast } from 'sonner';
export function BundlesPage() {
  const bundles = useAppStore((state) => state.bundles);
  const addBundle = useAppStore((state) => state.addBundle);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const activeBundles = bundles.filter((b) => b.status === 'active');
  const draftBundles = bundles.filter((b) => b.status === 'draft');
  const handleFormSubmit = (data: BundleFormData) => {
    const newBundle: Bundle = {
      id: `bun_${Date.now()}`,
      name: data.name,
      products: data.productIds.map(id => Object.values(mockProducts).find(p => p.id === id)).filter(Boolean) as any,
      status: 'draft',
      revenueGenerated: 0,
      conversionRate: 0,
    };
    addBundle(newBundle);
    toast.success(`Bundle "${data.name}" created as a draft.`);
    setIsDialogOpen(false);
  };
  return (
    <div className="space-y-8">
      <PageHeader
        title="AI Bundles & Upsells"
        description="Review, approve, or customize AI-generated product bundles."
      >
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> New Bundle
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Create New Bundle</DialogTitle>
              <DialogDescription>
                Create a new product bundle. It will be saved as a draft.
              </DialogDescription>
            </DialogHeader>
            <NewBundleForm
              onSubmit={handleFormSubmit}
              onCancel={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </PageHeader>
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All ({bundles.length})</TabsTrigger>
          <TabsTrigger value="active">Active ({activeBundles.length})</TabsTrigger>
          <TabsTrigger value="draft">Draft ({draftBundles.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {bundles.map((bundle) => (
              <BundleCard key={bundle.id} bundle={bundle} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="active" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {activeBundles.map((bundle) => (
              <BundleCard key={bundle.id} bundle={bundle} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="draft" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {draftBundles.map((bundle) => (
              <BundleCard key={bundle.id} bundle={bundle} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}