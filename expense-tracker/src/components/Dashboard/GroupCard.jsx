import React from 'react';

const GroupCard = ({ group, isActive, onClick }) => {
  return (
    <div className={`group-card ${isActive ? 'active' : ''}`} onClick={onClick}>
      <div className="group-header">
        <div className="group-name">
          <div className="group-icon" style={{ background: group.color }}>
            <i className={`fas ${group.icon}`}></i>
          </div>
          <span>{group.name}</span>
        </div>
        {group.isActive && <span className="group-badge">Active</span>}
      </div>
      <div className="group-stats">
        <span><i className="fas fa-users"></i> {group.memberCount} members</span>
        <span><i className="fas fa-rupee-sign"></i> ₹{group.totalExpenses.toLocaleString('en-IN')} total</span>
        <span><i className="fas fa-calendar"></i> Created: {group.createdDate}</span>
      </div>
      <div className="group-members">
        {group.members.slice(0, 3).map((member, index) => (
          <div key={index} className={`member-tag ${member.isAdmin ? 'admin' : ''}`}>
            {member.name} {member.isAdmin ? '(Admin)' : ''}
          </div>
        ))}
        {group.members.length > 3 && (
          <div className="member-tag">+{group.members.length - 3} more</div>
        )}
      </div>
    </div>
  );
};

export default GroupCard;