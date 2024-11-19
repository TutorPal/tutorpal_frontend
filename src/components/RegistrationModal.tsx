"use client"
// components/RegistrationModal.tsx
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { RoleType, useUserProfile } from '@/hooks/useUserProfile';
import { toast } from '@/hooks/use-toast';
// import { useToast } from "@/components/ui/toast";

interface RegistrationModalProps {
  open: boolean;
  onClose: () => void;
}

export function RegistrationModal({ open, onClose }: RegistrationModalProps) {
  const [displayName, setDisplayName] = useState('');
  const [roleType, setRoleType] = useState<RoleType>(RoleType.Student);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { registerUser } = useUserProfile();
//   const { toast } = useToast();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       const response = await registerUser(displayName, roleType);
//       console.log("REGISTER RESPONSE", response);
//       toast({
//         title: "Registration successful!",
//         description: "Your profile has been created.",
//       });
//       onClose();
//     } catch (error) {
//         console.log("REG ERROR", error)
//       toast({
//         title: "Registration failed",
//         description: "Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const tx = await registerUser(displayName, roleType);
      console.log("Transaction:", tx);
      
      // Wait for transaction confirmation
    //   await tx?.wait();
      
      toast({
        title: "Registration successful!",
        description: "Your profile has been created.",
      });
      onClose();
      
      // Optional: Refresh the page to update the profile
      window.location.reload();
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration failed",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Registering..." : "Register"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
