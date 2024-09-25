/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import StartScreen from './components/StartScreen';
import Quiz from './components/Quiz';
import Result from './components/Result';

const BASE_URL = 'https://api4interns.vercel.app/api/v1/questions';

function App() {
  const [data, setData] = useState([]);
  const [remainingQuestions, setRemainingQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answeredQuestionsCount, setAnsweredQuestionsCount] = useState(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [gameState, setGameState] = useState('start'); // 'start', 'quiz', 'result'

  // Fetch data from API using the fetch API instead of axios
  const fetchData = async () => {
    try {
      const response = await fetch(BASE_URL);
      const result = await response.json();
      if (result.status) {
        setData(result.data);
        setRemainingQuestions(shuffleArray(result.data));
      } else {
        throw new Error('Failed to fetch data!');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Shuffle array using Fisher-Yates algorithm
  const shuffleArray = (array) => {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  };

  // Start the quiz
  const startQuiz = () => {
    setGameState('quiz');
    loadNextQuestion();
  };

  // Load the next question
  const loadNextQuestion = () => {
    if (remainingQuestions.length === 0) {
      showResults();
      return;
    }

    const nextQuestion = remainingQuestions[0];
    setCurrentQuestion(nextQuestion);
    setRemainingQuestions((prev) => prev.slice(1));
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  // Handle answer selection
  const handleAnswer = (isCorrect) => {
    setAnsweredQuestionsCount((prev) => prev + 1);
    if (isCorrect) {
      setCorrectAnswersCount((prev) => prev + 1);
    }
    // Load next question after a delay
    setTimeout(() => {
      loadNextQuestion();
    }, 2000);
  };

  // Show results
  const showResults = () => {
    setGameState('result');
  };

  // Restart the quiz
  const restartQuiz = () => {
    setRemainingQuestions(shuffleArray(data));
    setCurrentQuestionIndex(0);
    setAnsweredQuestionsCount(0);
    setCorrectAnswersCount(0);
    setGameState('quiz');
    loadNextQuestion();
  };

  return (
    <div
      className="min-h-screen bg-cover bg-no-repeat"
      style={{ backgroundImage: 'url(/image/Background/bck.png)' }}
    >
      {gameState === 'start' && <StartScreen onStart={startQuiz} />}
      {gameState === 'quiz' && currentQuestion && (
        <Quiz
          question={currentQuestion}
          questionNumber={currentQuestionIndex}
          totalQuestions={data.length}
          onAnswer={handleAnswer}
          onExit={showResults}
        />
      )}
      {gameState === 'result' && (
        <Result
          totalQuestions={data.length}
          correctAnswers={correctAnswersCount}
          wrongAnswers={answeredQuestionsCount - correctAnswersCount}
          score={correctAnswersCount * 10}
          onRestart={restartQuiz}
        />
      )}
    </div>
  );
}

export default App;
