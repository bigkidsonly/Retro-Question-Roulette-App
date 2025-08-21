import React, { useEffect, useState } from 'react';
interface TimerProps {
  duration: number; // in seconds
  onComplete: () => void;
}
export function Timer({
  duration,
  onComplete
}: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);
  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, onComplete]);
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const percentComplete = (duration - timeLeft) / duration * 100;
  return <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-lg font-bold text-indigo-700">
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </span>
        <span className="text-sm text-gray-500">Discussion time</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-indigo-600 transition-all duration-1000 ease-linear" style={{
        width: `${percentComplete}%`
      }} />
      </div>
    </div>;
}