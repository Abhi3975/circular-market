"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function StreamingRationale({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState('');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const intervalId = setInterval(() => {
      setDisplayedText(text.slice(0, i));
      i++;
      if (i > text.length) {
        clearInterval(intervalId);
        setIsDone(true);
      }
    }, 20); 

    return () => clearInterval(intervalId);
  }, [text]);

  return (
    <div className="glass-panel" style={{ marginTop: '32px', background: 'radial-gradient(circle at top right, rgba(16, 185, 129, 0.05), transparent)' }}>
      <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--eco-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
         Vision Model Assessment
      </h3>
      <div style={{ fontFamily: 'monospace', lineHeight: 1.6, color: 'var(--text-secondary)', background: 'var(--panel-bg)', padding: '24px', borderRadius: '12px', border: '1px solid var(--panel-border)', boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5)' }}>
        {displayedText}
        {!isDone && <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} style={{ display: 'inline-block', width: '8px', height: '16px', background: 'var(--eco-color)', marginLeft: '4px', verticalAlign: 'middle' }} />}
      </div>
    </div>
  );
}
