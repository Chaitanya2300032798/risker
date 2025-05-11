import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Button from '../components/common/Button';
import { GraduationCap, BookOpen, Users, Award } from 'lucide-react';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-500 text-white py-24 overflow-hidden">
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
          <div className="absolute top-10 right-0 w-96 h-96 bg-yellow-400 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-spin-slow" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <h1 className="text-5xl font-bold mb-4 leading-tight">
                  The Next Generation Online Examination Platform
                </h1>
                <p className="text-xl mb-8">
                  Create, manage, and take exams with ease. Streamline the assessment process
                  and focus on what matters most - education.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <Button 
                    size="large" 
                    onClick={() => navigate('/signup')}
                    className="bg-white text-indigo-600 hover:bg-gray-100"
                  >
                    Get Started
                  </Button>
                  <Button 
                    size="large" 
                    variant="outline"
                    onClick={() => navigate('/login')}
                    className="border-white text-white hover:bg-white/10"
                  >
                    Log In
                  </Button>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div className="w-full max-w-md bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-xl ring-1 ring-white/30 space-y-4">
                  <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 rounded-lg p-4 shadow-md hover:scale-105 transform transition duration-300">
                    <h3 className="font-medium text-lg mb-2">Final Exam: Web Development</h3>
                    <p className="text-sm opacity-90">Create interactive websites using modern frameworks and tools.</p>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-sm">60 minutes</span>
                      <Button size="small" className="bg-green text-blue-600">Start</Button>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-lg p-4 shadow-md hover:scale-105 transform transition duration-300">
                    <h3 className="font-medium text-lg mb-2">Database Management</h3>
                    <p className="text-sm opacity-90">Learn SQL, data modeling, and database optimization techniques.</p>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-sm">90 minutes</span>
                      <Button size="small" className="bg-green text-purple-600">Start</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Powerful Features</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need to create, manage, and take exams in one place.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-tr from-blue-100 to-white p-6 rounded-xl shadow-lg border-t-4 border-blue-500 hover:shadow-2xl transition">
                <div className="p-3 bg-blue-200 rounded-full w-max mb-4">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Flexible Exam Creation</h3>
                <p className="text-gray-700">
                  Create exams with multiple question types, timed sessions, and custom scoring rules.
                </p>
              </div>
              <div className="bg-gradient-to-tr from-purple-100 to-white p-6 rounded-xl shadow-lg border-t-4 border-purple-500 hover:shadow-2xl transition">
                <div className="p-3 bg-purple-200 rounded-full w-max mb-4">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Student Management</h3>
                <p className="text-gray-700">
                  Manage students, track progress, and generate comprehensive performance reports.
                </p>
              </div>
              <div className="bg-gradient-to-tr from-green-100 to-white p-6 rounded-xl shadow-lg border-t-4 border-green-500 hover:shadow-2xl transition">
                <div className="p-3 bg-green-200 rounded-full w-max mb-4">
                  <Award className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Performance Analytics</h3>
                <p className="text-gray-700">
                  Gain insights with detailed analytics on student performance and exam effectiveness.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Join thousands of satisfied educators and students around the world.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { initials: 'JD', name: 'John Doe', role: 'Professor, Computer Science', text: "This platform has revolutionized how I conduct exams." },
                { initials: 'SM', name: 'Sarah Miller', role: 'Student, Biology', text: "I love how easy it is to take exams on this platform." },
                { initials: 'RJ', name: 'Robert Johnson', role: 'School Administrator', text: "Managing exams across our entire institution has never been easier." }
              ].map((user, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl shadow-xl border-l-4 border-indigo-400 hover:scale-105 transform transition duration-300">
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold">
                      {user.initials}
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold">{user.name}</h3>
                      <p className="text-sm text-gray-500">{user.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{user.text}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Examination Process?</h2>
            <p className="text-xl mb-8">Join thousands of institutions already using our platform to simplify their examination process.</p>
            <Button 
              size="large" 
              onClick={() => navigate('/signup')}
              className="bg-white text-indigo-600 hover:bg-gray-100"
            >
              Get Started Today
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2">
                <GraduationCap className="h-8 w-8 text-blue-300 bg-white/10 p-1 rounded-full" />
                <span className="text-xl font-bold">ExamPro</span>
              </div>
              <p className="mt-4 text-gray-400">
                The next generation examination platform for modern education.
              </p>
            </div>
            {[
              { title: "Product", items: ["Features", "Pricing", "Testimonials", "FAQ"] },
              { title: "Resources", items: ["Documentation", "Tutorials", "Blog", "Support"] },
              { title: "Company", items: ["About", "Careers", "Contact", "Privacy Policy"] }
            ].map((section, i) => (
              <div key={i}>
                <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.items.map((item, idx) => (
                    <li key={idx}>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; 2025 ExamPro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
