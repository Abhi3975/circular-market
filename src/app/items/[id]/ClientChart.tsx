"use client";
import { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const PRICE_HISTORY = [
  { month: 'Jan', price: 90 },
  { month: 'Feb', price: 85 },
  { month: 'Mar', price: 78 },
  { month: 'Apr', price: 65 },
  { month: 'May', price: 50 },
  { month: 'Jun', price: 45 },
  { month: 'Jul', price: 40 },
  { month: 'Aug', price: 38 },
  { month: 'Sep', price: 35 },
  { month: 'Oct', price: 30 },
  { month: 'Nov', price: 28 },
  { month: 'Dec', price: 25 },
];

export default function ClientChart() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={PRICE_HISTORY}>
        <defs>
          <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--eco-color)" stopOpacity={0.4}/>
            <stop offset="95%" stopColor="var(--eco-color)" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <XAxis dataKey="month" stroke="var(--text-secondary)" tick={{fontSize: 12}} />
        <YAxis stroke="var(--text-secondary)" tick={{fontSize: 12}} />
        <Tooltip contentStyle={{ background: 'var(--bg-color)', border: '1px solid var(--panel-border)', borderRadius: '12px' }} itemStyle={{ color: 'var(--eco-color)' }} />
        <Area type="monotone" dataKey="price" stroke="var(--eco-color)" strokeWidth={3} fillOpacity={1} fill="url(#colorPrice)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
