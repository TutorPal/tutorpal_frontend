"use client";
import '@rainbow-me/rainbowkit/styles.css';

import { type ReactNode } from "react";
import { ThirdwebProviderConfig } from "./ThirdwebProviderConfig";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "../ui/toaster";
import { WagmiProvider } from "wagmi";
// import { config } from "@/utils/config";

import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  liskSepolia
} from 'wagmi/chains';
import { RecoilRoot } from 'recoil';

interface MainProviderProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains: [mainnet, polygon, optimism, arbitrum, base, liskSepolia],
});

// const walletConfig = getDefaultConfig({
//   appName: 'My RainbowKit App',
//   projectId: 'YOUR_PROJECT_ID',
//   chains: [mainnet, polygon, optimism, arbitrum, base],
//   ssr: true, // If your dApp uses server side rendering (SSR)
// });

const MainProvider = ({ children }: Readonly<MainProviderProps>) => {
  return (
    <WagmiProvider config={config}>
      <ThirdwebProviderConfig>
        <RecoilRoot>
        <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
          <Toaster />
        </RainbowKitProvider>
        </QueryClientProvider>
        </RecoilRoot>
      </ThirdwebProviderConfig>
    </WagmiProvider>
  );
};

export default MainProvider;
