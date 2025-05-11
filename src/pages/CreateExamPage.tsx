import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import ExamCreator from '../components/exam/ExamCreator';
import { Exam, Question } from '../types';

const CreateExamPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSaveExam = (examData: {
    title: string;
    description: string;
    duration: number;
    questions: Question[];
  }) => {
    // In a real application, this would send the data to an API
    console.log('Saving exam:', examData);
    
    // Mock saving the exam and getting an ID back
    const newExam: Exam = {
      ...examData,
      id: String(Date.now()),
      createdBy: 'admin',
      createdAt: new Date().toISOString(),
    };

    console.log('New exam created:', newExam);
    
    // Navigate back to dashboard after saving
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Create New Exam</h1>
          <p className="text-gray-600">Design your exam with questions, options, and correct answers</p>
        </div>
        
        <ExamCreator onSave={handleSaveExam} />
      </div>
    </div>
  );
};

export default CreateExamPage;