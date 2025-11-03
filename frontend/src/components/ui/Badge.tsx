import React from 'react';

type Tone = 'gray' | 'green' | 'yellow' | 'red' | 'blue';

const toneClass: Record<Tone, string> = {
  gray: 'bg-gray-100 text-gray-800',
  green: 'bg-green-100 text-green-800',
  yellow: 'bg-yellow-100 text-yellow-800',
  red: 'bg-red-100 text-red-800',
  blue: 'bg-blue-100 text-blue-800',
};

type BadgeProps = { tone?: Tone; className?: string; children?: React.ReactNode };

export const Badge = ({ tone = 'gray', className = '', children }: BadgeProps) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${toneClass[tone]} ${className}`}>{children}</span>
);
