"use client"
// components/RegistrationModal.tsx
import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
// import { RoleType, useUserProfile } from '@/hooks/useUserProfile';
// import { useUserProfile } from '@/hooks/useUserProfile';
// import { toast } from '@/hooks/use-toast';
// import { TransactionButton, useSendAndConfirmTransaction, useSendTransaction } from 'thirdweb/react';
// import { prepareContractCall, prepareTransaction, sendTransaction } from 'thirdweb';
// import { useContractInteraction } from '@/hooks/useContractInteraction';
// import { TypedDataParameter } from 'abitype';
// import { SignableMessage, TypedDataDefinition } from 'viem';
import { useAccount, useReadContract } from 'wagmi';
import { tutorPalMarketAddress } from '@/utils/constants';
import { tutorPalAbi } from '@/abi/tutorPalAbi';
// import { useToast } from "@/components/ui/toast";

interface RegistrationModalProps {
  open: boolean;
  onClose: () => void;
}

// Enum matching Solidity RoleType
enum RoleType {
    NotRegistered = 0,
    Student = 1,
    Instructor = 2
}

export function RegistrationModal({ open, onClose }: RegistrationModalProps) {
  const [displayName, setDisplayName] = useState('');
  const [roleType, setRoleType] = useState<RoleType>(RoleType.Student);
  const [isSubmitting, setIsSubmitting] = useState(false);
//   const { registerUser } = useUserProfile();
//   const { toast } = useToast();
// const { tutorMarketContract } = useContractInteraction()


const { address, isConnected } = useAccount();
// const [ setIsRegistrationModalOpen] = useState(false);
const [localUserCache] = useState<{
  [address: string]: { 
    displayName: string; 
    roleType: RoleType; 
    isRegistered: boolean;
    timestamp: number;
  }
}>({});

// Read contract for getting user profile
const { data: userProfile } = useReadContract({
  address: tutorPalMarketAddress as `0x${string}`,
  abi: tutorPalAbi,
  functionName: 'getUserProfile',
  args: [address],
//   enabled: isConnected
});

// Write contract for registering user
// const { writeContract } = useWriteContract();

// Form handling for registration
// const { register, handleSubmit, formState: { errors } } = useForm<RegistrationFormData>({
//   resolver: zodResolver(registrationSchema)
// });

    // Effect to check user profile and manage registration flow
    useEffect(() => {
    if (!isConnected || !address) return;

    // Check local cache first
    const cachedUser = localUserCache[address];
    const isCacheRecent = cachedUser && 
        (Date.now() - cachedUser.timestamp) < 24 * 60 * 60 * 1000; // 24-hour cache

    if (isCacheRecent) {
        // Use cached data if recent
        return;
    }

    // If no cached data or cache is stale, check contract
    if (!userProfile) {
        // No profile exists, open registration modal
        // setIsRegistrationModalOpen(true);
    }
    // } else if (userProfile) {
    //     // Profile exists, update local cache
    //     setLocalUserCache(prev => ({
    //     ...prev,
    //     [address]: {
    //         displayName: userProfile[0],
    //         roleType: userProfile[1],
    //         isRegistered: userProfile[2],
    //         timestamp: Date.now()
    //     }
    //     }));
    // }
    }, [isConnected, address, userProfile]);

    // Registration submission handler
    // const onSubmit = () => {
    //     writeContract({
    //         address: tutorPalMarketAddress as `0x${string}`,
    //         abi: tutorPalAbi,
    //         functionName: 'registerUser',
    //         args: [displayName, roleType]
    //     });

    //     // Optimistically update local cache
    //     setLocalUserCache(prev => ({
    //         ...prev,
    //         [address!]: {
    //         displayName: displayName,
    //         roleType: roleType,
    //         isRegistered: true,
    //         timestamp: Date.now()
    //         }
    //     }));

    //     // setIsRegistrationModalOpen(false);
    // };





const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

     

        // await sendAndConfirmTransaction({
        //     args: ['displayName', 'roleType'],
        // })

  
//     console.log("Running")
// //   try {
//     console.log("In here maybe?")
//     const transaction = prepareContractCall({
//       contract: tutorMarketContract,
//       method: "function registerUser(string calldata _displayName, RoleType _roleType)",
//       params: [displayName, roleType],
//     });

//     console.log("After here?")

//     // Now transaction will match SendTransactionOptions type
//     sendTx(transaction);

//     // Handle success
//     setIsSubmitting(false);
//   } catch (error) {
//     console.error('Transaction failed:', error);
//     setIsSubmitting(false);
//     // Handle error appropriately
//   }

    // const transaction = prepareContractCall({
    //     contract: tutorMarketContract,
    //     method:
    //       "function registerUser(string calldata _displayName, RoleType _roleType) external",
    //     params: [displayName, roleType], // type safe params
    // });

    //   sendTransaction(transaction).then(() => {
    //     // allProductRefetch();
    //     // form.reset();
    //     // form.setValue("_barcode", "");
    //     // form.setValue("_productName", "");
    //     // form.setValue("_productPrice", "");
    //     // form.setValue("_quantity", "");
    //   });
  

    // try {
    // //   const tx = await registerUser(displayName, roleType);
    // //   console.log("Transaction:", tx);
      
    // const transaction = prepareContractCall({
    //     contract: tutorMarketContract,
    //     method: "function registerUser(string calldata _displayName, RoleType _roleType) external",
    //     params: [displayName, roleType],
    // });
    //   // Wait for transaction confirmation
    // //   await tx?.wait();
      
    //   toast({
    //     title: "Registration successful!",
    //     description: "Your profile has been created.",
    //   });
    //   onClose();
      
    //   // Optional: Refresh the page to update the profile
    //   window.location.reload();
    // } catch (error) {
    //   console.error("Registration error:", error);
    //   toast({
    //     title: "Registration failed",
    //     description: "Please try again.",
    //     variant: "destructive",
    //   });
    // } finally {
    //   setIsSubmitting(false);
    // }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='bg-white'>
        <DialogHeader>
          <DialogTitle>Complete Your Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="displayName">Display Name</Label>
            <Input
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Enter your display name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Role Type</Label>
            <RadioGroup
              value={roleType.toString()}
              onValueChange={(value) => setRoleType(Number(value))}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={RoleType.Student.toString()} id="student" />
                <Label htmlFor="student">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={RoleType.Instructor.toString()} id="instructor" />
                <Label htmlFor="instructor">Instructor</Label>
              </div>
            </RadioGroup>
          </div>
          {/* <TransactionButton 
            transaction={() => (
                prepareContractCall({
                    contract: tutorMarketContract,
                    method: "function registerUser(string calldata _displayName, RoleType _roleType) external",
                    params: [displayName, roleType],
                })
            )}
            onTransactionConfirmed={() => (  
                    toast({
                      title: "Registration successful!",
                      description: "Your profile has been created.",
                    })
                    // onClose();
            )}>
            Register
          </TransactionButton> */}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Registering..." : "Register"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// () => {
//     try {   
//         toast({
//           title: "Registration successful!",
//           description: "Your profile has been created.",
//         });
//         onClose();
        
//         // Optional: Refresh the page to update the profile
//         // window.location.reload();
//       } catch (error) {
//         console.error("Registration error:", error);
//         toast({
//           title: "Registration failed",
//           description: "Please try again.",
//           variant: "destructive",
//         });
//       } finally {
//         setIsSubmitting(false);
//       }
// }
