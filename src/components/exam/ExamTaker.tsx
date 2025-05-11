import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Clock, Save } from 'lucide-react';
import Button from '../common/Button';
import { Exam, Question } from '../../types';

interface ExamTakerProps {
  exam: Exam;
  onSubmit: (answers: Record<string, string | string[]>) => void;
  onSave?: (answers: Record<string, string | string[]>) => void;
}

const ExamTaker: React.FC<ExamTakerProps> = ({ exam, onSubmit, onSave }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [timeLeft, setTimeLeft] = useState(exam.duration * 60); // in seconds
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Timer logic
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [exam.duration]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePrevQuestion = () => {
    setCurrentQuestionIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prev) => Math.min(exam.questions.length - 1, prev + 1));
  };

  const handleAnswerChange = (questionId: string, value: string | string[]) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSave = () => {
    onSave?.(answers);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    onSubmit(answers);
  };

  const currentQuestion = exam.questions[currentQuestionIndex];

  const renderQuestion = (question: Question) => {
    switch (question.type) {
      case 'multiple-choice':
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="radio"
                  id={`option-${index}`}
                  name={`question-${question.id}`}
                  value={option}
                  checked={(answers[question.id] as string) === option}
                  onChange={() => handleAnswerChange(question.id, option)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label htmlFor={`option-${index}`} className="ml-2 block text-gray-700">
                  {option}
                </label>
              </div>
            ))}
          </div>
        );
      case 'true-false':
        return (
          <div className="space-y-3">
            <div className="flex items-center">
              <input
                type="radio"
                id="option-true"
                name={`question-${question.id}`}
                value="True"
                checked={(answers[question.id] as string) === 'True'}
                onChange={() => handleAnswerChange(question.id, 'True')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <label htmlFor="option-true" className="ml-2 block text-gray-700">
                True
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="option-false"
                name={`question-${question.id}`}
                value="False"
                checked={(answers[question.id] as string) === 'False'}
                onChange={() => handleAnswerChange(question.id, 'False')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <label htmlFor="option-false" className="ml-2 block text-gray-700">
                False
              </label>
            </div>
          </div>
        );
      case 'short-answer':
        return (
          <textarea
            value={(answers[question.id] as string) || ''}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            className="px-3 py-2 bg-white border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 block w-full rounded-md sm:text-sm focus:ring-1"
            rows={4}
            placeholder="Type your answer here..."
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center p-4 bg-gray-50 border-b border-gray-200 rounded-t-lg">
        <h2 className="text-xl font-semibold">{exam.title}</h2>
        <div className="flex items-center">
          <Clock className="h-5 w-5 text-red-500 mr-2" />
          <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">
              Question {currentQuestionIndex + 1} of {exam.questions.length}
            </h3>
            <span className="text-sm text-gray-500">
              {currentQuestion?.points} point{currentQuestion?.points > 1 ? 's' : ''}
            </span>
          </div>
          
          <div className="mb-6">
            <p className="text-gray-800 text-lg mb-4">{currentQuestion?.text}</p>
            {currentQuestion && renderQuestion(currentQuestion)}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <Button
            type="button"
            onClick={handlePrevQuestion}
            disabled={currentQuestionIndex === 0}
            variant="outline"
            className="flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          
          <div className="flex space-x-2">
            {onSave && (
              <Button
                type="button"
                onClick={handleSave}
                variant="outline"
                className="flex items-center"
              >
                <Save className="h-4 w-4 mr-1" />
                Save Progress
              </Button>
            )}
            {currentQuestionIndex === exam.questions.length - 1 ? (
              <Button
                type="button"
                onClick={handleSubmit}
                variant="success"
                isLoading={isSubmitting}
              >
                Submit Exam
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleNextQuestion}
                className="flex items-center"
              >
                Next
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
        <div className="flex flex-wrap gap-2">
          {exam.questions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuestionIndex(index)}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors
                ${
                  index === currentQuestionIndex
                    ? 'bg-blue-600 text-white'
                    : answers[exam.questions[index].id]
                    ? 'bg-green-100 text-green-800 border border-green-300'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }
              `}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExamTaker;