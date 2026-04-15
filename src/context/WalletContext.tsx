"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

export type Item = {
  id: string;
  name: string;
  condition: string;
  price: number;
  type: 'repair' | 'recycle';
  icon: string;
};

export type Transaction = {
  id: string;
  text: string;
  amount: string;
  points: string;
  date: string;
};

const INITIAL_ITEMS: Item[] = [
  { id: '1', name: 'Vintage Leather Jacket', condition: 'Good - Minor wear', price: 45, type: 'repair', icon: '🧥' },
  { id: '2', name: 'Broken iPhone 12 Pro', condition: 'Needs Screen Replacement', price: 120, type: 'repair', icon: '📱' },
  { id: '3', name: 'Wooden Dining Chair', condition: 'Wobbly Leg - Easy Fix', price: 15, type: 'repair', icon: '🪑' },
  { id: '4', name: 'Old Copper Wiring', condition: 'Raw Material', price: 8, type: 'recycle', icon: '🔌' },
  { id: '5', name: 'Dyson V8 Vacuum', condition: 'Battery Dead', price: 50, type: 'repair', icon: '🧹' },
  { id: '6', name: 'Cardboard Bulk', condition: 'Cleaned', price: 5, type: 'recycle', icon: '📦' },
  { id: '7', name: 'MacBook Pro 2018', condition: 'Logic Board Faulty', price: 210, type: 'recycle', icon: '💻' },
  { id: '8', name: 'Acoustic Guitar', condition: 'Missing 2 Strings', price: 80, type: 'repair', icon: '🎸' },
  { id: '9', name: 'Vintage Sofa', condition: 'Upholstery Required', price: 65, type: 'repair', icon: '🛋️' },
  { id: '10', name: 'CRT Monitor', condition: 'Glass/Lead Recycle', price: 2, type: 'recycle', icon: '📺' },
  { id: '11', name: 'Steel Piping', condition: 'Scrap Metal', price: 18, type: 'recycle', icon: '🪈' },
  { id: '12', name: 'Bicycle Frame', condition: 'Rusty - Needs Paint', price: 25, type: 'repair', icon: '🚲' }
];

const INITIAL_TX: Transaction[] = [
  { text: 'Sold: Broken iPhone 12 Pro', id: 'TX-99421A', amount: '+$120.00', points: '+150 EP', date: 'Today, 2:45 PM' },
  { text: 'Eco-Reward: Repaired Dining Chair', id: 'TX-99420B', amount: '+$0.00', points: '+50 EP', date: 'Yesterday, 8:12 AM' },
  { text: 'Bought: Used Dyson V8', id: 'TX-99319C', amount: '-$50.00', points: '+20 EP', date: 'Oct 14, 4:30 PM' },
  { text: 'Recycled: Cardboard Bulk', id: 'TX-99218D', amount: '+$5.00', points: '+5 EP', date: 'Oct 12, 11:00 AM' },
  { text: 'Sold: Vintage Leather Jacket', id: 'TX-99117E', amount: '+$45.00', points: '+60 EP', date: 'Oct 10, 9:15 AM' },
];

type WalletContextType = {
  items: Item[];
  transactions: Transaction[];
  fiatBalance: number;
  ecoPoints: number;
  addListing: (file: File) => void;
};

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Item[]>(INITIAL_ITEMS);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TX);
  const [fiatBalance, setFiatBalance] = useState(410.50);
  const [ecoPoints, setEcoPoints] = useState(2841);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedItems = localStorage.getItem('eco_items');
    const savedTx = localStorage.getItem('eco_tx');
    const savedFiat = localStorage.getItem('eco_fiat');
    const savedPoints = localStorage.getItem('eco_points');
    
    if (savedItems) setItems(JSON.parse(savedItems));
    if (savedTx) setTransactions(JSON.parse(savedTx));
    if (savedFiat) setFiatBalance(JSON.parse(savedFiat));
    if (savedPoints) setEcoPoints(JSON.parse(savedPoints));
    
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('eco_items', JSON.stringify(items));
      localStorage.setItem('eco_tx', JSON.stringify(transactions));
      localStorage.setItem('eco_fiat', JSON.stringify(fiatBalance));
      localStorage.setItem('eco_points', JSON.stringify(ecoPoints));
    }
  }, [items, transactions, fiatBalance, ecoPoints, isLoaded]);

  const addListing = (file: File) => {
    const mockPrice = Math.floor(Math.random() * 50) + 10;
    const isRepair = Math.random() > 0.5;
    
    setItems(prev => [{
      id: crypto.randomUUID(),
      name: file.name.split('.')[0] || 'Unknown Material',
      condition: 'AI Verified',
      price: mockPrice,
      type: isRepair ? 'repair' : 'recycle',
      icon: isRepair ? '🔧' : '♻️'
    }, ...prev]);

    setFiatBalance(prev => prev + mockPrice);
    setEcoPoints(prev => prev + Math.floor(mockPrice * 2.5));

    setTransactions(prev => [{
      id: `TX-${Math.floor(Math.random() * 90000) + 10000}Z`,
      text: `Listed: ${file.name.split('.')[0]}`,
      amount: `+$${mockPrice.toFixed(2)}`,
      points: `+${Math.floor(mockPrice * 2.5)} EP`,
      date: new Date().toLocaleDateString()
    }, ...prev]);
  };

  return (
    <WalletContext.Provider value={{ items, transactions, fiatBalance, ecoPoints, addListing }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("useWallet must be used inside WalletProvider");
  return ctx;
}
