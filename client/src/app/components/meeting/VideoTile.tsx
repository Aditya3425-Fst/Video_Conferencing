import React from 'react';
import { Mic, MicOff, User } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface VideoTileProps {
  name: string;
  isMuted?: boolean;
  isVideoOff?: boolean;
  isActiveSpeaker?: boolean;
  avatarUrl?: string;
  isLocal?: boolean;
  onClick?: () => void;
}

export const VideoTile: React.FC<VideoTileProps> = ({
  name,
  isMuted = false,
  isVideoOff = false,
  isActiveSpeaker = false,
  avatarUrl,
  isLocal = false,
  onClick,
}) => {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      onClick={onClick}
      className={cn(
        "relative flex-1 min-w-[300px] h-full rounded-2xl overflow-hidden bg-gray-900 border-2 transition-all duration-300 cursor-pointer hover:ring-2 hover:ring-blue-500/30",
        isActiveSpeaker ? "border-blue-500 ring-4 ring-blue-500/20" : "border-transparent"
      )}
    >
      {/* Video Content Placeholder */}
      <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
        {isVideoOff ? (
          <div className="flex flex-col items-center gap-4">
            <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center border-2 border-white/10 shadow-xl">
              {avatarUrl ? (
                <ImageWithFallback src={avatarUrl} alt={name} className="w-full h-full rounded-full object-cover" />
              ) : (
                <User className="w-12 h-12 text-gray-500" />
              )}
            </div>
            <span className="text-gray-400 font-medium">{name} {isLocal && "(You)"}</span>
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative">
             <div className="absolute top-4 right-4 z-10">
               {isMuted && (
                 <div className="p-1.5 bg-red-500/80 backdrop-blur-sm rounded-full">
                   <MicOff className="w-3.5 h-3.5 text-white" />
                 </div>
               )}
             </div>
             {/* Mock Video Stream Overlay */}
             <div className="absolute inset-0 bg-black/20" />
             <div className="text-white/20 text-8xl font-bold select-none uppercase tracking-tighter opacity-10">
               {name.split(' ').map(n => n[0]).join('')}
             </div>
          </div>
        )}
      </div>

      {/* Bottom Label */}
      <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-lg border border-white/10">
        {!isMuted && <Mic className="w-3.5 h-3.5 text-blue-400" />}
        <span className="text-white text-xs font-medium tracking-wide">
          {name} {isLocal && "(You)"}
        </span>
      </div>
    </motion.div>
  );
};
