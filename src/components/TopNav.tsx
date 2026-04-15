"use client";
import Link from 'next/link';
import { Leaf, Wallet } from 'lucide-react';
import { useWallet } from '@/context/WalletContext';

export default function TopNav() {
  const { ecoPoints } = useWallet();

  return (
    <nav className="top-nav">
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
        <div style={{ background: 'var(--accent-gradient)', padding: '6px', borderRadius: '8px' }}>
          <Leaf size={24} color="white" />
        </div>
        <h1 style={{ fontSize: '1.5rem', color: '#fff', margin: 0 }}>EcoCycle.</h1>
      </Link>
      <div className="nav-links">
        <Link href="/">Marketplace</Link>
        <Link href="/wallet">Impact Dashboard</Link>
      </div>
      <Link href="/wallet" className="wallet-badge">
        <Wallet size={18} />
        <span>{ecoPoints.toLocaleString()} Eco Points</span>
      </Link>
    </nav>
  );
}
