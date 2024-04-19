import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { DraftProvider } from "./Utils/providers/DraftProvider.tsx";
import { PatchProvider } from "./Utils/providers/PatchProvider.tsx";
import MainLayout from "./layouts/MainLayout.tsx";

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ComparisonListProvider } from "./Utils/providers/ComparisonProvider.tsx";


const Login = lazy(() => import("./pages/auth/discord/Login.tsx"));
const ChampionList = lazy(() => import("./pages/ChampionList.tsx"));
const Compare = lazy(() => import("./pages/Compare.tsx"));


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
  {
    path: "/champions",
    element: (
      <MainLayout>
        <Suspense fallback={<div>Loading...</div>}>
          <ChampionList />
        </Suspense>
      </MainLayout>
    ),
    children: [
      {
        path: ":champion",
        element: (
          <MainLayout>
            <Suspense fallback={<div>Loading...</div>}>
              {/* <CharacterCard /> */}
            </Suspense>
          </MainLayout>
        ),
      },
    ],
  },
  {
    path: "/compare",
    element: (
      <MainLayout>
        <Suspense fallback={null}>
          <Compare />
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
          
          <ComparisonListProvider>
            <RouterProvider router={router} />
          </ComparisonListProvider>
        </DraftProvider>
      </PatchProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
