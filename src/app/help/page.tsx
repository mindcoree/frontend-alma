'use client';

import { useState, useEffect } from 'react';
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
} from '@heroicons/react/24/outline';

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
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  isExpanded?: boolean;
}

interface Request {
  id: string;
  date: string;
  subject: string;
  status: 'pending' | 'in-progress' | 'completed';
  advisor: string;
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
    image: '/images/advisors/advisor1.jpg',
    specialization: ['Академические вопросы', 'Выбор специальности', 'Учебный план'],
  },
  {
    id: '2',
    name: 'Иванов Иван Петрович',
    position: 'Эдвайзер',
    email: 'ivanov@alma.edu.kz',
    phone: '+7 (727) 123-45-68',
    office: 'Корпус B, каб. 205',
    schedule: 'Пн-Пт: 10:00 - 19:00',
    image: '/images/advisors/advisor2.jpg',
    specialization: ['Стипендии', 'Международные программы', 'Стажировки'],
  },
  {
    id: '3',
    name: 'Сидорова Мария Александровна',
    position: 'Эдвайзер',
    email: 'sidorova@alma.edu.kz',
    phone: '+7 (727) 123-45-69',
    office: 'Корпус C, каб. 401',
    schedule: 'Пн-Пт: 9:00 - 18:00',
    image: '/images/advisors/advisor3.jpg',
    specialization: ['Карьерное консультирование', 'Трудоустройство', 'Проектная деятельность'],
  },
];

const faqs: FAQ[] = [
  {
    id: '1',
    question: 'Как записаться на консультацию к эдвайзеру?',
    answer: 'Вы можете записаться на консультацию через форму на этой странице или связаться с эдвайзером напрямую по указанным контактам.',
    category: 'Общие вопросы',
    isExpanded: false,
  },
  {
    id: '2',
    question: 'Какие документы нужны для академического отпуска?',
    answer: 'Для оформления академического отпуска необходимы: заявление, медицинская справка (если по состоянию здоровья), документы, подтверждающие причину отпуска.',
    category: 'Академические вопросы',
    isExpanded: false,
  },
  {
    id: '3',
    question: 'Как изменить учебный план?',
    answer: 'Для изменения учебного плана необходимо обратиться к эдвайзеру вашей школы. Он поможет составить новый план и согласовать его с деканатом.',
    category: 'Учебный процесс',
    isExpanded: false,
  },
];

const requests: Request[] = [
  {
    id: '1',
    date: '2024-03-15',
    subject: 'Консультация по выбору элективов',
    status: 'completed',
    advisor: 'Ахметова Айгуль Каримовна',
  },
  {
    id: '2',
    date: '2024-03-20',
    subject: 'Вопрос по академическому отпуску',
    status: 'in-progress',
    advisor: 'Иванов Иван Петрович',
  },
];

