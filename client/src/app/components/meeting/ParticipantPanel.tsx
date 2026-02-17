import React from 'react';
import { Mic, MicOff, MoreVertical, UserPlus, X } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export interface Participant {
  id: string;
  name: string;
  isMuted: boolean;
  avatarUrl?: string;
  isMe?: boolean;
  role?: 'host' | 'participant';
}

interface ParticipantPanelProps {
  participants: Participant[];
  onClose: () => void;
  onParticipantClick?: (participant: Participant) => void;
}

export const ParticipantPanel: React.FC<ParticipantPanelProps> = ({ participants, onClose, onParticipantClick }) => {
  return (
    <motion.div 
      initial={{ x: 400 }}
      animate={{ x: 0 }}
      exit={{ x: 400 }}
      className="w-80 h-full bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 flex flex-col"
    >
      <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
        <h2 className="font-semibold text-gray-900 dark:text-white">People</h2>
        <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      <div className="p-4">
        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg font-medium text-sm hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
          <UserPlus className="w-4 h-4" />
          Add people
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">In call ({participants.length})</h3>
        <div className="space-y-1">
          {participants.map((p) => (
            <div 
              key={p.id} 
              onClick={() => onParticipantClick?.(p)}
              className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-xl transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden flex items-center justify-center border border-gray-100 dark:border-gray-700">
                  {p.avatarUrl ? (
                    <ImageWithFallback src={p.avatarUrl} alt={p.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xs font-bold text-gray-500">{p.name[0]}</span>
                  )}
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white flex items-center gap-1.5">
                    {p.name}
                    {p.isMe && <span className="text-[10px] text-gray-400">(You)</span>}
                  </div>
                  {p.role === 'host' && <span className="text-[10px] text-blue-500 font-medium">Meeting host</span>}
                </div>
              </div>
              <div className="flex items-center gap-1">
                {p.isMuted ? (
                  <MicOff className="w-4 h-4 text-red-500" />
                ) : (
                  <Mic className="w-4 h-4 text-gray-400" />
                )}
                <button className="p-1 opacity-0 group-hover:opacity-100 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-all">
                  <MoreVertical className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
