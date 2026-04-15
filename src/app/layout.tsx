import type { Metadata } from 'next';
import './globals.css';
import ClientProviders from '@/components/ClientProviders';
import TopNav from '@/components/TopNav';
import { CursorSpotlight, GlobalTicker } from '@/components/AwwwardsEffects';

export const metadata: Metadata = {
  title: 'EcoCycle Market',
  description: 'AI-powered marketplace for sustainable living',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>
          <CursorSpotlight color="rgba(16,185,129,0.8)" />
          <div className="eco-grid"></div>
          <TopNav />
          <main className="container">
            {children}
          </main>
          <GlobalTicker prefix="CO2 Offset Velocity" />
        </ClientProviders>
      </body>
    </html>
  );
}
