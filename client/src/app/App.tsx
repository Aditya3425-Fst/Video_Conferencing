import React, { useState } from 'react';
import { Toaster, toast } from 'sonner';
import { AuthPage } from './pages/AuthPage';
import { DashboardPage } from './pages/DashboardPage';
import { MeetingRoomPage } from './pages/MeetingRoomPage';
import { logout } from './lib/firebase';

type AppState = 'auth' | 'dashboard' | 'room';

export default function App() {
  const [view, setView] = useState<AppState>('auth');
  const [userData, setUserData] = useState<{ name: string; email: string } | undefined>();

  const handleLogin = (user?: { name: string; email: string }) => {
    setUserData(user);
    setView('dashboard');
    toast.success(user ? `Welcome, ${user.name}!` : 'Successfully logged in');
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log('Logout error (expected if using demo mode):', error);
    }
    setUserData(undefined);
    setView('auth');
    toast.info('Logged out');
  };

  const handleStartMeeting = () => {
    setView('room');
    toast.success('Joined meeting: Weekly Sync');
  };

  const handleJoinMeeting = (code: string) => {
    setView('room');
    toast.success(`Joined meeting: ${code}`);
  };

  const handleLeaveMeeting = () => {
    setView('dashboard');
    toast.info('Left meeting');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 font-sans selection:bg-blue-100 selection:text-blue-900">
      <Toaster position="top-center" richColors />
      
      {view === 'auth' && (
        <AuthPage onLogin={handleLogin} />
      )}
      
      {view === 'dashboard' && (
        <DashboardPage 
          onStartMeeting={handleStartMeeting}
          onJoinMeeting={handleJoinMeeting}
          onLogout={handleLogout}
          userData={userData}
        />
      )}
      
      {view === 'room' && (
        <MeetingRoomPage onLeave={handleLeaveMeeting} />
      )}
    </div>
  );
}
