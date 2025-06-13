'use client';

import { useState } from 'react';
import {
  UserGroupIcon,
  CalendarIcon,
  MapPinIcon,
  StarIcon,
  CheckCircleIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ChevronDownIcon,
  EnvelopeIcon,
  PhoneIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

interface Club {
  id: string;
  name: string;
  description: string;
  category: string;
  members: number;
  rating: number;
  events: {
    title: string;
    date: string;
    location: string;
  }[];
  achievements: string[];
  contacts: {
    email?: string;
    phone?: string;
    social?: string;
  };
}

const clubs: Club[] = [
  {
    id: '1',
    name: 'CHEERLEADERS ALMAU',
    description: 'Клуб по чирлидингу, участвующий в спортивных и студенческих мероприятиях. Известное шоу — «SHOW by CHEERS», а также хип‑хоп вечер «STEP UP».',
    category: 'sport',
    members: 25,
    rating: 4.9,
    events: [
      {
        title: 'SHOW by CHEERS',
        date: '15 апреля 2024',
        location: 'Главный зал'
      },
      {
        title: 'STEP UP',
        date: '20 мая 2024',
        location: 'Актовый зал'
      }
    ],
    achievements: [
      'Победители республиканского чемпионата по чирлидингу 2023',
      'Лучшее шоу года 2023'
    ],
    contacts: {
      email: 'cheerleaders@almau.edu.kz',
      social: '@cheerleaders_almau'
    }
  },
  {
    id: '2',
    name: 'LUMOS',
    description: 'Творческий клуб для развития вокальных и танцевальных навыков, игры на музыкальных инструментах. Организует мероприятия: Halloween by Lumos, Jazz&Soul, Cupid Amour.',
    category: 'creative',
    members: 40,
    rating: 4.8,
    events: [
      {
        title: 'Halloween by Lumos',
        date: '31 октября 2024',
        location: 'Актовый зал'
      },
      {
        title: 'Jazz&Soul',
        date: '15 ноября 2024',
        location: 'Музыкальная студия'
      }
    ],
    achievements: [
      'Победители студенческого фестиваля искусств 2023',
      'Лучший творческий клуб 2023'
    ],
    contacts: {
      email: 'lumos@almau.edu.kz',
      social: '@lumos_almau'
    }
  },
  {
    id: '3',
    name: 'REMUS',
    description: 'Ивент-клуб, организующий культурные и развлекательные события. Проводит DTMM, Christmas Eve, Remus Night, Secret Santa.',
    category: 'social',
    members: 35,
    rating: 4.7,
    events: [
      {
        title: 'DTMM',
        date: '1 декабря 2024',
        location: 'Главный кампус'
      },
      {
        title: 'Christmas Eve',
        date: '24 декабря 2024',
        location: 'Актовый зал'
      }
    ],
    achievements: [
      'Организаторы лучшего студенческого мероприятия 2023',
      'Лучший ивент-клуб 2023'
    ],
    contacts: {
      email: 'remus@almau.edu.kz',
      social: '@remus_almau'
    }
  },
  {
    id: '4',
    name: 'MAFIA',
    description: 'Клуб настольных игр, специализирующийся на игре "Мафия". Проводит игры в формате антикафе, регулярные мероприятия: Tokyo Drift, Friday the 13th.',
    category: 'social',
    members: 50,
    rating: 4.6,
    events: [
      {
        title: 'Tokyo Drift',
        date: '13 мая 2024',
        location: 'Антикафе'
      },
      {
        title: 'Friday the 13th',
        date: '13 сентября 2024',
        location: 'Антикафе'
      }
    ],
    achievements: [
      'Победители городского турнира по "Мафии" 2023',
      'Лучший клуб настольных игр 2023'
    ],
    contacts: {
      email: 'mafia@almau.edu.kz',
      social: '@mafia_almau'
    }
  },
  {
    id: '5',
    name: 'DOS',
    description: 'Благотворительный клуб, помогающий детям и нуждающимся. Организует ярмарки и концерты для социально уязвимых групп.',
    category: 'social',
    members: 30,
    rating: 4.9,
    events: [
      {
        title: 'День добра',
        date: '1 июня 2024',
        location: 'Главный кампус'
      },
      {
        title: 'Благотворительный концерт',
        date: '15 декабря 2024',
        location: 'Актовый зал'
      }
    ],
    achievements: [
      'Лучший благотворительный проект 2023',
      'Волонтеры года 2023'
    ],
    contacts: {
      email: 'dos@almau.edu.kz',
      social: '@dos_almau'
    }
  },
  {
    id: '6',
    name: 'SPORT LIFE (SPL)',
    description: 'Спортивный клуб, организующий футбольные и баскетбольные кубки, турниры по волейболу, настольным играм. Футзал, шахматы, FIFA.',
    category: 'sport',
    members: 45,
    rating: 4.8,
    events: [
      {
        title: 'Кубок по футболу',
        date: '10 мая 2024',
        location: 'Спортивный зал'
      },
      {
        title: 'Турнир по волейболу',
        date: '20 мая 2024',
        location: 'Спортивный зал'
      }
    ],
    achievements: [
      'Победители студенческой лиги по футболу 2023',
      'Лучший спортивный клуб 2023'
    ],
    contacts: {
      email: 'spl@almau.edu.kz',
      social: '@spl_almau'
    }
  },
  {
    id: '7',
    name: 'DAT (Dana Asyl Tyl)',
    description: 'Клуб по изучению казахского языка и культуры. Проводит встречи, кинопоказы, speaking-club, BAYSA QURULTAI.',
    category: 'academic',
    members: 35,
    rating: 4.7,
    events: [
      {
        title: 'Speaking Club',
        date: 'Каждый четверг',
        location: 'Аудитория 301'
      },
      {
        title: 'BAYSA QURULTAI',
        date: '15 мая 2024',
        location: 'Конференц-зал'
      }
    ],
    achievements: [
      'Лучший языковой клуб 2023',
      'Организаторы года по популяризации казахского языка'
    ],
    contacts: {
      email: 'dat@almau.edu.kz',
      social: '@dat_almau'
    }
  },
  {
    id: '8',
    name: 'MOF (Mass On Family)',
    description: 'Семейно-ориентированный ивент-клуб. Организует тематические мероприятия: MOF DAY, фото-охота, camping, свадьбы.',
    category: 'social',
    members: 40,
    rating: 4.8,
    events: [
      {
        title: 'MOF DAY',
        date: '20 апреля 2024',
        location: 'Главный кампус'
      },
      {
        title: 'Фото-охота',
        date: '1 июня 2024',
        location: 'Парк'
      }
    ],
    achievements: [
      'Лучший семейный клуб 2023',
      'Организаторы года по семейным мероприятиям'
    ],
    contacts: {
      email: 'mof@almau.edu.kz',
      social: '@mof_almau'
    }
  },
  {
    id: '9',
    name: 'HUNTERS',
    description: 'Клуб бренд-амбассадоров AlmaU. Занимается приёмом и сопровождением абитуриентов, участвует в образовательных выставках.',
    category: 'business',
    members: 25,
    rating: 4.9,
    events: [
      {
        title: 'День открытых дверей',
        date: '15 мая 2024',
        location: 'Главный кампус'
      },
      {
        title: 'Образовательная выставка',
        date: '1 июня 2024',
        location: 'ЭКСПО'
      }
    ],
    achievements: [
      'Лучшие амбассадоры 2023',
      'Победители конкурса студенческих инициатив'
    ],
    contacts: {
      email: 'hunters@almau.edu.kz',
      social: '@hunters_almau'
    }
  },
  {
    id: '10',
    name: 'Школа актёрского мастерства',
    description: 'Клуб для развития актёрских навыков. Проводит регулярные выступления, обучение актёрской технике и сценическим навыкам.',
    category: 'creative',
    members: 30,
    rating: 4.7,
    events: [
      {
        title: 'Театральный вечер',
        date: '20 мая 2024',
        location: 'Актовый зал'
      },
      {
        title: 'Мастер-класс по актёрскому мастерству',
        date: '1 июня 2024',
        location: 'Театральная студия'
      }
    ],
    achievements: [
      'Победители студенческого театрального фестиваля 2023',
      'Лучшая театральная студия 2023'
    ],
    contacts: {
      email: 'theater@almau.edu.kz',
      social: '@theater_almau'
    }
  },
  {
    id: '11',
    name: 'Киноклуб',
    description: 'Клуб для любителей кино. Организует просмотры и обсуждения фильмов, встречи с режиссёрами.',
    category: 'creative',
    members: 35,
    rating: 4.6,
    events: [
      {
        title: 'Кинопоказ',
        date: 'Каждую пятницу',
        location: 'Кинозал'
      },
      {
        title: 'Встреча с режиссёром',
        date: '15 мая 2024',
        location: 'Конференц-зал'
      }
    ],
    achievements: [
      'Организаторы лучшего киноклуба 2023',
      'Победители студенческого кинофестиваля'
    ],
    contacts: {
      email: 'cinema@almau.edu.kz',
      social: '@cinema_almau'
    }
  },
  {
    id: '12',
    name: 'Книжный клуб',
    description: 'Клуб для любителей литературы. Проводит обсуждения книг, встречи с авторами, литературные вечера.',
    category: 'academic',
    members: 40,
    rating: 4.8,
    events: [
      {
        title: 'Литературный вечер',
        date: 'Каждый вторник',
        location: 'Библиотека'
      },
      {
        title: 'Встреча с автором',
        date: '20 мая 2024',
        location: 'Конференц-зал'
      }
    ],
    achievements: [
      'Лучший книжный клуб 2023',
      'Организаторы года по популяризации чтения'
    ],
    contacts: {
      email: 'bookclub@almau.edu.kz',
      social: '@bookclub_almau'
    }
  }
];

const categories = [
  { id: 'all', name: 'Все клубы' },
  { id: 'sport', name: 'Спорт' },
  { id: 'creative', name: 'Творчество' },
  { id: 'social', name: 'Социальные' },
  { id: 'academic', name: 'Академические' },
  { id: 'business', name: 'Бизнес' }
];

export default function ClubsPage() {
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredClubs = clubs.filter((club) => {
    const matchesSearch = club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      club.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || club.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-blue-600">
            Студенческие клубы
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Присоединяйтесь к клубам по интересам, развивайтесь и находите единомышленников
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
                placeholder="Поиск клубов..."
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

        {/* Clubs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredClubs.map((club) => (
            <div
              key={club.id}
              className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 hover:border-red-100 transform hover:-translate-y-1"
              onClick={() => {
                setSelectedClub(club);
                setIsModalOpen(true);
              }}
            >
              <div className="p-4 md:p-6">
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-red-600 to-blue-600 text-white mr-4">
                    <UserGroupIcon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 group-hover:text-red-600 transition-colors duration-200">
                    {club.name}
                  </h3>
                </div>
                <p className="text-sm md:text-base text-gray-600 mb-4 line-clamp-2">{club.description}</p>
                <div className="flex items-center justify-between text-xs md:text-sm text-gray-500">
                  <div className="flex items-center">
                    <UserGroupIcon className="h-4 w-4 mr-1 text-red-600" />
                    <span>{club.members} участников</span>
                  </div>
                  <div className="flex items-center">
                    <StarIcon className="h-4 w-4 mr-1 text-red-600" />
                    <span>{club.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {isModalOpen && selectedClub && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-4 md:p-6">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-red-600 to-blue-600 text-white mr-4">
                      <UserGroupIcon className="h-8 w-8" />
                    </div>
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold text-gray-900">{selectedClub.name}</h2>
                      <div className="flex items-center mt-1">
                        <StarIcon className="h-5 w-5 text-red-600 mr-1" />
                        <span className="text-gray-600">{selectedClub.rating}</span>
                        <span className="mx-2 text-gray-300">•</span>
                        <span className="text-gray-600">{selectedClub.members} участников</span>
                      </div>
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
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">О клубе</h3>
                    <p className="text-gray-600 mb-6">{selectedClub.description}</p>

                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Достижения</h3>
                    <div className="space-y-2">
                      {selectedClub.achievements.map((achievement, index) => (
                        <div
                          key={index}
                          className="flex items-center p-3 bg-gradient-to-r from-red-50 to-blue-50 rounded-lg"
                        >
                          <CheckCircleIcon className="h-5 w-5 text-red-600 mr-3" />
                          <span className="text-gray-700">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Ближайшие события</h3>
                    <div className="space-y-4">
                      {selectedClub.events.map((event, index) => (
                        <div key={index} className="bg-white rounded-lg p-4 border border-gray-100">
                          <h4 className="font-medium text-gray-900 mb-2">{event.title}</h4>
                          <div className="space-y-2">
                            <div className="flex items-center text-sm text-gray-600">
                              <CalendarIcon className="h-4 w-4 mr-2 text-red-600" />
                              {event.date}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <MapPinIcon className="h-4 w-4 mr-2 text-red-600" />
                              {event.location}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-4">Контакты</h3>
                    <div className="space-y-3">
                      {selectedClub.contacts.email && (
                        <div className="flex items-center p-3 bg-gradient-to-r from-red-50 to-blue-50 rounded-lg">
                          <EnvelopeIcon className="h-5 w-5 text-red-600 mr-3" />
                          <a href={`mailto:${selectedClub.contacts.email}`} className="text-gray-700 hover:text-red-600">
                            {selectedClub.contacts.email}
                          </a>
                        </div>
                      )}
                      {selectedClub.contacts.phone && (
                        <div className="flex items-center p-3 bg-gradient-to-r from-red-50 to-blue-50 rounded-lg">
                          <PhoneIcon className="h-5 w-5 text-red-600 mr-3" />
                          <a href={`tel:${selectedClub.contacts.phone}`} className="text-gray-700 hover:text-red-600">
                            {selectedClub.contacts.phone}
                          </a>
                        </div>
                      )}
                      {selectedClub.contacts.social && (
                        <div className="flex items-center p-3 bg-gradient-to-r from-red-50 to-blue-50 rounded-lg">
                          <GlobeAltIcon className="h-5 w-5 text-red-600 mr-3" />
                          <a href={`https://instagram.com/${selectedClub.contacts.social}`} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-red-600">
                            {selectedClub.contacts.social}
                          </a>
                        </div>
                      )}
                    </div>
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