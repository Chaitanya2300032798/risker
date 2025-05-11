import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Button from '../components/common/Button';
import { BarChart2, BookOpen, Award, User } from 'lucide-react';

const StudentProgressPage: React.FC = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  
  // Mock data - in a real app, this would come from an API
  const mockStudent = {
    id: studentId,
    name: 'ROY',
    email: 'roy@example.com',
    joinedAt: '2025-01-10',
    examsCompleted: 5,
    averageScore: 87.4,
  };
  
  const mockExamResults = [
    { id: '1', title: 'Introduction to Mathematics', score: 85, percentage: 85, completedAt: '2025-03-15' },
    { id: '2', title: 'English Literature', score: 92, percentage: 92, completedAt: '2025-03-10' },
    { id: '3', title: 'Computer Science Fundamentals', score: 78, percentage: 78, completedAt: '2025-03-05' },
    { id: '4', title: 'Physics Mechanics', score: 95, percentage: 95, completedAt: '2025-02-28' },
    { id: '5', title: 'Biology Basics', score: 87, percentage: 87, completedAt: '2025-02-20' },
  ];

  useEffect(() => {
    // Simulate API call to fetch student data
    const fetchStudentData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 700));
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching student data:', error);
        setIsLoading(false);
      }
    };

    fetchStudentData();
  }, [studentId]);

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
            <h1 className="text-2xl font-bold text-gray-900">Student Progress</h1>
            <p className="text-gray-600">Track performance and exam history</p>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate('/dashboard')}
          >
            Back to Dashboard
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="md:flex-1">
              <div className="flex items-center">
                <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-semibold text-gray-900">{mockStudent.name}</h2>
                  <p className="text-gray-600">{mockStudent.email}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 mt-4 md:mt-0">
              <div className="bg-gray-100 px-4 py-2 rounded-md">
                <span className="text-sm text-gray-500">Joined</span>
                <div className="text-gray-900 font-medium">{mockStudent.joinedAt}</div>
              </div>
              <div className="bg-gray-100 px-4 py-2 rounded-md">
                <span className="text-sm text-gray-500">Exams Completed</span>
                <div className="text-gray-900 font-medium">{mockStudent.examsCompleted}</div>
              </div>
              <div className="bg-gray-100 px-4 py-2 rounded-md">
                <span className="text-sm text-gray-500">Average Score</span>
                <div className="text-gray-900 font-medium">{mockStudent.averageScore}%</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-blue-500">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-500">Exams Taken</div>
                <div className="text-2xl font-bold text-gray-900">{mockExamResults.length}</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-green-500">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Award className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-500">Best Score</div>
                <div className="text-2xl font-bold text-gray-900">
                  {Math.max(...mockExamResults.map(r => r.percentage))}%
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-purple-500">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <BarChart2 className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-500">Average</div>
                <div className="text-2xl font-bold text-gray-900">
                  {(mockExamResults.reduce((sum, r) => sum + r.percentage, 0) / mockExamResults.length).toFixed(1)}%
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold">Performance Chart</h3>
          </div>
          <div className="p-6">
            <div className="h-64 w-full bg-gray-50 flex items-center justify-center">
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

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold">Exam History</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Exam
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Score
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockExamResults.map((result) => (
                  <tr key={result.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{result.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        result.percentage >= 80 ? 'bg-green-100 text-green-800' :
                        result.percentage >= 60 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {result.percentage}%
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{result.completedAt}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button 
                        variant="outline" 
                        size="small"
                        onClick={() => navigate(`/exam-results/${result.id}`)}
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
      </div>
    </div>
  );
};

export default StudentProgressPage;