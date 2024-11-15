"use client";

import { thirdwebFrontendClient } from "@/utils/thirdweb/client";
import { ConnectButton } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { sepolia } from "thirdweb/chains";

import { useToast } from "@/hooks/use-toast";
import { formatAddress } from "@/utils/formatAddress";
import { ToastAction } from "../ui/toast";

const ConnectWalletButton = () => {
  const { toast } = useToast();
  return (
    <div>
      <ConnectButton
        client={thirdwebFrontendClient}
        wallets={[
          createWallet("io.metamask"),
          createWallet("com.coinbase.wallet"),
          createWallet("me.rainbow"),
        ]}
        recommendedWallets={[
          createWallet("com.binance"),
          createWallet("com.trustwallet.app"),
        ]}
        chain={sepolia}
        accountAbstraction={{
          chain: sepolia,
          sponsorGas: true,
        }}
        theme="dark"
        connectButton={{
          label: "Get Started with Tutorpal",
        }}
        appMetadata={{
          name: "Tutorpal",
          description: "Your decentralized knowledge exchange platform",
          url: "https://dekxp.vercel.app/",
          //   logoUrl: "",
        }}
        connectModal={{
          showThirdwebBranding: false,
          title: "Connect to Tutorpal",
          titleIcon: "",
        }}
        onConnect={(wallet) => {
          const address = wallet.getAccount()?.address || "N/A";
          const formattedAddress = formatAddress(address);

          toast({
            title: "Wallet connected!",
            description: `Address: ${formattedAddress}`,
            action: (
              <ToastAction altText="Click the top-right button to view wallet info">
                Close
              </ToastAction>
            ),
          });
        }}
      />
    </div>
  );
};

export default ConnectWalletButton;
