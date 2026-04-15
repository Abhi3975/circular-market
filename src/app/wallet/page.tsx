"use client";
import React, { useState, useEffect } from 'react';
import { useWallet } from '@/context/WalletContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Shield, Globe, Map as MapIcon, Download, TrendingUp } from 'lucide-react';

const MATERIAL_DATA = [
  { name: 'Aluminum', value: 45, color: '#34d399' },
  { name: 'Glass', value: 25, color: '#10b981' },
  { name: 'Polymers', value: 20, color: '#059669' },
  { name: 'Textiles', value: 10, color: '#047857' },
];

export default function Wallet() {
  const { transactions, fiatBalance, ecoPoints } = useWallet();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab ] = useState('ledger');

  useEffect(() => { setMounted(true); }, []);

  return (
    <div className="animate-slide-up">
      <header style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 className="gradient-text" style={{ fontSize: '3.5rem', marginBottom: '8px' }}>Impact Intelligence</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>Corporate-grade sustainability metrics & cryptographic ledger.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
           <button onClick={() => setActiveTab('ledger')} className={`action-btn ${activeTab === 'ledger' ? '' : 'btn-outline'}`} style={{ width: 'auto', padding: '10px 24px', fontSize: '0.9rem' }}>Transactions</button>
           <button onClick={() => setActiveTab('map')} className={`action-btn ${activeTab === 'map' ? '' : 'btn-outline'}`} style={{ width: 'auto', padding: '10px 24px', fontSize: '0.9rem' }}>Regional Map</button>
        </div>
      </header>

      {activeTab === 'ledger' ? (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '32px' }}>
            <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 <p style={{ color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.8rem', margin: 0 }}>Liquid Assets</p>
                 <Shield size={18} color="rgba(255,255,255,0.2)" />
              </div>
              <div style={{ fontSize: '3rem', fontWeight: 700, color: '#fff' }}>${fiatBalance.toFixed(2)}</div>
              <p style={{ color: 'var(--eco-color)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <TrendingUp size={14} /> +$42.10 this period
              </p>
            </div>

            <div className="glass-panel" style={{ gridColumn: 'span 2', display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '32px', background: 'radial-gradient(circle at top right, rgba(16, 185, 129, 0.1), transparent)' }}>
               <div>
                  <p style={{ color: 'var(--eco-color)', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.8rem', margin: 0, marginBottom: '12px' }}>Circularity Scorecard</p>
                  <div style={{ fontSize: '4rem', fontWeight: 800, color: 'var(--eco-color)', lineHeight: 1 }}>{ecoPoints.toLocaleString()}<span style={{ fontSize: '1.2rem', marginLeft: '8px' }}>pts</span></div>
                  <div style={{ display: 'flex', gap: '24px', marginTop: '24px' }}>
                     <div>
                        <p style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 600, margin: 0 }}>{Math.floor(ecoPoints / 20)}kg</p>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', margin: 0 }}>Waste Diverted</p>
                     </div>
                     <div>
                        <p style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 600, margin: 0 }}>{Math.max(4, Math.floor(ecoPoints / 700))}</p>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', margin: 0 }}>Tree Equiv.</p>
                     </div>
                  </div>
               </div>
               <div style={{ height: '180px' }}>
                 {mounted && (
                   <ResponsiveContainer width="100%" height="100%">
                     <PieChart>
                       <Pie data={MATERIAL_DATA} innerRadius={50} outerRadius={70} paddingAngle={5} dataKey="value">
                         {MATERIAL_DATA.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={entry.color} />
                         ))}
                       </Pie>
                       <Tooltip 
                         contentStyle={{ background: '#111', border: '1px solid var(--panel-border)', borderRadius: '8px', fontSize: '12px' }}
                       />
                     </PieChart>
                   </ResponsiveContainer>
                 )}
               </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
             <h2 style={{ fontSize: '1.6rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                Audit Ledger
             </h2>
             <button style={{ background: 'transparent', border: '1px solid var(--panel-border)', color: 'var(--text-secondary)', padding: '8px 16px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem' }}>
                <Download size={14} /> Export CSV
             </button>
          </div>

          <div className="glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
            {transactions.map((t, i) => (
              <div key={t.id + i} style={{ padding: '20px 32px', borderBottom: i === transactions.length - 1 ? 'none' : '1px solid var(--panel-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className="hover-highlight">
                <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px 14px', borderRadius: '8px', color: 'var(--text-secondary)', fontFamily: 'monospace', fontSize: '0.75rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                       {t.id}
                    </div>
                    <div>
                      <p style={{ fontSize: '1.05rem', fontWeight: 500, margin: 0, color: '#fff', marginBottom: '2px' }}>{t.text}</p>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', margin: 0 }}>{t.date} • Block Verified</p>
                    </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                   <div style={{ fontSize: '1.2rem', fontWeight: 600, color: t.amount.includes('-') ? '#ff4d4d' : 'var(--eco-color)' }}>
                     {t.amount}
                   </div>
                   <div style={{ fontSize: '0.85rem', color: '#f59e0b', marginTop: '2px' }}>{t.points}</div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="glass-panel" style={{ height: '600px', position: 'relative', overflow: 'hidden', padding: 0 }}>
           <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.4)', backgroundImage: 'radial-gradient(circle at 50% 50%, transparent 20%, #050505 100%), linear-gradient(rgba(16,185,129,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.05) 1px, transparent 1px)', backgroundSize: '100% 100%, 40px 40px, 40px 40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center', zIndex: 10 }}>
                 <MapIcon size={64} color="var(--eco-color)" style={{ marginBottom: '24px', opacity: 0.5 }} />
                 <h2 style={{ marginBottom: '12px' }}>Regional Recovery Density</h2>
                 <p style={{ color: 'var(--text-secondary)', maxWidth: '400px' }}>Visualizing active circularity nodes and material flow across the San Francisco metro area.</p>
                 <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '32px' }}>
                    <div className="glass-panel" style={{ padding: '16px 24px' }}>
                       <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700, color: 'var(--eco-color)' }}>142</p>
                       <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Active Nodes</p>
                    </div>
                    <div className="glass-panel" style={{ padding: '16px 24px' }}>
                       <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700, color: 'var(--eco-color)' }}>8.2t</p>
                       <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Flow Ratio</p>
                    </div>
                 </div>
              </div>
              
              {/* Mock Node Markers */}
              <div style={{ position: 'absolute', top: '20%', left: '30%', width: '12px', height: '12px', background: 'var(--eco-color)', borderRadius: '50%', boxShadow: '0 0 20px var(--eco-color)', animation: 'pulse 2s infinite' }} />
              <div style={{ position: 'absolute', top: '45%', left: '60%', width: '8px', height: '8px', background: 'var(--eco-color)', borderRadius: '50%', boxShadow: '0 0 15px var(--eco-color)', opacity: 0.6 }} />
              <div style={{ position: 'absolute', top: '70%', left: '40%', width: '10px', height: '10px', background: 'var(--eco-color)', borderRadius: '50%', boxShadow: '0 0 15px var(--eco-color)', opacity: 0.8 }} />
           </div>
        </div>
      )}
    </div>
  );
}
