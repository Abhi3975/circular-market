"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { History, ArrowRight, User, Package, Recycle } from 'lucide-react';

export default function ItemProvenance() {
  const lifecycle = [
    { 
      date: 'Oct 12, 2025', 
      event: 'Initial Registration', 
      desc: 'Item authenticated via AI Vision Model. Categorized: Consumer Electronics.',
      icon: <Package size={18} />,
      status: 'complete' 
    },
    { 
      date: 'Oct 28, 2025', 
      event: 'First Recovery Cycle', 
      desc: 'Transferred to Community Hub #48 for basic battery maintenance.',
      icon: <User size={18} />,
      status: 'complete' 
    },
    { 
      date: 'Nov 15, 2025', 
      event: 'Resale Listing', 
      desc: 'Current listing generated with $120.00 valuation based on regional demand.',
      icon: <Recycle size={18} />,
      status: 'active' 
    },
  ];

  return (
    <div className="glass-panel" style={{ marginTop: '32px' }}>
      <h3 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <History size={24} color="var(--eco-color)" />
        Asset Circularity Timeline
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        {lifecycle.map((step, i) => (
          <div key={i} style={{ display: 'flex', gap: '20px', minHeight: '80px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
               <div style={{ 
                 width: '40px', 
                 height: '40px', 
                 borderRadius: '50%', 
                 background: step.status === 'active' ? 'var(--eco-color)' : 'rgba(255,255,255,0.05)', 
                 display: 'flex', 
                 alignItems: 'center', 
                 justifyContent: 'center',
                 color: step.status === 'active' ? '#000' : 'var(--text-secondary)',
                 zIndex: 1
               }}>
                 {step.icon}
               </div>
               {i < lifecycle.length - 1 && (
                 <div style={{ width: '2px', flex: 1, background: 'rgba(255,255,255,0.05)', margin: '4px 0' }} />
               )}
            </div>
            <div style={{ paddingBottom: '32px', flex: 1 }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <h4 style={{ margin: 0, color: step.status === 'active' ? '#fff' : 'var(--text-secondary)' }}>{step.event}</h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{step.date}</span>
               </div>
               <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
