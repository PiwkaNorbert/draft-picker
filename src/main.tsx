import React, { lazy } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { DraftProvider } from "./Utils/providers/DraftProvider.tsx";

const Login = lazy(() => import("./pages/auth/discord/Login.tsx"));

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/auth/discord/callback",
    element: <Login />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <DraftProvider>
       <RouterProvider router={router} />
      </DraftProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
