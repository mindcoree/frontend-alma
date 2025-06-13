'use client';

import { useState } from 'react';
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
} from '@heroicons/react/24/outline';

const subjects = [
  { id: 'math', name: 'Математический анализ' },
  { id: 'physics', name: 'Физика' },
  { id: 'programming', name: 'Программирование' },
  { id: 'english', name: 'Английский язык' },
];

const sampleAttendance = {
  'math': { total: 45, attended: 38, missed: 7 },
  'physics': { total: 45, attended: 42, missed: 3 },
  'programming': { total: 45, attended: 40, missed: 5 },
  'english': { total: 45, attended: 44, missed: 1 },
};

const sampleRankings = {
  'math': [
    { rank: 1, name: 'Алиев А.', grade: 95, attendance: '98%' },
    { rank: 2, name: 'Беков Б.', grade: 92, attendance: '95%' },
    { rank: 3, name: 'Вы', grade: 88, attendance: '84%' },
    { rank: 4, name: 'Газиев Г.', grade: 85, attendance: '90%' },
    { rank: 5, name: 'Давлетов Д.', grade: 82, attendance: '88%' },
  ],
  'physics': [
    { rank: 1, name: 'Вы', grade: 97, attendance: '93%' },
    { rank: 2, name: 'Алиев А.', grade: 94, attendance: '95%' },
    { rank: 3, name: 'Беков Б.', grade: 91, attendance: '92%' },
    { rank: 4, name: 'Газиев Г.', grade: 89, attendance: '90%' },
    { rank: 5, name: 'Давлетов Д.', grade: 87, attendance: '88%' },
  ],
};

const sampleGrades = {
  'math': [
    { date: '2024-02-15', type: 'Контрольная работа', grade: 85 },
    { date: '2024-02-01', type: 'Домашнее задание', grade: 90 },
    { date: '2024-01-15', type: 'Тест', grade: 88 },
  ],
  'physics': [
    { date: '2024-02-10', type: 'Лабораторная работа', grade: 95 },
    { date: '2024-01-25', type: 'Контрольная работа', grade: 92 },
    { date: '2024-01-10', type: 'Тест', grade: 98 },
  ],
};

export default function Statistics() {
  const [selectedSubject, setSelectedSubject] = useState('math');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'grade' | 'attendance'>('grade');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const itemsPerPage = 5;

  const calculateAttendancePercentage = (subject: string) => {
    const data = sampleAttendance[subject as keyof typeof sampleAttendance];
    return ((data.attended / data.total) * 100).toFixed(1);
  };

  const isAttendanceWarning = (subject: string) => {
    const percentage = Number(calculateAttendancePercentage(subject));
    return percentage < 70; // 30% пропусков = 70% посещаемости
  };

  const sortedRankings = [...sampleRankings[selectedSubject as keyof typeof sampleRankings]].sort((a, b) => {
    if (sortBy === 'grade') {
      return sortOrder === 'desc' ? b.grade - a.grade : a.grade - b.grade;
    } else {
      const aAttendance = parseInt(a.attendance);
      const bAttendance = parseInt(b.attendance);
      return sortOrder === 'desc' ? bAttendance - aAttendance : aAttendance - bAttendance;
    }
  });

  const totalPages = Math.ceil(sortedRankings.length / itemsPerPage);
  const paginatedRankings = sortedRankings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div className="flex items-center space-x-3">
            <ChartBarIcon className="h-8 w-8 text-blue-500" />
            <h1 className="text-2xl font-semibold text-gray-900">Статистика и рейтинг</h1>
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="appearance-none rounded-lg border border-gray-300 bg-white py-2 pl-4 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <FunnelIcon className="h-5 w-5 mr-2" />
              Фильтры
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Сортировать по
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'grade' | 'attendance')}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="grade">Оценке</option>
                  <option value="attendance">Посещаемости</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Порядок сортировки
                </label>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="desc">По убыванию</option>
                  <option value="asc">По возрастанию</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Посещаемость */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Посещаемость</h2>
            {isAttendanceWarning(selectedSubject) && (
              <div className="flex items-center text-red-600">
                <ExclamationTriangleIcon className="h-5 w-5 mr-1" />
                <span className="text-sm font-medium">Внимание: риск ретейка</span>
              </div>
            )}
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Общее количество занятий</span>
              <span className="text-sm font-medium text-gray-900">
                {sampleAttendance[selectedSubject as keyof typeof sampleAttendance].total}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Посещено</span>
              <span className="text-sm font-medium text-gray-900">
                {sampleAttendance[selectedSubject as keyof typeof sampleAttendance].attended}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Пропущено</span>
              <span className="text-sm font-medium text-gray-900">
                {sampleAttendance[selectedSubject as keyof typeof sampleAttendance].missed}
              </span>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">Процент посещаемости</span>
                <span className={`text-sm font-medium ${
                  isAttendanceWarning(selectedSubject) ? 'text-red-600' : 'text-green-600'
                }`}>
                  {calculateAttendancePercentage(selectedSubject)}%
                </span>
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    isAttendanceWarning(selectedSubject) ? 'bg-red-600' : 'bg-green-600'
                  }`}
                  style={{ width: `${calculateAttendancePercentage(selectedSubject)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Оценки */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Оценки</h2>
          <div className="space-y-4">
            {sampleGrades[selectedSubject as keyof typeof sampleGrades].map((grade, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{grade.type}</p>
                  <p className="text-xs text-gray-500">{new Date(grade.date).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-900 mr-2">{grade.grade}</span>
                  {index > 0 && (
                    <span className={`text-xs ${
                      grade.grade > sampleGrades[selectedSubject as keyof typeof sampleGrades][index - 1].grade
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}>
                      {grade.grade > sampleGrades[selectedSubject as keyof typeof sampleGrades][index - 1].grade ? (
                        <ArrowTrendingUpIcon className="h-4 w-4" />
                      ) : (
                        <ArrowTrendingDownIcon className="h-4 w-4" />
                      )}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Рейтинг студентов */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Рейтинг студентов</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Место
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Студент
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Оценка
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Посещаемость
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedRankings.map((student) => (
                <tr key={student.rank} className={student.name === 'Вы' ? 'bg-blue-50' : ''}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {student.rank}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {student.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.grade}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.attendance}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Назад
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Вперед
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Показано <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> -{' '}
                <span className="font-medium">
                  {Math.min(currentPage * itemsPerPage, sortedRankings.length)}
                </span>{' '}
                из <span className="font-medium">{sortedRankings.length}</span> результатов
              </p>
            </div>
            <div>
              <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Предыдущая</span>
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                      currentPage === page
                        ? 'z-10 bg-blue-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                        : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Следующая</span>
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 