"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, ShoppingCart, Activity, Globe, Recycle } from 'lucide-react';

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <>
      <div 
        onClick={() => setIsOpen(true)}
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--panel-border)', padding: '6px 12px', borderRadius: '100px', fontSize: '0.8rem', color: 'var(--text-secondary)', transition: 'all 0.2s' }}
        onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--eco-color)'}
        onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--panel-border)'}
      >
        <Command size={14} />
        <span style={{ fontWeight: 600 }}>K</span>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '10vh', background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }} onClick={() => setIsOpen(false)}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel"
              style={{ width: '100%', maxWidth: '600px', padding: '0', overflow: 'hidden', border: '1px solid var(--eco-color)' }}
            >
              <div style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px', borderBottom: '1px solid var(--panel-border)' }}>
                <Search size={24} color="var(--eco-color)" />
                <input autoFocus placeholder="Search materials, assets, or recovery nodes..." style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '1.25rem', outline: 'none', width: '100%', fontFamily: 'inherit' }} />
              </div>
              <div style={{ padding: '16px' }}>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.15em', paddingLeft: '12px', marginBottom: '8px' }}>Ecosystem Navigation</p>
                <div className="hover-highlight" style={{ padding: '14px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer' }}>
                   <ShoppingCart size={20} color="var(--eco-color)" /> <span>Browse Local Marketplace</span>
                </div>
                <div className="hover-highlight" style={{ padding: '14px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer' }}>
                   <Activity size={20} color="var(--eco-color)" /> <span>View Performance Metrics</span>
                </div>
                <div className="hover-highlight" style={{ padding: '14px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer' }}>
                   <Recycle size={20} color="var(--eco-color)" /> <span>Register New Material Asset</span>
                </div>
              </div>
              <div style={{ background: 'rgba(16,185,129,0.05)', padding: '12px 24px', display: 'flex', justifyContent: 'flex-end', gap: '20px', fontSize: '0.8rem', color: 'var(--text-secondary)', borderTop: '1px solid var(--panel-border)' }}>
                 <span><kbd style={{ background: 'rgba(255,255,255,0.1)', padding: '3px 8px', borderRadius: '6px', color: '#fff' }}>↵</kbd> select</span>
                 <span><kbd style={{ background: 'rgba(255,255,255,0.1)', padding: '3px 8px', borderRadius: '6px', color: '#fff' }}>esc</kbd> close</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
