import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { DraftProvider } from "./Utils/providers/DraftProvider.tsx";
import { PatchProvider } from "./Utils/providers/PatchProvider.tsx";
import MainLayout from "./layouts/MainLayout.tsx";

const Login = lazy(() => import("./pages/auth/discord/Login.tsx"));
const ChampionList = lazy(() => import("./components/ChampionList.tsx"));

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <MainLayout>

        <App/>
      </MainLayout>
      ),
  },
  {
    path: "/auth/discord/callback",
    element:(
      <MainLayout>
        <Suspense fallback={<div>Loading...</div>}>
          <Login />
        </Suspense>
      </MainLayout>
      ),
  },
  // route for all champions
  {
    path: "/champions",
    element: (
      <MainLayout>
        <Suspense fallback={<div>Loading...</div>}>
          <ChampionList />
        </Suspense>
      </MainLayout>
  ),
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <PatchProvider>
        <DraftProvider>
        <RouterProvider router={router} />
        </DraftProvider>
      </PatchProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
