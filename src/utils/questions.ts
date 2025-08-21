// Question bank for the retro app
export const questions = ['What surprised you most today?', "What's one thing you'd do differently if you could restart today?", 'What breakthrough moment made you feel most proud?', 'What roadblock taught you the most?', 'If today was a movie, what would the title be?', "What's one thing that worked better than expected?", 'What assumption got proven wrong today?', 'What made you laugh or smile during the work?', 'What would you want to remember from today in 6 months?', 'What skill did someone else demonstrate that impressed you?', "What's one thing you're excited to tackle tomorrow?", "What deserves a celebration from today's work?"];
/**
 * Shuffles an array using Fisher-Yates algorithm
 * @param array The array to shuffle
 * @returns A new shuffled array
 */
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}
// Keep a shuffled queue of questions to ensure true randomness
let questionQueue: string[] = [];
/**
 * Get a random question that hasn't been recently asked
 * @param recentQuestions Array of recently asked questions to avoid
 * @returns A random question
 */
export function getRandomQuestion(recentQuestions: string[]): string {
  // If our queue is empty, create a new shuffled queue
  if (questionQueue.length === 0) {
    questionQueue = shuffleArray(questions);
  }
  // Try to find a question that hasn't been recently asked
  const availableQuestions = questionQueue.filter(q => !recentQuestions.includes(q));
  if (availableQuestions.length > 0) {
    // Get the first available question from our shuffled queue
    const nextQuestion = availableQuestions[0];
    // Remove it from the queue
    questionQueue = questionQueue.filter(q => q !== nextQuestion);
    return nextQuestion;
  } else {
    // If all questions in our current queue have been recently asked,
    // create a new shuffled queue excluding the most recent question
    const mostRecentQuestion = recentQuestions[0];
    questionQueue = shuffleArray(questions.filter(q => q !== mostRecentQuestion));
    // Return the first question from our new queue
    const nextQuestion = questionQueue[0];
    questionQueue = questionQueue.filter(q => q !== nextQuestion);
    return nextQuestion;
  }
}