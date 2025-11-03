import React from 'react';
import { Button } from './Button';

interface EmptyStateProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ title, description, actionLabel, onAction }) => (
  <div className="text-center py-12">
    <h3 className="mt-2 text-sm font-semibold text-gray-900">{title}</h3>
    {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
    {actionLabel && onAction && (
      <div className="mt-6">
        <Button onClick={onAction}>{actionLabel}</Button>
      </div>
    )}
  </div>
);
