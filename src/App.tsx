import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './globals.css';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Schedule from './pages/Schedule';
import Grades from './pages/Grades';
import Notifications from './pages/Notifications';
import CampusMap from './pages/CampusMap';
import Syllabus from './pages/Syllabus';
import Statistics from './pages/Statistics';
import News from './pages/News';
import Schools from './pages/Schools';
import Messenger from './pages/Messenger';
import Clubs from './pages/Clubs';
import Finance from './pages/Finance';
import Help from './pages/Help';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Auth from './pages/Auth';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="antialiased min-h-screen bg-gray-50">
          <Sidebar />
          <div className="lg:pl-64">
            <main className="relative">
              <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                  <Routes>
                    <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                    <Route path="/schedule" element={<PrivateRoute><Schedule /></PrivateRoute>} />
                    <Route path="/grades" element={<PrivateRoute><Grades /></PrivateRoute>} />
                    <Route path="/notifications" element={<PrivateRoute><Notifications /></PrivateRoute>} />
                    <Route path="/map" element={<PrivateRoute><CampusMap /></PrivateRoute>} />
                    <Route path="/syllabus" element={<PrivateRoute><Syllabus /></PrivateRoute>} />
                    <Route path="/statistics" element={<PrivateRoute><Statistics /></PrivateRoute>} />
                    <Route path="/news" element={<PrivateRoute><News /></PrivateRoute>} />
                    <Route path="/schools" element={<PrivateRoute><Schools /></PrivateRoute>} />
                    <Route path="/messenger" element={<PrivateRoute><Messenger /></PrivateRoute>} />
                    <Route path="/clubs" element={<PrivateRoute><Clubs /></PrivateRoute>} />
                    <Route path="/finance" element={<PrivateRoute><Finance /></PrivateRoute>} />
                    <Route path="/help" element={<PrivateRoute><Help /></PrivateRoute>} />
                    <Route path="/auth/*" element={<Auth />} />
                  </Routes>
                </div>
              </div>
            </main>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App; 