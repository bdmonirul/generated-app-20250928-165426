# Revenue Engine - Shopify App
Revenue Engine is a unified Shopify application designed to help merchants recover lost revenue and increase average order value. It replaces the need for multiple, disparate apps by combining three core functionalities into a single, elegant dashboard: AI-powered product bundling & upsells, multi-channel abandoned cart recovery (Email, SMS, WhatsApp), and automated back-in-stock notifications.
The entire application is managed through a visually stunning, intuitive, and data-rich dashboard built for clarity and ease of use, designed to feel seamlessly integrated with the Shopify Admin UI.
## Key Features
-   **Unified Dashboard**: A central hub displaying key performance indicators (KPIs) at a glance with interactive charts and summary cards for revenue recovered, upsell performance, and subscriber growth.
-   **AI-Powered Bundling & Upsells**: An interface to review, approve, or customize AI-generated product bundles, and track their performance in terms of conversion rate and revenue generated.
-   **Multi-Channel Cart Recovery**: Create, manage, and monitor automated cart recovery flows across Email, SMS, and WhatsApp. Users can customize message templates, set sending delays, and analyze campaign effectiveness.
-   **Back-in-Stock Alerts**: A view that lists all products with active back-in-stock alerts. It shows the number of subscribers for each product and tracks the revenue generated from these notifications.
-   **Interactive & Persistent State**: The UI is fully interactive, with changes to campaigns, bundles, and settings persisting across sessions using local storage, powered by a centralized Zustand store.
-   **Shopify UI Simulation**: The application mimics the Shopify Admin look and feel, featuring a light-themed sidebar and consistent page headers for a seamless user experience. Includes a mock authentication flow to simulate app installation.
## Technology Stack
### Frontend
-   **Framework**: React (with Vite)
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS
-   **UI Components**: shadcn/ui, Radix UI
-   **Routing**: React Router
-   **State Management**: Zustand (with Immer & Persist middleware)
-   **Animations**: Framer Motion
-   **Charts**: Recharts
-   **Icons**: Lucide React
-   **Forms**: React Hook Form with Zod for validation
### Backend
-   **Runtime**: Cloudflare Workers
-   **Framework**: Hono
-   **Storage**: Cloudflare Durable Objects (abstracted via a core utility)
## Getting Started
Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.
### Prerequisites
-   [Node.js](https://nodejs.org/) (v18 or later)
-   [Bun](https://bun.sh/) as the package manager and runtime
-   [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) for Cloudflare Workers development
### Installation
1.  **Clone the repository:**
    ```sh
    git clone <repository-url>
    cd revenue_engine_shopify_app
    ```
2.  **Install dependencies:**
    This project uses `bun` for package management.
    ```sh
    bun install
    ```
3.  **Run the development server:**
    This command starts the Vite development server for the frontend and the Wrangler development server for the backend API.
    ```sh
    bun run dev
    ```
    The application will be available at `http://localhost:3000`. You will be redirected to a mock login page to simulate the Shopify app installation flow.
## Project Structure
-   `src/`: Contains the frontend React application code.
    -   `pages/`: Top-level page components, including the main layout and dashboard views.
    -   `components/`: Reusable UI components, organized by layout, dashboard features, and shadcn/ui elements.
    -   `stores/`: Zustand stores for managing global application and authentication state.
    -   `lib/`: Utility functions and the API client.
-   `worker/`: Contains the backend Hono application running on Cloudflare Workers.
    -   `index.ts`: The entry point for the worker.
    -   `user-routes.ts`: Where API routes are defined.
    -   `core-utils.ts` & `entities.ts`: Boilerplate for interacting with Durable Objects.
-   `shared/`: Contains TypeScript types and mock data shared between the frontend and backend.
## Development Philosophy
The application is architected as a high-fidelity, interactive Single Page Application (SPA) prototype.
-   **Frontend-First with Mock Data**: The UI is fully built out and powered by mock data located in `shared/mock-data.ts`. This allows for rapid development and a complete user experience demonstration without a live backend integration.
-   **Centralized State Management**: All application data (campaigns, bundles, alerts, settings) is managed in a centralized Zustand store (`src/stores/app-store.ts`). This store is persisted to local storage, making all user interactions (creating, updating, deleting items) feel real and stateful across browser sessions.
-   **Component-Based Architecture**: The UI is composed of reusable components built with shadcn/ui, promoting consistency and maintainability. Feature-specific components are organized under `src/components/dashboard/`.
## Deployment
This project is configured for seamless deployment to Cloudflare Pages and Workers.
1.  **Build the application:**
    This command bundles the frontend and prepares the worker for production.
    ```sh
    bun run build
    ```
2.  **Deploy to Cloudflare:**
    Make sure you are logged into the Wrangler CLI (`wrangler login`). Then, run the deploy command:
    ```sh
    bun run deploy
    ```
    Wrangler will handle the process of uploading your static assets to Cloudflare Pages and your API to Cloudflare Workers.
---
Built with ❤️ at Cloudflare