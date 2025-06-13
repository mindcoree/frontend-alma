'use client';

import { useState, useRef, useEffect } from 'react';
import {
  UserGroupIcon,
  UserIcon,
  MagnifyingGlassIcon,
  PaperAirplaneIcon,
  EllipsisHorizontalIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  PlusIcon,
  AcademicCapIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

interface Chat {
  id: string;
  name: string;
  type: 'group' | 'private';
  participants: string[];
  lastMessage?: Message;
  unreadCount: number;
  avatar?: string;
  isOnline?: boolean;
}

interface Participant {
  id: string;
  name: string;
  role: 'student' | 'teacher';
  avatar?: string;
  isOnline?: boolean;
}

const chats: Chat[] = [
  {
    id: 'group-1',
    name: 'Группа по программированию',
    type: 'group',
    participants: ['Ахметов А.', 'Смирнова Е.', 'Ким Д.', 'Иванов П.'],
    lastMessage: {
      id: '1',
      sender: 'Ахметов А.',
      content: 'Кто готов к завтрашней презентации?',
      timestamp: '14:30',
      isRead: true,
    },
    unreadCount: 3,
  },
  {
    id: 'group-2',
    name: 'Математический анализ',
    type: 'group',
    participants: ['Проф. Петров', 'Студент 1', 'Студент 2', 'Студент 3'],
    lastMessage: {
      id: '2',
      sender: 'Проф. Петров',
      content: 'Напоминаю о дедлайне домашнего задания',
      timestamp: '12:15',
      isRead: false,
    },
    unreadCount: 1,
  },
  {
    id: 'private-1',
    name: 'Проф. Петров',
    type: 'private',
    participants: ['Проф. Петров', 'Вы'],
    lastMessage: {
      id: '3',
      sender: 'Проф. Петров',
      content: 'Ваш проект был одобрен',
      timestamp: '10:45',
      isRead: true,
    },
    unreadCount: 0,
    isOnline: true,
  },
  {
    id: 'private-2',
    name: 'Ахметов А.',
    type: 'private',
    participants: ['Ахметов А.', 'Вы'],
    lastMessage: {
      id: '4',
      sender: 'Вы',
      content: 'Спасибо за помощь!',
      timestamp: 'Вчера',
      isRead: true,
    },
    unreadCount: 0,
    isOnline: false,
  },
];

const messages: { [key: string]: Message[] } = {
  'group-1': [
    {
      id: '1',
      sender: 'Ахметов А.',
      content: 'Кто готов к завтрашней презентации?',
      timestamp: '14:30',
      isRead: true,
    },
    {
      id: '2',
      sender: 'Смирнова Е.',
      content: 'Я готовлю слайды',
      timestamp: '14:32',
      isRead: true,
    },
    {
      id: '3',
      sender: 'Ким Д.',
      content: 'Я тоже готов',
      timestamp: '14:35',
      isRead: true,
    },
  ],
  'private-1': [
    {
      id: '1',
      sender: 'Проф. Петров',
      content: 'Здравствуйте! Как продвигается работа над проектом?',
      timestamp: '10:30',
      isRead: true,
    },
    {
      id: '2',
      sender: 'Вы',
      content: 'Здравствуйте! Я закончил первую часть',
      timestamp: '10:35',
      isRead: true,
    },
    {
      id: '3',
      sender: 'Проф. Петров',
      content: 'Ваш проект был одобрен',
      timestamp: '10:45',
      isRead: true,
    },
  ],
};

const participants: { [key: string]: Participant[] } = {
  'group-1': [
    { id: '1', name: 'Ахметов А.', role: 'student', isOnline: true },
    { id: '2', name: 'Смирнова Е.', role: 'student', isOnline: false },
    { id: '3', name: 'Ким Д.', role: 'student', isOnline: true },
    { id: '4', name: 'Иванов П.', role: 'teacher', isOnline: true },
  ],
  'group-2': [
    { id: '1', name: 'Проф. Петров', role: 'teacher', isOnline: true },
    { id: '2', name: 'Студент 1', role: 'student', isOnline: false },
    { id: '3', name: 'Студент 2', role: 'student', isOnline: true },
    { id: '4', name: 'Студент 3', role: 'student', isOnline: false },
  ],
};

export default function Messenger() {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showParticipants, setShowParticipants] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [expandedCategories, setExpandedCategories] = useState({
    groups: true,
    private: true,
  });

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.participants.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const groupChats = filteredChats.filter(chat => chat.type === 'group');
  const privateChats = filteredChats.filter(chat => chat.type === 'private');

  const toggleCategory = (category: 'groups' | 'private') => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: 'Вы',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: false,
    };

    if (messages[selectedChat.id]) {
      messages[selectedChat.id].push(message);
    } else {
      messages[selectedChat.id] = [message];
    }

    setNewMessage('');
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowParticipants(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const renderParticipantsDropdown = () => {
    if (!selectedChat || selectedChat.type !== 'group') return null;

    const chatParticipants = participants[selectedChat.id] || [];

    return (
      <div
        ref={dropdownRef}
        className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 z-10"
      >
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-sm font-medium text-gray-900">Участники группы</h3>
          <p className="text-xs text-gray-500 mt-1">
            Всего участников: {chatParticipants.length}
          </p>
        </div>
        <div className="max-h-60 overflow-y-auto">
          {chatParticipants.map((participant) => (
            <div
              key={participant.id}
              className="flex items-center px-4 py-3 hover:bg-gray-50"
            >
              <div className="relative">
                {participant.role === 'teacher' ? (
                  <AcademicCapIcon className="h-8 w-8 text-red-600" />
                ) : (
                  <UserCircleIcon className="h-8 w-8 text-gray-400" />
                )}
                {participant.isOnline && (
                  <div className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 rounded-full border-2 border-white" />
                )}
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">{participant.name}</p>
                <p className="text-xs text-gray-500">
                  {participant.role === 'teacher' ? 'Преподаватель' : 'Студент'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderChatList = (chats: Chat[], title: string, category: 'groups' | 'private') => (
    <div className="mb-4">
      <button
        onClick={() => toggleCategory(category)}
        className="w-full px-4 py-2 flex items-center justify-between text-sm font-semibold text-gray-500 bg-gray-50 hover:bg-gray-100"
      >
        <div className="flex items-center">
          {expandedCategories[category] ? (
            <ChevronDownIcon className="h-4 w-4 mr-2" />
          ) : (
            <ChevronRightIcon className="h-4 w-4 mr-2" />
          )}
          {title}
          <span className="ml-2 text-xs text-gray-400">({chats.length})</span>
        </div>
        <button
          className="p-1 rounded-full hover:bg-gray-200"
          onClick={(e) => {
            e.stopPropagation();
            // Здесь будет логика создания нового чата
          }}
        >
          <PlusIcon className="h-4 w-4 text-gray-500" />
        </button>
      </button>
      {expandedCategories[category] && (
        <div className="mt-1">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                selectedChat?.id === chat.id ? 'bg-red-50' : ''
              }`}
              onClick={() => setSelectedChat(chat)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="relative">
                    {chat.type === 'group' ? (
                      <UserGroupIcon className="h-10 w-10 text-red-600" />
                    ) : (
                      <UserIcon className="h-10 w-10 text-red-600" />
                    )}
                    {chat.isOnline && (
                      <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white" />
                    )}
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-900">{chat.name}</h3>
                    <p className="text-xs text-gray-500">
                      {chat.type === 'group' ? `${chat.participants.length} участников` : 'Личный чат'}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  {chat.lastMessage && (
                    <span className="text-xs text-gray-500">{chat.lastMessage.timestamp}</span>
                  )}
                  {chat.unreadCount > 0 && (
                    <span className="mt-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {chat.unreadCount}
                    </span>
                  )}
                </div>
              </div>
              {chat.lastMessage && (
                <p className="mt-1 text-sm text-gray-600 truncate">
                  {chat.lastMessage.sender}: {chat.lastMessage.content}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      {/* Боковая панель с чатами */}
      <div className="w-80 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <input
              type="text"
              placeholder="Поиск по чатам и участникам..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {groupChats.length > 0 && renderChatList(groupChats, 'Группы', 'groups')}
          {privateChats.length > 0 && renderChatList(privateChats, 'Личные беседы', 'private')}
          {filteredChats.length === 0 && (
            <div className="p-4 text-center text-gray-500">
              Ничего не найдено
            </div>
          )}
        </div>
      </div>

      {/* Основная область чата */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            {/* Заголовок чата */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between relative">
              <div className="flex items-center">
                {selectedChat.type === 'group' ? (
                  <UserGroupIcon className="h-10 w-10 text-red-600" />
                ) : (
                  <UserIcon className="h-10 w-10 text-red-600" />
                )}
                <div className="ml-3">
                  <h2 className="text-lg font-medium text-gray-900">{selectedChat.name}</h2>
                  <p className="text-sm text-gray-500">
                    {selectedChat.type === 'group'
                      ? `${selectedChat.participants.length} участников`
                      : selectedChat.isOnline
                      ? 'В сети'
                      : 'Не в сети'}
                  </p>
                </div>
              </div>
              {selectedChat.type === 'group' && (
                <div className="relative">
                  <button
                    className="text-gray-400 hover:text-gray-500 p-2 rounded-full hover:bg-gray-100"
                    onClick={() => setShowParticipants(!showParticipants)}
                  >
                    <EllipsisHorizontalIcon className="h-6 w-6" />
                  </button>
                  {showParticipants && renderParticipantsDropdown()}
                </div>
              )}
            </div>

            {/* Сообщения */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages[selectedChat.id]?.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'Вы' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg px-4 py-2 ${
                      message.sender === 'Вы'
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    {message.sender !== 'Вы' && (
                      <p className="text-xs font-medium mb-1">{message.sender}</p>
                    )}
                    <p>{message.content}</p>
                    <p className="text-xs mt-1 opacity-75">{message.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Поле ввода */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Введите сообщение..."
                  className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded-r-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  onClick={handleSendMessage}
                >
                  <PaperAirplaneIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Выберите чат для начала общения
          </div>
        )}
      </div>
    </div>
  );
} 