import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@/components/theme-provider.tsx";

import "@/index.scss";
import { AppLoading } from "./AppLoading";
const AppContent = lazy(() => import("@/AppContent"));

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <Suspense fallback={<AppLoading />}>
        <AppContent />
      </Suspense>
    </ThemeProvider>
  </React.StrictMode>
);
