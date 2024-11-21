import React, { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Assuming you have your contract ABI and address imported
// import { contractABI, contractAddress } from './contract-config';
// import contractABI from '@/abi/tutorPalAbi'
import { tutorPalAbi } from '@/abi/tutorPalAbi';
import { tutorPalMarketAddress } from '@/utils/constants';

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
    if (isConnected && userProfile) {
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
      <DialogContent className='bg-white'>
        <DialogHeader>
          <DialogTitle>Complete Your Profile</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <Input 
            placeholder="Display Name" 
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
          
          <Select 
            value={selectedRole.toString()} 
            onValueChange={(value) => setSelectedRole(Number(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={RoleType.Student.toString()}>Student</SelectItem>
              <SelectItem value={RoleType.Instructor.toString()}>Instructor</SelectItem>
            </SelectContent>
          </Select>
          
          <Button 
            onClick={handleRegisterUser} 
            disabled={!displayName || selectedRole === RoleType.NotRegistered || isPending}
          >
            {isPending ? 'Registering...' : 'Register'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserRegistrationFlow;