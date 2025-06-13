'use client';

import { useState } from 'react';
import { 
  BellIcon, 
  AcademicCapIcon, 
  CalendarIcon, 
  DocumentTextIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const notificationTypes = [
  { id: 'all', name: 'Все' },
  { id: 'academic', name: 'Учеба' },
  { id: 'events', name: 'События' },
  { id: 'deadlines', name: 'Дедлайны' },
];

const sampleNotifications = [
  {
    id: 1,
    type: 'academic',
    title: 'Новая оценка',
    message: 'Вы получили оценку A по предмету "Математический анализ"',
    time: '10 минут назад',
    icon: AcademicCapIcon,
    isRead: false,
  },
  {
    id: 2,
    type: 'events',
    title: 'Студенческая конференция',
    message: 'Завтра в 14:00 в главном зале состоится ежегодная студенческая конференция',
    time: '1 час назад',
    icon: CalendarIcon,
    isRead: false,
  },
  {
    id: 3,
    type: 'deadlines',
    title: 'Дедлайн проекта',
    message: 'До сдачи курсового проекта по "Программированию" осталось 3 дня',
    time: '2 часа назад',
    icon: DocumentTextIcon,
    isRead: true,
  },
  {
    id: 4,
    type: 'academic',
    title: 'Изменение расписания',
    message: 'Занятие по "Физике" перенесено на 15:00',
    time: '3 часа назад',
    icon: CalendarIcon,
    isRead: true,
  },
  {
    id: 5,
    type: 'events',
    title: 'Спортивное мероприятие',
    message: 'В эту субботу состоится турнир по баскетболу между факультетами',
    time: '1 день назад',
    icon: CalendarIcon,
    isRead: true,
  },
];

export default function Notifications() {
  const [selectedType, setSelectedType] = useState('all');
  const [notifications, setNotifications] = useState(sampleNotifications);

  const filteredNotifications = selectedType === 'all'
    ? notifications
    : notifications.filter(notification => notification.type === selectedType);

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, isRead: true } : notification
    ));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <BellIcon className="h-8 w-8 text-blue-500" />
            <h1 className="text-2xl font-semibold text-gray-900">Уведомления</h1>
            {unreadCount > 0 && (
              <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {unreadCount} новых
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex space-x-4 overflow-x-auto pb-4">
        {notificationTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setSelectedType(type.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              selectedType === type.id
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {type.name}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`bg-white shadow rounded-lg p-4 ${
              !notification.isRead ? 'border-l-4 border-blue-500' : ''
            }`}
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <notification.icon className={`h-6 w-6 ${
                  notification.isRead ? 'text-gray-400' : 'text-blue-500'
                }`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className={`text-sm font-medium ${
                    notification.isRead ? 'text-gray-900' : 'text-blue-900'
                  }`}>
                    {notification.title}
                  </p>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">{notification.time}</span>
                    {!notification.isRead && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <CheckCircleIcon className="h-5 w-5" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  {notification.message}
                </p>
              </div>
            </div>
          </div>
        ))}

        {filteredNotifications.length === 0 && (
          <div className="text-center py-12">
            <BellIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Нет уведомлений</h3>
            <p className="mt-1 text-sm text-gray-500">
              Здесь будут появляться новые уведомления
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 