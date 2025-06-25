import React, { useState, useEffect } from 'react';
import {
  AcademicCapIcon,
  EnvelopeIcon,
  PhoneIcon,
  BuildingOfficeIcon,
  ClockIcon,
  UserIcon,
  ChatBubbleLeftRightIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  QuestionMarkCircleIcon,
  ClockIcon as ClockIconSolid,
  XMarkIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  BellIcon,
  BellSlashIcon,
  StarIcon,
  CalendarIcon,
  MapPinIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  GlobeAltIcon,
  DocumentIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface Advisor {
  id: string;
  name: string;
  position: string;
  email: string;
  phone: string;
  office: string;
  schedule: string;
  image: string;
  specialization: string[];
  rating: number;
  availability: 'online' | 'offline' | 'both';
  languages: string[];
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  isExpanded?: boolean;
  priority: 'high' | 'medium' | 'low';
}

interface Request {
  id: string;
  date: string;
  subject: string;
  status: 'pending' | 'in-progress' | 'completed';
  advisor: string;
  priority: 'high' | 'medium' | 'low';
  description: string;
  response?: string;
  attachments?: string[];
  lastUpdated: string;
}

const advisors: Advisor[] = [
  {
    id: '1',
    name: 'Ахметова Айгуль Каримовна',
    position: 'Старший эдвайзер',
    email: 'ahmetova@alma.edu.kz',
    phone: '+7 (727) 123-45-67',
    office: 'Корпус A, каб. 301',
    schedule: 'Пн-Пт: 9:00 - 18:00',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    specialization: ['Академические вопросы', 'Выбор специальности', 'Учебный план'],
    rating: 4.8,
    availability: 'both',
    languages: ['Казахский', 'Русский', 'Английский'],
  },
  {
    id: '2',
    name: 'Иванов Иван Петрович',
    position: 'Эдвайзер',
    email: 'ivanov@alma.edu.kz',
    phone: '+7 (727) 123-45-68',
    office: 'Корпус B, каб. 205',
    schedule: 'Пн-Пт: 10:00 - 19:00',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    specialization: ['Стипендии', 'Международные программы', 'Стажировки'],
    rating: 4.6,
    availability: 'online',
    languages: ['Русский', 'Английский'],
  },
  {
    id: '3',
    name: 'Сидорова Мария Александровна',
    position: 'Эдвайзер',
    email: 'sidorova@alma.edu.kz',
    phone: '+7 (727) 123-45-69',
    office: 'Корпус C, каб. 401',
    schedule: 'Пн-Пт: 9:00 - 18:00',
    image: 'https://i.pravatar.cc/150?img=3',
    specialization: ['Карьерное консультирование', 'Трудоустройство', 'Проектная деятельность'],
    rating: 4.9,
    availability: 'offline',
    languages: ['Русский', 'Казахский'],
  },
];

const faqs: FAQ[] = [
  {
    id: '1',
    question: 'Как записаться на консультацию к эдвайзеру?',
    answer: 'Вы можете записаться на консультацию через форму на этой странице или связаться с эдвайзером напрямую по указанным контактам.',
    category: 'Общие вопросы',
    isExpanded: false,
    priority: 'high',
  },
  {
    id: '2',
    question: 'Какие документы нужны для академического отпуска?',
    answer: 'Для оформления академического отпуска необходимы: заявление, медицинская справка (если по состоянию здоровья), документы, подтверждающие причину отпуска.',
    category: 'Академические вопросы',
    isExpanded: false,
    priority: 'medium',
  },
  {
    id: '3',
    question: 'Как изменить учебный план?',
    answer: 'Для изменения учебного плана необходимо обратиться к эдвайзеру вашей школы. Он поможет составить новый план и согласовать его с деканатом.',
    category: 'Учебный процесс',
    isExpanded: false,
    priority: 'high',
  },
  {
    id: '4',
    question: 'Как получить стипендию?',
    answer: 'Для получения стипендии необходимо иметь высокий средний балл, участвовать в научной деятельности и соответствовать критериям университета. Обратитесь к эдвайзеру для получения подробной информации.',
    category: 'Финансовые вопросы',
    isExpanded: false,
    priority: 'high',
  },
  {
    id: '5',
    question: 'Можно ли перевестись на другую специальность?',
    answer: 'Да, перевод на другую специальность возможен. Для этого нужно обратиться к эдвайзеру, который поможет с процедурой перевода и согласованием с деканатом.',
    category: 'Академические вопросы',
    isExpanded: false,
    priority: 'medium',
  },
  {
    id: '6',
    question: 'Как подать заявку на международную программу?',
    answer: 'Для участия в международных программах необходимо следить за объявлениями на сайте университета, подготовить необходимые документы и обратиться к эдвайзеру по международным программам.',
    category: 'Международные программы',
    isExpanded: false,
    priority: 'medium',
  },
  {
    id: '7',
    question: 'Что делать при пропуске экзамена?',
    answer: 'При пропуске экзамена по уважительной причине необходимо предоставить документы, подтверждающие причину пропуска, и обратиться к эдвайзеру для согласования пересдачи.',
    category: 'Учебный процесс',
    isExpanded: false,
    priority: 'high',
  },
  {
    id: '8',
    question: 'Как получить справку об обучении?',
    answer: 'Справку об обучении можно получить в деканате или через эдвайзера. Обычно справка готова в течение 1-3 рабочих дней.',
    category: 'Общие вопросы',
    isExpanded: false,
    priority: 'low',
  },
];

const requests: Request[] = [
  {
    id: '1',
    date: '2024-03-15',
    subject: 'Консультация по выбору элективов',
    status: 'completed',
    advisor: 'Ахметова Айгуль Каримовна',
    priority: 'medium',
    description: 'Нужна помощь в выборе элективных курсов для следующего семестра. Интересуюсь курсами по программированию и дизайну.',
    response: 'Рекомендую следующие элективы: "Веб-разработка", "UI/UX дизайн", "Мобильная разработка". Эти курсы хорошо сочетаются с вашей специальностью.',
    attachments: ['plan.pdf', 'schedule.xlsx'],
    lastUpdated: '2024-03-18',
  },
  {
    id: '2',
    date: '2024-03-20',
    subject: 'Вопрос по академическому отпуску',
    status: 'in-progress',
    advisor: 'Иванов Иван Петрович',
    priority: 'high',
    description: 'Необходимо оформить академический отпуск по состоянию здоровья. Есть медицинская справка.',
    response: 'Получил ваше обращение. Для оформления отпуска необходимо предоставить: 1) Заявление, 2) Медицинскую справку, 3) Справку о состоянии здоровья. Обратитесь в деканат с этими документами.',
    attachments: ['medical_certificate.pdf'],
    lastUpdated: '2024-03-22',
  },
  {
    id: '3',
    date: '2024-03-25',
    subject: 'Запрос на изменение расписания',
    status: 'pending',
    advisor: 'Сидорова Мария Александровна',
    priority: 'low',
    description: 'Прошу рассмотреть возможность изменения времени занятий по предмету "Экономика" с утреннего на вечернее время.',
    lastUpdated: '2024-03-25',
  },
  {
    id: '4',
    date: '2024-03-28',
    subject: 'Консультация по стажировке',
    status: 'completed',
    advisor: 'Ахметова Айгуль Каримовна',
    priority: 'medium',
    description: 'Интересуюсь возможностями стажировки в IT-компаниях. Какие программы доступны для студентов моего курса?',
    response: 'Университет сотрудничает с несколькими IT-компаниями. Рекомендую обратить внимание на программы: "Microsoft Student Partners", "Google Developer Student Clubs", "Yandex.Internship".',
    attachments: ['internship_guide.pdf', 'company_list.pdf'],
    lastUpdated: '2024-03-30',
  },
];

const Help: React.FC = () => {
  const [selectedAdvisor, setSelectedAdvisor] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedAvailability, setSelectedAvailability] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [showFAQ, setShowFAQ] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [faqItems, setFaqItems] = useState<FAQ[]>(faqs);
  const [notifications, setNotifications] = useState<{ [key: string]: boolean }>({});
  const [expandedRequests, setExpandedRequests] = useState<{ [key: string]: boolean }>({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  // Фильтрация эдвайзеров
  const filteredAdvisors = advisors.filter((advisor) => {
    const matchesSearch = advisor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      advisor.specialization.some(spec => spec.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSpecialization = !selectedSpecialization || advisor.specialization.includes(selectedSpecialization);
    const matchesTime = !selectedTime || advisor.schedule.includes(selectedTime);
    const matchesAvailability = !selectedAvailability || advisor.availability === selectedAvailability;
    const matchesLanguage = !selectedLanguage || advisor.languages.includes(selectedLanguage);
    return matchesSearch && matchesSpecialization && matchesTime && matchesAvailability && matchesLanguage;
  });

  // Получение уникальных специализаций
  const specializations = Array.from(new Set(advisors.flatMap(advisor => advisor.specialization)));

  // Получение уникальных времен работы
  const timeSlots = Array.from(new Set(advisors.map(advisor => advisor.schedule)));

  // Получение уникальных языков
  const languages = Array.from(new Set(advisors.flatMap(advisor => advisor.languages)));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', { ...formData, advisorId: selectedAdvisor });
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatMessage.trim()) {
      console.log('Chat message:', chatMessage);
      setChatMessage('');
    }
  };

  const toggleFAQ = (id: string) => {
    setFaqItems(faqItems.map(faq => 
      faq.id === id ? { ...faq, isExpanded: !faq.isExpanded } : faq
    ));
  };

  const toggleNotification = (id: string) => {
    setNotifications(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleRequestExpanded = (id: string) => {
    setExpandedRequests(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'online': return 'bg-green-100 text-green-800';
      case 'offline': return 'bg-blue-100 text-blue-800';
      case 'both': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAvailabilityText = (availability: string) => {
    switch (availability) {
      case 'online': return 'Онлайн';
      case 'offline': return 'Офлайн';
      case 'both': return 'Онлайн/Офлайн';
      default: return 'Неизвестно';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'pending': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Завершено';
      case 'in-progress': return 'В процессе';
      case 'pending': return 'Ожидает';
      default: return 'Неизвестно';
    }
  };

  // Имитация получения ответа от эдвайзера
  useEffect(() => {
    const timer = setTimeout(() => {
      const randomRequest = requests[Math.floor(Math.random() * requests.length)];
      if (notifications[randomRequest.id]) {
        console.log(`Получен ответ на обращение: ${randomRequest.subject}`);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [notifications]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="bg-white shadow-2xl rounded-3xl overflow-hidden border">
          {/* Hero Section */}
          <div className="text-center p-4 sm:p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full mb-2">
              <QuestionMarkCircleIcon className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Помощь и поддержка</h1>
            <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto">Наши опытные эдвайзеры готовы помочь вам с любыми вопросами по обучению и развитию</p>
          </div>
          {/* Support Info Section */}
          <div className="flex flex-row gap-2 md:grid md:grid-cols-3 md:gap-6 p-2.5 md:p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <div className="bg-white rounded-xl shadow-sm p-2.5 md:p-6 border border-gray-100 flex flex-col items-center flex-1 min-w-0 md:max-w-full mx-auto">
              <ClockIcon className="h-5 w-5 md:h-8 md:w-8 mb-1 text-blue-600" />
              <h3 className="font-semibold text-sm md:text-lg mb-1 text-gray-900">Время работы</h3>
              <p className="text-xs md:text-base text-blue-700">Пн-Пт: 9:00 - 18:00</p>
              <p className="text-xs md:text-base text-blue-500">Сб: 10:00 - 14:00</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-2.5 md:p-6 border border-gray-100 flex flex-col items-center flex-1 min-w-0 md:max-w-full mx-auto">
              <PhoneIcon className="h-5 w-5 md:h-8 md:w-8 mb-1 text-green-600" />
              <h3 className="font-semibold text-sm md:text-lg mb-1 text-gray-900">Телефон</h3>
              <p className="text-xs md:text-base text-green-700">+7 (727) 123-45-67</p>
              <p className="text-xs md:text-base text-green-500">Горячая линия</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-2.5 md:p-6 border border-gray-100 flex flex-col items-center flex-1 min-w-0 md:max-w-full mx-auto">
              <EnvelopeIcon className="h-5 w-5 md:h-8 md:w-8 mb-1 text-purple-600" />
              <h3 className="font-semibold text-sm md:text-lg mb-1 text-gray-900">Email</h3>
              <p className="text-xs md:text-base text-purple-700">support@alma.edu.kz</p>
              <p className="text-xs md:text-base text-purple-500">24/7 поддержка</p>
            </div>
          </div>
          {/* Filters Section */}
          <div className="w-full max-w-md mx-auto mb-8 md:max-w-none md:bg-white/80 md:backdrop-blur-sm md:rounded-2xl md:shadow-xl md:p-8 md:border md:border-white/20 mt-6 md:mt-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 space-y-4 md:space-y-0">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <FunnelIcon className="h-6 w-6 mr-3 text-blue-600" />
                Поиск и фильтры
              </h2>
              <div className="flex items-center space-x-3">
                <div className="relative flex-1 md:flex-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Поиск эдвайзеров по имени или специализации..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full md:w-80 pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50 backdrop-blur-sm transition-all duration-300 hover:shadow-md"
                  />
                </div>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedSpecialization(null);
                    setSelectedTime(null);
                    setSelectedAvailability(null);
                    setSelectedLanguage(null);
                  }}
                  className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-300 font-medium hover:shadow-md"
                >
                  Сбросить
                </button>
              </div>
            </div>

            {/* Фильтры в виде карточек */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Специализация */}
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all duration-300">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                  <AcademicCapIcon className="h-4 w-4 mr-2 text-blue-500" />
                  Специализация
                </h3>
                <div className="relative">
                  <select
                    value={selectedSpecialization || ''}
                    onChange={(e) => setSelectedSpecialization(e.target.value || null)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50 backdrop-blur-sm appearance-none text-sm"
                  >
                    <option value="">Все специализации</option>
                    {specializations.map((spec) => (
                      <option key={spec} value={spec}>
                        {spec}
                      </option>
                    ))}
                  </select>
                  <ChevronDownIcon className="h-4 w-4 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Время работы */}
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all duration-300">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                  <ClockIcon className="h-4 w-4 mr-2 text-green-500" />
                  Время работы
                </h3>
                <div className="relative">
                  <select
                    value={selectedTime || ''}
                    onChange={(e) => setSelectedTime(e.target.value || null)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50 backdrop-blur-sm appearance-none text-sm"
                  >
                    <option value="">Все время работы</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                  <ChevronDownIcon className="h-4 w-4 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Формат консультации */}
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all duration-300">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                  <GlobeAltIcon className="h-4 w-4 mr-2 text-purple-500" />
                  Формат
                </h3>
                <div className="relative">
                  <select
                    value={selectedAvailability || ''}
                    onChange={(e) => setSelectedAvailability(e.target.value || null)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50 backdrop-blur-sm appearance-none text-sm"
                  >
                    <option value="">Все форматы</option>
                    <option value="online">Онлайн</option>
                    <option value="offline">Офлайн</option>
                    <option value="both">Онлайн/Офлайн</option>
                  </select>
                  <ChevronDownIcon className="h-4 w-4 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Языки */}
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all duration-300">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                  <ChatBubbleLeftRightIcon className="h-4 w-4 mr-2 text-red-500" />
                  Языки
                </h3>
                <div className="relative">
                  <select
                    value={selectedLanguage || ''}
                    onChange={(e) => setSelectedLanguage(e.target.value || null)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50 backdrop-blur-sm appearance-none text-sm"
                  >
                    <option value="">Все языки</option>
                    {languages.map((lang) => (
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </select>
                  <ChevronDownIcon className="h-4 w-4 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Активные фильтры */}
            {(selectedSpecialization || selectedTime || selectedAvailability || selectedLanguage) && (
              <div className="mt-6 pt-6 border-t border-gray-200 transition-all duration-300 ease-in-out">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-900">Активные фильтры</h3>
                  <button
                    onClick={() => {
                      setSelectedSpecialization(null);
                      setSelectedTime(null);
                      setSelectedAvailability(null);
                      setSelectedLanguage(null);
                    }}
                    className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-300"
                  >
                    Очистить все
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedSpecialization && (
                    <div className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full transition-all duration-300 transform hover:scale-105">
                      <span className="text-sm">Специализация: {selectedSpecialization}</span>
                      <button
                        onClick={() => setSelectedSpecialization(null)}
                        className="ml-2 text-blue-500 hover:text-blue-700 transition-colors duration-300"
                      >
                        <XMarkIcon className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                  {selectedTime && (
                    <div className="flex items-center bg-green-100 text-green-700 px-3 py-1 rounded-full transition-all duration-300 transform hover:scale-105">
                      <span className="text-sm">Время: {selectedTime}</span>
                      <button
                        onClick={() => setSelectedTime(null)}
                        className="ml-2 text-green-500 hover:text-green-700 transition-colors duration-300"
                      >
                        <XMarkIcon className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                  {selectedAvailability && (
                    <div className="flex items-center bg-purple-100 text-purple-700 px-3 py-1 rounded-full transition-all duration-300 transform hover:scale-105">
                      <span className="text-sm">Формат: {getAvailabilityText(selectedAvailability)}</span>
                      <button
                        onClick={() => setSelectedAvailability(null)}
                        className="ml-2 text-purple-500 hover:text-purple-700 transition-colors duration-300"
                      >
                        <XMarkIcon className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                  {selectedLanguage && (
                    <div className="flex items-center bg-red-100 text-red-700 px-3 py-1 rounded-full transition-all duration-300 transform hover:scale-105">
                      <span className="text-sm">Язык: {selectedLanguage}</span>
                      <button
                        onClick={() => setSelectedLanguage(null)}
                        className="ml-2 text-red-500 hover:text-red-700 transition-colors duration-300"
                      >
                        <XMarkIcon className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Список эдвайзеров */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center pl-2 sm:pl-4">
              <UserIcon className="h-6 w-6 mr-3 text-blue-600" />
              Наши эдвайзеры ({filteredAdvisors.length})
            </h2>
            <div className="w-full max-w-5xl mx-auto">
              <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2 md:grid-cols-3 sm:gap-6 justify-center">
                {filteredAdvisors.map((advisor) => (
                  <div
                    key={advisor.id}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-white/20 group w-full max-w-md md:max-w-md lg:max-w-lg mx-auto"
                  >
                    <div className="p-6">
                      {/* Header карточки */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 overflow-hidden ring-4 ring-white shadow-lg">
                            <img
                              src={advisor.image}
                              alt={advisor.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                              {advisor.name}
                            </h3>
                            <p className="text-sm text-gray-600">{advisor.position}</p>
                            <div className="flex items-center mt-1">
                              <StarIcon className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-sm text-gray-600 ml-1">{advisor.rating}</span>
                            </div>
                          </div>
                        </div>
                        <span className={`px-3 py-1 text-xs rounded-full font-medium ${getAvailabilityColor(advisor.availability)}`}>
                          {getAvailabilityText(advisor.availability)}
                        </span>
                      </div>

                      {/* Контактная информация */}
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <EnvelopeIcon className="h-4 w-4 mr-3 text-blue-500" />
                          <span className="truncate">{advisor.email}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <PhoneIcon className="h-4 w-4 mr-3 text-green-500" />
                          <span>{advisor.phone}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPinIcon className="h-4 w-4 mr-3 text-red-500" />
                          <span>{advisor.office}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <CalendarIcon className="h-4 w-4 mr-3 text-purple-500" />
                          <span>{advisor.schedule}</span>
                        </div>
                      </div>

                      {/* Специализация */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Специализация:</h4>
                        <div className="flex flex-wrap gap-2">
                          {advisor.specialization.map((spec) => (
                            <span
                              key={spec}
                              className="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-full font-medium border border-blue-200"
                            >
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Языки */}
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Языки:</h4>
                        <div className="flex flex-wrap gap-2">
                          {advisor.languages.map((lang) => (
                            <span
                              key={lang}
                              className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full font-medium border border-gray-200"
                            >
                              {lang}
                            </span>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={() => setSelectedAdvisor(advisor.id)}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                      >
                        Записаться на консультацию
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-4 sm:p-8 mb-8 border border-white/20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-3 sm:space-y-0">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 flex items-center">
                <QuestionMarkCircleIcon className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 mr-2 sm:mr-3 text-blue-600" />
                Часто задаваемые вопросы
              </h2>
              {faqItems.length > 3 && (
                <button
                  onClick={() => setShowFAQ(!showFAQ)}
                  className="text-blue-600 hover:text-blue-800 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors self-start sm:self-auto text-sm sm:text-base"
                >
                  {showFAQ ? 'Скрыть' : 'Показать все'}
                </button>
              )}
            </div>
            <div className="w-full max-w-5xl mx-auto">
              <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                {faqItems.map((faq) => (
                  <div key={faq.id} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow bg-gradient-to-br from-slate-50 to-white group">
                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 text-left flex items-start justify-between focus:outline-none hover:bg-blue-50/30 transition-colors"
                    >
                      <div className="flex items-start gap-3 sm:gap-4 lg:gap-6 flex-1 min-w-0">
                        {/* Priority icon - адаптирован для всех экранов */}
                        <div className="flex-shrink-0 mt-1">
                          {faq.priority === 'high' && (
                            <ExclamationTriangleIcon className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-red-500" />
                          )}
                          {faq.priority === 'medium' && (
                            <InformationCircleIcon className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-yellow-500" />
                          )}
                          {faq.priority === 'low' && (
                            <CheckCircleIcon className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-green-500" />
                          )}
                        </div>
                        
                        {/* Content area */}
                        <div className="flex-1 min-w-0">
                          {/* Category badge - адаптирован для всех экранов */}
                          <div className="mb-2 sm:mb-3">
                            <span className="inline-block px-2 py-1 text-xs sm:text-sm rounded-full bg-blue-100 text-blue-700 font-semibold">
                              {faq.category}
                            </span>
                          </div>
                          
                          {/* Question text - адаптирован для всех экранов */}
                          <span className="font-semibold text-base sm:text-lg lg:text-xl text-gray-900 group-hover:text-blue-700 transition-colors leading-tight block">
                            {faq.question}
                          </span>
                        </div>
                      </div>
                      
                      {/* Chevron icon - адаптирован для всех экранов */}
                      <span className="ml-3 flex-shrink-0 mt-1">
                        {faq.isExpanded ? (
                          <ChevronUpIcon className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-blue-500" />
                        ) : (
                          <ChevronDownIcon className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-gray-400" />
                        )}
                      </span>
                    </button>
                    <div
                      className={`transition-all duration-300 bg-blue-50/40 ${faq.isExpanded ? 'max-h-96 py-4 px-4 sm:px-8 lg:px-12 opacity-100' : 'max-h-0 py-0 px-4 sm:px-8 lg:px-12 opacity-0 overflow-hidden'}`}
                      style={{ willChange: 'max-height, opacity, padding' }}
                    >
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* История обращений */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <ClockIcon className="h-6 w-6 mr-3 text-blue-600" />
                История обращений
              </h2>
              {requests.length > 3 && (
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  {showHistory ? 'Скрыть' : 'Показать все'}
                </button>
              )}
            </div>
            <div className="space-y-4">
              {(showHistory ? requests : requests.slice(0, 3)).map((request) => (
                <div
                  key={request.id}
                  className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-slate-50 to-white group cursor-pointer"
                  onClick={() => toggleRequestExpanded(request.id)}
                >
                  {/* Header карточки */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`px-3 py-1 text-xs rounded-full font-medium border ${getPriorityColor(request.priority)}`}>
                            {request.priority === 'high' ? 'Высокий' : request.priority === 'medium' ? 'Средний' : 'Низкий'}
                          </span>
                          <span className={`px-3 py-1 text-xs rounded-full font-medium border ${getStatusColor(request.status)}`}>
                            {getStatusText(request.status)}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                          {request.subject}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {request.description}
                        </p>
                      </div>
                      <div className="flex items-center space-x-3 ml-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleNotification(request.id);
                          }}
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {notifications[request.id] ? (
                            <BellIcon className="h-5 w-5" />
                          ) : (
                            <BellSlashIcon className="h-5 w-5" />
                          )}
                        </button>
                        <span className="text-gray-400">
                          {expandedRequests[request.id] ? (
                            <ChevronUpIcon className="h-5 w-5" />
                          ) : (
                            <ChevronDownIcon className="h-5 w-5" />
                          )}
                        </span>
                      </div>
                    </div>
                    
                    {/* Основная информация */}
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <UserIcon className="h-4 w-4 mr-2 text-blue-500" />
                          {request.advisor}
                        </span>
                        <span className="flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-2 text-green-500" />
                          {new Date(request.date).toLocaleDateString('ru-RU')}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        Обновлено: {new Date(request.lastUpdated).toLocaleDateString('ru-RU')}
                      </span>
                    </div>
                  </div>

                  {/* Детальная информация */}
                  {expandedRequests[request.id] && (
                    <div className="border-t border-gray-200 bg-blue-50/30 transition-all duration-300">
                      <div className="p-6 space-y-4">
                        {/* Описание */}
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                            <InformationCircleIcon className="h-4 w-4 mr-2 text-blue-500" />
                            Описание обращения
                          </h4>
                          <p className="text-gray-700 text-sm leading-relaxed bg-white p-3 rounded-lg border">
                            {request.description}
                          </p>
                        </div>

                        {/* Ответ эдвайзера */}
                        {request.response && (
                          <div>
                            <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                              <CheckCircleIcon className="h-4 w-4 mr-2 text-green-500" />
                              Ответ эдвайзера
                            </h4>
                            <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
                              <p className="text-gray-700 text-sm leading-relaxed">
                                {request.response}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Вложения */}
                        {request.attachments && request.attachments.length > 0 && (
                          <div>
                            <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                              <DocumentIcon className="h-4 w-4 mr-2 text-purple-500" />
                              Вложения
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {request.attachments.map((attachment, index) => (
                                <div
                                  key={index}
                                  className="flex items-center bg-white px-3 py-2 rounded-lg border border-gray-200 hover:border-purple-300 transition-colors"
                                >
                                  <DocumentIcon className="h-4 w-4 text-purple-500 mr-2" />
                                  <span className="text-sm text-gray-700">{attachment}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Статус и даты */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                          <div>
                            <h4 className="text-sm font-semibold text-gray-900 mb-2">Дата создания</h4>
                            <p className="text-sm text-gray-600">{new Date(request.date).toLocaleDateString('ru-RU', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-gray-900 mb-2">Последнее обновление</h4>
                            <p className="text-sm text-gray-600">{new Date(request.lastUpdated).toLocaleDateString('ru-RU', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Модальное окно для записи на консультацию */}
          {selectedAdvisor && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl">
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Запись на консультацию</h2>
                    <button
                      onClick={() => setSelectedAdvisor(null)}
                      className="text-gray-400 hover:text-gray-500 transition-colors"
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                          Ваше имя
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                        Телефон
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                        Тема консультации
                      </label>
                      <input
                        type="text"
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                        Сообщение
                      </label>
                      <textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
                    >
                      Отправить заявку
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* Чат с эдвайзером */}
          {isChatOpen && (
            <div className="fixed bottom-4 right-4 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-40">
              <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Чат с эдвайзером</h3>
                  <button
                    onClick={() => setIsChatOpen(false)}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
              </div>
              <div className="p-4 h-96 overflow-y-auto bg-gray-50">
                {/* Здесь будет история сообщений */}
              </div>
              <form onSubmit={handleChatSubmit} className="p-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder="Введите сообщение..."
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
                  >
                    Отправить
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Кнопка открытия чата */}
          <button
            onClick={() => setIsChatOpen(true)}
            className="fixed bottom-4 right-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-full shadow-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 z-30 hover:scale-110"
          >
            <ChatBubbleLeftRightIcon className="h-6 w-6" />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Help; 