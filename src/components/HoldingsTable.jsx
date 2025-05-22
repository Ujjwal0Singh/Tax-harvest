// src/components/HoldingsTable.jsx
import React from 'react';

const HoldingsTable = ({ holdings, selectedHoldings, onSelectHolding, onSelectAll }) => {
  const allSelected = holdings.length > 0 && selectedHoldings.length === holdings.length;
  
  return (
    <div className="holdings-table-container">
      <h2>Your Holdings</h2>
      
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={(e) => onSelectAll(e.target.checked)}
                />
              </th>
              <th>Asset</th>
              <th>Holdings</th>
              <th>Avg Buy Price</th>
              <th>Current Price</th>
              <th>Short-Term Gain</th>
              <th>Long-Term Gain</th>
              <th>Amount to Sell</th>
            </tr>
          </thead>
          <tbody>
            {holdings.map((holding) => (
              <tr key={holding.coin}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedHoldings.includes(holding.coin)}
                    onChange={(e) => onSelectHolding(holding.coin, e.target.checked)}
                  />
                </td>
                <td className="asset-cell">
                  <div className="asset-info">
                    <img 
                      src={holding.logo} 
                      alt={holding.coinName} 
                      onError={(e) => {
                        e.target.src = '/assets/default-coin.svg';
                      }}
                    />
                    <div>
                      <div className="coin">{holding.coin}</div>
                      <div className="coin-name">{holding.coinName}</div>
                    </div>
                  </div>
                </td>
                <td>{holding.totalHolding.toFixed(8)}</td>
                <td>₹{holding.averageBuyPrice.toLocaleString('en-IN')}</td>
                <td>₹{holding.currentPrice.toLocaleString('en-IN')}</td>
                <td className={holding.stcg.gain >= 0 ? 'positive' : 'negative'}>
                  ₹{holding.stcg.gain.toLocaleString('en-IN')}
                  <div className="balance">Balance: {holding.stcg.balance.toFixed(8)}</div>
                </td>
                <td className={holding.ltcg.gain >= 0 ? 'positive' : 'negative'}>
                  {holding.ltcg.gain ? `₹${holding.ltcg.gain.toLocaleString('en-IN')}` : '-'}
                  {holding.ltcg.balance > 0 && (
                    <div className="balance">Balance: {holding.ltcg.balance.toFixed(8)}</div>
                  )}
                </td>
                <td>
                  {selectedHoldings.includes(holding.coin) ? holding.totalHolding.toFixed(8) : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HoldingsTable;