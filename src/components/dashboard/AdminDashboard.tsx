import React, { useState } from 'react';
import { Users, PlusCircle, BookOpen, Clock, Calendar, Settings } from 'lucide-react';
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

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'exams' | 'students'>('exams');
  const navigate = useNavigate();

  const mockStudents = [
    { id: '1', name: 'John Doe', email: 'john@example.com', examsCompleted: 5 },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', examsCompleted: 3 },
    { id: '3', name: 'Robert Johnson', email: 'robert@example.com', examsCompleted: 7 },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage exams and view student progress</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button
            onClick={() => navigate('/create-exam')}
            size="medium"
            className="flex items-center"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Create Exam
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
          <div className="flex items-start">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-semibold text-gray-900">{mockExams.length}</h2>
              <p className="text-gray-600">Total Exams</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
          <div className="flex items-start">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-semibold text-gray-900">{mockStudents.length}</h2>
              <p className="text-gray-600">Active Students</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
          <div className="flex items-start">
            <div className="p-2 bg-green-100 rounded-lg">
              <Settings className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-semibold text-gray-900">System</h2>
              <p className="text-gray-600">All Systems Normal</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('exams')}
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeTab === 'exams'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Exams
            </button>
            <button
              onClick={() => setActiveTab('students')}
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeTab === 'students'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Students
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'exams' ? (
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
                          Created: {new Date(exam.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 flex gap-2">
                      <Button
                        onClick={() => navigate(`/edit-exam/${exam.id}`)}
                        variant="outline"
                        size="medium"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => navigate(`/exam-results/${exam.id}`)}
                        variant="secondary"
                        size="medium"
                      >
                        View Results
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Exams Completed
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockStudents.map((student) => (
                    <tr key={student.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{student.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{student.examsCompleted}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Button
                          onClick={() => navigate(`/student-progress/${student.id}`)}
                          variant="outline"
                          size="small"
                        >
                          View Progress
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;