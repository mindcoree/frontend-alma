import React, { useState } from 'react';
import {
  AcademicCapIcon,
  BuildingOfficeIcon,
  ComputerDesktopIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  TrophyIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ChevronDownIcon,
  XMarkIcon,
  BookOpenIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  UserIcon,
  ArrowRightIcon,
  BuildingLibraryIcon,
  SparklesIcon,
  ChartBarIcon,
  GlobeAltIcon,
  LightBulbIcon,
  BriefcaseIcon,
  HeartIcon,
  PaintBrushIcon,
  RocketLaunchIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface Program {
  name: string;
  description: string;
  duration: string;
  credits: number;
  courses: {
    name: string;
    description: string;
    credits: number;
    semester: number;
  }[];
}

interface School {
  id: string;
  name: string;
  description: string;
  programs: string[];
  programDetails?: Program[];
  contacts: {
    email?: string;
    phone?: string;
    office?: string;
  };
  staff: {
    role: string;
    name: string;
    email?: string;
    specialization?: string;
    image?: string;
  }[];
  founded?: number;
  icon: any;
  color: string;
  category: string;
}

const schools: School[] = [
  {
    id: 'gsb',
    name: 'Высшая Школа Бизнеса',
    description: 'Ведущая бизнес-школа Казахстана, предлагающая программы MBA и докторантуры.',
    programs: ['MBA', 'Докторантура'],
    contacts: {
      email: 'gsb@almau.edu.kz',
      phone: '+7 727 313-28-89',
      office: '239',
    },
    staff: [
      {
        role: 'Академический декан',
        name: 'Гульзира Естекова',
      },
      {
        role: 'Менеджер программ MBA',
        name: 'Дана Кубеева',
      },
    ],
    icon: BuildingLibraryIcon,
    color: 'text-red-600',
    category: 'business',
  },
  {
    id: 'management',
    name: 'Школа Менеджмента',
    description: 'Подготовка специалистов в области управления, маркетинга и логистики.',
    programs: ['Global Management', 'Управление проектами', 'Менеджмент', 'Маркетинг', 'Логистика'],
    contacts: {
      office: '239',
    },
    staff: [
      {
        role: 'Декан',
        name: 'Болуспаев Шалкар Аманжолович',
      },
      {
        role: 'Академический декан',
        name: 'Жанжигитова Галима',
      },
    ],
    icon: ChartBarIcon,
    color: 'text-blue-600',
    category: 'business',
  },
  {
    id: 'economics',
    name: 'Школа Экономики и Финансов',
    description: 'Подготовка специалистов в области экономики, финансов и бухгалтерского учета.',
    programs: ['Экономика', 'Финансы', 'Бухгалтерский учет'],
    contacts: {},
    staff: [],
    icon: CurrencyDollarIcon,
    color: 'text-red-600',
    category: 'business',
  },
  {
    id: 'digital',
    name: 'Школа Цифровых Технологий',
    description: 'Современные программы в области информационных технологий и цифровой трансформации. Мы готовим специалистов, способных создавать инновационные решения и управлять цифровыми проектами в различных отраслях.',
    programs: ['Информационные технологии', 'Цифровая трансформация'],
    founded: 2018,
    programDetails: [
      {
        name: 'Информационные технологии',
        description: 'Программа готовит специалистов в области разработки программного обеспечения, искусственного интеллекта и кибербезопасности.',
        duration: '4 года',
        credits: 240,
        courses: [
          {
            name: 'Введение в программирование',
            description: 'Основы алгоритмического мышления и программирования на Python. Практические задания и проекты.',
            credits: 6,
            semester: 1
          },
          {
            name: 'Базы данных',
            description: 'Проектирование и разработка баз данных. SQL и NoSQL решения. Оптимизация запросов.',
            credits: 6,
            semester: 2
          },
          {
            name: 'Веб-разработка',
            description: 'Создание современных веб-приложений. Frontend и Backend разработка. React и Node.js.',
            credits: 6,
            semester: 3
          },
          {
            name: 'Искусственный интеллект',
            description: 'Основы машинного обучения и нейронных сетей. Практическое применение AI в бизнесе.',
            credits: 6,
            semester: 4
          }
        ]
      },
      {
        name: 'Цифровая трансформация',
        description: 'Программа фокусируется на управлении цифровыми изменениями в организациях и внедрении инновационных технологий.',
        duration: '4 года',
        credits: 240,
        courses: [
          {
            name: 'Управление цифровыми проектами',
            description: 'Методологии управления IT-проектами. Agile и Scrum. Управление рисками.',
            credits: 6,
            semester: 1
          },
          {
            name: 'Цифровая стратегия',
            description: 'Разработка и внедрение цифровых стратегий. Анализ рынка и конкурентов.',
            credits: 6,
            semester: 2
          },
          {
            name: 'Инновации и стартапы',
            description: 'Создание и развитие технологических стартапов. Венчурные инвестиции.',
            credits: 6,
            semester: 3
          },
          {
            name: 'Цифровая экономика',
            description: 'Тренды цифровой экономики. Блокчейн и криптовалюты. Цифровые платформы.',
            credits: 6,
            semester: 4
          }
        ]
      }
    ],
    contacts: {
      email: 'digital@almau.edu.kz',
      phone: '+7 727 313-28-89',
      office: '305',
    },
    staff: [
      {
        role: 'Декан',
        name: 'Ахметов Азамат',
        email: 'a.akhmetov@almau.edu.kz',
        specialization: 'Искусственный интеллект, Машинное обучение',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      {
        role: 'Академический декан',
        name: 'Нурланова Айгуль',
        email: 'a.nurlanova@almau.edu.kz',
        specialization: 'Цифровая трансформация, Управление проектами',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      {
        role: 'Старший преподаватель',
        name: 'Калиев Дамир',
        email: 'd.kaliev@almau.edu.kz',
        specialization: 'Веб-разработка, Full-stack',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      {
        role: 'Преподаватель',
        name: 'Садыкова Алия',
        email: 'a.sadykova@almau.edu.kz',
        specialization: 'Базы данных, Big Data',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      }
    ],
    icon: ComputerDesktopIcon,
    color: 'text-purple-600',
    category: 'technology',
  },
  {
    id: 'politics',
    name: 'Школа Политики и Права',
    description: 'Подготовка специалистов в области политики, права и международных отношений.',
    programs: ['Политология', 'Юриспруденция', 'Международные отношения'],
    contacts: {},
    staff: [],
    icon: CurrencyDollarIcon,
    color: 'text-red-600',
    category: 'business',
  },
  {
    id: 'entrepreneurship',
    name: 'Школа Предпринимательства и Инноваций',
    description: 'Развитие предпринимательских навыков и инновационного мышления.',
    programs: ['Предпринимательство', 'Инновационный менеджмент'],
    contacts: {},
    staff: [],
    icon: CurrencyDollarIcon,
    color: 'text-red-600',
    category: 'business',
  },
  {
    id: 'hospitality',
    name: 'Школа Гостеприимства и Туризма',
    description: 'Подготовка специалистов в сфере гостеприимства, туризма и ивент-менеджмента.',
    founded: 2018,
    programs: ['Ресторанно-гостиничный бизнес', 'Туризм', 'Ивент-менеджмент'],
    contacts: {},
    staff: [],
    icon: CurrencyDollarIcon,
    color: 'text-red-600',
    category: 'business',
  },
  {
    id: 'media',
    name: 'Школа Медиа и Кино',
    description: 'Инновационные программы в сфере цифрового кинопроизводства и медиа.',
    founded: 2021,
    programs: ['Digital Filmmaking', 'New Media', 'Public Relations'],
    contacts: {},
    staff: [],
    icon: CurrencyDollarIcon,
    color: 'text-red-600',
    category: 'creative',
  },
  {
    id: 'health',
    name: 'AlmaU Sharmanov School of Health Sciences',
    description: 'Современная школа медицинских наук, основанная в 2023 году.',
    founded: 2023,
    programs: ['Медицинские науки'],
    contacts: {
      email: 'a.omir@almau.edu.kz',
      phone: '+7 727 313-28-89',
      office: '213',
    },
    staff: [
      {
        role: 'Преподаватели',
        name: 'Өмір Аида, Сактаганова Тилла, Арингазина Алтын',
      },
    ],
    icon: CurrencyDollarIcon,
    color: 'text-red-600',
    category: 'social',
  },
  {
    id: 'engineering',
    name: 'Школа Инженерного Менеджмента',
    description: 'Современные программы в области программной инженерии и анализа данных.',
    founded: 2016,
    programs: ['Software Engineering', 'Business Analytics & Big Data'],
    contacts: {},
    staff: [],
    icon: ComputerDesktopIcon,
    color: 'text-purple-600',
    category: 'technology',
  },
  {
    id: 'urban',
    name: 'Центр Урбанистики',
    description: 'Исследования и проекты в области городского развития и планирования.',
    programs: ['Урбанистика', 'Городское планирование'],
    contacts: {},
    staff: [],
    icon: BuildingOfficeIcon,
    color: 'text-red-600',
    category: 'business',
  },
  {
    id: 'creative',
    name: 'Центр Креативных Индустрий',
    description: 'Развитие креативных индустрий и творческого предпринимательства.',
    programs: ['Креативные индустрии', 'Дизайн', 'Медиа-арт'],
    contacts: {},
    staff: [],
    icon: CurrencyDollarIcon,
    color: 'text-red-600',
    category: 'creative',
  },
  {
    id: 'sports',
    name: 'Центр Спортивного Менеджмента',
    description: 'Подготовка специалистов в области спортивного менеджмента и маркетинга.',
    programs: ['Спортивный менеджмент', 'Спортивный маркетинг'],
    contacts: {},
    staff: [],
    icon: CurrencyDollarIcon,
    color: 'text-red-600',
    category: 'social',
  },
  {
    id: 'language',
    name: 'Языковой Центр',
    description: 'Программы изучения иностранных языков и лингвистики.',
    programs: ['Английский язык', 'Китайский язык', 'Лингвистика'],
    contacts: {},
    staff: [],
    icon: CurrencyDollarIcon,
    color: 'text-red-600',
    category: 'social',
  },
  {
    id: 'education',
    name: 'Институт развития образования',
    description: 'Программы повышения квалификации и профессионального развития.',
    programs: ['Повышение квалификации', 'Профессиональное развитие'],
    contacts: {},
    staff: [],
    icon: AcademicCapIcon,
    color: 'text-red-600',
    category: 'social',
  },
];

const categories = [
  { id: 'all', name: 'Все школы', icon: BuildingLibraryIcon },
  { id: 'business', name: 'Бизнес', icon: ChartBarIcon },
  { id: 'technology', name: 'Технологии', icon: ComputerDesktopIcon },
  { id: 'creative', name: 'Креативные', icon: PaintBrushIcon },
  { id: 'social', name: 'Социальные', icon: HeartIcon },
];

const Schools: React.FC = () => {
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProgramModalOpen, setIsProgramModalOpen] = useState(false);

  const filteredSchools = schools.filter((school) => {
    const matchesSearch = school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      school.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || school.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="bg-white shadow-2xl rounded-3xl overflow-hidden border">
          {/* Hero Section */}
          <div className="text-center p-4 sm:p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="inline-block p-2 px-4 rounded-full bg-gradient-to-r from-red-50 to-blue-50 mb-2">
              <span className="text-sm font-medium text-red-600">AlmaU Schools</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-blue-600">
              Школы AlmaU
            </h1>
            <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
              Выберите школу, которая соответствует вашим интересам и карьерным целям
            </p>
          </div>
          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Всего школ</p>
                  <p className="text-2xl font-bold text-gray-900">{schools.length}</p>
                </div>
                <BuildingLibraryIcon className="h-8 w-8 text-red-600" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Программ обучения</p>
                  <p className="text-2xl font-bold text-gray-900">50+</p>
                </div>
                <BookOpenIcon className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Преподавателей</p>
                  <p className="text-2xl font-bold text-gray-900">200+</p>
                </div>
                <UserGroupIcon className="h-8 w-8 text-purple-600" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Выпускников</p>
                  <p className="text-2xl font-bold text-gray-900">10k+</p>
                </div>
                <TrophyIcon className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </div>
          {/* Search and Filter Section */}
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  placeholder="Поиск школ..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                        selectedCategory === category.id
                          ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                          : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
                      }`}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {category.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          {/* Schools Grid */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSchools.map((school) => (
                <motion.div
                  key={school.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
                  onClick={() => {
                    setSelectedSchool(school);
                    setIsModalOpen(true);
                  }}
                >
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="p-3 rounded-xl bg-blue-50 mr-4">
                        <school.icon className={`h-6 w-6 ${school.color}`} />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                        {school.name}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{school.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {school.programs.slice(0, 3).map((program, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700"
                        >
                          {program}
                        </span>
                      ))}
                      {school.programs.length > 3 && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-50 text-gray-700">
                          +{school.programs.length - 3}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <UserGroupIcon className="h-4 w-4 mr-1 text-blue-600" />
                        <span>{school.staff.length} преподавателей</span>
                      </div>
                      {school.founded && (
                        <div className="flex items-center">
                          <TrophyIcon className="h-4 w-4 mr-1 text-blue-600" />
                          <span>Основана в {school.founded}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
        {/* Modal */}
        {isModalOpen && selectedSchool && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-2 sm:p-4 z-50">
            <div className="bg-white rounded-2xl sm:rounded-3xl max-w-xs sm:max-w-md md:max-w-2xl w-full max-h-[90vh] overflow-y-auto mx-auto shadow-2xl animate-slide-up">
              <div className="p-3 sm:p-6">
                <div className="flex justify-between items-start mb-4 sm:mb-6">
                  <div className="flex items-center">
                    <div className="p-4 rounded-xl bg-blue-50 mr-4">
                      <selectedSchool.icon className={`h-8 w-8 ${selectedSchool.color}`} />
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-2xl font-bold text-gray-900">{selectedSchool.name}</h2>
                      {selectedSchool.founded && (
                        <p className="text-xs sm:text-sm text-gray-500">Основана в {selectedSchool.founded}</p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  >
                    <XMarkIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-500" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">О школе</h3>
                    <p className="text-gray-600 mb-6 text-xs sm:text-base">{selectedSchool.description}</p>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">Программы</h3>
                    <div className="space-y-3">
                      {selectedSchool.programDetails ? (
                        selectedSchool.programDetails.map((program, index) => (
                          <div
                            key={index}
                            className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl hover:shadow-md transition-all duration-200 cursor-pointer"
                            onClick={() => {
                              setSelectedProgram(program);
                              setIsProgramModalOpen(true);
                            }}
                          >
                            <BookOpenIcon className="h-5 w-5 text-blue-600 mr-3" />
                            <div>
                              <span className="text-gray-700 font-medium">{program.name}</span>
                              <p className="text-xs sm:text-sm text-gray-500 mt-1">{program.description}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        selectedSchool.programs.map((program, index) => (
                          <div
                            key={index}
                            className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl"
                          >
                            <BookOpenIcon className="h-5 w-5 text-blue-600 mr-3" />
                            <span className="text-gray-700 text-xs sm:text-base">{program}</span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">Контакты</h3>
                    <div className="space-y-4">
                      {selectedSchool.contacts.email && (
                        <div className="flex items-center p-3 bg-gray-50 rounded-xl">
                          <EnvelopeIcon className="h-5 w-5 text-blue-600 mr-3" />
                          <a href={`mailto:${selectedSchool.contacts.email}`} className="text-gray-700 hover:text-blue-600 transition-colors duration-200 text-xs sm:text-base">
                            {selectedSchool.contacts.email}
                          </a>
                        </div>
                      )}
                      {selectedSchool.contacts.phone && (
                        <div className="flex items-center p-3 bg-gray-50 rounded-xl">
                          <PhoneIcon className="h-5 w-5 text-blue-600 mr-3" />
                          <a href={`tel:${selectedSchool.contacts.phone}`} className="text-gray-700 hover:text-blue-600 transition-colors duration-200 text-xs sm:text-base">
                            {selectedSchool.contacts.phone}
                          </a>
                        </div>
                      )}
                      {selectedSchool.contacts.office && (
                        <div className="flex items-center p-3 bg-gray-50 rounded-xl">
                          <MapPinIcon className="h-5 w-5 text-blue-600 mr-3" />
                          <span className="text-gray-700 text-xs sm:text-base">Кабинет {selectedSchool.contacts.office}</span>
                        </div>
                      )}
                    </div>
                    {selectedSchool.staff.length > 0 && (
                      <>
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mt-8 mb-3">Преподаватели</h3>
                        <div className="space-y-3">
                          {selectedSchool.staff.map((member, index) => (
                            <div key={index} className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl hover:shadow-md transition-all duration-200">
                              {member.image ? (
                                <img
                                  src={member.image}
                                  alt={member.name}
                                  className="h-12 w-12 rounded-full mr-3 object-cover"
                                />
                              ) : (
                                <UserIcon className="h-12 w-12 text-blue-600 mr-3" />
                              )}
                              <div>
                                <p className="font-medium text-gray-900 text-xs sm:text-base">{member.name}</p>
                                <p className="text-xs sm:text-sm text-gray-500">{member.role}</p>
                                {member.specialization && (
                                  <p className="text-xs sm:text-sm text-gray-500 mt-1">{member.specialization}</p>
                                )}
                                {member.email && (
                                  <a
                                    href={`mailto:${member.email}`}
                                    className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 transition-colors duration-200"
                                  >
                                    {member.email}
                                  </a>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Program Modal */}
        {isProgramModalOpen && selectedProgram && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-2 sm:p-4 z-50">
            <div className="bg-white rounded-2xl sm:rounded-3xl max-w-xs sm:max-w-md md:max-w-2xl w-full max-h-[90vh] overflow-y-auto mx-auto shadow-2xl animate-slide-up">
              <div className="p-3 sm:p-6">
                <div className="flex justify-between items-start mb-4 sm:mb-6">
                  <div>
                    <h2 className="text-lg sm:text-2xl font-bold text-gray-900">{selectedProgram.name}</h2>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                      {selectedProgram.duration} • {selectedProgram.credits} кредитов
                    </p>
                  </div>
                  <button
                    onClick={() => setIsProgramModalOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  >
                    <XMarkIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-500" />
                  </button>
                </div>
                <div className="mb-6">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Описание программы</h3>
                  <p className="text-gray-600 text-xs sm:text-base">{selectedProgram.description}</p>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Курсы</h3>
                  <div className="space-y-4">
                    {selectedProgram.courses.map((course, index) => (
                      <div
                        key={index}
                        className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl hover:shadow-md transition-all duration-200"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-gray-900 text-xs sm:text-base">{course.name}</h4>
                          <span className="text-xs sm:text-sm text-gray-500">{course.credits} кредитов</span>
                        </div>
                        <p className="text-gray-600 text-xs sm:text-sm mb-2">{course.description}</p>
                        <div className="flex items-center text-xs sm:text-sm text-gray-500">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100">
                            Семестр {course.semester}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Schools; 