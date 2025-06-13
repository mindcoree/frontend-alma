'use client';

import { useState } from 'react';
import { BellIcon, CalendarIcon, UserGroupIcon } from '@heroicons/react/24/outline';

const categories = [
  { id: 'all', name: 'All News' },
  { id: 'academic', name: 'Academic' },
  { id: 'events', name: 'Events' },
  { id: 'announcements', name: 'Announcements' },
];

const sampleNews = [
  {
    id: 1,
    title: 'New Research Center Opening',
    category: 'academic',
    date: '2024-03-15',
    author: 'Dr. Sarah Johnson',
    content: 'AlmaU is proud to announce the opening of our new state-of-the-art research center. The facility will provide students and faculty with cutting-edge equipment and collaborative spaces for innovative research projects.',
    image: '/images/research-center.jpg',
  },
  {
    id: 2,
    title: 'Spring Career Fair 2024',
    category: 'events',
    date: '2024-03-10',
    author: 'Career Services',
    content: 'Join us for the annual Spring Career Fair where you can meet with top employers and explore internship and job opportunities. The event will feature workshops, networking sessions, and one-on-one interviews.',
    image: '/images/career-fair.jpg',
  },
  {
    id: 3,
    title: 'Registration for Fall Semester',
    category: 'announcements',
    date: '2024-03-05',
    author: 'Registrar\'s Office',
    content: 'Registration for the Fall 2024 semester will begin on April 1st. Please ensure all your documents are up to date and meet with your academic advisor to plan your course schedule.',
    image: '/images/registration.jpg',
  },
  {
    id: 4,
    title: 'International Student Exchange Program',
    category: 'academic',
    date: '2024-03-01',
    author: 'International Office',
    content: 'Applications are now open for the spring semester exchange program. Students can choose from partner universities in Europe, Asia, and North America. Don\'t miss this opportunity to study abroad!',
    image: '/images/exchange.jpg',
  },
];

export default function News() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredNews = selectedCategory === 'all'
    ? sampleNews
    : sampleNews.filter(news => news.category === selectedCategory);

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">University News</h1>
          <div className="flex items-center space-x-2">
            <BellIcon className="h-6 w-6 text-blue-500" />
            <span className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      <div className="flex space-x-4 overflow-x-auto pb-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              selectedCategory === category.id
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredNews.map((news) => (
          <article key={news.id} className="bg-white shadow rounded-lg overflow-hidden">
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={news.image}
                alt={news.title}
                className="object-cover w-full h-48"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                <span className="flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  {new Date(news.date).toLocaleDateString()}
                </span>
                <span className="flex items-center">
                  <UserGroupIcon className="h-4 w-4 mr-1" />
                  {news.author}
                </span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {news.title}
              </h2>
              <p className="text-gray-600 mb-4">
                {news.content}
              </p>
              <button className="text-blue-600 hover:text-blue-700 font-medium">
                Read more →
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
} 