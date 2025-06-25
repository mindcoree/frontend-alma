import React, { useState, useMemo } from 'react';
import { 
  AcademicCapIcon, 
  ChartBarIcon, 
  ChevronDownIcon, 
  ChevronUpIcon, 
  CheckCircleIcon, 
  ExclamationCircleIcon,
  MagnifyingGlassIcon,
  ArrowDownTrayIcon,
  BellIcon,
  FunnelIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  XMarkIcon,
  InformationCircleIcon,
  ClockIcon,
  UserIcon,
  ArrowPathIcon,
  DocumentTextIcon,
  BookmarkIcon,
  ClipboardDocumentListIcon,
  LightBulbIcon,
  MinusIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';

interface Notification {
  id: number;
  message: string;
  time: string;
  read: boolean;
  type: 'success' | 'warning' | 'error' | 'info';
}

const semesters = [
  { id: 'fall-2023', name: 'Fall 2023' },
  { id: 'spring-2023', name: 'Spring 2023' },
  { id: 'fall-2022', name: 'Fall 2022' },
] as const;

type SemesterId = typeof semesters[number]['id'];

interface Grade {
  id: string;
  name: string;
  code: string;
  credits: number;
  instructor: string;
  semester: number;
  year: number;
  midterm1: number;
  midterm2: number;
  currentPerformance: number;
  exam: number;
}

const sampleGrades: Grade[] = [
  {
    id: 'CS101',
    name: 'Introduction to Programming',
    code: 'CS101',
    credits: 6,
    instructor: 'Dr. John Smith',
    semester: 1,
    year: 1,
    midterm1: 75,
    midterm2: 80,
    currentPerformance: 85,
    exam: 90
  },
  {
    id: 'CS103',
    name: 'Computer Architecture',
    code: 'CS103',
    credits: 6,
    instructor: 'Dr. Maria Garcia',
    semester: 1,
    year: 1,
    midterm1: 70,
    midterm2: 75,
    currentPerformance: 80,
    exam: 85
  },
  {
    id: 'CS102',
    name: 'Web Development Basics',
    code: 'CS102',
    credits: 6,
    instructor: 'Dr. Sarah Johnson',
    semester: 2,
    year: 1,
    midterm1: 85,
    midterm2: 88,
    currentPerformance: 90,
    exam: 92
  },
  {
    id: 'CS201',
    name: 'Data Structures and Algorithms',
    code: 'CS201',
    credits: 6,
    instructor: 'Dr. Michael Chen',
    semester: 1,
    year: 2,
    midterm1: 78,
    midterm2: 82,
    currentPerformance: 85,
    exam: 88
  },
  {
    id: 'CS202',
    name: 'Database Systems',
    code: 'CS202',
    credits: 6,
    instructor: 'Dr. Robert Brown',
    semester: 1,
    year: 2,
    midterm1: 45,
    midterm2: 48,
    currentPerformance: 42,
    exam: 0
  }
];

const getGradeColor = (value: number) => {
  if (value >= 70) return 'text-green-600';
  if (value >= 50) return 'text-blue-600';
  return 'text-red-600';
};

const getGradeTrend = (currentGPA: number, previousGPA: number) => {
  const difference = currentGPA - previousGPA;
  if (difference > 0) {
    return { color: 'text-green-500', icon: ArrowTrendingUpIcon, text: 'Improving' };
  } else if (difference < 0) {
    return { color: 'text-red-500', icon: ArrowTrendingDownIcon, text: 'Declining' };
  }
  return { color: 'text-gray-500', icon: ChartBarIcon, text: 'Stable' };
};

const exportToCSV = (grades: Grade[], semester: string) => {
  const headers = ['Subject', 'Grade', 'Credits', 'GPA', 'Department', 'Instructor'];
  const csvContent = [
    headers.join(','),
    ...grades.map(course => [
      course.name,
      course.code,
      course.credits,
      course.currentPerformance,
      course.code.split(' ')[0],
      course.instructor
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `grades-${semester}.csv`;
  link.click();
};

const gpaData = [
  { semester: 'Fall 2022', gpa: 3.2, credits: 15, courses: 5 },
  { semester: 'Spring 2023', gpa: 3.4, credits: 18, courses: 6 },
  { semester: 'Fall 2023', gpa: 3.6, credits: 15, courses: 5 },
  { semester: 'Spring 2024', gpa: 3.8, credits: 18, courses: 6 }
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-4 shadow-lg rounded-lg border border-gray-200"
      >
        <p className="text-sm font-medium text-gray-900 mb-2">{label}</p>
        <div className="space-y-1">
          <p className="text-sm text-blue-600">
            GPA: <span className="font-semibold">{data.gpa}</span>
          </p>
          <p className="text-sm text-gray-600">
            Credits: <span className="font-medium">{data.credits}</span>
          </p>
          <p className="text-sm text-gray-600">
            Courses: <span className="font-medium">{data.courses}</span>
          </p>
        </div>
      </motion.div>
    );
  }
  return null;
};

const CircularProgress = ({ value, color, size = 60 }: { value: number, color: string, size?: number }) => {
  const radius = size / 2 - 4;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          className="text-gray-200"
          strokeWidth="4"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className={color}
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`text-sm font-bold ${color}`}>
          {value}
        </span>
      </div>
    </div>
  );
};

