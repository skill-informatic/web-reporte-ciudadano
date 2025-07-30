"use client";

import "../app/globals.css";

import React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "@/app/lib/theme";
import { open_sans } from "./fonts";
import { Provider } from "react-redux";

import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${open_sans.className} antialiased`}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AppRouterCacheProvider>
              <ThemeProvider theme={theme}>
                <CssBaseline />

                {children}
              </ThemeProvider>
            </AppRouterCacheProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
