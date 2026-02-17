import React, { useState } from 'react';
import { 
  Video, 
  Plus, 
  Keyboard, 
  Calendar, 
  Clock, 
  MoreVertical, 
  User,
  Bell
} from 'lucide-react';
import { motion } from 'motion/react';

interface DashboardPageProps {
  onStartMeeting: () => void;
  onJoinMeeting: (code: string) => void;
  onLogout: () => void;
  userData?: {
    name: string;
    email: string;
  };
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onStartMeeting, onLogout, onJoinMeeting, userData }) => {
  const [meetingCode, setMeetingCode] = useState('');

  const handleJoinMeeting = () => {
    if (meetingCode.trim()) {
      onJoinMeeting(meetingCode.trim());
    }
  };

  const recentMeetings = [
    { id: '1', title: 'Design Sync', date: 'Yesterday', participants: 4 },
    { id: '2', title: 'Sprint Planning', date: 'Feb 15, 2026', participants: 8 },
    { id: '3', title: 'Marketing Weekly', date: 'Feb 14, 2026', participants: 5 },
  ];

  const upcomingMeetings = [
    { id: '1', title: 'Product Review', time: '14:00 - 15:00', icon: '🎨' },
    { id: '2', title: 'Team Catch-up', time: '16:30 - 17:00', icon: '👋' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      {/* Navbar */}
      <nav className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Video className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900 dark:text-white">ZyntraMeet</span>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors relative cursor-pointer">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-900" />
          </button>
          
          <div className="h-8 w-px bg-gray-200 dark:bg-gray-800 mx-2" />
          
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-900 dark:text-white">{userData?.name || 'User'}</p>
              <p className="text-xs text-gray-500">{userData?.email || 'user@example.com'}</p>
            </div>
            <button onClick={onLogout} className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center border-2 border-white dark:border-gray-800 shadow-sm overflow-hidden cursor-pointer">
               <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl w-full mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - Actions */}
        <div className="lg:col-span-8 space-y-8">
          <section className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden relative">
             <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <Video className="w-48 h-48 text-blue-600" />
             </div>
             
             <div className="relative z-10 max-w-lg">
               <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Premium video meetings. Now free for everyone.</h2>
               <p className="text-gray-500 dark:text-gray-400 mb-8 text-lg">
                 We've redesigned ZyntraMeet to make it more secure, reliable, and accessible for everyone to stay connected.
               </p>

               <div className="flex flex-col sm:flex-row gap-4">
                 <button 
                  onClick={onStartMeeting}
                  className="flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98] cursor-pointer"
                 >
                   <Plus className="w-5 h-5" />
                   New Meeting
                 </button>

                 <div className="flex-1 flex gap-2">
                   <div className="relative flex-1">
                     <Keyboard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                     <input 
                       type="text" 
                       value={meetingCode}
                       onChange={(e) => setMeetingCode(e.target.value)}
                       placeholder="Enter a code or link"
                       className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                     />
                   </div>
                   <button 
                    disabled={!meetingCode}
                    onClick={handleJoinMeeting}
                    className="px-6 py-4 text-blue-600 dark:text-blue-400 font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-2xl transition-all cursor-pointer"
                   >
                     Join
                   </button>
                 </div>
               </div>
             </div>
          </section>

          {/* Recent Meetings */}
          <section className="space-y-4">
             <div className="flex items-center justify-between">
               <h3 className="text-xl font-bold text-gray-900 dark:text-white">Recent Meetings</h3>
               <button onClick={() => onStartMeeting()} className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline cursor-pointer">View all</button>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {recentMeetings.map((meeting) => (
                 <motion.div 
                   key={meeting.id}
                   whileHover={{ y: -4 }}
                   onClick={() => onStartMeeting()}
                   className="p-5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl flex items-center justify-between group cursor-pointer shadow-sm hover:shadow-md transition-all"
                 >
                   <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center text-gray-500">
                       <Clock className="w-6 h-6" />
                     </div>
                     <div>
                       <h4 className="font-semibold text-gray-900 dark:text-white">{meeting.title}</h4>
                       <p className="text-sm text-gray-500">{meeting.date} • {meeting.participants} participants</p>
                     </div>
                   </div>
                   <button onClick={(e) => { e.stopPropagation(); }} className="p-2 opacity-0 group-hover:opacity-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all cursor-pointer">
                     <MoreVertical className="w-5 h-5 text-gray-400" />
                   </button>
                 </motion.div>
               ))}
             </div>
          </section>
        </div>

        {/* Right Column - Calendar/Upcoming */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-gray-900 dark:text-white">Upcoming</h3>
              </div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Today</span>
            </div>
            
            <div className="p-6 space-y-6">
              {upcomingMeetings.map((meeting) => (
                <div key={meeting.id} className="relative pl-6 border-l-2 border-blue-500">
                  <span className="absolute -left-[5px] top-0 w-2 h-2 bg-blue-500 rounded-full" />
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-lg">{meeting.icon}</span>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{meeting.title}</h4>
                  </div>
                  <p className="text-sm text-gray-500 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {meeting.time}
                  </p>
                  <button onClick={() => onStartMeeting()} className="mt-4 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-bold rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors w-full cursor-pointer">
                    Join Early
                  </button>
                </div>
              ))}
              
              <button onClick={() => onStartMeeting()} className="w-full flex items-center justify-center gap-2 py-4 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-700 transition-all cursor-pointer">
                <Plus className="w-5 h-5" />
                <span className="text-sm font-medium">Schedule a meeting</span>
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-3xl p-6 text-white shadow-xl shadow-blue-500/20 relative overflow-hidden">
             <div className="relative z-10">
               <h4 className="font-bold text-lg mb-2">Try Pro Features</h4>
               <p className="text-blue-100 text-sm mb-4">Unlock unlimited recording, custom backgrounds, and up to 500 participants.</p>
               <button onClick={() => {}} className="px-4 py-2 bg-white text-blue-600 text-sm font-bold rounded-xl hover:bg-blue-50 transition-colors cursor-pointer">
                 Learn more
               </button>
             </div>
             <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          </div>
        </div>
      </main>
    </div>
  );
};
