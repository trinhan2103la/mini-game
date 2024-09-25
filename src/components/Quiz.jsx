/* eslint-disable react/prop-types */

import { useState, useEffect } from 'react';

const Quiz = ({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  onExit,
}) => {
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timer, setTimer] = useState(15);

  useEffect(() => {
    setShuffledAnswers(shuffleArray(question.answers));
    setSelectedAnswer(null);
    setTimer(15);
  }, [question]);

  // Shuffle array using Fisher-Yates algorithm
  const shuffleArray = (array) => {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  };

  // Handle timer
  useEffect(() => {
    if (timer === 0) {
      onAnswer(false);
      return;
    }
    const countdown = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(countdown);
  }, [timer, onAnswer]);

  const handleAnswerClick = (answer) => {
    if (selectedAnswer) return; // Prevent multiple selections
    setSelectedAnswer(answer);
    const isCorrect = answer === question.correctAnswer;
    onAnswer(isCorrect);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black bg-opacity-50">
      <div className="w-11/12 max-w-4xl bg-white bg-opacity-90 p-8 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg font-semibold">
            Câu {questionNumber} trên {totalQuestions}
          </div>
          <div
            id="time-out"
            className="w-16 h-16 flex items-center justify-center bg-blue-300 text-black rounded-full text-2xl"
          >
            {timer}
          </div>
        </div>
        <h2 className="text-3xl text-blue-500 mb-6">{question.question}</h2>
        <div className="grid grid-cols-2 gap-4">
          {shuffledAnswers.map((answer, index) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(answer)}
              className={`text-xl p-4 rounded-lg transition duration-300
                ${
                  selectedAnswer
                    ? answer === question.correctAnswer
                      ? 'bg-green-300'
                      : answer === selectedAnswer
                      ? 'bg-red-300'
                      : 'bg-blue-200'
                    : 'bg-blue-400 hover:bg-blue-500 text-white'
                }
              `}
              disabled={!!selectedAnswer}
            >
              {answer}
            </button>
          ))}
        </div>
        <div className="flex justify-between mt-6">
          <button
            onClick={onExit}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
          >
            Thoát
          </button>
          {/* The "Next" button is handled automatically after answering */}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
