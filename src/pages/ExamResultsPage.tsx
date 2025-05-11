import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Button from '../components/common/Button';
import { useAuth } from '../contexts/AuthContext';
import { Award, CheckCircle, XCircle, BarChart2, Users, Download } from 'lucide-react';

const ExamResultsPage: React.FC = () => {
  const { examId } = useParams<{ examId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'questions' | 'students'>('overview');
  
  // Mock data - in a real app, this would come from an API
  const isAdmin = user?.role === 'admin';
  
  const mockExamResult = {
    id: examId,
    title: 'Introduction to Mathematics',
    description: 'Basic algebra and arithmetic concepts',
    date: '2025-03-15',
    totalQuestions: 10,
    totalPoints: 15,
    score: 12,
    percentage: 80,
    timeSpent: '45 minutes',
  };
  
  const mockQuestionResults = [
    { id: '1', text: 'What is 2 + 2?', answer: '4', correctAnswer: '4', isCorrect: true, points: 1 },
    { id: '2', text: 'Is the Earth flat?', answer: 'False', correctAnswer: 'False', isCorrect: true, points: 1 },
    { id: '3', text: 'Explain the Pythagorean theorem in your own words.', answer: 'The theorem about triangles', correctAnswer: 'The square of the hypotenuse equals the sum of the squares of the other two sides.', isCorrect: false, points: 0 },
  ];
  
  const mockStudentResults = [
    { id: '1', name: 'John Doe', score: 14, percentage: 93, completedAt: '2025-03-14' },
    { id: '2', name: 'Jane Smith', score: 12, percentage: 80, completedAt: '2025-03-15' },
    { id: '3', name: 'Robert Johnson', score: 9, percentage: 60, completedAt: '2025-03-15' },
  ];

  useEffect(() => {
    // Simulate API call to fetch results
    const fetchResults = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 700));
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching results:', error);
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [examId]);

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-1">{mockExamResult.title}</h3>
            <p className="text-gray-600">{mockExamResult.description}</p>
          </div>
          <div className="mt-4 md:mt-0">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              Completed: {mockExamResult.date}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-blue-500">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Award className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-500">Score</div>
              <div className="text-2xl font-bold text-gray-900">{mockExamResult.score} / {mockExamResult.totalPoints}</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-green-500">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <BarChart2 className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-500">Percentage</div>
              <div className="text-2xl font-bold text-gray-900">{mockExamResult.percentage}%</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-purple-500">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-500">Time Spent</div>
              <div className="text-2xl font-bold text-gray-900">{mockExamResult.timeSpent}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Performance Summary</h3>
          <div className="h-60 w-full bg-gray-50 flex items-center justify-center">
            {/* In a real app, this would be a chart component */}
            <div className="text-center">
              <div className="inline-block p-4 bg-blue-100 rounded-full mb-2">
                <BarChart2 className="h-8 w-8 text-blue-600" />
              </div>
              <p className="text-gray-500">Performance visualization would appear here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderQuestions = () => (
    <div className="space-y-6">
      {mockQuestionResults.map((question, index) => (
        <div key={question.id} className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-start">
            <div className={`flex-shrink-0 p-2 rounded-full ${question.isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
              {question.isCorrect ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <XCircle className="h-5 w-5 text-red-600" />
              )}
            </div>
            <div className="ml-4 flex-1">
              <div className="flex justify-between">
                <h3 className="text-lg font-medium text-gray-900">Question {index + 1}</h3>
                <span className={`text-sm font-medium ${question.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                  {question.points} point{question.points !== 1 ? 's' : ''}
                </span>
              </div>
              <p className="mt-1 text-gray-600">{question.text}</p>
              
              <div className="mt-4 bg-gray-50 p-3 rounded-md">
                <p className="text-sm font-medium text-gray-700">Your Answer:</p>
                <p className="mt-1 text-gray-800">{question.answer}</p>
              </div>
              
              {!question.isCorrect && (
                <div className="mt-3 bg-green-50 p-3 rounded-md">
                  <p className="text-sm font-medium text-green-700">Correct Answer:</p>
                  <p className="mt-1 text-gray-800">{question.correctAnswer}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderStudents = () => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="flex justify-between items-center p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold">Student Results</h3>
        <Button variant="outline" className="flex items-center">
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Student
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Score
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Percentage
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Completed
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockStudentResults.map((student) => (
              <tr key={student.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{student.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{student.score} / {mockExamResult.totalPoints}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    student.percentage >= 80 ? 'bg-green-100 text-green-800' :
                    student.percentage >= 60 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {student.percentage}%
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{student.completedAt}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Button 
                    variant="outline" 
                    size="small"
                    onClick={() => navigate(`/student-progress/${student.id}`)}
                  >
                    View Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Exam Results</h1>
            <p className="text-gray-600">{isAdmin ? 'View detailed exam statistics' : 'Review your exam performance'}</p>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate('/dashboard')}
          >
            Back to Dashboard
          </Button>
        </div>

        {isAdmin && (
          <div className="mb-6 bg-white rounded-lg shadow-md">
            <nav className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-4 text-center border-b-2 font-medium text-sm flex-1 ${
                  activeTab === 'overview'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('questions')}
                className={`px-4 py-4 text-center border-b-2 font-medium text-sm flex-1 ${
                  activeTab === 'questions'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Questions
              </button>
              <button
                onClick={() => setActiveTab('students')}
                className={`px-4 py-4 text-center border-b-2 font-medium text-sm flex-1 ${
                  activeTab === 'students'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Students
              </button>
            </nav>
          </div>
        )}

        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'questions' && renderQuestions()}
        {activeTab === 'students' && isAdmin && renderStudents()}
        
        {!isAdmin && renderQuestions()}
      </div>
    </div>
  );
};

export default ExamResultsPage;