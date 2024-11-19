"use client";

import { type ReactNode } from "react";
import { ThirdwebProviderConfig } from "./ThirdwebProviderConfig";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "../ui/toaster";

interface MainProviderProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

const MainProvider = ({ children }: Readonly<MainProviderProps>) => {
  return (
    <ThirdwebProviderConfig>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster />
      </QueryClientProvider>
    </ThirdwebProviderConfig>
  );
};

export default MainProvider;
