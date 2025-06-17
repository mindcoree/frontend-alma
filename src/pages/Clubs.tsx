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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0">
          <div className="animate-fade-in">
            <h1 className="text-3xl font-bold text-gray-900">Студенческие клубы</h1>
            <p className="mt-2 text-gray-600">Откройте для себя новые возможности и присоединяйтесь к нашим клубам</p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 animate-slide-in-right">
            <div className="relative flex-1 sm:flex-none">
              <input
                type="text"
                placeholder="Поиск клубов..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm transition-all duration-300 hover:shadow-md"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-xl bg-white shadow-sm hover:bg-gray-50 transition-all duration-300 hover:shadow-md"
            >
              <FunnelIcon className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-gray-700">Фильтры</span>
              {selectedTags.length > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-sm animate-bounce-in">
                  {selectedTags.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="mb-8 bg-white rounded-2xl shadow-sm p-6 animate-slide-down">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Категории</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category, index) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex items-center px-4 py-2 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                        selectedCategory === category.id
                          ? 'bg-blue-500 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      style={{ animationDelay: `${index * 50}ms` }}
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
                      className={`px-4 py-2 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                        selectedTags.includes(tag)
                          ? 'bg-blue-500 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {selectedTags.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-200 animate-fade-in">
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
                      className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full animate-bounce-in"
                      style={{ animationDelay: `${index * 100}ms` }}
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClubs.map((club, index) => (
            <div
              key={club.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => setSelectedClub(club)}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">{club.name}</h2>
                  <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full transition-all duration-300 hover:bg-yellow-100">
                    <StarIcon className="h-5 w-5 text-yellow-400" />
                    <span className="ml-1 text-sm font-medium text-yellow-800">{club.rating}</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-3">{club.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {club.tags.map((tag, tagIndex) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs transition-all duration-300 hover:bg-gray-200"
                      style={{ animationDelay: `${tagIndex * 50}ms` }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center bg-blue-50 px-3 py-1 rounded-full transition-all duration-300 hover:bg-blue-100">
                    <UserGroupIcon className="h-5 w-5 text-blue-500" />
                    <span className="ml-1 text-blue-700 font-medium">{club.members} участников</span>
                  </div>
                  <span className="capitalize px-3 py-1 bg-gray-100 rounded-full text-gray-700 transition-all duration-300 hover:bg-gray-200">
                    {categories.find(c => c.id === club.category)?.name}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedClub && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slide-up">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedClub.name}</h2>
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
                    <XMarkIcon className="h-6 w-6 text-gray-500" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-2xl p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">О клубе</h3>
                    <p className="text-gray-600 leading-relaxed">{selectedClub.description}</p>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Ближайшие мероприятия</h3>
                    <div className="space-y-3">
                      {selectedClub.events.map((event, index) => (
                        <div key={index} className="flex items-start space-x-3 bg-white p-3 rounded-xl">
                          <CalendarIcon className="h-5 w-5 text-blue-500 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{event.title}</p>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
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
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Достижения</h3>
                    <ul className="space-y-2">
                      {selectedClub.achievements.map((achievement, index) => (
                        <li key={index} className="flex items-start bg-white p-3 rounded-xl">
                          <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <span className="text-gray-600">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Контакты</h3>
                    <div className="space-y-2">
                      {selectedClub.contacts.email && (
                        <div className="flex items-center bg-white p-3 rounded-xl">
                          <EnvelopeIcon className="h-5 w-5 text-blue-500 mr-2" />
                          <span className="text-gray-600">{selectedClub.contacts.email}</span>
                        </div>
                      )}
                      {selectedClub.contacts.phone && (
                        <div className="flex items-center bg-white p-3 rounded-xl">
                          <PhoneIcon className="h-5 w-5 text-blue-500 mr-2" />
                          <span className="text-gray-600">{selectedClub.contacts.phone}</span>
                        </div>
                      )}
                      {selectedClub.contacts.social && (
                        <div className="flex items-center bg-white p-3 rounded-xl">
                          <GlobeAltIcon className="h-5 w-5 text-blue-500 mr-2" />
                          <span className="text-gray-600">{selectedClub.contacts.social}</span>
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