const calculateRating = (grade: Grade) => {
  return ((grade.midterm1 + grade.midterm2) / 2 + grade.currentPerformance) / 2;
};

const convertToFourPointScale = (percentage: number): number => {
  if (percentage >= 90) return 4.0;
  if (percentage >= 85) return 3.67;
  if (percentage >= 80) return 3.33;
  if (percentage >= 75) return 3.0;
  if (percentage >= 70) return 2.67;
  if (percentage >= 65) return 2.33;
  if (percentage >= 60) return 2.0;
  if (percentage >= 55) return 1.67;
  if (percentage >= 50) return 1.33;
  return 1.0;
};

const calculateFinalGrade = (grade: Grade) => {
  const rating = calculateRating(grade);
  return rating >= 50 ? (rating * 0.6 + grade.exam * 0.4) : rating;
};

const calculateGPA = (grades: Grade[]) => {
  if (grades.length === 0) return '0.00';
  
  let totalPoints = 0;
  let totalCredits = 0;

  grades.forEach(grade => {
    const finalGrade = calculateFinalGrade(grade);
    const gradePoints = convertToFourPointScale(finalGrade);
    totalPoints += gradePoints * grade.credits;
    totalCredits += grade.credits;
  });

  return (totalPoints / totalCredits).toFixed(2);
};

