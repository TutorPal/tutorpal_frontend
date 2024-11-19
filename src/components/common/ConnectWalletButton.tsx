"use client";

import { thirdwebFrontendClient } from "@/utils/thirdweb/client";
import { ConnectButton, useActiveAccount, useConnect, useConnectedWallets, useDisconnect } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { sepolia, defineChain } from "thirdweb/chains";

import { useToast } from "@/hooks/use-toast";
import { formatAddress } from "@/utils/formatAddress";
import { ToastAction } from "../ui/toast";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useEffect, useState } from "react";
import { RegistrationModal } from "../RegistrationModal";

const ConnectWalletButton = () => {
  const { toast } = useToast();

  // const account = useActiveAccount();
  const connectedWallet = useConnectedWallets();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  // const handleConnect = async () => {
  //   const wallet = createWallet()
  // }

  const account = useActiveAccount();
  const address = account?.address;
  const { profile, isLoading } = useUserProfile();
  const [showRegistration, setShowRegistration] = useState(false);

  useEffect(() => {
    if (address && !isLoading && !profile?.isRegistered) {
      setShowRegistration(true);
    }
  }, [address, profile, isLoading]);

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
        chain={defineChain(4202)}
        accountAbstraction={{
          chain: defineChain(4202),
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
      <RegistrationModal 
        open={showRegistration} 
        onClose={() => setShowRegistration(false)} 
      />
    </div>
  );
};

export default ConnectWalletButton;
