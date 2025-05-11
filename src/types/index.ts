export interface User {
  id: string;
  username: string;
  email: string;
  role: 'student' | 'admin';
}

export interface Question {
  id: string;
  text: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer';
  options?: string[];
  correctAnswer: string | string[];
  points: number;
}

export interface Exam {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  questions: Question[];
  createdBy: string;
  createdAt: string;
}

export interface ExamAttempt {
  id: string;
  examId: string;
  userId: string;
  answers: Record<string, string | string[]>;
  score: number;
  startedAt: string;
  submittedAt?: string;
  isCompleted: boolean;
}