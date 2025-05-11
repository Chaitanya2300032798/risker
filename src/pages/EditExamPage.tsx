import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import ExamCreator from '../components/exam/ExamCreator';
import { Exam, Question } from '../types';
import Button from '../components/common/Button';

// Mock data - in a real app, this would come from an API
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

const EditExamPage: React.FC = () => {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  const [exam, setExam] = useState<Exam | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call to fetch exam by ID
    const fetchExam = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // For demo, we're using mock data
        if (examId === '1') {
          setExam(mockExam);
        } else {
          throw new Error('Exam not found');
        }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError('Failed to load exam. It may have been deleted or you do not have permission to view it.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchExam();
  }, [examId]);

  const handleSaveExam = (examData: {
    title: string;
    description: string;
    duration: number;
    questions: Question[];
  }) => {
    // In a real application, this would update the exam via API
    console.log('Updating exam:', examData);
    
    // Navigate back to dashboard after saving
    navigate('/dashboard');
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Edit Exam</h1>
          <p className="text-gray-600">Make changes to your exam questions and settings</p>
        </div>
        
        <ExamCreator 
          onSave={handleSaveExam} 
          initialData={{
            title: exam.title,
            description: exam.description,
            duration: exam.duration,
            questions: exam.questions,
          }} 
        />
      </div>
    </div>
  );
};

export default EditExamPage;