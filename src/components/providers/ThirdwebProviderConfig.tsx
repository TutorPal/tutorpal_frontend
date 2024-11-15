"use client";

import { type ReactNode } from "react";
import { ThirdwebProvider } from "thirdweb/react";

interface ThirdwebProviderConfigProps {
  children: ReactNode;
}

export const ThirdwebProviderConfig = ({
  children,
}: ThirdwebProviderConfigProps) => {
  return <ThirdwebProvider>{children}</ThirdwebProvider>;
};
