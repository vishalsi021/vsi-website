import React, { useState, useCallback } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { AttendanceDashboard } from './components/AttendanceDashboard';
import { type AttendanceData, type Credentials } from './types';
import { VsiLogo } from './components/VsiLogo';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [view, setView] = useState<'login' | 'dashboard'>('login');
  const [attendanceData, setAttendanceData] = useState<AttendanceData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetchAttendance = useCallback(async (credentials: Credentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/fetch-attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to fetch attendance. Please check your credentials and try again.');
      }
      
      setAttendanceData(data);
      setView('dashboard');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleGoBack = () => {
    setView('login');
    setAttendanceData(null);
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 bg-slate-900 font-sans">
      <div className="w-full max-w-6xl mx-auto">
        <header className="flex justify-center items-center gap-4 mb-8">
          <VsiLogo />
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            VSI <span className="text-slate-400">| Vision Student Interface</span>
          </h1>
        </header>
        <main>
           <AnimatePresence mode="wait">
            {view === 'login' ? (
              <LoginScreen
                key="login"
                onSubmit={handleFetchAttendance}
                isLoading={isLoading}
                error={error}
              />
            ) : (
              attendanceData && <AttendanceDashboard key="dashboard" data={attendanceData} onBack={handleGoBack} />
            )}
          </AnimatePresence>
        </main>
      </div>
       <footer className="text-center mt-12 text-slate-500 text-sm">
            <p>Built for students. Not affiliated with Samvidha or IARE.</p>
            <p>Data is fetched in real-time and is not stored.</p>
        </footer>
    </div>
  );
}

export default App;