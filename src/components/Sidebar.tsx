'use client';

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  HomeIcon,
  CalendarIcon,
  AcademicCapIcon,
  BellIcon,
  MapIcon,
  BookOpenIcon,
  ChartBarIcon,
  NewspaperIcon,
  BuildingOfficeIcon,
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  BanknotesIcon,
  QuestionMarkCircleIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Главная', href: '/', icon: HomeIcon },
  { name: 'Расписание', href: '/schedule', icon: CalendarIcon },
  { name: 'Оценки', href: '/grades', icon: AcademicCapIcon },
  { name: 'Уведомления', href: '/notifications', icon: BellIcon },
  { name: 'Карта кампуса', href: '/map', icon: MapIcon },
  { name: 'Силлабус', href: '/syllabus', icon: BookOpenIcon },
  { name: 'Статистика предметов', href: '/statistics', icon: ChartBarIcon },
  { name: 'Новости', href: '/news', icon: NewspaperIcon },
  { name: 'Школы', href: '/schools', icon: BuildingOfficeIcon },
  { name: 'Мессенджер', href: '/messenger', icon: ChatBubbleLeftRightIcon },
  { name: 'Клубы', href: '/clubs', icon: UserGroupIcon },
  { name: 'Финансы', href: '/finance', icon: BanknotesIcon },
  { name: 'Помощь', href: '/help', icon: QuestionMarkCircleIcon },
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const NavLinks = () => (
    <>
      {navigation.map((item) => {
        const isActive = location.pathname === item.href;
        return (
          <Link
            key={item.name}
            to={item.href}
            className={`group flex items-center px-4 py-2 my-1 text-base rounded-xl transition-all duration-200 relative font-medium ${
              isActive
                ? 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 font-semibold shadow-sm'
                : 'text-gray-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-700'
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
            style={{ minHeight: 48 }}
          >
            {/* Индикатор слева */}
            <span
              className={`absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 rounded-r-full transition-all duration-200 ${
                isActive ? 'bg-gradient-to-b from-blue-500 to-indigo-500' : 'bg-transparent'
              }`}
            />
            <span className="relative z-10 flex items-center">
              <span
                className={`mr-3 flex-shrink-0 h-7 w-7 flex items-center justify-center transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-lg rounded-lg'
                    : 'text-gray-400 group-hover:text-blue-500'
                }`}
              >
                <item.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              {item.name}
            </span>
          </Link>
        );
      })}
    </>
  );

  return (
    <>
      {/* Мобильное меню */}
      <div className="lg:hidden">
        {/* Кнопка открытия мобильного меню */}
        <div className="fixed top-0 left-0 z-40 p-4">
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-xl text-gray-400 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 shadow"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <span className="sr-only">Открыть меню</span>
            <Bars3Icon className="h-7 w-7" aria-hidden="true" />
          </button>
        </div>

        {/* Затемнение фона */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Боковая панель */}
        <div
          className={`fixed inset-y-0 left-0 flex flex-col w-72 bg-white/80 backdrop-blur-xl shadow-2xl border border-white/30 rounded-r-3xl transform transition-transform duration-300 ease-in-out z-50 ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between h-20 px-6 border-b border-white/20">
            <div className="flex items-center space-x-3">
              <img
                className="h-9 w-9 rounded-xl shadow bg-white"
                src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
                alt="React Logo"
              />
              <span className="font-bold text-lg text-blue-700 tracking-tight ml-2">AlmaU</span>
            </div>
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-xl text-gray-400 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="sr-only">Закрыть меню</span>
              <XMarkIcon className="h-7 w-7" aria-hidden="true" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4">
            <nav className="px-2 space-y-1">
              <NavLinks />
            </nav>
          </div>
          {user && (
            <div className="p-4 border-t border-white/20">
              <button
                onClick={handleLogout}
                className="flex items-center justify-center mx-auto min-w-[180px] sm:min-w-[200px] px-5 py-3 text-base sm:text-lg font-semibold sm:px-6 sm:py-4 text-white bg-gradient-to-r from-red-500 to-pink-500 rounded-xl shadow hover:from-red-600 hover:to-pink-600 transition-all duration-200"
              >
                <XMarkIcon className="mr-2 h-6 w-6 sm:h-7 sm:w-7" aria-hidden="true" />
                Выйти
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Десктопная версия */}
      <div className="hidden lg:flex lg:flex-col lg:w-72 lg:fixed lg:inset-y-0 lg:pl-2 lg:pt-4">
        <div className="flex-1 flex flex-col bg-white/80 backdrop-blur-xl shadow-2xl border border-white/30 rounded-3xl pt-6 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-6 mb-6">
            <img
              className="h-9 w-9 rounded-xl shadow bg-white"
              src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
              alt="React Logo"
            />
            <span className="ml-2 font-bold text-xl text-blue-700 tracking-tight">AlmaU</span>
          </div>
          <nav className="flex-1 px-2 space-y-1">
            <NavLinks />
          </nav>
          {user && (
            <div className="mt-8 px-6">
              <button
                onClick={handleLogout}
                className="flex items-center justify-center mx-auto min-w-[180px] sm:min-w-[200px] px-5 py-3 text-base sm:text-lg font-semibold sm:px-6 sm:py-4 text-white bg-gradient-to-r from-red-500 to-pink-500 rounded-xl shadow hover:from-red-600 hover:to-pink-600 transition-all duration-200"
              >
                <XMarkIcon className="mr-2 h-6 w-6 sm:h-7 sm:w-7" aria-hidden="true" />
                Выйти
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar; 