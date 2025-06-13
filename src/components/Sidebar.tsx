'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  UserGroupIcon,
  CalendarIcon,
  MapPinIcon,
  BellIcon,
  ChatBubbleLeftRightIcon,
  BookOpenIcon,
  AcademicCapIcon,
  CurrencyDollarIcon,
  QuestionMarkCircleIcon,
  ChartBarIcon,
  NewspaperIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Главная', href: '/', icon: HomeIcon },
  { name: 'Клубы', href: '/clubs', icon: UserGroupIcon },
  { name: 'Расписание', href: '/schedule', icon: CalendarIcon },
  { name: 'Карта', href: '/map', icon: MapPinIcon },
  { name: 'Уведомления', href: '/notifications', icon: BellIcon },
  { name: 'Мессенджер', href: '/messenger', icon: ChatBubbleLeftRightIcon },
  { name: 'Учебный план', href: '/syllabus', icon: BookOpenIcon },
  { name: 'Школы', href: '/schools', icon: AcademicCapIcon },
  { name: 'Финансы', href: '/finance', icon: CurrencyDollarIcon },
  { name: 'Помощь', href: '/help', icon: QuestionMarkCircleIcon },
  { name: 'Статистика', href: '/statistics', icon: ChartBarIcon },
  { name: 'Новости', href: '/news', icon: NewspaperIcon },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-8">
          <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-blue-600 rounded-lg" />
          <span className="text-xl font-semibold text-gray-900">AlmaU</span>
        </div>
        <nav className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-red-50 to-blue-50 text-red-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon className={`h-5 w-5 mr-3 ${isActive ? 'text-red-600' : 'text-gray-400'}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
} 