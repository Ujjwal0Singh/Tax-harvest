// src/App.js
import React, { useState, useEffect } from 'react';
import { fetchHoldings, fetchCapitalGains } from './hooks/useMockAPI';
import CapitalGainsCard from './components/CapitalsGainsCard';
import HoldingsTable from './components/HoldingsTable';
import './App.css';

const App = () => {
  const [holdings, setHoldings] = useState([]);
  const [capitalGains, setCapitalGains] = useState(null);
  const [selectedHoldings, setSelectedHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [holdingsData, gainsData] = await Promise.all([
          fetchHoldings(),
          fetchCapitalGains()
        ]);
        setHoldings(holdingsData);
        setCapitalGains(gainsData.capitalGains);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSelectHolding = (coin, isSelected) => {
    if (isSelected) {
      setSelectedHoldings(prev => [...prev, coin]);
    } else {
      setSelectedHoldings(prev => prev.filter(c => c !== coin));
    }
  };

  const handleSelectAll = (isSelected) => {
    if (isSelected) {
      setSelectedHoldings(holdings.map(h => h.coin));
    } else {
      setSelectedHoldings([]);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="app">
      <header>
        <h1>Tax Loss Harvesting</h1>
      </header>
      
      <div className="cards-container">
        <CapitalGainsCard 
          title="Pre-Harvesting" 
          data={capitalGains} 
          isPreHarvesting={true}
        />
        
        <CapitalGainsCard 
          title="After Harvesting" 
          data={capitalGains} 
          selectedHoldings={selectedHoldings}
          holdings={holdings}
          isPreHarvesting={false}
        />
      </div>
      
      <HoldingsTable 
        holdings={holdings} 
        selectedHoldings={selectedHoldings}
        onSelectHolding={handleSelectHolding}
        onSelectAll={handleSelectAll}
      />
    </div>
  );
};

export default App;