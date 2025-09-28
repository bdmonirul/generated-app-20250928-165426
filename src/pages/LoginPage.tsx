import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthStore } from '@/stores/auth-store';
import { Zap } from 'lucide-react';
export function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const handleLogin = () => {
    login();
    navigate('/');
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 dark:bg-slate-900 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-500">
            <Zap className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold font-display">Revenue Engine</CardTitle>
          <CardDescription>
            You're about to install the most powerful revenue recovery app for Shopify.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              By clicking "Install & Authorize", you agree to allow Revenue Engine to access your store's data, including orders, products, and customer information, in accordance with our privacy policy.
            </p>
            <Button
              onClick={handleLogin}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              size="lg"
            >
              Install & Authorize
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}