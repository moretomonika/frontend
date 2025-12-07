import React, { useState } from 'react';

const SettlementItem = ({ settlement, onMarkPaid }) => {
  const [isPaid, setIsPaid] = useState(false);

  const handleMarkPaid = () => {
    setIsPaid(true);
    onMarkPaid(settlement);
  };

  return (
    <div className={`settlement-item ${isPaid ? 'paid' : ''}`}>
      <div className="settlement-info">
        <h4>{settlement.from} → {settlement.to}</h4>
        <p>For: {settlement.reason}</p>
      </div>
      <div className="settlement-amount">
        ₹{settlement.amount.toLocaleString('en-IN')}
      </div>
      <button 
        className={`btn ${isPaid ? 'btn-disabled' : 'btn-settle'}`}
        onClick={handleMarkPaid}
        disabled={isPaid}
      >
        <i className={`fas ${isPaid ? 'fa-check' : 'fa-hand-holding-usd'}`}></i>
        {isPaid ? 'Paid ✓' : 'Mark Paid'}
      </button>
    </div>
  );
};

export default SettlementItem;