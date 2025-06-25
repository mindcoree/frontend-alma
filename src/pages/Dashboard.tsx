import React from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarIcon,
  AcademicCapIcon,
  BellIcon,
  ChatBubbleLeftRightIcon,
  NewspaperIcon,
  MapIcon,
  BuildingOfficeIcon,
  ChartBarIcon,
  BookOpenIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const features = [
  {
    name: 'Расписание',
    description: 'Просмотр расписания занятий, экзаменов и важных событий',
    icon: CalendarIcon,
    href: '/schedule',
    color: 'from-blue-500 to-blue-600',
  },
  {
    name: 'Оценки',
    description: 'Просмотр текущих оценок и академической успеваемости',
    icon: AcademicCapIcon,
    href: '/grades',
    color: 'from-green-500 to-green-600',
  },
  {
    name: 'Уведомления',
    description: 'Получение важных уведомлений и обновлений',
    icon: BellIcon,
    href: '/notifications',
    color: 'from-yellow-500 to-yellow-600',
  },
  {
    name: 'Мессенджер',
    description: 'Общение с преподавателями и одногруппниками',
    icon: ChatBubbleLeftRightIcon,
    href: '/messenger',
    color: 'from-purple-500 to-purple-600',
  },
  {
    name: 'Новости',
    description: 'Актуальные новости и события университета',
    icon: NewspaperIcon,
    href: '/news',
    color: 'from-red-500 to-red-600',
  },
  {
    name: 'Карта кампуса',
    description: 'Интерактивная карта кампуса и аудиторий',
    icon: MapIcon,
    href: '/map',
    color: 'from-indigo-500 to-indigo-600',
  },
  {
    name: 'Школы',
    description: 'Информация о школах и факультетах AlmaU',
    icon: BuildingOfficeIcon,
    href: '/schools',
    color: 'from-pink-500 to-pink-600',
  },
  {
    name: 'Статистика предметов',
    description: 'Аналитика и статистика успеваемости',
    icon: ChartBarIcon,
    href: '/statistics',
    color: 'from-orange-500 to-orange-600',
  },
  {
    name: 'Силлабус',
    description: 'Электронный силлабус с информацией о курсах',
    icon: BookOpenIcon,
    href: '/syllabus',
    color: 'from-teal-500 to-teal-600',
  },
  {
    name: 'Клубы',
    description: 'Студенческие клубы и сообщества по интересам',
    icon: UserGroupIcon,
    href: '/clubs',
    color: 'from-red-600 to-blue-600',
  },
  {
    name: 'Финансы',
    description: 'Управление финансами и оплата обучения',
    icon: CurrencyDollarIcon,
    href: '/finance',
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    name: 'Помощь',
    description: 'Поддержка и помощь по работе с порталом',
    icon: QuestionMarkCircleIcon,
    href: '/help',
    color: 'from-violet-500 to-violet-600',
  },
];

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden border"
      >
        {/* Header в стиле Syllabus/Grades */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-10"></div>
          <div className="relative p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
                  <AcademicCapIcon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Добро пожаловать в AlmaU</h1>
                  <p className="text-sm text-gray-600 mt-1">Ваш персональный портал для обучения и развития</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-blue-50 rounded-xl p-3">
                  <div className="text-sm text-blue-600 font-medium">Разделов</div>
                  <div className="text-2xl font-bold text-blue-700">{features.length}</div>
                </div>
                <div className="bg-indigo-50 rounded-xl p-3">
                  <div className="text-sm text-indigo-600 font-medium">Быстрый доступ</div>
                  <div className="text-xs text-indigo-700 font-semibold">Кликните по карточке</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Карточки разделов */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {features.map((feature) => (
              <Link
                key={feature.name}
                to={feature.href}
                className="group relative bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 w-full max-w-2xl md:max-w-xl lg:max-w-2xl mx-auto"
              >
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${feature.color} text-white`}>
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                      {feature.name}
                    </h3>
                  </div>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />
              </Link>
            ))}
          </div>
        </div>

        {/* О портале */}
        <div className="mt-12 bg-gradient-to-r from-blue-500 to-red-500 rounded-lg shadow-lg p-6 text-white">
          <h2 className="text-2xl font-semibold mb-4">О портале</h2>
          <p className="mb-4">
            AlmaU Student Portal - это единая платформа для студентов, объединяющая все необходимые инструменты для успешной учебы.
            Здесь вы можете следить за своим расписанием, успеваемостью, общаться с преподавателями и быть в курсе всех событий университета.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Удобный доступ</h3>
              <p className="text-white/90">Все необходимые инструменты в одном месте</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Актуальная информация</h3>
              <p className="text-white/90">Мгновенные уведомления о важных событиях</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Интерактивность</h3>
              <p className="text-white/90">Удобное взаимодействие с преподавателями</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard; 