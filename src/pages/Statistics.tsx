import React, { useState } from 'react';
import { 
  ChartBarIcon,
  AcademicCapIcon,
  UserGroupIcon,
  ExclamationTriangleIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FunnelIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

interface Subject {
  id: string;
  name: string;
  code: string;
  instructor: string;
  credits: number;
  performance: number;
  attendance: number;
  midterm1: number;
  midterm2: number;
  currentGrade: number;
}

const subjects: Subject[] = [
  {
    id: 'math',
    name: 'Математический анализ',
    code: 'MATH101',
    instructor: 'Проф. Иванов И.И.',
    credits: 6,
    performance: 85,
    attendance: 92,
    midterm1: 88,
    midterm2: 82,
    currentGrade: 85,
  },
  {
    id: 'physics',
    name: 'Физика',
    code: 'PHYS101',
    instructor: 'Доц. Петров П.П.',
    credits: 5,
    performance: 78,
    attendance: 95,
    midterm1: 75,
    midterm2: 80,
    currentGrade: 78,
  },
  {
    id: 'programming',
    name: 'Программирование',
    code: 'CS101',
    instructor: 'Ст. преп. Сидоров С.С.',
    credits: 4,
    performance: 92,
    attendance: 88,
    midterm1: 95,
    midterm2: 89,
    currentGrade: 92,
  },
  {
    id: 'english',
    name: 'Английский язык',
    code: 'ENG101',
    instructor: 'Преп. Смит Дж.',
    credits: 3,
    performance: 65,
    attendance: 75,
    midterm1: 60,
    midterm2: 70,
    currentGrade: 65,
  },
];

const Statistics: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'performance' | 'attendance'>('performance');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const getPerformanceColor = (performance: number) => {
    if (performance < 30) return 'text-red-600';
    if (performance < 50) return 'text-orange-600';
    if (performance < 70) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getProgressBarColor = (performance: number) => {
    if (performance < 30) return 'bg-red-600';
    if (performance < 50) return 'bg-orange-600';
    if (performance < 70) return 'bg-yellow-600';
    return 'bg-green-600';
  };

  const getPerformanceStatus = (performance: number) => {
    if (performance < 30) return 'Ретейк';
    if (performance < 50) return 'Риск ретейка';
    if (performance < 70) return 'Требует внимания';
    return 'Успешно';
  };

  // Calculate overall statistics
  const calculateOverallStats = () => {
    const totalSubjects = subjects.length;
    const avgPerformance = subjects.reduce((acc, curr) => acc + curr.performance, 0) / totalSubjects;
    const avgAttendance = subjects.reduce((acc, curr) => acc + curr.attendance, 0) / totalSubjects;
    const subjectsAtRisk = subjects.filter(s => s.performance < 50).length;
    const subjectsExcellent = subjects.filter(s => s.performance >= 90).length;
    const totalCredits = subjects.reduce((acc, curr) => acc + curr.credits, 0);

    return {
      avgPerformance,
      avgAttendance,
      subjectsAtRisk,
      subjectsExcellent,
      totalCredits,
      totalSubjects
    };
  };

  const stats = calculateOverallStats();

  const sortedSubjects = [...subjects].sort((a, b) => {
    const valueA = sortBy === 'performance' ? a.performance : a.attendance;
    const valueB = sortBy === 'performance' ? b.performance : b.attendance;
    return sortOrder === 'desc' ? valueB - valueA : valueA - valueB;
  });

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div className="flex items-center space-x-3">
            <ChartBarIcon className="h-8 w-8 text-blue-500" />
            <h1 className="text-2xl font-semibold text-gray-900">Статистика и рейтинг</h1>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <FunnelIcon className="h-5 w-5 mr-2" />
            Фильтры
          </button>
        </div>

        {/* Rating Cards */}
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Средняя успеваемость</p>
                <p className="mt-2 text-3xl font-semibold text-blue-900">{stats.avgPerformance.toFixed(1)}%</p>
              </div>
              <div className="rounded-full bg-blue-200 p-3">
                <ArrowTrendingUpIcon className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-blue-600">Прогресс</span>
                <span className="font-medium text-blue-900">{stats.avgPerformance.toFixed(1)}%</span>
              </div>
              <div className="mt-2 h-2 w-full rounded-full bg-blue-200">
                <div
                  className={`h-2 rounded-full ${getProgressBarColor(stats.avgPerformance)}`}
                  style={{ width: `${stats.avgPerformance}%` }}
                />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Средняя посещаемость</p>
                <p className="mt-2 text-3xl font-semibold text-green-900">{stats.avgAttendance.toFixed(1)}%</p>
              </div>
              <div className="rounded-full bg-green-200 p-3">
                <UserGroupIcon className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-green-600">Прогресс</span>
                <span className="font-medium text-green-900">{stats.avgAttendance.toFixed(1)}%</span>
              </div>
              <div className="mt-2 h-2 w-full rounded-full bg-green-200">
                <div
                  className="h-2 rounded-full bg-green-600"
                  style={{ width: `${stats.avgAttendance}%` }}
                />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Общая статистика</p>
                <div className="mt-2 space-y-1">
                  <p className="text-sm font-medium text-purple-900">
                    Предметов: <span className="font-semibold">{stats.totalSubjects}</span>
                  </p>
                  <p className="text-sm font-medium text-purple-900">
                    Кредитов: <span className="font-semibold">{stats.totalCredits}</span>
                  </p>
                  <p className="text-sm font-medium text-purple-900">
                    Отличных оценок: <span className="font-semibold">{stats.subjectsExcellent}</span>
                  </p>
                  <p className="text-sm font-medium text-purple-900">
                    Требуют внимания: <span className="font-semibold">{stats.subjectsAtRisk}</span>
                  </p>
                </div>
              </div>
              <div className="rounded-full bg-purple-200 p-3">
                <AcademicCapIcon className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {showFilters && (
          <div className="mt-6 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Фильтры и сортировка</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Сортировать по
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setSortBy('performance')}
                      className={`flex items-center justify-center px-4 py-2 rounded-lg border transition-all duration-200 ${
                        sortBy === 'performance'
                          ? 'bg-blue-50 border-blue-500 text-blue-700'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <ChartBarIcon className="h-5 w-5 mr-2" />
                      Успеваемости
                    </button>
                    <button
                      onClick={() => setSortBy('attendance')}
                      className={`flex items-center justify-center px-4 py-2 rounded-lg border transition-all duration-200 ${
                        sortBy === 'attendance'
                          ? 'bg-blue-50 border-blue-500 text-blue-700'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <UserGroupIcon className="h-5 w-5 mr-2" />
                      Посещаемости
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Порядок сортировки
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setSortOrder('desc')}
                      className={`flex items-center justify-center px-4 py-2 rounded-lg border transition-all duration-200 ${
                        sortOrder === 'desc'
                          ? 'bg-blue-50 border-blue-500 text-blue-700'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <ArrowTrendingDownIcon className="h-5 w-5 mr-2" />
                      По убыванию
                    </button>
                    <button
                      onClick={() => setSortOrder('asc')}
                      className={`flex items-center justify-center px-4 py-2 rounded-lg border transition-all duration-200 ${
                        sortOrder === 'asc'
                          ? 'bg-blue-50 border-blue-500 text-blue-700'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <ArrowTrendingUpIcon className="h-5 w-5 mr-2" />
                      По возрастанию
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Статистика фильтрации</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Всего предметов</span>
                    <span className="text-sm font-medium text-gray-900">{subjects.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Отсортировано по</span>
                    <span className="text-sm font-medium text-gray-900">
                      {sortBy === 'performance' ? 'Успеваемости' : 'Посещаемости'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Порядок</span>
                    <span className="text-sm font-medium text-gray-900">
                      {sortOrder === 'desc' ? 'По убыванию' : 'По возрастанию'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sortedSubjects.map((subject) => (
          <div
            key={subject.id}
            onClick={() => setSelectedSubject(subject.id)}
            className="bg-white shadow rounded-lg p-6 cursor-pointer hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="space-y-1">
                <h3 className="text-lg font-medium text-gray-900">{subject.name}</h3>
                <p className="text-sm text-gray-500">{subject.code}</p>
              </div>
              <div className={`text-2xl font-bold ${getPerformanceColor(subject.performance)}`}>
                {subject.performance}%
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="space-y-2">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 mb-1">Преподаватель</span>
                  <span className="text-sm font-medium text-gray-900 truncate">{subject.instructor}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 mb-1">Кредиты</span>
                  <span className="text-sm font-medium text-gray-900">{subject.credits}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 mb-1">Посещаемость</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900">{subject.attendance}%</span>
                    <div className="flex-1 h-1.5 bg-gray-200 rounded-full">
                      <div
                        className={`h-1.5 rounded-full ${
                          subject.attendance >= 70 ? 'bg-green-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${subject.attendance}%` }}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 mb-1">Текущая оценка</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900">{subject.currentGrade}%</span>
                    <div className="flex-1 h-1.5 bg-gray-200 rounded-full">
                      <div
                        className={`h-1.5 rounded-full ${getProgressBarColor(subject.currentGrade)}`}
                        style={{ width: `${subject.currentGrade}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">Статус:</span>
                <span className={`text-sm font-medium ${getPerformanceColor(subject.performance)}`}>
                  {getPerformanceStatus(subject.performance)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedSubject && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">
                  {subjects.find(s => s.id === selectedSubject)?.name}
                </h2>
                <button
                  onClick={() => setSelectedSubject(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Успеваемость</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">Первый мидтерм</span>
                          <span className="text-sm font-medium text-gray-900">
                            {subjects.find(s => s.id === selectedSubject)?.midterm1}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${subjects.find(s => s.id === selectedSubject)?.midterm1}%` }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">Второй мидтерм</span>
                          <span className="text-sm font-medium text-gray-900">
                            {subjects.find(s => s.id === selectedSubject)?.midterm2}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${subjects.find(s => s.id === selectedSubject)?.midterm2}%` }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">Текущая оценка</span>
                          <span className="text-sm font-medium text-gray-900">
                            {subjects.find(s => s.id === selectedSubject)?.currentGrade}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${getProgressBarColor(subjects.find(s => s.id === selectedSubject)?.currentGrade || 0)}`}
                            style={{ width: `${subjects.find(s => s.id === selectedSubject)?.currentGrade}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Посещаемость</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Общая посещаемость</span>
                      <span className="text-sm font-medium text-gray-900">
                        {subjects.find(s => s.id === selectedSubject)?.attendance}%
                      </span>
                    </div>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${subjects.find(s => s.id === selectedSubject)?.attendance}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Информация о курсе</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Код курса</span>
                        <span className="text-sm font-medium text-gray-900">
                          {subjects.find(s => s.id === selectedSubject)?.code}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Преподаватель</span>
                        <span className="text-sm font-medium text-gray-900">
                          {subjects.find(s => s.id === selectedSubject)?.instructor}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Кредиты</span>
                        <span className="text-sm font-medium text-gray-900">
                          {subjects.find(s => s.id === selectedSubject)?.credits}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Статус</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Общая успеваемость</span>
                        <span className={`text-sm font-medium ${getPerformanceColor(subjects.find(s => s.id === selectedSubject)?.performance || 0)}`}>
                          {subjects.find(s => s.id === selectedSubject)?.performance}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Статус</span>
                        <span className={`text-sm font-medium ${getPerformanceColor(subjects.find(s => s.id === selectedSubject)?.performance || 0)}`}>
                          {getPerformanceStatus(subjects.find(s => s.id === selectedSubject)?.performance || 0)}
                        </span>
                      </div>
                      {(() => {
                        const subject = subjects.find(s => s.id === selectedSubject);
                        return subject && subject.performance < 30 ? (
                          <div className="mt-4 p-3 bg-red-50 rounded-lg">
                            <div className="flex">
                              <ExclamationTriangleIcon className="h-5 w-5 text-red-400" />
                              <div className="ml-3">
                                <h3 className="text-sm font-medium text-red-800">Автоматический ретейк</h3>
                                <p className="text-sm text-red-700 mt-1">
                                  Ваша успеваемость ниже 30%. Требуется повторное прохождение курса.
                                </p>
                              </div>
                            </div>
                          </div>
                        ) : null;
                      })()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Statistics; 