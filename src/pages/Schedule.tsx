import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  UserIcon,
  AcademicCapIcon,
  ArrowPathIcon,
  BookOpenIcon,
  ChatBubbleLeftRightIcon,
  BeakerIcon
} from '@heroicons/react/24/outline';

type WeekDay = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';

interface Lesson {
  subject: string;
  time: string;
  room: string;
  teacher: string;
  type: 'lecture' | 'seminar' | 'lab';
}

interface DaySchedule {
  lessons: Lesson[];
}

interface Schedule {
  [key: string]: DaySchedule;
}

const weekdays: WeekDay[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const sampleSchedule: Schedule = {
  'Monday': {
    lessons: [
      {
        subject: 'Mathematics',
        time: '9:00 - 10:30',
        room: 'Room 101',
        teacher: 'Dr. Smith',
        type: 'lecture'
      },
      {
        subject: 'Physics',
        time: '10:45 - 12:15',
        room: 'Room 102',
        teacher: 'Dr. Johnson',
        type: 'seminar'
      }
    ]
  },
  'Tuesday': {
    lessons: [
      {
        subject: 'Programming',
        time: '9:00 - 10:30',
        room: 'Lab 201',
        teacher: 'Prof. Brown',
        type: 'lab'
      }
    ]
  },
  'Wednesday': {
    lessons: [
      {
        subject: 'English',
        time: '13:00 - 14:30',
        room: 'Room 103',
        teacher: 'Ms. Davis',
        type: 'seminar'
      }
    ]
  },
  'Thursday': {
    lessons: [
      {
        subject: 'History',
        time: '14:45 - 16:15',
        room: 'Room 104',
        teacher: 'Dr. Wilson',
        type: 'lecture'
      }
    ]
  },
  'Friday': {
    lessons: [
      {
        subject: 'Chemistry',
        time: '16:30 - 18:00',
        room: 'Lab 202',
        teacher: 'Prof. Taylor',
        type: 'lab'
      }
    ]
  }
};

const getTypeColor = (type: 'lecture' | 'seminar' | 'lab') => {
  switch (type) {
    case 'lecture':
      return 'bg-blue-50 border-blue-200 text-blue-700';
    case 'seminar':
      return 'bg-purple-50 border-purple-200 text-purple-700';
    case 'lab':
      return 'bg-green-50 border-green-200 text-green-700';
    default:
      return 'bg-gray-50 border-gray-200 text-gray-700';
  }
};

const getTypeIcon = (type: 'lecture' | 'seminar' | 'lab') => {
  switch (type) {
    case 'lecture':
      return <BookOpenIcon className="h-6 w-6" />;
    case 'seminar':
      return <ChatBubbleLeftRightIcon className="h-6 w-6" />;
    case 'lab':
      return <BeakerIcon className="h-6 w-6" />;
    default:
      return <AcademicCapIcon className="h-6 w-6" />;
  }
};

const Schedule: React.FC = () => {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [selectedDay, setSelectedDay] = useState<WeekDay | null>(null);
  const [viewMode, setViewMode] = useState<'week' | 'day'>('week');

  const weekDays = weekdays.slice(currentWeek * 5, (currentWeek + 1) * 5);
  const currentDaySchedule = selectedDay ? sampleSchedule[selectedDay]?.lessons : [];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow-xl rounded-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <CalendarIcon className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Schedule</h1>
                  <p className="text-sm text-gray-600">View your weekly schedule</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode(viewMode === 'week' ? 'day' : 'week')}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                >
                  <ArrowPathIcon className="h-4 w-4 mr-2" />
                  {viewMode === 'week' ? 'Day View' : 'Week View'}
                </motion.button>
                <div className="flex items-center space-x-2 bg-white rounded-lg p-1 shadow-sm">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentWeek(prev => Math.max(0, prev - 1))}
                    disabled={currentWeek === 0}
                    className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 transition-colors"
                  >
                    <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentWeek(prev => prev + 1)}
                    disabled={currentWeek === 1}
                    className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 transition-colors"
                  >
                    <ChevronRightIcon className="h-5 w-5 text-gray-600" />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>

          {/* Week Navigation - Mobile */}
          <div className="sm:hidden overflow-x-auto bg-gray-50 border-b border-gray-200">
            <div className="flex space-x-2 p-4">
              {weekDays.map((day) => (
                <motion.button
                  key={day}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedDay(day);
                    setViewMode('day');
                  }}
                  className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedDay === day
                      ? 'bg-blue-100 text-blue-700 shadow-sm'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {day}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Schedule Content */}
          <div className="p-4 sm:p-6">
            {viewMode === 'week' ? (
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {weekDays.map((day) => (
                  <motion.div
                    key={day}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      {day}
                    </h3>
                    <div className="space-y-4">
                      {sampleSchedule[day]?.lessons.map((lesson, index) => (
                        <motion.div
                          key={index}
                          variants={itemVariants}
                          className={`p-4 rounded-lg border ${getTypeColor(lesson.type)} transition-all duration-200 hover:shadow-md`}
                        >
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0">
                              {getTypeIcon(lesson.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">{lesson.subject}</p>
                              <div className="mt-2 space-y-2">
                                <div className="flex items-center text-xs text-gray-600">
                                  <ClockIcon className="h-4 w-4 mr-1.5 flex-shrink-0" />
                                  <span className="truncate">{lesson.time}</span>
                                </div>
                                <div className="flex items-center text-xs text-gray-600">
                                  <MapPinIcon className="h-4 w-4 mr-1.5 flex-shrink-0" />
                                  <span className="truncate">{lesson.room}</span>
                                </div>
                                <div className="flex items-center text-xs text-gray-600">
                                  <UserIcon className="h-4 w-4 mr-1.5 flex-shrink-0" />
                                  <span className="truncate">{lesson.teacher}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  {selectedDay || 'Select a day'}
                </h2>
                {currentDaySchedule?.map((lesson, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-lg border ${getTypeColor(lesson.type)} transition-all duration-200 hover:shadow-md`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        {getTypeIcon(lesson.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-base font-medium text-gray-900 truncate">{lesson.subject}</p>
                        <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div className="flex items-center text-sm text-gray-600">
                            <ClockIcon className="h-4 w-4 mr-1.5 flex-shrink-0" />
                            <span className="truncate">{lesson.time}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPinIcon className="h-4 w-4 mr-1.5 flex-shrink-0" />
                            <span className="truncate">{lesson.room}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <UserIcon className="h-4 w-4 mr-1.5 flex-shrink-0" />
                            <span className="truncate">{lesson.teacher}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Schedule;
