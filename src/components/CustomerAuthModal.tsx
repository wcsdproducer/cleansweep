'use client';

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { GoogleSignInButton } from '@/components/GoogleSignInButton';
import { useAuth, useFirebase } from '@/firebase';
import { initiateGoogleSignIn } from '@/firebase/non-blocking-login';
import { createOrUpdateCustomerProfile } from '@/firebase/non-blocking-updates';

const LOGO_URL =
  'https://firebasestorage.googleapis.com/v0/b/studio-3673070449-f277c.firebasestorage.app/o/brand%2Fcleansweep-logo.png?alt=media';

interface CustomerAuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CustomerAuthModal({ open, onOpenChange }: CustomerAuthModalProps) {
  const { auth, firestore } = useFirebase();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignIn = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await initiateGoogleSignIn(auth) as { user?: import('firebase/auth').User };
      // Auto-create/update the Firestore customer profile on sign-in
      if (result?.user) {
        createOrUpdateCustomerProfile(firestore, result.user);
      }
      onOpenChange(false);
    } catch (err: unknown) {
      const firebaseError = err as { code?: string };
      // Don't show error if user closed the popup themselves
      if (firebaseError?.code !== 'auth/popup-closed-by-user' && firebaseError?.code !== 'auth/cancelled-popup-request') {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }, [auth, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-3xl p-8 bg-white">
        <DialogHeader className="items-center text-center space-y-4">
          <div className="relative h-14 w-56 mx-auto">
            <Image
              src={LOGO_URL}
              alt="CleanSweep Cleaning Company"
              fill
              className="object-contain"
              priority
            />
          </div>
          <DialogTitle className="text-2xl font-bold text-[#1a6a91] mt-2">
            Welcome back!
          </DialogTitle>
          <DialogDescription className="text-gray-500 text-sm leading-relaxed">
            Sign in to view your quotes, booking history, and manage your
            CleanSweep account.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 space-y-4">
          <GoogleSignInButton onClick={handleGoogleSignIn} loading={loading} />

          {error && (
            <p className="text-sm text-red-500 text-center animate-in fade-in">
              {error}
            </p>
          )}

          <p className="text-xs text-gray-400 text-center leading-relaxed">
            By signing in, you agree to our{' '}
            <a href="/privacy-policy" className="underline hover:text-[#1a6a91]">
              Privacy Policy
            </a>{' '}
            &amp;{' '}
            <a href="/terms-of-service" className="underline hover:text-[#1a6a91]">
              Terms of Service
            </a>
            . We never share your data or post without permission.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
