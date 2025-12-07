import React from 'react';

const StatsCard = ({ title, value, subtitle, icon, type = 'default' }) => {
  const getCardClass = () => {
    switch (type) {
      case 'balance': return 'balance-card';
      case 'group': return 'group-card';
      case 'expense': return 'expense-card';
      case 'settled': return 'settled-card';
      default: return '';
    }
  };

  const isNegative = value.toString().startsWith('-');

  return (
    <div className={`card stats-card ${getCardClass()}`}>
      <div className="card-header">
        <h3>
          <i className={`fas ${icon}`}></i> {title}
        </h3>
      </div>
      <div className="card-body">
        <h2 className={`balance-amount ${isNegative ? 'negative' : 'positive'}`}>
          {value}
        </h2>
        <p className="balance-text">{subtitle}</p>
      </div>
    </div>
  );
};

export default StatsCard;