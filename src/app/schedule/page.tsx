'use client';

import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const timeSlots = [
  '9:00 - 10:30',
  '10:45 - 12:15',
  '13:00 - 14:30',
  '14:45 - 16:15',
  '16:30 - 18:00',
];

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const sampleSchedule = {
  'Monday': {
    '9:00 - 10:30': { subject: 'Mathematics', room: 'Room 101', teacher: 'Dr. Smith' },
    '10:45 - 12:15': { subject: 'Physics', room: 'Lab 203', teacher: 'Prof. Johnson' },
    '13:00 - 14:30': { subject: 'Programming', room: 'Room 305', teacher: 'Dr. Brown' },
  },
  'Tuesday': {
    '9:00 - 10:30': { subject: 'English', room: 'Room 102', teacher: 'Ms. Davis' },
    '14:45 - 16:15': { subject: 'History', room: 'Room 201', teacher: 'Dr. Wilson' },
  },
  'Wednesday': {
    '10:45 - 12:15': { subject: 'Chemistry', room: 'Lab 204', teacher: 'Prof. Taylor' },
    '13:00 - 14:30': { subject: 'Economics', room: 'Room 303', teacher: 'Dr. Anderson' },
  },
  'Thursday': {
    '9:00 - 10:30': { subject: 'Biology', room: 'Lab 205', teacher: 'Dr. Martinez' },
    '16:30 - 18:00': { subject: 'Literature', room: 'Room 304', teacher: 'Prof. Garcia' },
  },
  'Friday': {
    '13:00 - 14:30': { subject: 'Computer Science', room: 'Room 306', teacher: 'Dr. Lee' },
    '14:45 - 16:15': { subject: 'Statistics', room: 'Room 202', teacher: 'Prof. Kim' },
  },
};

export default function Schedule() {
  const [currentWeek, setCurrentWeek] = useState(new Date());

  const previousWeek = () => {
    const newDate = new Date(currentWeek);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentWeek(newDate);
  };

  const nextWeek = () => {
    const newDate = new Date(currentWeek);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentWeek(newDate);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Schedule</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={previousWeek}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <ChevronLeftIcon className="h-5 w-5 text-gray-500" />
            </button>
            <span className="text-sm font-medium text-gray-700">
              {currentWeek.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - 
              {new Date(currentWeek.getTime() + 6 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
            <button
              onClick={nextWeek}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <ChevronRightIcon className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="grid grid-cols-6 gap-px bg-gray-200">
          <div className="bg-gray-50 p-4"></div>
          {weekDays.map((day) => (
            <div key={day} className="bg-gray-50 p-4 text-center">
              <h3 className="text-sm font-medium text-gray-900">{day}</h3>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-6 gap-px bg-gray-200">
          {timeSlots.map((time) => (
            <>
              <div key={time} className="bg-white p-4">
                <p className="text-sm text-gray-500">{time}</p>
              </div>
              {weekDays.map((day) => {
                const schedule = sampleSchedule[day]?.[time];
                return (
                  <div key={`${day}-${time}`} className="bg-white p-4">
                    {schedule ? (
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-900">{schedule.subject}</p>
                        <p className="text-xs text-gray-500">{schedule.room}</p>
                        <p className="text-xs text-gray-500">{schedule.teacher}</p>
                      </div>
                    ) : (
                      <div className="h-full"></div>
                    )}
                  </div>
                );
              })}
            </>
          ))}
        </div>
      </div>
    </div>
  );
} 