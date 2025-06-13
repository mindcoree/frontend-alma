'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  AcademicCapIcon,
  CalendarIcon,
  NewspaperIcon,
  ChatBubbleLeftRightIcon,
  MapIcon,
  BellIcon,
  ChartBarIcon,
  BookOpenIcon,
  QuestionMarkCircleIcon,
  BanknotesIcon,
  UserGroupIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Главная', href: '/', icon: HomeIcon },
  { name: 'Школы', href: '/schools', icon: AcademicCapIcon },
  { name: 'Расписание', href: '/schedule', icon: CalendarIcon },
  { name: 'Новости', href: '/news', icon: NewspaperIcon },
  { name: 'Мессенджер', href: '/messenger', icon: ChatBubbleLeftRightIcon },
  { name: 'Карта', href: '/map', icon: MapIcon },
  { name: 'Уведомления', href: '/notifications', icon: BellIcon },
  { name: 'Статистика', href: '/statistics', icon: ChartBarIcon },
  { name: 'Успеваемость', href: '/grades', icon: BookOpenIcon },
  { name: 'Помощь', href: '/help', icon: QuestionMarkCircleIcon },
  { name: 'Финансы', href: '/finance', icon: BanknotesIcon },
  { name: 'Клубы', href: '/clubs', icon: UserGroupIcon },
];

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-40 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white">
          <div className="flex h-16 items-center justify-between px-4">
            <img
              className="h-8 w-auto"
              src="/logo.png"
              alt="AlmaU"
            />
            <button
              type="button"
              className="text-gray-500 hover:text-gray-600"
              onClick={() => setSidebarOpen(false)}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-6 w-6 flex-shrink-0 ${
                      isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'
                    }`}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
          <div className="flex h-16 flex-shrink-0 items-center px-4">
            <img
              className="h-8 w-auto"
              src="/logo.png"
              alt="AlmaU"
            />
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-6 w-6 flex-shrink-0 ${
                      isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'
                    }`}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
          <button
            type="button"
            className="px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>

        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 