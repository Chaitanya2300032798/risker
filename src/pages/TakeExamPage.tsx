import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import ExamTaker from '../components/exam/ExamTaker';
import { Exam } from '../types';
import Button from '../components/common/Button';

// Mock exam data - in a real app, this would come from an API
const mockExam: Exam = {
  id: '1',
  title: 'Introduction to Mathematics',
  description: 'Basic algebra and arithmetic concepts',
  duration: 60,
  questions: [
    {
      id: '1',
      text: 'What is 2 + 2?',
      type: 'multiple-choice',
      options: ['3', '4', '5', '6'],
      correctAnswer: '4',
      points: 1,
    },
    {
      id: '2',
      text: 'Is the Earth flat?',
      type: 'true-false',
      options: ['True', 'False'],
      correctAnswer: 'False',
      points: 1,
    },
    {
      id: '3',
      text: 'Explain the Pythagorean theorem in your own words.',
      type: 'short-answer',
      correctAnswer: 'The square of the hypotenuse equals the sum of the squares of the other two sides.',
      points: 2,
    },
  ],
  createdBy: 'admin',
  createdAt: '2025-01-15T10:00:00Z',
};

const TakeExamPage: React.FC = () => {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  const [exam, setExam] = useState<Exam | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    // Simulate API call to fetch exam by ID
    const fetchExam = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // For demo, we're using mock data
        if (examId === '1' || examId === '2' || examId === '3') {
          setExam(mockExam);
        } else {
          throw new Error('Exam not found');
        }
      } catch {
        setError('Failed to load exam. It may have been deleted or you do not have permission to view it.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchExam();
  }, [examId]);

  const handleSubmitExam = (answers: Record<string, string | string[]>) => {
    // In a real application, this would submit the answers to an API
    console.log('Submitting exam answers:', answers);
    
    // Navigate to results page after submission
    navigate(`/results/${examId}`);
  };

  const handleSaveProgress = (answers: Record<string, string | string[]>) => {
    // In a real application, this would save progress to an API or local storage
    console.log('Saving progress:', answers);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error || !exam) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-red-600 mb-2">Error</h2>
            <p className="text-gray-700 mb-4">{error || 'Exam not found'}</p>
            <Button onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
          </div>
        </div>
      </div>
    );
  }

  if (showConfirmation) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-lg shadow p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Begin?</h2>
            <div className="mb-6 border-l-4 border-yellow-400 bg-yellow-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    <strong>Important:</strong> Once you start the exam, the timer will begin. Make sure you have 
                    allocated enough time to complete the exam in one sitting.
                  </p>
                </div>
              </div>
            </div>
            
            <h3 className="font-semibold text-lg mb-2">{exam.title}</h3>
            <p className="text-gray-600 mb-2">{exam.description}</p>
            <div className="flex flex-col sm:flex-row gap-2 mb-6">
              <div className="bg-gray-100 px-3 py-1 rounded text-sm">
                Duration: {exam.duration} minutes
              </div>
              <div className="bg-gray-100 px-3 py-1 rounded text-sm">
                Questions: {exam.questions.length}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-3">
              <Button 
                variant="outline" 
                onClick={() => navigate('/dashboard')}
              >
                Return to Dashboard
              </Button>
              <Button 
                onClick={() => setShowConfirmation(false)}
              >
                Start Exam
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ExamTaker 
          exam={exam} 
          onSubmit={handleSubmitExam} 
          onSave={handleSaveProgress}
        />
      </div>
    </div>
  );
};

export default TakeExamPage;