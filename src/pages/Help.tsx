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

const Help: React.FC = () => {
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
          <div className="flex-1">
            <div className="relative">
              <FunnelIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <select
                value={selectedSpecialization || ''}
                onChange={(e) => setSelectedSpecialization(e.target.value || null)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Все специализации</option>
                {specializations.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex-1">
            <div className="relative">
              <ClockIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <select
                value={selectedTime || ''}
                onChange={(e) => setSelectedTime(e.target.value || null)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Все время работы</option>
                {timeSlots.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Список эдвайзеров */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredAdvisors.map((advisor) => (
          <div
            key={advisor.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="h-16 w-16 rounded-full bg-gray-200 overflow-hidden">
                  <img
                    src={advisor.image}
                    alt={advisor.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{advisor.name}</h3>
                  <p className="text-sm text-gray-600">{advisor.position}</p>
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <EnvelopeIcon className="h-4 w-4 mr-2" />
                  <span>{advisor.email}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <PhoneIcon className="h-4 w-4 mr-2" />
                  <span>{advisor.phone}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <BuildingOfficeIcon className="h-4 w-4 mr-2" />
                  <span>{advisor.office}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <ClockIcon className="h-4 w-4 mr-2" />
                  <span>{advisor.schedule}</span>
                </div>
              </div>
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Специализация:</h4>
                <div className="flex flex-wrap gap-2">
                  {advisor.specialization.map((spec) => (
                    <span
                      key={spec}
                      className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => setSelectedAdvisor(advisor.id)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Записаться на консультацию
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Часто задаваемые вопросы</h2>
          <button
            onClick={() => setShowFAQ(!showFAQ)}
            className="text-blue-600 hover:text-blue-800"
          >
            {showFAQ ? 'Скрыть' : 'Показать все'}
          </button>
        </div>
        <div className="space-y-4">
          {faqItems.slice(0, showFAQ ? undefined : 3).map((faq) => (
            <div key={faq.id} className="border border-gray-200 rounded-lg">
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50"
              >
                <span className="font-medium text-gray-900">{faq.question}</span>
                {faq.isExpanded ? (
                  <ChevronUpIcon className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                )}
              </button>
              {faq.isExpanded && (
                <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* История обращений */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">История обращений</h2>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="text-blue-600 hover:text-blue-800"
          >
            {showHistory ? 'Скрыть' : 'Показать все'}
          </button>
        </div>
        <div className="space-y-4">
          {requests.slice(0, showHistory ? undefined : 3).map((request) => (
            <div key={request.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="font-medium text-gray-900">{request.subject}</h3>
                  <p className="text-sm text-gray-600">{request.advisor}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleNotification(request.id)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    {notifications[request.id] ? (
                      <BellIcon className="h-5 w-5" />
                    ) : (
                      <BellSlashIcon className="h-5 w-5" />
                    )}
                  </button>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      request.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : request.status === 'in-progress'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {request.status === 'completed'
                      ? 'Завершено'
                      : request.status === 'in-progress'
                      ? 'В процессе'
                      : 'Ожидает'}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Дата: {new Date(request.date).toLocaleDateString('ru-RU')}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Модальное окно для записи на консультацию */}
      {selectedAdvisor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">Запись на консультацию</h2>
                <button
                  onClick={() => setSelectedAdvisor(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
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
                    required
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Тема консультации
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
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
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
        <div className="fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-lg">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Чат с эдвайзером</h3>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
          <div className="p-4 h-96 overflow-y-auto">
            {/* Здесь будет история сообщений */}
          </div>
          <form onSubmit={handleChatSubmit} className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Введите сообщение..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
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
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-200"
      >
        <ChatBubbleLeftRightIcon className="h-6 w-6" />
      </button>
    </div>
  );
};

export default Help; 