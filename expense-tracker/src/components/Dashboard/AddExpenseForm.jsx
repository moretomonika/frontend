import React, { useState } from 'react';

const AddExpenseForm = ({ onClose, onSubmit, groups }) => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    payer: '',
    group: '',
    category: 'food',
    splitType: 'equal'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="card add-expense-form">
      <div className="card-header">
        <h3><i className="fas fa-plus-circle"></i> Add New Expense</h3>
        <button className="close-form" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="title"><i className="fas fa-pen"></i> Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Dinner, Groceries, etc."
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="amount"><i className="fas fa-rupee-sign"></i> Amount (₹)</label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="0.00"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="payer"><i className="fas fa-user"></i> Paid By</label>
              <select
                id="payer"
                name="payer"
                value={formData.payer}
                onChange={handleChange}
                required
              >
                <option value="">Select Payer</option>
                <option value="mehak">Mehak</option>
                <option value="monika">Monika</option>
                <option value="aparna">Aparna</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="group"><i className="fas fa-users"></i> Group</label>
              <select
                id="group"
                name="group"
                value={formData.group}
                onChange={handleChange}
                required
              >
                <option value="">Select Group</option>
                {groups.map(group => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category"><i className="fas fa-tag"></i> Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="food">Food & Dining</option>
                <option value="utilities">Utilities</option>
                <option value="shopping">Shopping</option>
                <option value="travel">Travel</option>
                <option value="entertainment">Entertainment</option>
              </select>
            </div>
            <div className="form-group">
              <label><i className="fas fa-divide"></i> Split Type</label>
              <div className="split-options">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="splitType"
                    value="equal"
                    checked={formData.splitType === 'equal'}
                    onChange={handleChange}
                  />
                  <span>Equal Split</span>
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="splitType"
                    value="custom"
                    checked={formData.splitType === 'custom'}
                    onChange={handleChange}
                  />
                  <span>Custom Percentage</span>
                </label>
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            <i className="fas fa-check"></i> Add Expense
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddExpenseForm;