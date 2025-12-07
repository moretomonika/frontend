import React from 'react';

const ExpenseItem = ({ expense }) => {
  const getCategoryIcon = (category) => {
    const icons = {
      'food': 'fa-utensils',
      'utilities': 'fa-bolt',
      'shopping': 'fa-shopping-cart',
      'travel': 'fa-car',
      'entertainment': 'fa-film'
    };
    return icons[category] || 'fa-receipt';
  };

  const getCategoryClass = (category) => {
    const classes = {
      'food': 'food',
      'utilities': 'utilities',
      'shopping': 'shopping',
      'travel': 'travel',
      'entertainment': 'entertainment'
    };
    return classes[category] || 'other';
  };

  return (
    <div className="expense-item">
      <div className={`expense-icon ${getCategoryClass(expense.category)}`}>
        <i className={`fas ${getCategoryIcon(expense.category)}`}></i>
      </div>
      <div className="expense-details">
        <h4>{expense.description}</h4>
        <p>Paid by <strong>{expense.payer}</strong> • {expense.category} • {expense.date}</p>
      </div>
      <div className={`expense-amount ${expense.amount < 0 ? 'negative' : 'positive'}`}>
        ₹{Math.abs(expense.amount).toLocaleString('en-IN')}
      </div>
    </div>
  );
};

export default ExpenseItem;