const Grades: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number>(1);
  const [selectedSemester, setSelectedSemester] = useState<number>(1);
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDepartment, setFilterDepartment] = useState<string>('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      message: 'New grade posted for Mathematics',
      time: '2 minutes ago',
      read: false,
      type: 'success'
    },
    {
      id: 2,
      message: 'Assignment deadline approaching',
      time: '1 hour ago',
      read: false,
      type: 'warning'
    }
  ]);

  const gradesInSemester = sampleGrades.filter(
    grade => grade.year === selectedYear && grade.semester === selectedSemester
  );

  const totalCredits = gradesInSemester.reduce((sum, grade) => sum + grade.credits, 0);
  const averageGrade = gradesInSemester.length > 0 
    ? gradesInSemester.reduce((sum, grade) => sum + calculateFinalGrade(grade), 0) / gradesInSemester.length 
    : 0;

  const departments = useMemo(() => {
    const uniqueDepartments = new Set(gradesInSemester.map(grade => grade.code.split(' ')[0]));
    return Array.from(uniqueDepartments);
  }, [gradesInSemester]);

  const gpaTrend = useMemo(() => {
    const currentGPA = parseFloat(calculateGPA(gradesInSemester));
    const previousSemester = selectedSemester === 1 ? 2 : 1;
    const previousYear = selectedSemester === 1 ? selectedYear - 1 : selectedYear;
    const previousGrades = sampleGrades.filter(
      grade => grade.year === previousYear && grade.semester === previousSemester
    );
    const previousGPA = parseFloat(calculateGPA(previousGrades));
    return getGradeTrend(currentGPA, previousGPA);
  }, [selectedYear, selectedSemester, gradesInSemester]);

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

  const tableRowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  const notificationVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    exit: { 
      opacity: 0, 
      x: 100,
      transition: {
        duration: 0.2
      }
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <ExclamationCircleIcon className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <ExclamationCircleIcon className="h-5 w-5 text-red-500" />;
      default:
        return <InformationCircleIcon className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow-2xl rounded-3xl overflow-hidden"
        >
          {/* Header with Stats */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-10"></div>
            <div className="relative p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
                    <ChartBarIcon className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Academic Performance</h1>
                    <p className="text-sm text-gray-600 mt-1">Year {selectedYear}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-50 rounded-xl p-3">
                    <div className="text-sm text-blue-600 font-medium">Current GPA</div>
                    <div className="text-2xl font-bold text-blue-700">{calculateGPA(gradesInSemester)}</div>
                  </div>
                  <div className="bg-indigo-50 rounded-xl p-3">
                    <div className="text-sm text-indigo-600 font-medium">Total Credits</div>
                    <div className="text-2xl font-bold text-indigo-700">{totalCredits}</div>
                  </div>
                  <div className="bg-green-50 rounded-xl p-3">
                    <div className="text-sm text-green-600 font-medium">Average Grade</div>
                    <div className="text-2xl font-bold text-green-700">{averageGrade.toFixed(1)}</div>
                  </div>
                  <button
                    onClick={() => exportToCSV(gradesInSemester, `${selectedYear}-${selectedSemester}`)}
                    className="flex items-center space-x-2 bg-white/80 hover:bg-blue-50 px-4 py-2 rounded-xl shadow transition-colors border border-blue-100"
                  >
                    <ArrowDownTrayIcon className="w-5 h-5 text-blue-600" />
                    <span className="text-blue-700 font-medium">Export</span>
                  </button>
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative bg-white/80 hover:bg-blue-50 p-2 rounded-xl shadow border border-blue-100 transition-colors"
                  >
                    <BellIcon className="w-6 h-6 text-blue-600" />
                    {notifications.some(n => !n.read) && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Year Navigation */}
          <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex flex-wrap gap-3">
              {[1, 2].map((year) => (
                <motion.button
                  key={year}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedYear(year);
                    setSelectedSemester(1);
                  }}
                  className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    selectedYear === year
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <AcademicCapIcon className="h-5 w-5" />
                    <span>Year {year}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Semester Navigation */}
          <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex flex-wrap gap-3">
              {[1, 2].map((semester) => (
                <motion.button
                  key={semester}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedSemester(semester)}
                  className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    selectedSemester === semester
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <CalendarIcon className="h-5 w-5" />
                    <span>Semester {semester}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Search and Filter */}
          <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                </div>
              </div>
              <div className="flex space-x-2">
                <select
                  value={filterDepartment}
                  onChange={(e) => setFilterDepartment(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Departments</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Grades Grid */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gradesInSemester
                .filter(grade => 
                  grade.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
                  (!filterDepartment || grade.code.startsWith(filterDepartment))
                )
                .map((grade) => {
                  const rating = calculateRating(grade);
                  const finalGrade = calculateFinalGrade(grade);
                  const canTakeExam = rating >= 50;

                  return (
                    <motion.div
                      key={grade.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                      onClick={() => setExpandedCourse(expandedCourse === grade.id ? null : grade.id)}
                    >
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-6">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">{grade.name}</h3>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                                {grade.code}
                              </span>
                              <span className="text-sm text-gray-500">
                                {grade.credits} Credits
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                              canTakeExam 
                                ? 'bg-green-50 text-green-600' 
                                : 'bg-red-50 text-red-600'
                            }`}>
                              {canTakeExam ? 'Eligible' : 'Not Eligible'}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedCourse(expandedCourse === grade.id ? null : grade.id);
                              }}
                              className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                              {expandedCourse === grade.id ? (
                                <ChevronUpIcon className="w-5 h-5" />
                              ) : (
                                <ChevronDownIcon className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6 mb-6">
                          <div className="flex flex-col items-center">
                            <CircularProgress
                              value={grade.midterm1}
                              color={getGradeColor(grade.midterm1)}
                              size={80}
                            />
                            <span className="text-sm font-medium text-gray-700 mt-2">First Midterm</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <CircularProgress
                              value={grade.midterm2}
                              color={getGradeColor(grade.midterm2)}
                              size={80}
                            />
                            <span className="text-sm font-medium text-gray-700 mt-2">Second Midterm</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <CircularProgress
                              value={grade.currentPerformance}
                              color={getGradeColor(grade.currentPerformance)}
                              size={80}
                            />
                            <span className="text-sm font-medium text-gray-700 mt-2">Current Performance</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <CircularProgress
                              value={rating}
                              color={getGradeColor(rating)}
                              size={80}
                            />
                            <span className="text-sm font-medium text-gray-700 mt-2">Overall Rating</span>
                          </div>
                        </div>

                        <AnimatePresence>
                          {expandedCourse === grade.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="pt-4 border-t border-gray-200">
                                <div className="space-y-4">
                                  <div className="flex justify-between items-center">
                                    <div>
                                      <p className="text-sm font-medium text-gray-600">Instructor</p>
                                      <p className="font-medium text-gray-900">{grade.instructor}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-gray-600">Credits</p>
                                      <p className="font-medium text-gray-900">{grade.credits}</p>
                                    </div>
                                  </div>
                                  <div className="bg-gray-50 rounded-lg p-4">
                                    <p className="text-sm font-medium text-gray-600 mb-2">Exam Status</p>
                                    <div className="flex items-center space-x-2">
                                      {canTakeExam ? (
                                        <>
                                          <CheckCircleIcon className="w-5 h-5 text-green-500" />
                                          <span className="text-green-600 font-medium">Eligible for Exam</span>
                                        </>
                                      ) : (
                                        <>
                                          <ExclamationCircleIcon className="w-5 h-5 text-red-500" />
                                          <span className="text-red-600 font-medium">Not Eligible for Exam</span>
                                        </>
                                      )}
                                    </div>
                                    {!canTakeExam && (
                                      <p className="text-sm text-red-600 mt-2">
                                        Rating {rating.toFixed(1)}% is below the required 50% threshold
                                      </p>
                                    )}
                                  </div>
                                  {canTakeExam && (
                                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
                                      <p className="text-sm font-medium text-gray-600 mb-2">Final Grade</p>
                                      <div className="flex items-center justify-center">
                                        <CircularProgress
                                          value={finalGrade}
                                          color={getGradeColor(finalGrade)}
                                          size={100}
                                        />
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  );
                })}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Notifications Panel */}
      <AnimatePresence>
        {showNotifications && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed right-4 top-20 w-80 bg-white rounded-xl shadow-lg border border-gray-200"
          >
            <div className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">Notifications</h3>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-gray-100 ${
                    !notification.read ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-2 h-2 mt-2 rounded-full ${
                      notification.type === 'success' ? 'bg-green-500' :
                      notification.type === 'warning' ? 'bg-yellow-500' :
                      notification.type === 'error' ? 'bg-red-500' :
                      'bg-blue-500'
                    }`} />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{notification.message}</p>
                      <p className="text-xs text-gray-500">{notification.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Grades; 