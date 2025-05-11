import React, { useState } from 'react';
import { Pencil, Calendar, Clock, Award, BarChart2 } from 'lucide-react';
import Button from '../common/Button';
import { useNavigate } from 'react-router-dom';
import { Exam } from '../../types';

// Mock data
const mockExams: Exam[] = [
  {
    id: '1',
    title: 'Introduction to Mathematics',
    description: 'Basic algebra and arithmetic concepts',
    duration: 60,
    questions: [],
    createdBy: 'admin',
    createdAt: '2025-01-15T10:00:00Z',
  },
  {
    id: '2',
    title: 'English Literature',
    description: 'Comprehension and analysis of classic literature',
    duration: 90,
    questions: [],
    createdBy: 'admin',
    createdAt: '2025-01-20T14:30:00Z',
  },
  {
    id: '3',
    title: 'Computer Science Fundamentals',
    description: 'Basic programming concepts and algorithms',
    duration: 120,
    questions: [],
    createdBy: 'admin',
    createdAt: '2025-02-05T09:15:00Z',
  },
];

const mockCompletedExams = [
  {
    id: '1',
    examId: '4',
    title: 'Physics Mechanics',
    score: 85,
    totalScore: 100,
    completedAt: '2025-01-10T15:45:00Z',
  },
  {
    id: '2',
    examId: '5',
    title: 'Biology Basics',
    score: 92,
    totalScore: 100,
    completedAt: '2025-01-05T11:30:00Z',
  },
];

const StudentDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('upcoming');
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
        <p className="text-gray-600">View your upcoming and completed exams</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
          <div className="flex items-start">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Pencil className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-semibold text-gray-900">{mockExams.length}</h2>
              <p className="text-gray-600">Upcoming Exams</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
          <div className="flex items-start">
            <div className="p-2 bg-green-100 rounded-lg">
              <Award className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-semibold text-gray-900">{mockCompletedExams.length}</h2>
              <p className="text-gray-600">Completed Exams</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
          <div className="flex items-start">
            <div className="p-2 bg-purple-100 rounded-lg">
              <BarChart2 className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-semibold text-gray-900">88.5%</h2>
              <p className="text-gray-600">Average Score</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeTab === 'upcoming'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Upcoming Exams
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeTab === 'completed'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Completed Exams
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'upcoming' ? (
            <div className="space-y-6">
              {mockExams.map((exam) => (
                <div
                  key={exam.id}
                  className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{exam.title}</h3>
                      <p className="text-gray-600 mt-1">{exam.description}</p>
                      <div className="flex flex-wrap gap-4 mt-3">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          {exam.duration} minutes
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(exam.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <Button
                        onClick={() => navigate(`/exam/${exam.id}`)}
                        variant="primary"
                        size="medium"
                      >
                        Start Exam
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {mockCompletedExams.map((exam) => (
                <div
                  key={exam.id}
                  className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{exam.title}</h3>
                      <div className="flex flex-wrap gap-4 mt-3">
                        <div className="flex items-center text-sm text-gray-500">
                          <Award className="h-4 w-4 mr-1" />
                          Score: {exam.score}/{exam.totalScore}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          Completed: {new Date(exam.completedAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <Button
                        onClick={() => navigate(`/results/${exam.examId}`)}
                        variant="outline"
                        size="medium"
                      >
                        View Results
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;