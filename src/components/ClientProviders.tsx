"use client";
import React from 'react';
import { Toaster } from 'sonner';
import { WalletProvider } from '@/context/WalletContext';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <WalletProvider>
      <Toaster theme="dark" position="bottom-right" toastOptions={{ style: { background: 'var(--panel-bg)', border: '1px solid var(--eco-color)', color: '#fff' } }} />
      {children}
    </WalletProvider>
  );
}
