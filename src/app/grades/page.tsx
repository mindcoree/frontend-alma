'use client';

import { useState } from 'react';
import { AcademicCapIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const semesters = [
  { id: 'fall-2023', name: 'Fall 2023' },
  { id: 'spring-2023', name: 'Spring 2023' },
  { id: 'fall-2022', name: 'Fall 2022' },
];

const sampleGrades = {
  'fall-2023': [
    { subject: 'Mathematics', grade: 'A', credits: 3, gpa: 4.0 },
    { subject: 'Physics', grade: 'B+', credits: 4, gpa: 3.3 },
    { subject: 'Programming', grade: 'A-', credits: 3, gpa: 3.7 },
    { subject: 'English', grade: 'A', credits: 2, gpa: 4.0 },
    { subject: 'History', grade: 'B', credits: 3, gpa: 3.0 },
  ],
  'spring-2023': [
    { subject: 'Chemistry', grade: 'A-', credits: 4, gpa: 3.7 },
    { subject: 'Economics', grade: 'B+', credits: 3, gpa: 3.3 },
    { subject: 'Biology', grade: 'A', credits: 4, gpa: 4.0 },
    { subject: 'Literature', grade: 'B', credits: 2, gpa: 3.0 },
  ],
  'fall-2022': [
    { subject: 'Computer Science', grade: 'A', credits: 3, gpa: 4.0 },
    { subject: 'Statistics', grade: 'A-', credits: 3, gpa: 3.7 },
    { subject: 'Psychology', grade: 'B+', credits: 2, gpa: 3.3 },
  ],
};

export default function Grades() {
  const [selectedSemester, setSelectedSemester] = useState('fall-2023');

  const calculateGPA = (grades: typeof sampleGrades['fall-2023']) => {
    const totalCredits = grades.reduce((sum, course) => sum + course.credits, 0);
    const weightedGPA = grades.reduce((sum, course) => sum + course.gpa * course.credits, 0);
    return (weightedGPA / totalCredits).toFixed(2);
  };

  const currentGrades = sampleGrades[selectedSemester as keyof typeof sampleGrades];

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Academic Performance</h1>
          <div className="flex items-center space-x-2">
            <AcademicCapIcon className="h-6 w-6 text-blue-500" />
            <span className="text-lg font-medium text-gray-900">
              Overall GPA: 3.75
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-gray-900">Semester Grades</h2>
          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          >
            {semesters.map((semester) => (
              <option key={semester.id} value={semester.id}>
                {semester.name}
              </option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Grade
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Credits
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  GPA
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentGrades.map((course) => (
                <tr key={course.subject}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {course.subject}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {course.grade}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {course.credits}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {course.gpa}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Semester GPA
                </td>
                <td colSpan={3} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {calculateGPA(currentGrades)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <ChartBarIcon className="h-6 w-6 text-blue-500" />
            <h2 className="text-lg font-medium text-gray-900">GPA Trend</h2>
          </div>
          <div className="h-64 flex items-center justify-center text-gray-500">
            GPA Trend Chart (Placeholder)
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Academic Standing</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Status</span>
              <span className="text-sm font-medium text-green-600">Good Standing</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Credits Completed</span>
              <span className="text-sm font-medium text-gray-900">45</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Credits Required</span>
              <span className="text-sm font-medium text-gray-900">120</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 