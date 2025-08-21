import React from 'react';
interface QuestionDisplayProps {
  question: string;
}
export function QuestionDisplay({
  question
}: QuestionDisplayProps) {
  return <div className="min-h-[200px] flex items-center justify-center">
      <h2 className="text-2xl sm:text-3xl md:text-4xl text-center font-bold text-gray-800 leading-tight animate-fadeIn" style={{
      animation: 'fadeIn 0.5s ease-in-out'
    }}>
        "{question}"
      </h2>
    </div>;
}