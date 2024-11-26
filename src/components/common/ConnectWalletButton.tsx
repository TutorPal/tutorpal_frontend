"use client";

// import { thirdwebFrontendClient } from "@/utils/thirdweb/client";
// import { ConnectButton, useActiveAccount } from "thirdweb/react";
// import { createWallet } from "thirdweb/wallets";
// import { defineChain } from "thirdweb/chains";
import { ConnectButton } from '@rainbow-me/rainbowkit';
// import { useAccount, useReadContract } from "wagmi";

// import { useToast } from "@/hooks/use-toast";
// import { formatAddress } from "@/utils/formatAddress";
// import { ToastAction } from "../ui/toast";
// import { useUserProfile } from "@/hooks/useUserProfile";
// import { useEffect, useState } from "react";
// import { RegistrationModal } from "../RegistrationModal";
// import { tutorPalMarketAddress } from "@/utils/constants";
// import CONTRACT_ABI from '@/abi/tutorPalAbi'
// import { tutorPalAbi } from "@/abi/tutorPalAbi";
import UserRegistrationFlow from "../UserRegistration";
import { User } from 'lucide-react';
import { useRecoilState } from 'recoil';
import { userProfileState } from '@/store/atoms/userProfileAtom';
import Link from 'next/link';

const ConnectWalletButton = () => {

  const [user] = useRecoilState(userProfileState);
  // const user = useRecoilValue(userProfileState)

  const isInstructor = user[1] === 2;
  const isStudent = user[1] === 1;
  // const { toast } = useToast();

  // const handleConnect = async () => {
  //   const wallet = createWallet()
  // }

  // const account = useActiveAccount();
  // const account = useAccount();
  // const address = account?.address;
  // const { profile, isLoading } = useUserProfile();
  // const [ setShowRegistration] = useState(false);

  // Read contract for getting user profile
// const { data: userProfile } = useReadContract({
//   address: tutorPalMarketAddress as `0x${string}`,
//   abi: tutorPalAbi,
//   functionName: 'getUserProfile',
//   args: [address],
// //   enabled: isConnected
// });

  // useEffect(() => {
  //   if (address && !isLoading && !profile?.isRegistered) {
  //     setShowRegistration(true);
  //   }

  //   if (!userProfile) {
  //     setShowRegistration(true);
  //   }

  // }, [address, profile, isLoading]);

  return (
    <div>
      <ConnectButton.Custom>
          {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated');

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
            className='bg-gradient-to-r from-teal-500 to-emerald-500 text-white p-2'
          >
            {(() => {
              if (!connected) {
                return (
                  <button onClick={openConnectModal} type="button">
                    Get Started
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button" className='bg-gradient-to-r from-teal-500 to-emerald-500 text-white p-2'>
                    Wrong network
                  </button>
                );
              }

              return (
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <button
                    onClick={openChainModal}
                    style={{ display: 'flex', alignItems: 'center' }}
                    type="button"
                    className='bg-gradient-to-r from-teal-500 to-emerald-500 text-white p-2'
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          overflow: 'hidden',
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            style={{ width: 12, height: 12 }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </button>

                  <button onClick={openAccountModal} type="button">
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ''}
                  </button>

                  <div>
                    {isInstructor && 
                      <>
                        <Link href="/tutor">
                          <User className='animate-pulse' />
                        </Link>
                      </>
                    }
                    {isStudent && 
                      <>
                        <Link href="/student/dashboard">
                          <User className='animate-pulse' />
                        </Link>
                      </>
                    }
                  </div>
                </div>
              );
            })()}
          </div>
        );
      }}
          </ConnectButton.Custom>
      {/* <ConnectButton
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
      /> */}
      {/* <RegistrationModal 
        open={showRegistration} 
        onClose={() => setShowRegistration(false)} 
      /> */}

      <UserRegistrationFlow />
    </div>
  );
};

export default ConnectWalletButton;
