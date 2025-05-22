// src/components/CapitalGainsCard.jsx
import React from 'react';

const CapitalGainsCard = ({ title, data, selectedHoldings = [], holdings = [], isPreHarvesting }) => {
  const calculateUpdatedGains = () => {
    if (isPreHarvesting) return data;
    
    const updatedData = {
      stcg: { profits: data.stcg.profits, losses: data.stcg.losses },
      ltcg: { profits: data.ltcg.profits, losses: data.ltcg.losses }
    };
    
    selectedHoldings.forEach(coin => {
      const holding = holdings.find(h => h.coin === coin);
      if (!holding) return;
      
      // Update STCG
      if (holding.stcg.gain > 0) {
        updatedData.stcg.profits += holding.stcg.gain;
      } else {
        updatedData.stcg.losses += Math.abs(holding.stcg.gain);
      }
      
      // Update LTCG
      if (holding.ltcg.gain > 0) {
        updatedData.ltcg.profits += holding.ltcg.gain;
      } else {
        updatedData.ltcg.losses += Math.abs(holding.ltcg.gain);
      }
    });
    
    return updatedData;
  };
  
  const updatedData = calculateUpdatedGains();
  
  const stcgNet = updatedData.stcg.profits - updatedData.stcg.losses;
  const ltcgNet = updatedData.ltcg.profits - updatedData.ltcg.losses;
  const realisedGains = stcgNet + ltcgNet;
  
  // Calculate savings if this is the After Harvesting card
  let savings = 0;
  if (!isPreHarvesting) {
    const preStcgNet = data.stcg.profits - data.stcg.losses;
    const preLtcgNet = data.ltcg.profits - data.ltcg.losses;
    const preRealisedGains = preStcgNet + preLtcgNet;
    savings = preRealisedGains - realisedGains;
  }
  
  return (
    <div className={`capital-gains-card ${isPreHarvesting ? '' : 'after-harvesting'}`}>
      <h2>{title}</h2>
      
      <div className="gains-section">
        <h3>Short-term Capital Gains</h3>
        <div className="gains-row">
          <span>Profits:</span>
          <span>₹{updatedData.stcg.profits.toLocaleString('en-IN')}</span>
        </div>
        <div className="gains-row">
          <span>Losses:</span>
          <span>₹{updatedData.stcg.losses.toLocaleString('en-IN')}</span>
        </div>
        <div className="gains-row net">
          <span>Net:</span>
          <span className={stcgNet >= 0 ? 'positive' : 'negative'}>
            ₹{stcgNet.toLocaleString('en-IN')}
          </span>
        </div>
      </div>
      
      <div className="gains-section">
        <h3>Long-term Capital Gains</h3>
        <div className="gains-row">
          <span>Profits:</span>
          <span>₹{updatedData.ltcg.profits.toLocaleString('en-IN')}</span>
        </div>
        <div className="gains-row">
          <span>Losses:</span>
          <span>₹{updatedData.ltcg.losses.toLocaleString('en-IN')}</span>
        </div>
        <div className="gains-row net">
          <span>Net:</span>
          <span className={ltcgNet >= 0 ? 'positive' : 'negative'}>
            ₹{ltcgNet.toLocaleString('en-IN')}
          </span>
        </div>
      </div>
      
      <div className="realised-gains">
        <h3>Realised Capital Gains</h3>
        <div className={`amount ${realisedGains >= 0 ? 'positive' : 'negative'}`}>
          ₹{realisedGains.toLocaleString('en-IN')}
        </div>
      </div>
      
      {!isPreHarvesting && savings > 0 && (
        <div className="savings-message">
          You're going to save ₹{savings.toLocaleString('en-IN')}
        </div>
      )}
    </div>
  );
};

export default CapitalGainsCard;