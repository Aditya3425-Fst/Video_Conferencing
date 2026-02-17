import React from 'react';
import { cn } from '../../lib/utils';

interface MeetingGridProps {
  children: React.ReactNode;
  participantCount: number;
}

export const MeetingGrid: React.FC<MeetingGridProps> = ({ children, participantCount }) => {
  const getGridCols = () => {
    if (participantCount === 1) return 'grid-cols-1';
    if (participantCount === 2) return 'grid-cols-1 md:grid-cols-2';
    if (participantCount <= 4) return 'grid-cols-2';
    if (participantCount <= 6) return 'grid-cols-2 md:grid-cols-3';
    return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
  };

  return (
    <div className={cn(
      "grid gap-4 w-full h-full p-4 overflow-y-auto content-center",
      getGridCols()
    )}>
      {children}
    </div>
  );
};
