'use client';

import { useState } from 'react';
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
  UserIcon
} from '@heroicons/react/24/outline';

interface School {
  id: string;
  name: string;
  description: string;
  programs: string[];
  contacts: {
    email?: string;
    phone?: string;
    office?: string;
  };
  staff: {
    role: string;
    name: string;
    email?: string;
  }[];
  founded?: number;
  icon: any;
  color: string;
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
    icon: AcademicCapIcon,
    color: 'text-red-600',
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
    icon: CurrencyDollarIcon,
    color: 'text-red-600',
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
  },
  {
    id: 'digital',
    name: 'Школа Цифровых Технологий',
    description: 'Современные программы в области информационных технологий и цифровой трансформации.',
    programs: ['Информационные технологии', 'Цифровая трансформация'],
    contacts: {},
    staff: [],
    icon: ComputerDesktopIcon,
    color: 'text-red-600',
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
    color: 'text-red-600',
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
  },
];

const categories = [
  { id: 'all', name: 'Все школы' },
  { id: 'business', name: 'Бизнес' },
  { id: 'technology', name: 'Технологии' },
  { id: 'creative', name: 'Креативные' },
  { id: 'social', name: 'Социальные' },
];

export default function SchoolsPage() {
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredSchools = schools.filter((school) => {
    const matchesSearch = school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      school.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || school.id.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-blue-600">
            Школы AlmaU
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Выберите школу, которая соответствует вашим интересам и карьерным целям
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6 md:mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="Поиск школ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FunnelIcon className="h-5 w-5 text-gray-400" />
              </div>
              <select
                className="block w-full pl-10 pr-10 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 appearance-none"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <ChevronDownIcon className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Schools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredSchools.map((school) => (
            <div
              key={school.id}
              className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 hover:border-red-100 transform hover:-translate-y-1"
              onClick={() => {
                setSelectedSchool(school);
                setIsModalOpen(true);
              }}
            >
              <div className="p-4 md:p-6">
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-red-600 to-blue-600 text-white mr-4">
                    <school.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 group-hover:text-red-600 transition-colors duration-200">
                    {school.name}
                  </h3>
                </div>
                <p className="text-sm md:text-base text-gray-600 mb-4 line-clamp-2">{school.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {school.programs.slice(0, 3).map((program, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-red-50 to-blue-50 text-red-700"
                    >
                      {program}
                    </span>
                  ))}
                  {school.programs.length > 3 && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-50 text-gray-700">
                      +{school.programs.length - 3}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between text-xs md:text-sm text-gray-500">
                  <div className="flex items-center">
                    <UserGroupIcon className="h-4 w-4 mr-1 text-red-600" />
                    <span>{school.staff.length} преподавателей</span>
                  </div>
                  {school.founded && (
                    <div className="flex items-center">
                      <TrophyIcon className="h-4 w-4 mr-1 text-red-600" />
                      <span>Основана в {school.founded}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {isModalOpen && selectedSchool && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-4 md:p-6">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-red-600 to-blue-600 text-white mr-4">
                      <selectedSchool.icon className="h-8 w-8" />
                    </div>
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold text-gray-900">{selectedSchool.name}</h2>
                      {selectedSchool.founded && (
                        <p className="text-sm text-gray-500">Основана в {selectedSchool.founded}</p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  >
                    <XMarkIcon className="h-6 w-6 text-gray-500" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">О школе</h3>
                    <p className="text-gray-600 mb-6">{selectedSchool.description}</p>

                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Программы</h3>
                    <div className="space-y-2">
                      {selectedSchool.programs.map((program, index) => (
                        <div
                          key={index}
                          className="flex items-center p-3 bg-gradient-to-r from-red-50 to-blue-50 rounded-lg"
                        >
                          <BookOpenIcon className="h-5 w-5 text-red-600 mr-3" />
                          <span className="text-gray-700">{program}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Контакты</h3>
                    <div className="space-y-4">
                      {selectedSchool.contacts.email && (
                        <div className="flex items-center">
                          <EnvelopeIcon className="h-5 w-5 text-red-600 mr-3" />
                          <a href={`mailto:${selectedSchool.contacts.email}`} className="text-gray-700 hover:text-red-600">
                            {selectedSchool.contacts.email}
                          </a>
                        </div>
                      )}
                      {selectedSchool.contacts.phone && (
                        <div className="flex items-center">
                          <PhoneIcon className="h-5 w-5 text-red-600 mr-3" />
                          <a href={`tel:${selectedSchool.contacts.phone}`} className="text-gray-700 hover:text-red-600">
                            {selectedSchool.contacts.phone}
                          </a>
                        </div>
                      )}
                      {selectedSchool.contacts.office && (
                        <div className="flex items-center">
                          <MapPinIcon className="h-5 w-5 text-red-600 mr-3" />
                          <span className="text-gray-700">Кабинет {selectedSchool.contacts.office}</span>
                        </div>
                      )}
                    </div>

                    {selectedSchool.staff.length > 0 && (
                      <>
                        <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-4">Преподаватели</h3>
                        <div className="space-y-3">
                          {selectedSchool.staff.map((member, index) => (
                            <div key={index} className="flex items-center p-3 bg-gradient-to-r from-red-50 to-blue-50 rounded-lg">
                              <UserIcon className="h-5 w-5 text-red-600 mr-3" />
                              <div>
                                <p className="font-medium text-gray-900">{member.name}</p>
                                <p className="text-sm text-gray-500">{member.role}</p>
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
      </div>
    </div>
  );
} 