import ClientChart from './ClientChart';
import Link from 'next/link';
import { ArrowLeft, Tag, Activity, Share2, ShieldCheck } from 'lucide-react';
import StreamingRationale from './StreamingRationale';
import ItemProvenance from './ItemProvenance';

export async function generateStaticParams() {
  return [
    { id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }, { id: '5' }, { id: '6' },
    { id: '7' }, { id: '8' }, { id: '9' }, { id: '10' }, { id: '11' }, { id: '12' }
  ];
}

export default async function ItemDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return (
    <div className="animate-slide-up">
      <header style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link href="/" style={{ color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '50%', display: 'flex' }}>
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="gradient-text">Asset Inventory Matrix</h1>
              <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>Predictive Analytics & Provenance for Entry #{resolvedParams.id}</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
             <button className="action-btn" style={{ width: 'auto', background: 'rgba(255,255,255,0.05)', color: 'white', padding: '10px 20px', fontSize: '0.9rem' }}><Share2 size={18} /></button>
             <button className="action-btn" style={{ width: 'auto', padding: '10px 24px', fontSize: '0.9rem' }}>Initiate Swap</button>
          </div>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 350px', gap: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="glass-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
                <div style={{ width: '100px', height: '100px', background: 'var(--panel-border)', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
                   <span style={{ fontSize: '3rem' }}>🛡️</span>
                </div>
                <div>
                  <h2 style={{ fontSize: '2rem', marginBottom: '8px' }}>Asset Cycle #{resolvedParams.id}</h2>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <ShieldCheck size={18} color="var(--eco-color)" />
                    <p style={{ color: 'var(--eco-color)', fontWeight: 600, fontSize: '1.1rem', margin: 0 }}>Verified Authenticity</p>
                  </div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                 <p style={{ color: 'var(--text-secondary)', marginBottom: '8px', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Projected Valuation</p>
                 <h2 style={{ color: '#fff', fontSize: '3.5rem', margin: 0, lineHeight: 1 }}>$142.50</h2>
              </div>
          </div>

          <div style={{ minHeight: '400px' }} className="glass-panel">
            <h3 style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Activity size={24} color="var(--eco-color)" />
              Algorithmic Price Degradation (12 Months)
            </h3>
            <div style={{ height: '320px' }}>
              <ClientChart />
            </div>
          </div>

          <StreamingRationale text={`[VISION MODEL START] Scanning asset heuristics for ID #${resolvedParams.id}...\n> Material match: 92% probability of High-Density Recyclable Polymer.\n> Secondary Market Data: Demand up 12% in regional hub.\n> Circularity Index: 0.88 (Rank: Platinum).\n> Recommended Pricing Deviation: -4% for immediate liquidity.\n[MODEL IDLE] Ready for circular transaction.`} />
        </div>

        <div>
           <ItemProvenance />
           <div className="glass-panel" style={{ marginTop: '24px', background: 'linear-gradient(135deg, rgba(52, 211, 153, 0.05), transparent)' }}>
              <h4 style={{ marginBottom: '16px' }}>Impact Estimation</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>CO2 Reduction</span>
                    <span style={{ color: 'var(--eco-color)', fontWeight: 600 }}>12.4kg</span>
                 </div>
                 <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Water Saved</span>
                    <span style={{ color: 'var(--eco-color)', fontWeight: 600 }}>120L</span>
                 </div>
                 <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Energy Offset</span>
                    <span style={{ color: 'var(--eco-color)', fontWeight: 600 }}>42kWh</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
