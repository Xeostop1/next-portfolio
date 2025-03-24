'use client';

import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
};

export default function GlassButton({
  children,
  onClick,
  className = '',
  type = 'button',
}: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-xl text-white backdrop-blur-md bg-white/10 hover:bg-white/20 transition border border-white/20 shadow-md ${className}`}
    >
      {children}
    </button>
  );
}
