import React, { useState } from 'react';
import Header from '../../components/Dashboard/Header';
import StatsCard from '../../components/Dashboard/StatsCard';
import ExpenseItem from '../../components/Dashboard/ExpenseItem';
import GroupCard from '../../components/Dashboard/GroupCard';
import AddExpenseForm from '../../components/Dashboard/AddExpenseForm';
import BalanceItem from '../../components/Dashboard/BalanceItem';
import SettlementItem from '../../components/Dashboard/SettlementItem';
import Notification from '../../components/Dashboard/Notification';
import './Dashboard.css';

const Dashboard = () => {
  // State management
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [notification, setNotification] = useState(null);
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      description: 'Dinner at Restaurant',
      amount: -250,
      payer: 'Aparna',
      category: 'food',
      date: 'Today'
    },
    {
      id: 2,
      description: 'Electricity Bill',
      amount: -400,
      payer: 'Monika',
      category: 'utilities',
      date: '2 days ago'
    },
    {
      id: 3,
      description: 'Groceries',
      amount: 200,
      payer: 'Mehak',
      category: 'shopping',
      date: '3 days ago'
    }
  ]);

  const [groups, setGroups] = useState([
    {
      id: 1,
      name: 'Roommates',
      color: '#4A6FA5',
      icon: 'fa-home',
      memberCount: 4,
      totalExpenses: 1850,
      createdDate: '10 Mar 2025',
      members: [
        { name: 'Mehak', isAdmin: true },
        { name: 'Monika', isAdmin: false },
        { name: 'Aparna', isAdmin: false }
      ],
      isActive: true
    },
    {
      id: 2,
      name: 'Goa Trip',
      color: '#10B981',
      icon: 'fa-umbrella-beach',
      memberCount: 6,
      totalExpenses: 3200,
      createdDate: '1 Mar 2025',
      members: [
        { name: 'Mehak', isAdmin: true },
        { name: 'Monika', isAdmin: false },
        { name: 'Aparna', isAdmin: false }
      ],
      isActive: false
    }
  ]);

  const [balances, setBalances] = useState([
    { description: 'You owe to Aparna', group: 'From Roommates group', amount: -650 },
    { description: 'You owe to Monika', group: 'From Roommates group', amount: -200 },
    { description: 'Monika owes you', group: 'From Goa Trip group', amount: 150 }
  ]);

  const [settlements, setSettlements] = useState([
    { id: 1, from: 'Mehak', to: 'Aparna', amount: 650, reason: 'Dinner & Utilities' },
    { id: 2, from: 'Mehak', to: 'Monika', amount: 200, reason: 'Dinner & Utilities' }
  ]);

  const [monthlyStats, setMonthlyStats] = useState({
    total: 4250,
    settled: 2100,
    pending: 850
  });

  const [breakdown, setBreakdown] = useState([
    { category: 'Food & Dining', amount: 1250, percentage: 35, color: '#e53e3e' },
    { category: 'Utilities', amount: 850, percentage: 24, color: '#3182ce' },
    { category: 'Travel', amount: 750, percentage: 21, color: '#38a169' },
    { category: 'Shopping', amount: 450, percentage: 13, color: '#d69e2e' },
    { category: 'Entertainment', amount: 250, percentage: 7, color: '#805ad5' }
  ]);

  // Event handlers
  const handleAddExpense = () => {
    setShowExpenseForm(true);
  };

  const handleCreateGroup = () => {
    window.location.href = '/groups';
  };

  const handleExpenseSubmit = (expenseData) => {
    const newExpense = {
      id: expenses.length + 1,
      description: expenseData.title,
      amount: -parseFloat(expenseData.amount),
      payer: expenseData.payer,
      category: expenseData.category,
      date: 'Just now'
    };

    setExpenses([newExpense, ...expenses]);
    
    // Update monthly total
    setMonthlyStats(prev => ({
      ...prev,
      total: prev.total + parseFloat(expenseData.amount),
      pending: prev.pending + (parseFloat(expenseData.amount) / 3) // Assuming 3 people
    }));

    showNotification('Expense added successfully!', 'success');
  };

  const handleSettlementPaid = (settlement) => {
    // Update settlements
    setSettlements(prev => 
      prev.filter(s => s.id !== settlement.id)
    );

    // Update monthly stats
    setMonthlyStats(prev => ({
      ...prev,
      settled: prev.settled + settlement.amount,
      pending: Math.max(0, prev.pending - settlement.amount)
    }));

    showNotification('Settlement marked as paid!', 'success');
  };

  const handleExportCSV = () => {
    // Create CSV content
    const csvContent = [
      ['Date', 'Description', 'Amount', 'Payer', 'Category'],
      ...expenses.map(exp => [
        exp.date,
        exp.description,
        `₹${Math.abs(exp.amount)}`,
        exp.payer,
        exp.category
      ])
    ].map(row => row.join(',')).join('\n');

    // Download file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `expenses_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    showNotification('CSV exported successfully!', 'success');
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="dashboard">
      <Header 
        title="Dashboard"
        onAddExpense={handleAddExpense}
        onCreateGroup={handleCreateGroup}
      />

      {/* Stats Cards */}
      <div className="stats-cards">
        <StatsCard 
          title="Your Balance"
          value="-₹850"
          subtitle="You owe this amount"
          icon="fa-wallet"
          type="balance"
        />
        <StatsCard 
          title="Active Groups"
          value="3"
          subtitle="Groups you're part of"
          icon="fa-users"
          type="group"
        />
        <StatsCard 
          title="Monthly Total"
          value="₹4,250"
          subtitle="Spent this month"
          icon="fa-chart-line"
          type="expense"
        />
        <StatsCard 
          title="Settled"
          value="₹2,100"
          subtitle="Amount settled"
          icon="fa-check-circle"
          type="settled"
        />
      </div>

      <div className="dashboard-content">
        {/* Left Column */}
        <div className="left-column">
          {/* Recent Expenses */}
          <div className="card recent-expenses">
            <div className="card-header">
              <h3><i className="fas fa-receipt"></i> Recent Expenses</h3>
              <button className="btn btn-link view-all">View All</button>
            </div>
            <div className="card-body">
              <div className="expense-list">
                {expenses.map(expense => (
                  <ExpenseItem key={expense.id} expense={expense} />
                ))}
              </div>
            </div>
          </div>

          {/* Groups */}
          <div className="card groups-card">
            <div className="card-header">
              <h3><i className="fas fa-users"></i> Your Groups</h3>
              <button className="btn btn-small" onClick={handleCreateGroup}>
                <i className="fas fa-user-plus"></i> Invite
              </button>
            </div>
            <div className="card-body">
              <div className="group-list">
                {groups.map(group => (
                  <GroupCard 
                    key={group.id} 
                    group={group} 
                    isActive={group.isActive}
                    onClick={() => console.log('Group clicked:', group.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="right-column">
          {/* Add Expense Form */}
          {showExpenseForm && (
            <AddExpenseForm 
              onClose={() => setShowExpenseForm(false)}
              onSubmit={handleExpenseSubmit}
              groups={groups}
            />
          )}

          {/* Balance Summary */}
          <div className="card balance-summary" style={{ display: showExpenseForm ? 'none' : 'block' }}>
            <div className="card-header">
              <h3><i className="fas fa-scale-balanced"></i> Balance Summary</h3>
            </div>
            <div className="card-body">
              {balances.map((balance, index) => (
                <BalanceItem key={index} balance={balance} />
              ))}
              <button className="btn btn-settle btn-block">
                <i className="fas fa-hand-holding-usd"></i> Settle All Balances
              </button>
            </div>
          </div>

          {/* Settlements */}
          <div className="card settlements-card">
            <div className="card-header">
              <h3><i className="fas fa-handshake"></i> Settlements</h3>
            </div>
            <div className="card-body">
              <div className="settlement-list">
                {settlements.map(settlement => (
                  <SettlementItem 
                    key={settlement.id}
                    settlement={settlement}
                    onMarkPaid={handleSettlementPaid}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Monthly Breakdown */}
          <div className="card monthly-breakdown">
            <div className="card-header">
              <h3><i className="fas fa-chart-pie"></i> Monthly Breakdown</h3>
            </div>
            <div className="card-body">
              {breakdown.map((item, index) => (
                <div key={index} className="breakdown-item">
                  <div className="breakdown-category">
                    <span 
                      className="category-dot" 
                      style={{ backgroundColor: item.color }}
                    ></span>
                    <span>{item.category}</span>
                  </div>
                  <div className="breakdown-amount">
                    ₹{item.amount.toLocaleString('en-IN')} 
                    <span className="percentage">({item.percentage}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>FinSplit &copy; 2025 | Codekinetics - Team Codestars | Built with ❤️ by Mehak, Monika & Aparna</p>
        <div className="footer-links">
          <button className="btn-link" onClick={handleExportCSV}>
            <i className="fas fa-file-export"></i> Export CSV
          </button>
          <a href="#" className="btn-link">
            <i className="fas fa-question-circle"></i> Help
          </a>
          <a href="#" className="btn-link">
            <i className="fas fa-envelope"></i> Contact
          </a>
        </div>
      </footer>

      {/* Notification */}
      {notification && (
        <Notification 
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;