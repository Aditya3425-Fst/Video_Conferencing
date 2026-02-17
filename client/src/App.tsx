import { useState, useEffect } from 'react';
import { ClerkProvider, SignIn, SignedIn, SignedOut, UserButton, useUser } from '@clerk/clerk-react';
import './index.css';

// TODO: Replace with your Clerk publishable key from https://clerk.com
const CLERK_PUBLISHABLE_KEY = 'pk_test_your_key_here';

// Icons
const VideoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="23 7 16 12 23 17 23 7"></polygon>
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
  </svg>
);

const PlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const MicIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
    <line x1="12" y1="19" x2="12" y2="23"></line>
    <line x1="8" y1="23" x2="16" y2="23"></line>
  </svg>
);

const VideoOffIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m5.66 0H14a2 2 0 0 1 2 2v3.34l1 1L23 7v10"></path>
    <line x1="1" y1="1" x2="23" y2="23"></line>
  </svg>
);

const ScreenShareIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
    <line x1="8" y1="21" x2="16" y2="21"></line>
    <line x1="12" y1="17" x2="12" y2="21"></line>
  </svg>
);

const PhoneOffIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"></path>
    <line x1="23" y1="1" x2="1" y2="23"></line>
  </svg>
);

const UsersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

interface Meeting {
  id: string;
  title: string;
  date: string;
}

// Landing Page Component
const LandingPage = ({ onSignIn }: { onSignIn: () => void }) => {
  const [meetingId, setMeetingId] = useState('');

  const generateMeetingId = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
        if (j < 2) result += '-';
      }
      if (i < 2) result += '-';
    }
    return result;
  };

  const createMeeting = () => {
    const newMeetingId = generateMeetingId();
    window.location.hash = `/meeting/${newMeetingId}`;
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <div className="logo-icon">
            <VideoIcon />
          </div>
          <span>MeetFlow</span>
        </div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <button className="btn btn-primary" onClick={onSignIn}>
            Sign In
          </button>
        </div>
      </nav>

      <section className="hero">
        <h1>Video meetings made simple</h1>
        <p>
          Connect with your team anywhere in the world. 
          High-quality video calls with powerful collaboration features.
        </p>
        <div className="hero-buttons">
          <button className="btn btn-primary" onClick={createMeeting}>
            <PlusIcon /> New Meeting
          </button>
          <button className="btn btn-secondary" onClick={onSignIn}>
            Join Meeting
          </button>
        </div>

        <div className="meeting-id-input">
          <input 
            type="text" 
            placeholder="Enter meeting code" 
            value={meetingId}
            onChange={(e) => setMeetingId(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && meetingId.trim() && (window.location.hash = `/meeting/${meetingId}`)}
          />
          <button className="btn btn-primary" onClick={() => meetingId.trim() && (window.location.hash = `/meeting/${meetingId}`)}>
            Join
          </button>
        </div>
      </section>
    </>
  );
};

// Dashboard Component (protected)
const Dashboard = () => {
  const { user } = useUser();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [joinId, setJoinId] = useState('');

  const recentMeetings: Meeting[] = [
    { id: 'abc-def-ghi', title: 'Team Standup', date: 'Today, 10:00 AM' },
    { id: 'xyz-uvw-rst', title: 'Project Review', date: 'Yesterday, 2:00 PM' },
    { id: 'mno-pqr-stu', title: 'Client Call', date: 'Jan 15, 11:00 AM' },
    { id: 'jkl-mno-pqr', title: 'Design Sync', date: 'Jan 14, 4:00 PM' },
  ];

  const generateMeetingId = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
        if (j < 2) result += '-';
      }
      if (i < 2) result += '-';
    }
    return result;
  };

  const createMeeting = () => {
    const newMeetingId = generateMeetingId();
    window.location.hash = `/meeting/${newMeetingId}`;
    setShowCreateModal(false);
  };

  const joinMeeting = (id: string) => {
    if (id.trim()) {
      window.location.hash = `/meeting/${id}`;
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <div className="logo-icon">
            <VideoIcon />
          </div>
          <span>MeetFlow</span>
        </div>
        <div className="user-section">
          <UserButton afterSignOutUrl="/" />
        </div>
      </nav>

      <div className="dashboard-layout">
        <aside className="sidebar">
          <div className="sidebar-logo">
            <div className="logo-icon" style={{ width: 32, height: 32 }}>
              <VideoIcon />
            </div>
            <span>MeetFlow</span>
          </div>

          <button className="btn btn-primary new-meeting-btn" onClick={() => setShowCreateModal(true)}>
            <PlusIcon /> New Meeting
          </button>

          <div className="join-meeting-input">
            <input 
              type="text" 
              placeholder="Enter meeting code" 
              value={joinId}
              onChange={(e) => setJoinId(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && joinMeeting(joinId)}
            />
          </div>

          <div className="sidebar-section">
            <h3>Recent Meetings</h3>
            <div className="meeting-list">
              {recentMeetings.map((meeting) => (
                <div 
                  key={meeting.id} 
                  className="meeting-item"
                  onClick={() => joinMeeting(meeting.id)}
                >
                  <div className="meeting-item-title">{meeting.title}</div>
                  <div className="meeting-item-time">{meeting.date}</div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <main className="main-content">
          <header className="main-header">
            <div className="welcome-section">
              <h2>Welcome back, {user?.firstName || 'User'}!</h2>
              <p>Ready to start or join a meeting?</p>
            </div>
            <div className="user-section">
              <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}>
                <PlusIcon /> New Meeting
              </button>
            </div>
          </header>

          <section className="video-section">
            <div className="video-container">
              <div className="video-placeholder">
                <div className="video-placeholder-icon">
                  <VideoIcon />
                </div>
                <p>Select a meeting to join or start a new one</p>
              </div>
            </div>
          </section>
        </main>
      </div>

      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Create New Meeting</h3>
            <button className="btn btn-primary" style={{ width: '100%', marginBottom: '1rem' }} onClick={createMeeting}>
              Start Instant Meeting
            </button>
            <button className="btn btn-secondary" style={{ width: '100%' }} onClick={() => setShowCreateModal(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

// Meeting Page Component
const MeetingPage = ({ meetingId }: { meetingId: string }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  return (
    <div className="main-content" style={{ height: '100vh' }}>
      <header className="main-header">
        <div className="meeting-info">
          <h3>Meeting in progress</h3>
          <p>MeetFlow Meeting</p>
        </div>
        <div className="user-section">
          <UsersIcon />
          <span>1 participant</span>
        </div>
      </header>

      <section className="video-section" style={{ flex: 1 }}>
        <div className="video-container">
          <div className="video-placeholder">
            <div className="video-placeholder-icon">
              <VideoIcon />
            </div>
            <p>Your video is off</p>
          </div>
          <div className="meeting-id-badge">
            {meetingId}
          </div>
        </div>
      </section>

      <div className="video-controls">
        <button 
          className={`control-btn ${isMuted ? 'active' : ''}`}
          onClick={() => setIsMuted(!isMuted)}
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          <MicIcon />
        </button>
        <button 
          className={`control-btn ${isVideoOff ? 'active' : ''}`}
          onClick={() => setIsVideoOff(!isVideoOff)}
          title={isVideoOff ? 'Turn on camera' : 'Turn off camera'}
        >
          {isVideoOff ? <VideoOffIcon /> : <VideoIcon />}
        </button>
        <button 
          className={`control-btn ${isScreenSharing ? 'active' : ''}`}
          onClick={() => setIsScreenSharing(!isScreenSharing)}
          title={isScreenSharing ? 'Stop sharing' : 'Share screen'}
        >
          <ScreenShareIcon />
        </button>
        <button 
          className="control-btn end-call"
          onClick={() => window.location.hash = '/dashboard'}
          title="Leave meeting"
        >
          <PhoneOffIcon />
        </button>
      </div>
    </div>
  );
};

// Main App with routing
function AppContent() {
  const [showSignIn, setShowSignIn] = useState(false);

  // Simple hash-based routing
  const getCurrentRoute = (): { page: string; meetingId?: string } => {
    const hash = window.location.hash.slice(1);
    if (hash.startsWith('/meeting/')) {
      return { page: 'meeting', meetingId: hash.replace('/meeting/', '') };
    }
    if (hash === '/dashboard') {
      return { page: 'dashboard' };
    }
    return { page: 'landing' };
  };

  const [route, setRoute] = useState(getCurrentRoute());

  // Listen for hash changes
  useEffect(() => {
    const handleHashChange = () => {
      setRoute(getCurrentRoute());
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Redirect to dashboard when signed in and on landing
  useEffect(() => {
    if (route.page === 'landing') {
      window.location.hash = '/dashboard';
    }
  }, [route]);

  // Show sign in modal when needed
  if (showSignIn) {
    return (
      <div className="clerk-modal" onClick={() => setShowSignIn(false)}>
        <div className="clerk-container" onClick={(e) => e.stopPropagation()}>
          <SignIn 
            signUpUrl="/sign-up" 
            afterSignInUrl="/dashboard"
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <SignedIn>
        {route.page === 'meeting' && route.meetingId && <MeetingPage meetingId={route.meetingId} />}
        {route.page === 'dashboard' && <Dashboard />}
        {route.page === 'landing' && <div className="loading"><div className="spinner"></div></div>}
      </SignedIn>
      <SignedOut>
        {route.page === 'meeting' ? (
          // For meeting page, show sign in first
          <div className="clerk-modal">
            <div className="clerk-container">
              <SignIn 
                signUpUrl="/sign-up" 
                afterSignInUrl={`/meeting/${route.meetingId}`}
              />
            </div>
          </div>
        ) : (
          <LandingPage onSignIn={() => setShowSignIn(true)} />
        )}
      </SignedOut>
    </>
  );
}

// App with Clerk Provider
function App() {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <AppContent />
    </ClerkProvider>
  );
}

export default App;
