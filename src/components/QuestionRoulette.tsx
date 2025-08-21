import React, { useEffect, useState } from 'react';
import { QuestionDisplay } from './QuestionDisplay';
import { QuestionHistory } from './QuestionHistory';
import { Timer } from './Timer';
import { Button } from './Button';
import { getRandomQuestion, questions } from '../utils/questions';
export function QuestionRoulette() {
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [askedQuestions, setAskedQuestions] = useState<string[]>([]);
  const [sessionCount, setSessionCount] = useState(1);
  const [showHistory, setShowHistory] = useState(true);
  const [timerActive, setTimerActive] = useState(false);
  const [timerDuration, setTimerDuration] = useState(2);
  // Initialize with a random question
  useEffect(() => {
    if (!currentQuestion) {
      const question = getRandomQuestion([]);
      setCurrentQuestion(question);
    }
  }, [currentQuestion]);
  const handleNextQuestion = () => {
    // Add current question to history
    if (currentQuestion) {
      setAskedQuestions(prev => [currentQuestion, ...prev]);
    }
    // Get a new question that hasn't been recently asked
    const newQuestion = getRandomQuestion(askedQuestions);
    setCurrentQuestion(newQuestion);
    setSessionCount(prev => prev + 1);
    // Reset timer if active
    if (timerActive) {
      setTimerActive(false);
      setTimeout(() => setTimerActive(true), 100);
    }
  };
  const handleResetSession = () => {
    setCurrentQuestion('');
    setAskedQuestions([]);
    setSessionCount(1);
    setTimerActive(false);
  };
  const toggleTimer = () => {
    setTimerActive(prev => !prev);
  };
  const handleTimerDurationChange = (minutes: number) => {
    setTimerDuration(minutes);
  };
  return <div className="max-w-4xl mx-auto">
      <header className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-indigo-800 mb-2">
          Question Roulette
        </h1>
        <p className="text-gray-600">
          Spin the wheel for your next retro discussion!
        </p>
      </header>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 mb-6">
        <div className="p-6 sm:p-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-indigo-600">
              Question {sessionCount} of session
            </span>
            <div className="flex gap-2">
              <Button variant="outline" onClick={toggleTimer} className="text-sm">
                {timerActive ? 'Stop Timer' : 'Start Timer'}
              </Button>
              {!timerActive && <select value={timerDuration} onChange={e => handleTimerDurationChange(Number(e.target.value))} className="text-sm border rounded px-2 bg-white text-gray-700">
                  {[2, 3, 4, 5].map(min => <option key={min} value={min}>
                      {min} min
                    </option>)}
                </select>}
            </div>
          </div>
          {timerActive && <Timer duration={timerDuration * 60} onComplete={() => setTimerActive(false)} />}
          <QuestionDisplay question={currentQuestion} />
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button onClick={handleNextQuestion} className="flex-1 py-4 text-lg" variant="primary">
              Spin the Wheel
            </Button>
            <Button onClick={handleResetSession} className="flex-1" variant="secondary">
              Reset Session
            </Button>
          </div>
        </div>
      </div>
      {askedQuestions.length > 0 && <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300">
          <div className="p-4 bg-indigo-50 flex justify-between items-center cursor-pointer" onClick={() => setShowHistory(prev => !prev)}>
            <h2 className="text-lg font-medium text-indigo-800">
              Already Discussed ({askedQuestions.length})
            </h2>
            <span className="text-indigo-600">{showHistory ? '▲' : '▼'}</span>
          </div>
          {showHistory && <QuestionHistory questions={askedQuestions} />}
        </div>}
    </div>;
}