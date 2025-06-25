import React, { useState } from 'react';
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
import { motion } from 'framer-motion';

interface Club {
  id: string;
  name: string;
  description: string;
  category: string;
  members: number;
  rating: number;
  tags: string[];
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
    tags: ['танцы', 'спорт', 'шоу', 'выступления'],
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
    tags: ['музыка', 'творчество', 'искусство'],
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
    tags: ['культура', 'развлечения'],
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
    tags: ['игры', 'настольные'],
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
    tags: ['благотворительность', 'волонтерство'],
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
    tags: ['спорт', 'футбол', 'баскетбол'],
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
    tags: ['языки', 'культура'],
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
    tags: ['семья', 'мероприятия'],
    events: [
      {
        title: 'MOF DAY',
        date: '20 апреля 2024',
        location: 'Главный кампус'
      },
      {
        title: 'Фото-охота',
        date: '25 мая 2024',
        location: 'Городской парк'
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
  }
];

const categories = [
  { id: 'all', name: 'Все клубы', icon: UserGroupIcon },
  { id: 'sport', name: 'Спорт', icon: StarIcon },
  { id: 'creative', name: 'Творчество', icon: StarIcon },
  { id: 'social', name: 'Социальные', icon: StarIcon },
  { id: 'academic', name: 'Академические', icon: StarIcon }
];

const popularTags = ['танцы', 'музыка', 'спорт', 'искусство', 'наука', 'волонтерство', 'языки', 'технологии'];

const Clubs: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filteredClubs = clubs.filter(club => {
    const matchesSearch = club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      club.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || club.category === selectedCategory;
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.every(tag => club.tags.includes(tag));
    return matchesSearch && matchesCategory && matchesTags;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="bg-white shadow-2xl rounded-3xl overflow-hidden border">
          {/* Hero Section */}
          <div className="text-center p-6 sm:p-8 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Студенческие клубы</h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">Откройте для себя новые возможности и присоединяйтесь к нашим клубам</p>
          </div>
          {/* Search and Filter Section */}
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Поиск клубов..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
              <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center px-6 py-3 rounded-xl border border-blue-200 bg-white text-blue-700 hover:bg-blue-50 shadow transition-all duration-200 font-medium"
                >
                  <FunnelIcon className="h-5 w-5 mr-2" />
                  Фильтры
                  {selectedTags.length > 0 && (
                    <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-sm">
                      {selectedTags.length}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>

          {showFilters && (
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Категории</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category, index) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                          selectedCategory === category.id
                            ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                            : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
                        }`}
                      >
                        <category.icon className="h-5 w-5 mr-2" />
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Популярные теги</h3>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map((tag, index) => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                          selectedTags.includes(tag)
                            ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                            : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              {selectedTags.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Выбранные теги</h3>
                    <button
                      onClick={() => setSelectedTags([])}
                      className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-300"
                    >
                      Очистить все
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedTags.map((tag, index) => (
                      <div
                        key={tag}
                        className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
                      >
                        <span>{tag}</span>
                        <button
                          onClick={() => toggleTag(tag)}
                          className="ml-2 text-blue-500 hover:text-blue-700 transition-colors duration-300"
                        >
                          <XMarkIcon className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredClubs.map((club) => (
                <motion.div
                  key={club.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
                  onClick={() => setSelectedClub(club)}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold text-gray-900">{club.name}</h2>
                      <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                        <StarIcon className="h-5 w-5 text-yellow-400" />
                        <span className="ml-1 text-sm font-medium text-yellow-800">{club.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-3">{club.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {club.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center bg-blue-50 px-3 py-1 rounded-full">
                        <UserGroupIcon className="h-5 w-5 text-blue-500" />
                        <span className="ml-1 text-blue-700 font-medium">{club.members} участников</span>
                      </div>
                      <span className="capitalize px-3 py-1 bg-gray-100 rounded-full text-gray-700">
                        {categories.find(c => c.id === club.category)?.name}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {selectedClub && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="fixed inset-0 bg-black/50 flex items-center justify-center p-2 sm:p-4 z-50">
              <div className="bg-white rounded-2xl sm:rounded-3xl max-w-xs sm:max-w-md md:max-w-2xl w-full max-h-[90vh] overflow-y-auto mx-auto shadow-2xl animate-slide-up">
                <div className="p-3 sm:p-6">
                  <div className="flex justify-between items-start mb-4 sm:mb-6">
                    <div>
                      <h2 className="text-lg sm:text-2xl font-bold text-gray-900">{selectedClub.name}</h2>
                      <div className="flex items-center mt-2">
                        <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                          <StarIcon className="h-5 w-5 text-yellow-400" />
                          <span className="ml-1 text-sm font-medium text-yellow-800">{selectedClub.rating}</span>
                        </div>
                        <div className="flex items-center bg-blue-50 px-3 py-1 rounded-full ml-3">
                          <UserGroupIcon className="h-5 w-5 text-blue-500" />
                          <span className="ml-1 text-sm font-medium text-blue-700">{selectedClub.members} участников</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedClub(null)}
                      className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <XMarkIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-500" />
                    </button>
                  </div>
                  <div className="space-y-4 sm:space-y-6">
                    <div className="bg-gray-50 rounded-2xl p-4">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">О клубе</h3>
                      <p className="text-gray-600 leading-relaxed text-xs sm:text-base">{selectedClub.description}</p>
                    </div>
                    <div className="bg-gray-50 rounded-2xl p-4">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Ближайшие мероприятия</h3>
                      <div className="space-y-3">
                        {selectedClub.events.map((event, index) => (
                          <div key={index} className="flex items-start space-x-3 bg-white p-3 rounded-xl">
                            <CalendarIcon className="h-5 w-5 text-blue-500 mt-0.5" />
                            <div>
                              <p className="text-xs sm:text-sm font-medium text-gray-900">{event.title}</p>
                              <div className="flex items-center text-xs sm:text-sm text-gray-500 mt-1">
                                <span>{event.date}</span>
                                <span className="mx-2">•</span>
                                <MapPinIcon className="h-4 w-4 mr-1" />
                                <span>{event.location}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-2xl p-4">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Достижения</h3>
                      <ul className="space-y-2">
                        {selectedClub.achievements.map((achievement, index) => (
                          <li key={index} className="flex items-start bg-white p-3 rounded-xl">
                            <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                            <span className="text-gray-600 text-xs sm:text-base">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-gray-50 rounded-2xl p-4">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Контакты</h3>
                      <div className="space-y-2">
                        {selectedClub.contacts.email && (
                          <div className="flex items-center bg-white p-3 rounded-xl">
                            <EnvelopeIcon className="h-5 w-5 text-blue-500 mr-2" />
                            <span className="text-gray-600 text-xs sm:text-base">{selectedClub.contacts.email}</span>
                          </div>
                        )}
                        {selectedClub.contacts.phone && (
                          <div className="flex items-center bg-white p-3 rounded-xl">
                            <PhoneIcon className="h-5 w-5 text-blue-500 mr-2" />
                            <span className="text-gray-600 text-xs sm:text-base">{selectedClub.contacts.phone}</span>
                          </div>
                        )}
                        {selectedClub.contacts.social && (
                          <div className="flex items-center bg-white p-3 rounded-xl">
                            <GlobeAltIcon className="h-5 w-5 text-blue-500 mr-2" />
                            <span className="text-gray-600 text-xs sm:text-base">{selectedClub.contacts.social}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

// Add these styles to your global CSS or create a new CSS module
const styles = `
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideInRight {
  from { transform: translateX(20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

@keyframes slideDown {
  from { transform: translateY(-20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes bounceIn {
  0% { transform: scale(0.3); opacity: 0; }
  50% { transform: scale(1.05); }
  70% { transform: scale(0.9); }
  100% { transform: scale(1); opacity: 1; }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

.animate-slide-in-right {
  animation: slideInRight 0.5s ease-out forwards;
}

.animate-slide-down {
  animation: slideDown 0.5s ease-out forwards;
}

.animate-slide-up {
  animation: slideUp 0.5s ease-out forwards;
}

.animate-bounce-in {
  animation: bounceIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
}
`;

// Add the styles to the document
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default Clubs; 