import React, { useState, useRef, useEffect } from 'react';
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
  PhoneIcon,
  VideoCameraIcon,
  PaperClipIcon,
  FaceSmileIcon,
  MicrophoneIcon,
  XMarkIcon,
  CheckCircleIcon,
  ClockIcon,
  StarIcon,
  ArchiveBoxIcon,
  BellIcon,
  ShieldCheckIcon,
  EnvelopeIcon,
  BuildingOfficeIcon,
  BookOpenIcon,
  Bars3Icon,
  ArrowLeftIcon,
  ChatBubbleLeftRightIcon,
  UserCircleIcon as UserCircleSolidIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  type: 'text' | 'image' | 'file';
  attachments?: {
    type: 'image' | 'file';
    url: string;
    name: string;
    size?: string;
  }[];
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

interface Teacher {
  id: string;
  name: string;
  role: 'teacher';
  avatar: string;
  isOnline: boolean;
  school: string;
  subjects: string[];
  email: string;
  phone: string;
  bio: string;
  education: string;
  experience: string;
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
      type: 'text',
    },
    unreadCount: 3,
    avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
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
      type: 'text',
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
      type: 'text',
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
      type: 'text',
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
      type: 'text',
    },
    {
      id: '2',
      sender: 'Смирнова Е.',
      content: 'Я готовлю слайды',
      timestamp: '14:32',
      isRead: true,
      type: 'text',
    },
    {
      id: '3',
      sender: 'Ким Д.',
      content: '',
      timestamp: '14:35',
      isRead: true,
      type: 'image',
      attachments: [
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          name: 'presentation.png',
        },
      ],
    },
  ],
  'private-1': [
    {
      id: '1',
      sender: 'Проф. Петров',
      content: 'Здравствуйте! Как продвигается работа над проектом?',
      timestamp: '10:30',
      isRead: true,
      type: 'text',
    },
    {
      id: '2',
      sender: 'Вы',
      content: 'Здравствуйте! Я закончил первую часть',
      timestamp: '10:35',
      isRead: true,
      type: 'text',
    },
    {
      id: '3',
      sender: 'Проф. Петров',
      content: 'Ваш проект был одобрен',
      timestamp: '10:45',
      isRead: true,
      type: 'text',
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

const teachers: { [key: string]: Teacher } = {
  'Проф. Петров': {
    id: '1',
    name: 'Проф. Петров',
    role: 'teacher',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    isOnline: true,
    school: 'Школа Цифровых Технологий',
    subjects: ['Программирование', 'Базы данных', 'Искусственный интеллект'],
    email: 'petrov@alma.edu.kz',
    phone: '+7 (777) 123-45-67',
    bio: 'Профессор с 15-летним опытом преподавания. Специалист в области искусственного интеллекта и машинного обучения.',
    education: 'PhD в области Computer Science, MIT',
    experience: '15 лет преподавания, 10 лет в индустрии',
  },
  'Доц. Иванова': {
    id: '2',
    name: 'Доц. Иванова',
    role: 'teacher',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    isOnline: false,
    school: 'Школа Менеджмента',
    subjects: ['Маркетинг', 'Управление проектами'],
    email: 'ivanova@alma.edu.kz',
    phone: '+7 (777) 234-56-78',
    bio: 'Доцент с опытом работы в международных компаниях. Эксперт в области цифрового маркетинга.',
    education: 'MBA, Harvard Business School',
    experience: '8 лет преподавания, 12 лет в бизнесе',
  },
};

const Messenger: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showParticipants, setShowParticipants] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileProfileOpen, setIsMobileProfileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chats' | 'contacts' | 'profile'>('chats');

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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat, messages]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setAttachments(prev => [...prev, ...files]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleSendMessage = () => {
    if ((!newMessage.trim() && attachments.length === 0) || !selectedChat) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: 'Вы',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: false,
      type: attachments.length > 0 ? 'image' : 'text',
      attachments: attachments.map(file => ({
        type: file.type.startsWith('image/') ? 'image' : 'file',
        url: URL.createObjectURL(file),
        name: file.name,
        size: `${(file.size / 1024).toFixed(1)} KB`,
      })),
    };

    if (messages[selectedChat.id]) {
      messages[selectedChat.id].push(message);
    } else {
      messages[selectedChat.id] = [message];
    }

    setNewMessage('');
    setAttachments([]);
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

  const renderTeacherProfile = (teacher: Teacher) => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl max-w-xl w-full mx-4 overflow-hidden max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="relative">
          <div className="h-40 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500" />
          <button
            onClick={() => {
              setSelectedTeacher(null);
              setIsMobileProfileOpen(false);
            }}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
          <div className="absolute -bottom-14 left-6">
            <div className="relative">
              <img
                src={teacher.avatar}
                alt={teacher.name}
                className="h-28 w-28 rounded-2xl border-4 border-white shadow-lg"
              />
              <div className={`absolute -bottom-1 -right-1 h-6 w-6 rounded-full border-2 border-white ${
                teacher.isOnline ? 'bg-green-500' : 'bg-gray-400'
              }`} />
            </div>
          </div>
        </div>
        
        <div className="pt-16 px-4 sm:px-6 pb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{teacher.name}</h2>
              <p className="text-sm text-gray-500 mt-0.5">{teacher.school}</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                teacher.isOnline 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {teacher.isOnline ? 'В сети' : 'Не в сети'}
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-2xl p-4">
              <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center">
                <EnvelopeIcon className="h-5 w-5 text-blue-500 mr-2" />
                Контактная информация
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-600">{teacher.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <PhoneIcon className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-600">{teacher.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <BuildingOfficeIcon className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-600">{teacher.school}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-4">
              <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center">
                <BookOpenIcon className="h-5 w-5 text-blue-500 mr-2" />
                Предметы
              </h3>
              <div className="flex flex-wrap gap-2">
                {teacher.subjects.map((subject, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 bg-gray-50 rounded-2xl p-4">
            <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center">
              <UserCircleIcon className="h-5 w-5 text-blue-500 mr-2" />
              О преподавателе
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">{teacher.bio}</p>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-2xl p-4">
              <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center">
                <AcademicCapIcon className="h-5 w-5 text-blue-500 mr-2" />
                Образование
              </h3>
              <p className="text-sm text-gray-600">{teacher.education}</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-4">
              <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center">
                <StarIcon className="h-5 w-5 text-blue-500 mr-2" />
                Опыт работы
              </h3>
              <p className="text-sm text-gray-600">{teacher.experience}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

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
          {chatParticipants.map((participant) => {
            const teacher = teachers[participant.name];
            return (
              <button
                key={participant.id}
                onClick={() => teacher && setSelectedTeacher(teacher)}
                className="w-full flex items-center px-4 py-3 hover:bg-gray-50"
              >
                <div className="relative">
                  {teacher?.avatar ? (
                    <img
                      src={teacher.avatar}
                      alt={teacher.name}
                      className="h-8 w-8 rounded-full"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <UserCircleIcon className="h-6 w-6 text-gray-500" />
                    </div>
                  )}
                  {participant.isOnline && (
                    <span className="absolute bottom-0 right-0 h-2 w-2 bg-green-500 rounded-full border-2 border-white" />
                  )}
                </div>
                <div className="ml-3 text-left">
                  <p className="text-sm font-medium text-gray-900">{participant.name}</p>
                  <p className="text-xs text-gray-500">
                    {participant.role === 'teacher' ? 'Преподаватель' : 'Студент'}
                    {teacher && ` • ${teacher.school}`}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderBottomNavigation = () => (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="flex justify-around items-center h-16">
        <button
          onClick={() => {
            setActiveTab('chats');
            setIsMobileMenuOpen(true);
          }}
          className={`flex flex-col items-center justify-center w-1/3 h-full ${
            activeTab === 'chats' ? 'text-blue-500' : 'text-gray-500'
          }`}
        >
          <ChatBubbleLeftRightIcon className="h-6 w-6" />
          <span className="text-xs mt-1">Чаты</span>
        </button>
        <button
          onClick={() => {
            setActiveTab('contacts');
            setIsMobileMenuOpen(true);
          }}
          className={`flex flex-col items-center justify-center w-1/3 h-full ${
            activeTab === 'contacts' ? 'text-blue-500' : 'text-gray-500'
          }`}
        >
          <UserGroupIcon className="h-6 w-6" />
          <span className="text-xs mt-1">Контакты</span>
        </button>
        <button
          onClick={() => {
            setActiveTab('profile');
            setIsMobileMenuOpen(true);
          }}
          className={`flex flex-col items-center justify-center w-1/3 h-full ${
            activeTab === 'profile' ? 'text-blue-500' : 'text-gray-500'
          }`}
        >
          <UserCircleSolidIcon className="h-6 w-6" />
          <span className="text-xs mt-1">Профиль</span>
        </button>
      </div>
    </div>
  );

  const handleChatSelect = (chat: Chat) => {
    setSelectedChat(chat);
    setIsMobileMenuOpen(false);
  };

  const renderChatList = (chats: Chat[], title: string, category: 'groups' | 'private') => (
    <div className="mb-4">
      <button
        onClick={() => toggleCategory(category)}
        className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        <span>{title}</span>
        {expandedCategories[category] ? (
          <ChevronDownIcon className="h-5 w-5" />
        ) : (
          <ChevronRightIcon className="h-5 w-5" />
        )}
      </button>
      {expandedCategories[category] && (
        <div className="mt-1">
          {chats.map((chat) => {
            const teacher = teachers[chat.name];
            return (
              <div
                key={chat.id}
                className="flex items-center justify-between px-4 py-3 hover:bg-gray-50"
              >
                <button
                  onClick={() => handleChatSelect(chat)}
                  className="flex-1 flex items-center"
                >
                  <div className="relative">
                    {teacher?.avatar ? (
                      <img
                        src={teacher.avatar}
                        alt={teacher.name}
                        className="h-10 w-10 rounded-full"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        {chat.type === 'group' ? (
                          <UserGroupIcon className="h-6 w-6 text-gray-500" />
                        ) : (
                          <UserIcon className="h-6 w-6 text-gray-500" />
                        )}
                      </div>
                    )}
                    {chat.isOnline && (
                      <span className="absolute bottom-0 right-0 h-2 w-2 bg-green-500 rounded-full border-2 border-white" />
                    )}
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">{chat.name}</p>
                      {chat.lastMessage && (
                        <span className="text-xs text-gray-500">{chat.lastMessage.timestamp}</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500 truncate max-w-[200px]">
                        {chat.lastMessage?.content}
                      </p>
                      {chat.unreadCount > 0 && (
                        <span className="ml-2 inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-500 text-xs font-medium text-white">
                          {chat.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
                {teacher && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedTeacher(teacher);
                    }}
                    className="ml-2 p-2 rounded-full hover:bg-gray-100"
                  >
                    <AcademicCapIcon className="h-5 w-5 text-gray-500" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  const renderMessage = (message: Message) => {
    const isOwnMessage = message.sender === 'Вы';

    return (
      <div
        key={message.id}
        className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4 group`}
      >
        <div className="flex items-end space-x-2">
          {!isOwnMessage && (
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                <UserCircleIcon className="h-6 w-6 text-gray-500" />
              </div>
            </div>
          )}
          <div
            className={`max-w-[70%] rounded-2xl px-4 py-2 ${
              isOwnMessage
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-900'
            }`}
          >
            {!isOwnMessage && (
              <p className="text-xs font-medium mb-1">{message.sender}</p>
            )}
            {message.type === 'text' ? (
              <p className="text-sm">{message.content}</p>
            ) : message.attachments?.map((attachment, index) => (
              <div key={index} className="mt-2">
                {attachment.type === 'image' ? (
                  <img
                    src={attachment.url}
                    alt={attachment.name}
                    className="rounded-lg max-w-full h-auto"
                  />
                ) : (
                  <div className="flex items-center space-x-2 bg-white/10 p-2 rounded-lg">
                    <PaperClipIcon className="h-4 w-4" />
                    <span className="text-sm truncate">{attachment.name}</span>
                    <span className="text-xs opacity-75">{attachment.size}</span>
                  </div>
                )}
              </div>
            ))}
            <div className="flex items-center justify-end space-x-1 mt-1">
              <span className="text-xs opacity-75">{message.timestamp}</span>
              {isOwnMessage && (
                <span className="text-xs">
                  {message.isRead ? (
                    <CheckCircleIcon className="h-4 w-4 text-blue-300" />
                  ) : (
                    <ClockIcon className="h-4 w-4 text-blue-300" />
                  )}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderMobileMenu = () => (
    <div
      className={`fixed inset-y-0 left-0 w-full bg-white transform transition-transform duration-300 ease-in-out lg:hidden z-40 ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">Мессенджер</h1>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <XMarkIcon className="h-6 w-6 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <input
              type="text"
              placeholder="Поиск чатов..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pb-16">
          {activeTab === 'chats' && (
            <>
              {renderChatList(groupChats, 'Группы', 'groups')}
            </>
          )}
          {activeTab === 'contacts' && (
            <div className="flex flex-col md:flex-row gap-8 h-full">
              <div className="flex-1 flex flex-col">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Преподаватели</h2>
                <div className="space-y-4">
                  {Object.values(teachers).map((teacher) => (
                    <button
                      key={teacher.id}
                      onClick={() => {
                        const chat = privateChats.find(c => c.name === teacher.name);
                        if (chat) {
                          handleChatSelect(chat);
                        } else {
                          setSelectedTeacher(teacher);
                        }
                      }}
                      className="w-full flex items-center p-3 rounded-xl hover:bg-gray-50"
                    >
                      <img
                        src={teacher.avatar}
                        alt={teacher.name}
                        className="h-12 w-12 rounded-full"
                      />
                      <div className="ml-3 text-left">
                        <p className="text-sm font-medium text-gray-900">{teacher.name}</p>
                        <p className="text-xs text-gray-500">{teacher.school}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex-1 flex flex-col">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Личные чаты</h2>
                <div className="space-y-4">
                  {privateChats.map((chat) => {
                    const teacher = teachers[chat.name];
                    return (
                      <button
                        key={chat.id}
                        onClick={() => handleChatSelect(chat)}
                        className="w-full flex items-center p-3 rounded-xl hover:bg-gray-50"
                      >
                        <div className="relative">
                          {teacher?.avatar ? (
                            <img
                              src={teacher.avatar}
                              alt={teacher.name}
                              className="h-12 w-12 rounded-full"
                            />
                          ) : (
                            <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                              <UserIcon className="h-6 w-6 text-gray-500" />
                            </div>
                          )}
                          {chat.isOnline && (
                            <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white" />
                          )}
                        </div>
                        <div className="ml-3 text-left flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">{chat.name}</p>
                            {chat.lastMessage && (
                              <span className="text-xs text-gray-500">{chat.lastMessage.timestamp}</span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 truncate">
                            {chat.lastMessage?.content}
                          </p>
                        </div>
                        {chat.unreadCount > 0 && (
                          <span className="ml-2 inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-500 text-xs font-medium text-white">
                            {chat.unreadCount}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
          {activeTab === 'profile' && (
            <div className="p-4">
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                  <UserCircleSolidIcon className="h-10 w-10 text-gray-500" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Ваше имя</h2>
                  <p className="text-sm text-gray-500">Студент</p>
                </div>
              </div>
              <div className="mt-6 space-y-4">
                <button className="w-full p-3 text-left rounded-xl hover:bg-gray-50">
                  <p className="text-sm font-medium text-gray-900">Настройки</p>
                </button>
                <button className="w-full p-3 text-left rounded-xl hover:bg-gray-50">
                  <p className="text-sm font-medium text-gray-900">Уведомления</p>
                </button>
                <button className="w-full p-3 text-left rounded-xl hover:bg-gray-50">
                  <p className="text-sm font-medium text-gray-900">Помощь</p>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      <motion.div className="w-full h-full bg-white shadow-2xl rounded-3xl overflow-hidden border">
        {/* Desktop Sidebar */}
        <div className="hidden lg:flex lg:flex-col lg:w-80 border-r border-gray-200 bg-white">
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-xl font-semibold text-gray-900">Мессенджер</h1>
          </div>

          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <input
                type="text"
                placeholder="Поиск чатов..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <div className="flex space-x-4 mb-4">
                <button
                  onClick={() => setActiveTab('chats')}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium ${
                    activeTab === 'chats'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Чаты
                </button>
                <button
                  onClick={() => setActiveTab('contacts')}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium ${
                    activeTab === 'contacts'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Контакты
                </button>
              </div>

              {activeTab === 'chats' && (
                <>
                  {renderChatList(groupChats, 'Группы', 'groups')}
                </>
              )}
              {activeTab === 'contacts' && (
                <div className="flex flex-col md:flex-row gap-8 h-full">
                  <div className="flex-1 flex flex-col">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Преподаватели</h2>
                    <div className="space-y-4">
                      {Object.values(teachers).map((teacher) => (
                        <button
                          key={teacher.id}
                          onClick={() => {
                            const chat = privateChats.find(c => c.name === teacher.name);
                            if (chat) {
                              handleChatSelect(chat);
                            } else {
                              setSelectedTeacher(teacher);
                            }
                          }}
                          className="w-full flex items-center p-3 rounded-xl hover:bg-gray-50"
                        >
                          <img
                            src={teacher.avatar}
                            alt={teacher.name}
                            className="h-12 w-12 rounded-full"
                          />
                          <div className="ml-3 text-left">
                            <p className="text-sm font-medium text-gray-900">{teacher.name}</p>
                            <p className="text-xs text-gray-500">{teacher.school}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Личные чаты</h2>
                    <div className="space-y-4">
                      {privateChats.map((chat) => {
                        const teacher = teachers[chat.name];
                        return (
                          <button
                            key={chat.id}
                            onClick={() => handleChatSelect(chat)}
                            className="w-full flex items-center p-3 rounded-xl hover:bg-gray-50"
                          >
                            <div className="relative">
                              {teacher?.avatar ? (
                                <img
                                  src={teacher.avatar}
                                  alt={teacher.name}
                                  className="h-12 w-12 rounded-full"
                                />
                              ) : (
                                <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                                  <UserIcon className="h-6 w-6 text-gray-500" />
                                </div>
                              )}
                              {chat.isOnline && (
                                <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white" />
                              )}
                            </div>
                            <div className="ml-3 text-left flex-1">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-900">{chat.name}</p>
                                {chat.lastMessage && (
                                  <span className="text-xs text-gray-500">{chat.lastMessage.timestamp}</span>
                                )}
                              </div>
                              <p className="text-xs text-gray-500 truncate">
                                {chat.lastMessage?.content}
                              </p>
                            </div>
                            {chat.unreadCount > 0 && (
                              <span className="ml-2 inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-500 text-xs font-medium text-white">
                                {chat.unreadCount}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {renderMobileMenu()}

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedChat ? (
            <>
              <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white">
                <div className="flex items-center">
                  <div className="relative">
                    {selectedChat.avatar ? (
                      <img
                        src={selectedChat.avatar}
                        alt={selectedChat.name}
                        className="h-10 w-10 rounded-full"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        {selectedChat.type === 'group' ? (
                          <UserGroupIcon className="h-6 w-6 text-gray-500" />
                        ) : (
                          <UserIcon className="h-6 w-6 text-gray-500" />
                        )}
                      </div>
                    )}
                    {selectedChat.isOnline && (
                      <span className="absolute bottom-0 right-0 h-2 w-2 bg-green-500 rounded-full border-2 border-white" />
                    )}
                  </div>
                  <div className="ml-3">
                    <div className="flex items-center space-x-2">
                      <h2 className="text-lg font-medium text-gray-900">{selectedChat.name}</h2>
                      {teachers[selectedChat.name] && (
                        <button
                          onClick={() => {
                            setSelectedTeacher(teachers[selectedChat.name]);
                            setIsMobileProfileOpen(true);
                          }}
                          className="p-1 rounded-full hover:bg-gray-100"
                        >
                          <AcademicCapIcon className="h-5 w-5 text-gray-500" />
                        </button>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">
                      {selectedChat.type === 'group'
                        ? `${selectedChat.participants.length} участников`
                        : selectedChat.isOnline
                        ? 'В сети'
                        : 'Не в сети'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 rounded-full hover:bg-gray-100">
                    <PhoneIcon className="h-6 w-6 text-gray-500" />
                  </button>
                  <button className="p-2 rounded-full hover:bg-gray-100">
                    <VideoCameraIcon className="h-6 w-6 text-gray-500" />
                  </button>
                  {selectedChat.type === 'group' && (
                    <div className="relative">
                      <button
                        onClick={() => setShowParticipants(!showParticipants)}
                        className="p-2 rounded-full hover:bg-gray-100"
                      >
                        <EllipsisHorizontalIcon className="h-6 w-6 text-gray-500" />
                      </button>
                      {showParticipants && renderParticipantsDropdown()}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 bg-gray-50 pb-36">
                {messages[selectedChat.id]?.map(renderMessage)}
                <div ref={messagesEndRef} />
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <PaperClipIcon className="h-6 w-6 text-gray-500" />
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    multiple
                    className="hidden"
                  />
                  <button
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <FaceSmileIcon className="h-6 w-6 text-gray-500" />
                  </button>
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Введите сообщение..."
                    className="flex-1 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={() => setIsRecording(!isRecording)}
                    className={`p-2 rounded-full ${
                      isRecording ? 'bg-red-500 text-white' : 'hover:bg-gray-100'
                    }`}
                  >
                    <MicrophoneIcon className="h-6 w-6" />
                  </button>
                  <button
                    onClick={handleSendMessage}
                    className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <PaperAirplaneIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {attachments.length > 0 && (
                <div className="fixed bottom-28 left-0 right-0 lg:left-80 px-4 py-2 border-t border-gray-200 bg-white">
                  <div className="flex items-center space-x-2 overflow-x-auto max-w-full mx-auto">
                    {attachments.map((file, index) => (
                      <div
                        key={index}
                        className="relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden"
                      >
                        {file.type.startsWith('image/') ? (
                          <img
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                            <PaperClipIcon className="h-8 w-8 text-gray-400" />
                          </div>
                        )}
                        <button
                          onClick={() => removeAttachment(index)}
                          className="absolute top-1 right-1 p-1 rounded-full bg-gray-900/50 text-white hover:bg-gray-900/75"
                        >
                          <XMarkIcon className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <UserGroupIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Выберите чат</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Начните общение, выбрав чат из списка
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        {renderBottomNavigation()}

        {/* Overlay for mobile menu */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {selectedTeacher && renderTeacherProfile(selectedTeacher)}
      </motion.div>
    </div>
  );
};

export default Messenger; 