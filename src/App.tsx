import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import CreateExamPage from './pages/CreateExamPage';
import EditExamPage from './pages/EditExamPage';
import TakeExamPage from './pages/TakeExamPage';
import ExamResultsPage from './pages/ExamResultsPage';
import StudentProgressPage from './pages/StudentProgressPage';
import NotFoundPage from './pages/NotFoundPage';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

// Role-Based Route Component
const RoleRoute: React.FC<{ 
  children: React.ReactNode; 
  allowedRoles: ('student' | 'admin')[]
}> = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return user && allowedRoles.includes(user.role) ? (
    <>{children}</>
  ) : (
    <Navigate to="/dashboard" replace />
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          
          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          
          {/* Admin Routes */}
          <Route 
            path="/create-exam" 
            element={
              <RoleRoute allowedRoles={['admin']}>
                <CreateExamPage />
              </RoleRoute>
            } 
          />
          <Route 
            path="/edit-exam/:examId" 
            element={
              <RoleRoute allowedRoles={['admin']}>
                <EditExamPage />
              </RoleRoute>
            } 
          />
          <Route 
            path="/exam-results/:examId" 
            element={
              <RoleRoute allowedRoles={['admin']}>
                <ExamResultsPage />
              </RoleRoute>
            } 
          />
          <Route 
            path="/student-progress/:studentId" 
            element={
              <RoleRoute allowedRoles={['admin']}>
                <StudentProgressPage />
              </RoleRoute>
            } 
          />
          
          {/* Student Routes */}
          <Route 
            path="/exam/:examId" 
            element={
              <RoleRoute allowedRoles={['student']}>
                <TakeExamPage />
              </RoleRoute>
            } 
          />
          <Route 
            path="/results/:examId" 
            element={
              <ProtectedRoute>
                <ExamResultsPage />
              </ProtectedRoute>
            } 
          />
          
          {/* 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;