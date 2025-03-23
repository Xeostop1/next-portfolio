'use client';

import { ReactNode } from 'react';

type Props = {
  onClick?: () => void;
  children: ReactNode;
  className?: string;
};

export default function GlassButton({ onClick, children, className = '' }: Props) {
  return (
    <button
      onClick={onClick}
      className={`backdrop-blur-md bg-white/20 border border-white/30 text-white px-4 py-2 rounded-lg shadow-md hover:bg-white/30 transition ${className}`}
    >
      {children}
    </button>
  );
}
