import React, { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from "framer-motion"

// Assuming you have your contract ABI and address imported
// import { contractABI, contractAddress } from './contract-config';
// import contractABI from '@/abi/tutorPalAbi'
import { tutorPalAbi } from '@/abi/tutorPalAbi';
import { tutorPalMarketAddress } from '@/utils/constants';
import { userProfileState } from '@/store/atoms/userProfileAtom';
import { useRecoilState } from 'recoil';
import { Label } from './ui/label';

// Enum type matching your Solidity enum
const RoleType = {
  NotRegistered: 0,
  Student: 1,
  Instructor: 2
};

const UserRegistrationFlow = () => {
  const { address, isConnected } = useAccount();
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [selectedRole, setSelectedRole] = useState(RoleType.NotRegistered);

  const [user, setUser] = useRecoilState(userProfileState);

  // Read contract hook to check user registration status
  const { data: userProfile, refetch } = useReadContract({
    address: tutorPalMarketAddress,
    abi: tutorPalAbi,
    functionName: 'getUserProfile',
    args: [address],
    // enabled: !!address
  }) as { data: [string, number, boolean] | undefined, refetch: () => void };

  // Write contract hook for user registration
  const { writeContract, isPending, isSuccess } = useWriteContract();

//   const isRegistered = userProfile && userProfile?.[2];

  // Check registration status on wallet connection or address change
  useEffect(() => {
    console.log("REG FLOW RUN")
    console.log("PROFILE", userProfile)
    console.log("USER", user)
    if (isConnected && userProfile) {
        setUser([...userProfile])
        const registered = userProfile[2] as boolean;
    //   const isRegistered = userProfile[2]; // third value is isRegistered
      if (!registered) {
        setIsRegistrationModalOpen(true);
      }
    }
  }, [isConnected, userProfile]);

  // Handle successful registration
  useEffect(() => {
    if (isSuccess) {
      setIsRegistrationModalOpen(false);
      refetch(); // Refresh user profile
    }
  }, [isSuccess, refetch]);

  const handleRegisterUser = () => {
    writeContract({
      address: tutorPalMarketAddress,
      abi: tutorPalAbi,
      functionName: 'registerUser',
      args: [displayName, selectedRole]
    });
  };

  // If no wallet connected, don't show anything
  if (!isConnected) return null;

  return (
    <Dialog open={isRegistrationModalOpen} onOpenChange={setIsRegistrationModalOpen}>
      <DialogContent className="sm:max-w-[425px] bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-950/50 dark:to-emerald-950/50 border-teal-200 dark:border-teal-800">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-teal-500 to-emerald-500 bg-clip-text text-transparent">
            Complete Your Profile
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="displayName" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Display Name
            </Label>
            <Input 
              id="displayName"
              placeholder="Enter your display name" 
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="border-teal-200 dark:border-teal-800 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="role" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Select Role
            </Label>
            <Select 
              value={selectedRole.toString()} 
              onValueChange={(value) => setSelectedRole(Number(value))}
            >
              <SelectTrigger id="role" className="border-teal-200 dark:border-teal-800 focus:ring-teal-500 focus:border-teal-500">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent className='bg-white'>
                <SelectItem value={RoleType.Student.toString()}>Student</SelectItem>
                <SelectItem value={RoleType.Instructor.toString()}>Instructor</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              onClick={handleRegisterUser} 
              disabled={!displayName || selectedRole === RoleType.NotRegistered || isPending}
              className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white hover:from-teal-600 hover:to-emerald-600 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all duration-200"
            >
              {isPending ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                'Register'
              )}
            </Button>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>


    // <Dialog open={isRegistrationModalOpen} onOpenChange={setIsRegistrationModalOpen}>
    //   <DialogContent className='bg-white'>
    //     <DialogHeader>
    //       <DialogTitle>Complete Your Profile</DialogTitle>
    //     </DialogHeader>
        
    //     <div className="space-y-4">
    //       <Input 
    //         placeholder="Display Name" 
    //         value={displayName}
    //         onChange={(e) => setDisplayName(e.target.value)}
    //       />
          
    //       <Select 
    //         value={selectedRole.toString()} 
    //         onValueChange={(value) => setSelectedRole(Number(value))}
    //       >
    //         <SelectTrigger>
    //           <SelectValue placeholder="Select Role" />
    //         </SelectTrigger>
    //         <SelectContent>
    //           <SelectItem value={RoleType.Student.toString()}>Student</SelectItem>
    //           <SelectItem value={RoleType.Instructor.toString()}>Instructor</SelectItem>
    //         </SelectContent>
    //       </Select>
          
    //       <Button 
    //         onClick={handleRegisterUser} 
    //         disabled={!displayName || selectedRole === RoleType.NotRegistered || isPending}
    //       >
    //         {isPending ? 'Registering...' : 'Register'}
    //       </Button>
    //     </div>
    //   </DialogContent>
    // </Dialog>
  );
};

export default UserRegistrationFlow;