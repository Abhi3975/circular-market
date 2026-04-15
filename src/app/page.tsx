"use client";
import { useState, useRef, useMemo } from 'react';
import Link from 'next/link';
import { Camera, Bot, Tag } from 'lucide-react';
import { useWallet } from '@/context/WalletContext';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import CommandPalette from '@/components/CommandPalette';

export default function Marketplace() {
  const { items, addListing } = useWallet();
  const [analyzing, setAnalyzing] = useState(false);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('Sort by: Newest');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => { fileInputRef.current?.click(); };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPendingFile(e.target.files[0]);
      setAnalyzing(true); 
      setTimeout(() => setAnalyzing(false), 2000);
    }
  };

  const handleGenerateListing = () => {
    if (pendingFile && !analyzing) {
      addListing(pendingFile);
      toast.success('Listing Generated!', { description: `'${pendingFile.name}' was successfully logged into the local ledger.` });
      setPendingFile(null);
    } else if (!pendingFile) {
       toast.error('No Media Found', { description: 'Please upload an image representation first.' });
    }
  };

  const filteredItems = useMemo(() => {
    let result = [...items].filter(i => i.name.toLowerCase().includes(searchTerm.toLowerCase()) || i.condition.toLowerCase().includes(searchTerm.toLowerCase()));
    if (sortOrder === 'Sort by: Price (High)') result.sort((a,b) => b.price - a.price);
    if (sortOrder === 'Sort by: Price (Low)') result.sort((a,b) => a.price - b.price);
    return result;
  }, [items, searchTerm, sortOrder]);

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <header style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h1 className="gradient-text" style={{ fontSize: '3.5rem', marginBottom: '16px' }}>Circular Economy Engine.</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>Reduce electronic and material waste. Let our AI price and distribute your unused items back into the local economy.</p>
      </header>

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="stats-row">
        <div className="stat-card">
          <div className="stat-label">Total Items Saved</div>
          <div className="stat-value">{(14842 + (items.length - 12)).toLocaleString()}</div><div style={{ color: 'var(--text-secondary)' }}>Items</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">CO2 Emissions Prevented</div>
          <div className="stat-value">25.4<span style={{ fontSize: '1.5rem' }}>t</span></div><div style={{ color: 'var(--text-secondary)' }}>Metric Tons</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Active Community</div>
          <div className="stat-value">3,192</div><div style={{ color: 'var(--text-secondary)' }}>Local Members</div>
        </div>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '32px' }}>
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="glass-panel" style={{ alignSelf: 'start', position: 'sticky', top: '100px' }}>
          <h2 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}><Camera /> List an Item</h2>
          <div className="input-group" style={{ marginBottom: '16px' }}>
            <label>Upload Media for AI Analysis</label>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} accept="image/*, application/pdf" />
            <div 
              style={{ border: '2px dashed rgba(16, 185, 129, 0.3)', padding: '50px 20px', textAlign: 'center', borderRadius: '16px', background: 'rgba(16, 185, 129, 0.05)', cursor: 'pointer', transition: 'all 0.3s' }}
              onClick={handleUploadClick}
            >
              <AnimatePresence mode="wait">
                {analyzing ? (
                  <motion.div key="analyzing" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                    <Bot className="spin" size={32} color="var(--eco-color)" />
                    <span style={{ color: 'var(--eco-color)' }}>Running Vision Model...</span>
                  </motion.div>
                ) : pendingFile ? (
                   <motion.div key="ready" initial={{opacity:0, scale:0.8}} animate={{opacity:1, scale:1}} style={{ color: 'var(--eco-color)' }}>✓ Ready: {pendingFile.name}</motion.div>
                ) : (
                  <motion.span key="prompt" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} style={{ color: 'var(--text-secondary)' }}>Click to Browse Media</motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>
          <button onClick={handleGenerateListing} className="action-btn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}><Tag size={20} /> Generate Listing</button>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
             <h2 style={{ fontSize: '1.8rem' }}>Local Feed</h2>
             <div style={{ display: 'flex', gap: '16px' }}>
               <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                 <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search materials..." style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid var(--panel-border)', padding: '12px 60px 12px 24px', borderRadius: '100px', color: 'white', outline: 'none', width: '280px' }} />
                 <div style={{ position: 'absolute', right: '12px' }}>
                   <CommandPalette />
                 </div>
               </div>
               <select value={sortOrder} onChange={e => setSortOrder(e.target.value)} style={{ background: 'var(--panel-bg)', border: '1px solid var(--panel-border)', color: 'white', padding: '12px 20px', borderRadius: '100px', outline: 'none', cursor: 'pointer' }}>
                 <option>Sort by: Newest</option>
                 <option>Sort by: Price (High)</option>
                 <option>Sort by: Price (Low)</option>
               </select>
             </div>
          </div>
          
          <motion.div layout className="items-list">
            <AnimatePresence>
              {filteredItems.map((item) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  key={item.id}
                >
                  <Link href={`/items/${item.id}`} className="item-card" style={{ margin: 0 }}>
                    <div className="item-image">
                      {item.icon}
                      <div className={`item-badge ${item.type === 'repair' ? 'badge-repair' : 'badge-recycle'}`}>
                        {item.type.toUpperCase()}
                      </div>
                    </div>
                    <div className="item-details">
                      <h3 className="item-title">{item.name}</h3>
                      <p style={{ color: 'var(--text-secondary)', marginBottom: '16px', fontSize: '0.9rem' }}>{item.condition}</p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span className="item-price">${item.price.toFixed(2)}</span>
                        <button style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: '8px 16px', borderRadius: '100px', cursor: 'pointer', fontSize: '0.85rem' }}>View AI Pricing</button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
