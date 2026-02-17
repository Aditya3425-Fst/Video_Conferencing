import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ControlButtonProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  active?: boolean;
  variant?: 'default' | 'danger' | 'success';
  className?: string;
  tooltip?: string;
}

export const ControlButton: React.FC<ControlButtonProps> = ({
  icon: Icon,
  label,
  onClick,
  active = false,
  variant = 'default',
  className,
}) => {
  const baseStyles = "relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-200 group cursor-pointer";
  
  const variants = {
    default: active 
      ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/30" 
      : "bg-white/10 text-white hover:bg-white/20 backdrop-blur-md border border-white/10",
    danger: active
      ? "bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/30"
      : "bg-red-500/20 text-red-500 hover:bg-red-500/30 border border-red-500/30",
    success: active
      ? "bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/30"
      : "bg-emerald-500/20 text-emerald-500 hover:bg-emerald-500/30 border border-emerald-500/30"
  };

  return (
    <button 
      onClick={onClick}
      className={cn(baseStyles, variants[variant], className)}
      aria-label={label}
    >
      <Icon className="w-5 h-5" />
      <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {label}
      </span>
    </button>
  );
};
