import React from 'react';
import { SettingsCard } from '@/components/dashboard/SettingsCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { PageHeader } from '@/components/layout/PageHeader';
import { useAppStore } from '@/stores/app-store';
import { toast } from 'sonner';
export function SettingsPage() {
  const storeSettings = useAppStore((state) => state.settings);
  const updateSettings = useAppStore((state) => state.updateSettings);
  const [settings, setSettings] = React.useState(storeSettings);
  React.useEffect(() => {
    setSettings(storeSettings);
  }, [storeSettings]);
  const handleSave = () => {
    updateSettings(settings);
    toast.success('Settings saved successfully!');
  };
  const handleIntegrationChange = (
    service: 'twilio' | 'postmark',
    field: string,
    value: string
  ) => {
    setSettings((prev) => ({
      ...prev,
      integrations: {
        ...prev.integrations,
        [service]: {
          ...prev.integrations[service],
          [field]: value,
        },
      },
    }));
  };
  const handleBrandingChange = (field: string, value: string) => {
    setSettings((prev) => ({
      ...prev,
      branding: {
        ...prev.branding,
        [field]: value,
      },
    }));
  };
  const handleNotificationChange = (field: string, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [field]: value,
      },
    }));
  };
  return (
    <div className="space-y-8">
      <PageHeader
        title="Settings"
        description="Manage your integrations, branding, and notification preferences."
      >
        <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white">Save Changes</Button>
      </PageHeader>
      <div className="space-y-8">
        <SettingsCard
          title="Integrations"
          description="Connect your communication service accounts."
        >
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold">Twilio (for SMS & WhatsApp)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div>
                  <Label htmlFor="twilio-sid">Account SID</Label>
                  <Input
                    id="twilio-sid"
                    value={settings.integrations.twilio.accountSid}
                    onChange={(e) => handleIntegrationChange('twilio', 'accountSid', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="twilio-token">Auth Token</Label>
                  <Input
                    id="twilio-token"
                    type="password"
                    value={settings.integrations.twilio.authToken}
                    onChange={(e) => handleIntegrationChange('twilio', 'authToken', e.target.value)}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="twilio-phone">Twilio Phone Number</Label>
                  <Input
                    id="twilio-phone"
                    value={settings.integrations.twilio.phoneNumber}
                    onChange={(e) => handleIntegrationChange('twilio', 'phoneNumber', e.target.value)}
                  />
                </div>
              </div>
            </div>
            <Separator />
            <div>
              <h3 className="text-lg font-semibold">Postmark (for Email)</h3>
              <div className="mt-2">
                <Label htmlFor="postmark-key">API Key</Label>
                <Input
                  id="postmark-key"
                  type="password"
                  value={settings.integrations.postmark.apiKey}
                  onChange={(e) => handleIntegrationChange('postmark', 'apiKey', e.target.value)}
                />
              </div>
            </div>
          </div>
        </SettingsCard>
        <SettingsCard
          title="Branding"
          description="Customize the look and feel of your customer-facing notifications."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="logo-url">Logo URL</Label>
              <Input
                id="logo-url"
                placeholder="https://your-store.com/logo.png"
                value={settings.branding.logoUrl}
                onChange={(e) => handleBrandingChange('logoUrl', e.target.value)}
              />
            </div>
            <div className="flex items-end gap-4">
              <div className="flex-grow">
                <Label htmlFor="primary-color">Primary Color</Label>
                <Input
                  id="primary-color"
                  value={settings.branding.primaryColor}
                  onChange={(e) => handleBrandingChange('primaryColor', e.target.value)}
                />
              </div>
              <div
                className="h-10 w-10 rounded-md border"
                style={{ backgroundColor: settings.branding.primaryColor }}
              />
            </div>
          </div>
        </SettingsCard>
        <SettingsCard
          title="Global Rules"
          description="Enable or disable core features across the app."
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <Label htmlFor="abandoned-cart" className="font-semibold">Abandoned Cart Recovery</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically send recovery messages for abandoned checkouts.
                </p>
              </div>
              <Switch
                id="abandoned-cart"
                checked={settings.notifications.abandonedCart}
                onCheckedChange={(checked) => handleNotificationChange('abandonedCart', checked)}
              />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <Label htmlFor="back-in-stock" className="font-semibold">Back-in-Stock Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Allow customers to subscribe to out-of-stock products.
                </p>
              </div>
              <Switch
                id="back-in-stock"
                checked={settings.notifications.backInStock}
                onCheckedChange={(checked) => handleNotificationChange('backInStock', checked)}
              />
            </div>
          </div>
        </SettingsCard>
      </div>
      <footer className="text-center text-sm text-muted-foreground pt-8">
        Built with ❤️ at Cloudflare
      </footer>
    </div>
  );
}