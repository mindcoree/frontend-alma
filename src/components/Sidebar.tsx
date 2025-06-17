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
            className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive
                ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
            onClick={() => setIsMobileMenuOpen(false)}
              >
            <item.icon
              className={`mr-3 flex-shrink-0 h-6 w-6 ${
                isActive ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500'
              }`}
              aria-hidden="true"
            />
                {item.name}
              </Link>
            );
          })}
      {user && (
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-2 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md"
        >
          <XMarkIcon className="mr-3 h-6 w-6" aria-hidden="true" />
          Выйти
        </button>
      )}
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
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <span className="sr-only">Открыть меню</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Затемнение фона */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Боковая панель */}
        <div
          className={`fixed inset-y-0 left-0 flex flex-col w-64 bg-white transform transition-transform duration-300 ease-in-out z-50 ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
            <div className="flex items-center">
              <img
                className="h-8 w-auto"
                src="/logo.svg"
                alt="Alma University"
              />
            </div>
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="sr-only">Закрыть меню</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <nav className="px-2 py-4 space-y-1">
              <NavLinks />
        </nav>
      </div>
    </div>
      </div>

      {/* Десктопная версия */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:border-r lg:border-gray-200 lg:bg-white">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <img
              className="h-8 w-auto"
              src="/logo.svg"
              alt="Alma University"
            />
          </div>
          <nav className="mt-5 flex-1 px-2 space-y-1">
            <NavLinks />
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar; 