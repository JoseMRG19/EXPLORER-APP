import React from 'react';

interface EmptyStateProps {
  title: string;
  description: string;
  action?: React.ReactNode;
}

export default function EmptyState({
  title,
  description,
  action
}: EmptyStateProps) {
  return (
    <div className="empty-state" role="status">
      <h3>{title}</h3>
      <p>{description}</p>
      {action && <div className="empty-action">{action}</div>}
    </div>
  );
}
