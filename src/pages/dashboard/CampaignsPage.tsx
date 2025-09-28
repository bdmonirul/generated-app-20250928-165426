import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAppStore } from '@/stores/app-store';
import { cn } from '@/lib/utils';
import type { Campaign } from '@shared/types';
import { PageHeader } from '@/components/layout/PageHeader';
import { toast } from 'sonner';
import { ConfirmationDialog } from '@/components/ConfirmationDialog';
const campaignSchema = z.object({
  name: z.string().min(3, 'Campaign name must be at least 3 characters'),
  channel: z.enum(['Email', 'SMS', 'WhatsApp']),
});
type CampaignFormData = z.infer<typeof campaignSchema>;
const getStatusBadgeClass = (status: Campaign['status']) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 border-green-300 dark:border-green-700';
    case 'paused':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700';
    case 'draft':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700/50 dark:text-gray-300 border-gray-300 dark:border-gray-600';
    default:
      return '';
  }
};
export function CampaignsPage() {
  const { campaigns, addCampaign, updateCampaign, deleteCampaign } = useAppStore();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [selectedCampaign, setSelectedCampaign] = React.useState<Campaign | null>(null);
  const { control, handleSubmit, register, formState: { errors }, reset } = useForm<CampaignFormData>({
    resolver: zodResolver(campaignSchema),
    defaultValues: { name: '', channel: 'Email' },
  });
  const onSubmit = (data: CampaignFormData) => {
    const newCampaign: Campaign = {
      id: `cam_${Date.now()}`,
      name: data.name,
      channel: data.channel,
      status: 'draft',
      recovered: 0,
      conversionRate: 0,
    };
    addCampaign(newCampaign);
    toast.success(`Campaign "${data.name}" created as a draft.`);
    reset();
    setIsDialogOpen(false);
  };
  const handleStatusChange = (campaign: Campaign, status: Campaign['status']) => {
    updateCampaign(campaign.id, { status });
    toast.success(`Campaign "${campaign.name}" status updated to ${status}.`);
  };
  const handleDeleteConfirm = () => {
    if (selectedCampaign) {
      deleteCampaign(selectedCampaign.id);
      toast.error(`Campaign "${selectedCampaign.name}" has been deleted.`);
      setSelectedCampaign(null);
    }
  };
  return (
    <div className="space-y-8">
      <PageHeader
        title="Cart Recovery Campaigns"
        description="Create, manage, and monitor your automated cart recovery flows."
      >
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> New Campaign
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Campaign</DialogTitle>
              <DialogDescription>
                Set up a new cart recovery campaign. You can configure the details later.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">Name</Label>
                  <div className="col-span-3">
                    <Input id="name" {...register('name')} className={errors.name ? 'border-destructive' : ''} />
                    {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="channel" className="text-right">Channel</Label>
                  <div className="col-span-3">
                    <Controller
                      name="channel"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a channel" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Email">Email</SelectItem>
                            <SelectItem value="SMS">SMS</SelectItem>
                            <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Create Campaign</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </PageHeader>
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
            <TabsTrigger value="paused" className="hidden sm:flex">Paused</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Campaigns</CardTitle>
              <CardDescription>An overview of all your cart recovery campaigns.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">Channel</TableHead>
                    <TableHead className="hidden md:table-cell">Recovered</TableHead>
                    <TableHead className="text-right">Conv. Rate</TableHead>
                    <TableHead><span className="sr-only">Actions</span></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {campaigns.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell className="font-medium">{campaign.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={cn('capitalize', getStatusBadgeClass(campaign.status))}>
                          {campaign.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{campaign.channel}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(campaign.recovered)}
                      </TableCell>
                      <TableCell className="text-right">{campaign.conversionRate}%</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button aria-haspopup="true" size="icon" variant="ghost">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuSub>
                              <DropdownMenuSubTrigger>Change Status</DropdownMenuSubTrigger>
                              <DropdownMenuSubContent>
                                <DropdownMenuItem onClick={() => handleStatusChange(campaign, 'active')} disabled={campaign.status === 'active'}>Active</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleStatusChange(campaign, 'paused')} disabled={campaign.status === 'paused'}>Paused</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleStatusChange(campaign, 'draft')} disabled={campaign.status === 'draft'}>Draft</DropdownMenuItem>
                              </DropdownMenuSubContent>
                            </DropdownMenuSub>
                            <DropdownMenuItem>View Analytics</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive" onClick={() => { setSelectedCampaign(campaign); setIsDeleteDialogOpen(true); }}>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <ConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        title="Are you sure you want to delete this campaign?"
        description="This action cannot be undone. This will permanently delete the campaign and its associated data."
        confirmText="Yes, delete campaign"
      />
    </div>
  );
}