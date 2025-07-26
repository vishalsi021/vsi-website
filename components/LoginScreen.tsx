import React, { useState, useEffect } from 'react';
import { type Credentials } from '../types';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Card } from './ui/Card';
import { Alert } from './ui/Alert';
import { motion } from 'framer-motion';

interface LoginScreenProps {
  onSubmit: (credentials: Credentials) => void;
  isLoading: boolean;
  error: string | null;
}

const Spinner = () => (
  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const loadingMessages = [
  'Initializing secure browser...',
  'Logging into Samvidha portal...',
  'Scraping attendance records...',
  'This can take a moment...',
  'Almost there...',
];

export const LoginScreen: React.FC<LoginScreenProps> = ({ onSubmit, isLoading, error }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    let interval: number;
    if (isLoading) {
      setCurrentMessageIndex(0); // Reset on new load
      interval = window.setInterval(() => {
        setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
      }, 2500); // Change message every 2.5 seconds
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isLoading]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const emailRegex = /^(\d{5}[a-z]\d{2}[a-z0-9]{2})@iare\.ac\.in$/i;
    const match = userId.trim().match(emailRegex);

    if (!match) {
      setFormError('Invalid format. Please use your full IARE email (e.g., 23951a12h7@iare.ac.in).');
      return;
    }
    
    const extractedUserId = match[1];

    if (extractedUserId && password) {
      onSubmit({ userId: extractedUserId, password });
    }
  };

  return (
    <motion.div
      className="max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <div className="p-6 sm:p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white">Samvidha Portal Login</h2>
            <p className="text-slate-400 mt-1">Enter your credentials to fetch attendance.</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              id="userId"
              type="email"
              placeholder="e.g., 23951a12h7@iare.ac.in"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              aria-label="IARE Email Address"
              disabled={isLoading}
              required
            />
            <Input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-label="Password"
              disabled={isLoading}
              required
            />
            <Button type="submit" className="w-full" disabled={isLoading || !userId || !password}>
              {isLoading ? (
                <>
                  <Spinner />
                  {loadingMessages[currentMessageIndex]}
                </>
              ) : (
                'Fetch Attendance'
              )}
            </Button>
          </form>
          {(error || formError) && <Alert message={error || formError!} className="mt-4" />}
        </div>
      </Card>
    </motion.div>
  );
};
