import React, { useState } from 'react';
import { PlusCircle, Trash2, ClipboardEdit } from 'lucide-react';
import Input from '../common/Input';
import Button from '../common/Button';
import { Question } from '../../types';

interface ExamCreatorProps {
  onSave: (examData: {
    title: string;
    description: string;
    duration: number;
    questions: Question[];
  }) => void;
  initialData?: {
    title: string;
    description: string;
    duration: number;
    questions: Question[];
  };
}

const ExamCreator: React.FC<ExamCreatorProps> = ({ onSave, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [duration, setDuration] = useState(initialData?.duration || 60);
  const [questions, setQuestions] = useState<Question[]>(initialData?.questions || []);
  const [currentQuestion, setCurrentQuestion] = useState<Question>({
    id: '',
    text: '',
    type: 'multiple-choice',
    options: ['', '', '', ''],
    correctAnswer: '',
    points: 1,
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const addOption = () => {
    setCurrentQuestion({
      ...currentQuestion,
      options: [...(currentQuestion.options || []), ''],
    });
  };

  const removeOption = (index: number) => {
    const newOptions = [...(currentQuestion.options || [])];
    newOptions.splice(index, 1);
    setCurrentQuestion({
      ...currentQuestion,
      options: newOptions,
    });
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...(currentQuestion.options || [])];
    newOptions[index] = value;
    setCurrentQuestion({
      ...currentQuestion,
      options: newOptions,
    });
  };

  const addQuestion = () => {
    if (!currentQuestion.text) return;

    const newQuestion = {
      ...currentQuestion,
      id: String(Date.now()),
    };

    if (editingIndex !== null) {
      const newQuestions = [...questions];
      newQuestions[editingIndex] = newQuestion;
      setQuestions(newQuestions);
      setEditingIndex(null);
    } else {
      setQuestions([...questions, newQuestion]);
    }

    // Reset current question
    setCurrentQuestion({
      id: '',
      text: '',
      type: 'multiple-choice',
      options: ['', '', '', ''],
      correctAnswer: '',
      points: 1,
    });
  };

  const removeQuestion = (index: number) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  const editQuestion = (index: number) => {
    setCurrentQuestion(questions[index]);
    setEditingIndex(index);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title,
      description,
      duration,
      questions,
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
      <form onSubmit={handleSubmit}>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Exam Details</h2>
          <div className="space-y-4">
            <Input
              label="Exam Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Exam Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="px-3 py-2 bg-white border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 block w-full rounded-md sm:text-sm focus:ring-1"
                rows={3}
                required
              />
            </div>
            <Input
              label="Duration (minutes)"
              type="number"
              min="1"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
              required
            />
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {editingIndex !== null ? 'Edit Question' : 'Add Question'}
          </h2>
          <div className="space-y-4 p-4 border border-gray-200 rounded-lg">
            <Input
              label="Question Text"
              value={currentQuestion.text}
              onChange={(e) =>
                setCurrentQuestion({ ...currentQuestion, text: e.target.value })
              }
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Question Type
              </label>
              <select
                value={currentQuestion.type}
                onChange={(e) =>
                  setCurrentQuestion({
                    ...currentQuestion,
                    type: e.target.value as any,
                    options: e.target.value === 'true-false' ? ['True', 'False'] : currentQuestion.options,
                  })
                }
                className="px-3 py-2 bg-white border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 block w-full rounded-md sm:text-sm focus:ring-1"
              >
                <option value="multiple-choice">Multiple Choice</option>
                <option value="true-false">True/False</option>
                <option value="short-answer">Short Answer</option>
              </select>
            </div>

            {(currentQuestion.type === 'multiple-choice' || currentQuestion.type === 'true-false') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Options
                </label>
                <div className="space-y-2">
                  {currentQuestion.options?.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="correctAnswer"
                        checked={currentQuestion.correctAnswer === option}
                        onChange={() =>
                          setCurrentQuestion({
                            ...currentQuestion,
                            correctAnswer: option,
                          })
                        }
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => updateOption(index, e.target.value)}
                        placeholder={`Option ${index + 1}`}
                        className="px-3 py-2 bg-white border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 block w-full rounded-md sm:text-sm focus:ring-1"
                        readOnly={currentQuestion.type === 'true-false'}
                      />
                      {currentQuestion.type !== 'true-false' && (
                        <button
                          type="button"
                          onClick={() => removeOption(index)}
                          className="p-2 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  {currentQuestion.type === 'multiple-choice' && (
                    <button
                      type="button"
                      onClick={addOption}
                      className="mt-2 flex items-center text-sm text-blue-600 hover:text-blue-800"
                    >
                      <PlusCircle className="h-4 w-4 mr-1" />
                      Add Option
                    </button>
                  )}
                </div>
              </div>
            )}

            {currentQuestion.type === 'short-answer' && (
              <Input
                label="Correct Answer"
                value={currentQuestion.correctAnswer as string}
                onChange={(e) =>
                  setCurrentQuestion({
                    ...currentQuestion,
                    correctAnswer: e.target.value,
                  })
                }
              />
            )}

            <Input
              label="Points"
              type="number"
              min="1"
              value={currentQuestion.points}
              onChange={(e) =>
                setCurrentQuestion({
                  ...currentQuestion,
                  points: parseInt(e.target.value),
                })
              }
            />

            <div className="flex justify-end">
              <Button
                type="button"
                onClick={addQuestion}
                disabled={!currentQuestion.text || (currentQuestion.type !== 'short-answer' && !currentQuestion.correctAnswer)}
              >
                {editingIndex !== null ? 'Update Question' : 'Add Question'}
              </Button>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Questions ({questions.length})</h2>
          {questions.length === 0 ? (
            <p className="text-gray-500 italic">No questions added yet.</p>
          ) : (
            <div className="space-y-4">
              {questions.map((question, index) => (
                <div
                  key={question.id}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex justify-between">
                    <h3 className="font-medium">
                      {index + 1}. {question.text}
                    </h3>
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={() => editQuestion(index)}
                        className="p-1 text-blue-600 hover:text-blue-800"
                      >
                        <ClipboardEdit className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeQuestion(index)}
                        className="p-1 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm mt-1">
                    Type: {question.type} | Points: {question.points}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={!title || !description || duration < 1 || questions.length === 0}
            size="large"
          >
            Save Exam
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ExamCreator;