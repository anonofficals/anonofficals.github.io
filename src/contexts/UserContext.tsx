
import React, { createContext, useContext, useState, useEffect } from 'react';
import loginData from '../data/loginData.json';

interface LoginHistoryEntry {
  userId: string;
  loginTime: string;
  ipAddress: string;
  device: string;
  location: string;
}

interface UserSession {
  userId: string;
  sessionStart: string;
  lastActivity: string;
  isActive: boolean;
}

interface UserContextType {
  user: any;
  loginHistory: LoginHistoryEntry[];
  currentSession: UserSession | null;
  updateLoginHistory: (userId: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | null>(null);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [loginHistory, setLoginHistory] = useState<LoginHistoryEntry[]>(loginData.loginHistory);
  const [currentSession, setCurrentSession] = useState<UserSession | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
      // Find current session
      const session = loginData.currentSessions.find(s => s.userId === JSON.parse(userData).email);
      setCurrentSession(session || null);
    }
  }, []);

  const updateLoginHistory = (userId: string) => {
    const newEntry: LoginHistoryEntry = {
      userId,
      loginTime: new Date().toISOString(),
      ipAddress: "192.168.1." + Math.floor(Math.random() * 255),
      device: "Desktop - Chrome",
      location: "Current Location"
    };
    
    setLoginHistory(prev => [newEntry, ...prev.slice(0, 9)]); // Keep last 10 entries
    
    const newSession: UserSession = {
      userId,
      sessionStart: new Date().toISOString(),
      lastActivity: new Date().toISOString(),
      isActive: true
    };
    
    setCurrentSession(newSession);
  };

  const logout = () => {
    setUser(null);
    setCurrentSession(null);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{
      user,
      loginHistory,
      currentSession,
      updateLoginHistory,
      logout
    }}>
      {children}
    </UserContext.Provider>
  );
};
