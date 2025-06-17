import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BellIcon,
  XMarkIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  AcademicCapIcon,
  ClockIcon,
  CalendarIcon,
  BookOpenIcon,
  UserGroupIcon,
  FunnelIcon,
  CheckIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

interface Notification {
  id: number;
  type: 'success' | 'warning' | 'error' | 'info';
  category: 'academic' | 'schedule' | 'course' | 'system';
  title: string;
  message: string;
  time: string;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
  action?: {
    label: string;
    onClick: () => void;
  };
}

const notifications: Notification[] = [
  {
    id: 1,
    type: 'success',
    category: 'academic',
    title: 'New Grade Posted',
    message: 'Your grade for Mathematics has been updated to A',
    time: '2 minutes ago',
    read: false,
    priority: 'high',
    action: {
      label: 'View Grade',
      onClick: () => console.log('View grade')
    }
  },
  {
    id: 2,
    type: 'warning',
    category: 'schedule',
    title: 'Upcoming Deadline',
    message: 'Final project submission deadline is approaching',
    time: '1 hour ago',
    read: false,
    priority: 'high'
  },
  {
    id: 3,
    type: 'info',
    category: 'course',
    title: 'Course Update',
    message: 'New materials have been added to Programming 101',
    time: '3 hours ago',
    read: true,
    priority: 'medium'
  },
  {
    id: 4,
    type: 'error',
    category: 'system',
    title: 'System Maintenance',
    message: 'Scheduled maintenance this weekend',
    time: '1 day ago',
    read: true,
    priority: 'low'
  }
];

const categoryIcons = {
  academic: AcademicCapIcon,
  schedule: CalendarIcon,
  course: BookOpenIcon,
  system: UserGroupIcon
};

const priorityColors = {
  high: 'text-red-600',
  medium: 'text-yellow-600',
  low: 'text-blue-600'
};

const Notifications: React.FC = () => {
  const [allNotifications, setAllNotifications] = useState<Notification[]>(notifications);
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredNotifications = allNotifications.filter(notification => {
    const matchesFilter = filter === 'all' || notification.category === filter;
    const matchesSearch = notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const markAsRead = (id: number) => {
    setAllNotifications(notifications =>
      notifications.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const deleteNotification = (id: number) => {
    setAllNotifications(notifications =>
      notifications.filter(notification => notification.id !== id)
    );
  };

  const markAllAsRead = () => {
    setAllNotifications(notifications =>
      notifications.map(notification => ({ ...notification, read: true }))
    );
  };

  const clearAll = () => {
    setAllNotifications([]);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <ExclamationCircleIcon className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <ExclamationCircleIcon className="h-5 w-5 text-red-500" />;
      default:
        return <InformationCircleIcon className="h-5 w-5 text-blue-500" />;
    }
  };

  const notificationVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    exit: { 
      opacity: 0, 
      x: 100,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow-lg rounded-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <BellIcon className="h-8 w-8 text-blue-600" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
                  <p className="text-sm text-gray-500">
                    {allNotifications.filter(n => !n.read).length} unread notifications
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={markAllAsRead}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <CheckIcon className="h-4 w-4 mr-2" />
                  Mark all as read
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={clearAll}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <TrashIcon className="h-4 w-4 mr-2" />
                  Clear all
                </motion.button>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search notifications..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <FunnelIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
              <div className="flex space-x-2">
                {['all', 'academic', 'schedule', 'course', 'system'].map((category) => (
                  <motion.button
                    key={category}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFilter(category)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium ${
                      filter === category
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Notifications List */}
          <div className="divide-y divide-gray-200">
            <AnimatePresence>
              {filteredNotifications.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-8 text-center"
                >
                  <BellIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No notifications</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {searchQuery ? 'No notifications match your search.' : "You're all caught up!"}
                  </p>
                </motion.div>
              ) : (
                filteredNotifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    variants={notificationVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className={`p-4 hover:bg-gray-50 transition-colors duration-150 ${
                      !notification.read ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">
                            {notification.title}
                          </p>
                          <div className="flex items-center space-x-2">
                            <span className={`text-xs font-medium ${priorityColors[notification.priority]}`}>
                              {notification.priority}
                            </span>
                            <span className="text-xs text-gray-500">
                              {notification.time}
                            </span>
                          </div>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {notification.message}
                        </p>
                        {notification.action && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={notification.action.onClick}
                            className="mt-2 text-sm text-blue-600 hover:text-blue-700"
                          >
                            {notification.action.label}
                          </motion.button>
                        )}
                      </div>
                      <div className="flex-shrink-0 flex items-center space-x-2">
                        {!notification.read && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => markAsRead(notification.id)}
                            className="text-gray-400 hover:text-gray-500"
                          >
                            <CheckIcon className="h-5 w-5" />
                          </motion.button>
                        )}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => deleteNotification(notification.id)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Notifications; 