export default function Help() {
  const [selectedAdvisor, setSelectedAdvisor] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [showFAQ, setShowFAQ] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [faqItems, setFaqItems] = useState<FAQ[]>(faqs);
  const [notifications, setNotifications] = useState<{ [key: string]: boolean }>({});
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
    return matchesSearch && matchesSpecialization && matchesTime;
  });

  // Получение уникальных специализаций
  const specializations = Array.from(new Set(advisors.flatMap(advisor => advisor.specialization)));

  // Получение уникальных времен работы
  const timeSlots = Array.from(new Set(advisors.map(advisor => advisor.schedule)));

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

  // Имитация получения ответа от эдвайзера
  useEffect(() => {
    const timer = setTimeout(() => {
      const randomRequest = requests[Math.floor(Math.random() * requests.length)];
      if (notifications[randomRequest.id]) {
        // Здесь можно добавить реальное уведомление
        console.log(`Получен ответ на обращение: ${randomRequest.subject}`);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [notifications]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Помощь и поддержка</h1>
        <p className="text-xl text-gray-600">
          Наши эдвайзеры готовы помочь вам с любыми вопросами
        </p>
      </div>

      {/* Информация о поддержке */}
      <div className="bg-gradient-to-r from-blue-500 to-red-500 rounded-lg shadow-lg p-6 text-white mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 p-4 rounded-lg">
            <h3 className="font-semibold mb-2 flex items-center">
              <ClockIcon className="h-5 w-5 mr-2" />
              Время работы
            </h3>
            <p className="text-white/90">Пн-Пт: 9:00 - 18:00</p>
          </div>
          <div className="bg-white/10 p-4 rounded-lg">
            <h3 className="font-semibold mb-2 flex items-center">
              <PhoneIcon className="h-5 w-5 mr-2" />
              Телефон
            </h3>
            <p className="text-white/90">+7 (727) 123-45-67</p>
          </div>
          <div className="bg-white/10 p-4 rounded-lg">
            <h3 className="font-semibold mb-2 flex items-center">
              <EnvelopeIcon className="h-5 w-5 mr-2" />
              Email
            </h3>
            <p className="text-white/90">support@alma.edu.kz</p>
          </div>
        </div>
      </div>

      {/* Поиск и фильтры */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Поиск эдвайзеров по имени или специализации..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              value={selectedSpecialization || ''}
              onChange={(e) => setSelectedSpecialization(e.target.value || null)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Все специализации</option>
              {specializations.map((spec) => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
            <select
              value={selectedTime || ''}
              onChange={(e) => setSelectedTime(e.target.value || null)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Все время</option>
              {timeSlots.map((time) => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Кнопки быстрого доступа */}
      <div className="flex flex-wrap gap-4 mb-8">
        <button
          onClick={() => setShowFAQ(!showFAQ)}
          className="flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
        >
          <QuestionMarkCircleIcon className="h-5 w-5 mr-2" />
          FAQ
        </button>
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
        >
          <ClockIconSolid className="h-5 w-5 mr-2" />
          История обращений
        </button>
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-red-500 text-white rounded-lg hover:from-blue-600 hover:to-red-600 transition-colors"
        >
          <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2" />
          Онлайн-чат
        </button>
      </div>

      {/* FAQ секция */}
      {showFAQ && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Часто задаваемые вопросы</h2>
          <div className="space-y-4">
            {faqItems.map((faq) => (
              <div key={faq.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full px-6 py-4 flex justify-between items-center bg-white hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center">
                    <QuestionMarkCircleIcon className="h-5 w-5 text-blue-500 mr-3" />
                    <h3 className="text-lg font-semibold text-gray-900 text-left">{faq.question}</h3>
                  </div>
                  {faq.isExpanded ? (
                    <ChevronUpIcon className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                {faq.isExpanded && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-600 mb-3">{faq.answer}</p>
                    <span className="inline-block px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">
                      {faq.category}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* История обращений */}
      {showHistory && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">История обращений</h2>
          <div className="space-y-4">
            {requests.map((request) => (
              <div key={request.id} className="border-b border-gray-200 pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{request.subject}</h3>
                    <p className="text-gray-600">Эдвайзер: {request.advisor}</p>
                    <p className="text-gray-500 text-sm">Дата: {request.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      request.status === 'completed' ? 'bg-green-100 text-green-800' :
                      request.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {request.status === 'completed' ? 'Завершено' :
                       request.status === 'in-progress' ? 'В процессе' :
                       'Ожидает'}
                    </span>
                    <button
                      onClick={() => toggleNotification(request.id)}
                      className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${
                        notifications[request.id] ? 'text-blue-500' : 'text-gray-400'
                      }`}
                    >
                      {notifications[request.id] ? (
                        <BellIcon className="h-5 w-5" />
                      ) : (
                        <BellSlashIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Онлайн-чат */}
      {isChatOpen && (
        <div className="fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-xl">
          <div className="bg-gradient-to-r from-blue-500 to-red-500 p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="text-white font-semibold">Онлайн-чат</h3>
            <button
              onClick={() => setIsChatOpen(false)}
              className="text-white hover:text-gray-200"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
          <div className="p-4 h-96 flex flex-col">
            <div className="flex-1 overflow-y-auto mb-4">
              {/* Здесь будут сообщения чата */}
              <div className="bg-gray-100 rounded-lg p-3 mb-2">
                <p className="text-sm text-gray-600">Здравствуйте! Чем могу помочь?</p>
              </div>
            </div>
            <form onSubmit={handleChatSubmit} className="flex gap-2">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Введите сообщение..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-red-500 text-white rounded-lg hover:from-blue-600 hover:to-red-600 transition-colors"
              >
                Отправить
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Список эдвайзеров */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {filteredAdvisors.map((advisor) => (
          <div
            key={advisor.id}
            className={`bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 ${
              selectedAdvisor === advisor.id ? 'ring-2 ring-blue-500' : ''
            }`}
          >
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                  <UserIcon className="h-8 w-8 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{advisor.name}</h3>
                  <p className="text-sm text-gray-600">{advisor.position}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <p className="flex items-center">
                  <EnvelopeIcon className="h-4 w-4 mr-2 text-blue-500" />
                  {advisor.email}
                </p>
                <p className="flex items-center">
                  <PhoneIcon className="h-4 w-4 mr-2 text-blue-500" />
                  {advisor.phone}
                </p>
                <p className="flex items-center">
                  <BuildingOfficeIcon className="h-4 w-4 mr-2 text-blue-500" />
                  {advisor.office}
                </p>
                <p className="flex items-center">
                  <ClockIcon className="h-4 w-4 mr-2 text-blue-500" />
                  {advisor.schedule}
                </p>
              </div>
              <div className="mt-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Специализация:</h4>
                <div className="flex flex-wrap gap-2">
                  {advisor.specialization.map((spec, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => setSelectedAdvisor(advisor.id)}
                className={`mt-4 w-full py-2 px-4 rounded-lg transition-colors duration-200 ${
                  selectedAdvisor === advisor.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                }`}
              >
                {selectedAdvisor === advisor.id ? 'Выбран' : 'Выбрать эдвайзера'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Форма обратной связи */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Обратиться за помощью</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Ваше имя
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Телефон
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Тема обращения
              </label>
              <input
                type="text"
                id="subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Сообщение
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-red-500 text-white rounded-lg hover:from-blue-600 hover:to-red-600 transition-colors duration-200 flex items-center"
            >
              <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2" />
              Отправить сообщение
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 