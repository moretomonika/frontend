import React from 'react';

const Header = ({ title, onCreateGroup, onAddExpense }) => {
  return (
    <header className="header">
      <h1>{title}</h1>
      <div className="header-actions">
        <button className="btn btn-primary" onClick={onAddExpense}>
          <i className="fas fa-plus"></i> Add Expense
        </button>
        <button className="btn btn-secondary" onClick={onCreateGroup}>
          <i className="fas fa-user-plus"></i> Create Group
        </button>
      </div>
    </header>
  );
};

export default Header;
