import React from 'react';

const BalanceItem = ({ balance }) => {
  return (
    <div className="balance-item">
      <div className="balance-details">
        <h4>{balance.description}</h4>
        <p>{balance.group}</p>
      </div>
      <div className={`balance-amount ${balance.amount > 0 ? 'positive' : 'negative'}`}>
        ₹{Math.abs(balance.amount).toLocaleString('en-IN')}
      </div>
    </div>
  );
};

export default BalanceItem;