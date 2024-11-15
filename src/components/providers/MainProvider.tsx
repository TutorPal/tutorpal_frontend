"use client";

import { type ReactNode } from "react";
import { ThirdwebProviderConfig } from "./ThirdwebProviderConfig";
import { Toaster } from "../ui/toaster";

interface MainProviderProps {
  children: ReactNode;
}
const MainProvider = ({ children }: Readonly<MainProviderProps>) => {
  return (
    <ThirdwebProviderConfig>
      {children}
      <Toaster />
    </ThirdwebProviderConfig>
  );
};

export default MainProvider;
