'use client'

import { type ReactNode } from "react";

interface MainProviderProps {
  children: ReactNode;
}
const MainProvider = ({ children }: Readonly<MainProviderProps>) => {
  return <>{children}</>;
};

export default MainProvider;
