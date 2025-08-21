import React from 'react';
interface QuestionHistoryProps {
  questions: string[];
}
export function QuestionHistory({
  questions
}: QuestionHistoryProps) {
  if (questions.length === 0) return null;
  return <div className="p-4">
      <ul className="divide-y divide-gray-100">
        {questions.map((question, index) => <li key={index} className="py-3 px-2 text-gray-700 hover:bg-indigo-50 rounded transition-colors">
            <span className="text-xs font-medium text-indigo-500 mr-2">
              #{questions.length - index}
            </span>
            {question}
          </li>)}
      </ul>
    </div>;
}