import { enableMapSet } from "immer";
enableMapSet();
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary';
import '@/index.css'
import { HomePage } from '@/pages/HomePage'
import { OverviewPage } from '@/pages/dashboard/OverviewPage';
import { CampaignsPage } from '@/pages/dashboard/CampaignsPage';
import { BundlesPage } from '@/pages/dashboard/BundlesPage';
import { AlertsPage } from '@/pages/dashboard/AlertsPage';
import { SettingsPage } from '@/pages/dashboard/SettingsPage';
import { LoginPage } from '@/pages/LoginPage';
import { ProtectedRoute } from '@/components/ProtectedRoute';
const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <HomePage />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          { index: true, element: <OverviewPage /> },
          { path: "campaigns", element: <CampaignsPage /> },
          { path: "bundles", element: <BundlesPage /> },
          { path: "alerts", element: <AlertsPage /> },
          { path: "settings", element: <SettingsPage /> },
        ]
      }
    ]
  },
]);
// Do not touch this code
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </StrictMode>,
)