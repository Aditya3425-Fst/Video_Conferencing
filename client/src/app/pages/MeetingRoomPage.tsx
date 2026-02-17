import React, { useState } from 'react';
import { 
  Mic, 
  MicOff, 
  Video as VideoIcon, 
  VideoOff, 
  Monitor, 
  MessageSquare, 
  Users, 
  Settings as SettingsIcon, 
  PhoneOff, 
  MoreVertical,
  Maximize2,
  Lock,
  Wifi
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ControlButton } from '../components/meeting/ControlButton';
import { VideoTile } from '../components/meeting/VideoTile';
import { MeetingGrid } from '../components/meeting/MeetingGrid';
import { ChatPanel, Message } from '../components/meeting/ChatPanel';
import { ParticipantPanel, Participant } from '../components/meeting/ParticipantPanel';
import { SettingsModal } from '../components/meeting/SettingsModal';

interface MeetingRoomPageProps {
  onLeave: () => void;
}

export const MeetingRoomPage: React.FC<MeetingRoomPageProps> = ({ onLeave }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [activePanel, setActivePanel] = useState<'chat' | 'participants' | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'Sarah Johnson', text: 'Hey everyone! Excited for today\'s sync.', time: '10:05 AM', isMe: false },
    { id: '2', sender: 'Alex Rivera', text: 'Me too! Let\'s wait for a few more people.', time: '10:06 AM', isMe: true },
  ]);

  const [participants] = useState<Participant[]>([
    { id: 'me', name: 'Alex Rivera', isMuted: false, isMe: true, role: 'host' },
    { id: '2', name: 'Sarah Johnson', isMuted: false, avatarUrl: 'https://images.unsplash.com/photo-1758599543120-4e462429a4d7?w=400&h=400&fit=crop' },
    { id: '3', name: 'Michael Chen', isMuted: true, avatarUrl: 'https://images.unsplash.com/photo-1579171817110-e4aa2d543305?w=400&h=400&fit=crop' },
    { id: '4', name: 'Elena Rodriguez', isMuted: false, avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop' },
  ]);

  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'Alex Rivera',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="h-screen bg-black flex flex-col overflow-hidden text-white">
      {/* Top Bar */}
      <header className="h-16 px-6 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent z-10">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-bold tracking-wide uppercase">Weekly Product Sync</h1>
            <div className="h-4 w-px bg-white/20" />
            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-white/10 rounded text-[10px] font-bold">
              <Lock className="w-3 h-3 text-emerald-500" />
              ENCRYPTED
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Wifi className="w-3 h-3 text-emerald-500" />
            <span>Excellent connection</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
           <div className="flex -space-x-2">
             {participants.slice(0, 3).map((p, i) => (
               <div key={p.id} className="w-6 h-6 rounded-full border border-black bg-gray-700 flex items-center justify-center text-[10px] font-bold">
                 {p.name[0]}
               </div>
             ))}
             {participants.length > 3 && (
               <div className="w-6 h-6 rounded-full border border-black bg-gray-800 flex items-center justify-center text-[10px] font-bold text-gray-400">
                 +{participants.length - 3}
               </div>
             )}
           </div>
           <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
             <Maximize2 className="w-4 h-4" />
           </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex overflow-hidden relative">
        <div className="flex-1 flex flex-col min-w-0">
          <MeetingGrid participantCount={participants.length}>
            <VideoTile 
              name="Alex Rivera" 
              isLocal 
              isMuted={isMuted} 
              isVideoOff={isVideoOff} 
              isActiveSpeaker={false}
              onClick={() => console.log('Tile clicked: Alex Rivera')}
            />
            <VideoTile 
              name="Sarah Johnson" 
              isMuted={false} 
              isActiveSpeaker={true}
              onClick={() => console.log('Tile clicked: Sarah Johnson')}
            />
            <VideoTile 
              name="Michael Chen" 
              isMuted={true}
              onClick={() => console.log('Tile clicked: Michael Chen')}
            />
            <VideoTile 
              name="Elena Rodriguez" 
              isMuted={false} 
              isVideoOff={true}
              onClick={() => console.log('Tile clicked: Elena Rodriguez')}
            />
          </MeetingGrid>
        </div>

        {/* Side Panels */}
        <AnimatePresence>
          {activePanel === 'chat' && (
            <ChatPanel 
              messages={messages} 
              onSendMessage={handleSendMessage} 
              onClose={() => setActivePanel(null)} 
            />
          )}
          {activePanel === 'participants' && (
            <ParticipantPanel 
              participants={participants} 
              onClose={() => setActivePanel(null)}
              onParticipantClick={(p) => {
                // Handle participant click - could show details or actions
                console.log('Participant clicked:', p.name);
              }}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Control Bar */}
      <footer className="h-24 flex items-center justify-center px-6 relative">
        {/* Time and Meeting Info */}
        <div className="hidden lg:block absolute left-8">
           <p className="text-sm font-medium">10:15 AM | xzy-abcd-mno</p>
        </div>

        {/* Main Controls */}
        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-2xl px-6 py-3 rounded-3xl border border-white/10 shadow-2xl">
          <ControlButton 
            icon={isMuted ? MicOff : Mic} 
            label={isMuted ? "Unmute" : "Mute"} 
            active={isMuted}
            variant={isMuted ? "danger" : "default"}
            onClick={() => setIsMuted(!isMuted)}
          />
          <ControlButton 
            icon={isVideoOff ? VideoOff : VideoIcon} 
            label={isVideoOff ? "Start Video" : "Stop Video"} 
            active={isVideoOff}
            variant={isVideoOff ? "danger" : "default"}
            onClick={() => setIsVideoOff(!isVideoOff)}
          />
          <ControlButton 
            icon={Monitor} 
            label="Share Screen" 
            active={isScreenSharing}
            onClick={() => setIsScreenSharing(!isScreenSharing)}
          />
          
          <div className="w-px h-8 bg-white/10 mx-1" />

          <ControlButton 
            icon={MessageSquare} 
            label="Chat" 
            active={activePanel === 'chat'}
            onClick={() => setActivePanel(activePanel === 'chat' ? null : 'chat')}
          />
          <ControlButton 
            icon={Users} 
            label="Participants" 
            active={activePanel === 'participants'}
            onClick={() => setActivePanel(activePanel === 'participants' ? null : 'participants')}
          />
          <ControlButton 
            icon={SettingsIcon} 
            label="Settings" 
            onClick={() => setIsSettingsOpen(true)}
          />
          
          <div className="w-px h-8 bg-white/10 mx-1" />

          <ControlButton 
            icon={PhoneOff} 
            label="Leave Meeting" 
            variant="danger"
            onClick={onLeave}
            className="w-16 rounded-2xl"
          />
        </div>

        {/* Secondary Actions */}
        <div className="hidden lg:flex absolute right-8 items-center gap-2">
           <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <MoreVertical className="w-5 h-5 text-gray-400" />
           </button>
        </div>
      </footer>

      {/* Settings Modal */}
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
    </div>
  );
};
