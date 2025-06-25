import React, { useState, useEffect } from 'react';
import { 
  BellIcon, 
  CalendarIcon, 
  UserGroupIcon,
  ChevronRightIcon,
  TagIcon,
  ClockIcon,
  XMarkIcon,
  ShareIcon,
  BookmarkIcon,
  BookmarkSlashIcon
} from '@heroicons/react/24/outline';

const categories = [
  { id: 'all', name: 'Все новости', icon: BellIcon },
  { id: 'academic', name: 'Академические', icon: TagIcon },
  { id: 'events', name: 'События', icon: CalendarIcon },
  { id: 'announcements', name: 'Объявления', icon: BellIcon },
];

const sampleNews = [
  {
    id: 1,
    title: 'Открытие нового исследовательского центра',
    category: 'academic',
    date: '2024-03-15',
    author: 'Др. Сара Джонсон',
    content: 'AlmaU с гордостью объявляет об открытии нашего нового исследовательского центра. Центр предоставит студентам и преподавателям современное оборудование и пространства для инновационных исследовательских проектов.',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    readTime: '5 мин',
  },
  {
    id: 2,
    title: 'Ярмарка карьеры Весна 2024',
    category: 'events',
    date: '2024-03-10',
    author: 'Центр карьеры',
    content: 'Присоединяйтесь к ежегодной весенней ярмарке карьеры, где вы сможете встретиться с ведущими работодателями и изучить возможности стажировки и трудоустройства. Мероприятие будет включать мастер-классы, нетворкинг и индивидуальные собеседования.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    readTime: '4 мин',
  },
  {
    id: 3,
    title: 'Регистрация на осенний семестр',
    category: 'announcements',
    date: '2024-03-05',
    author: 'Офис регистратора',
    content: 'Регистрация на осенний семестр 2024 года начнется 1 апреля. Пожалуйста, убедитесь, что все ваши документы актуальны, и встретьтесь с вашим академическим консультантом для планирования расписания курсов.',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    readTime: '3 мин',
  },
  {
    id: 4,
    title: 'Программа международного обмена студентами',
    category: 'academic',
    date: '2024-03-01',
    author: 'Международный офис',
    content: 'Открыт прием заявок на программу обмена на весенний семестр. Студенты могут выбрать из университетов-партнеров в Европе, Азии и Северной Америке. Не упустите возможность учиться за границей!',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    readTime: '6 мин',
  },
];

const News: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedNews, setSelectedNews] = useState<typeof sampleNews[0] | null>(null);
  const [bookmarkedNews, setBookmarkedNews] = useState<number[]>([]);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [shareStatus, setShareStatus] = useState<string | null>(null);

  // Load bookmarks from localStorage on component mount
  useEffect(() => {
    const savedBookmarks = localStorage.getItem('bookmarkedNews');
    if (savedBookmarks) {
      setBookmarkedNews(JSON.parse(savedBookmarks));
    }
  }, []);

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('bookmarkedNews', JSON.stringify(bookmarkedNews));
  }, [bookmarkedNews]);

  const toggleBookmark = (newsId: number) => {
    setBookmarkedNews(prev => {
      if (prev.includes(newsId)) {
        return prev.filter(id => id !== newsId);
      } else {
        return [...prev, newsId];
      }
    });
  };

  const isBookmarked = (newsId: number) => bookmarkedNews.includes(newsId);

  const filteredNews = selectedCategory === 'all'
    ? sampleNews
    : sampleNews.filter(news => news.category === selectedCategory);

  const bookmarkedNewsItems = sampleNews.filter(news => isBookmarked(news.id));

  // Функция для шаринга
  const handleShare = (news: typeof sampleNews[0]) => {
    const shareData = {
      title: news.title,
      text: news.content,
      url: window.location.href + `#news-${news.id}`
    };
    if (navigator.share) {
      navigator.share(shareData)
        .then(() => setShareStatus('Успешно поделились!'))
        .catch(() => setShareStatus('Не удалось поделиться.'));
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(shareData.url)
        .then(() => setShareStatus('Ссылка скопирована!'))
        .catch(() => setShareStatus('Не удалось скопировать ссылку.'));
    } else {
      setShareStatus('Ваш браузер не поддерживает функцию поделиться.');
    }
    setTimeout(() => setShareStatus(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-10"></div>
            <div className="relative p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
                  <BellIcon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Новости университета</h1>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowBookmarks(!showBookmarks)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl border border-blue-200 bg-white text-blue-700 hover:bg-blue-50 shadow transition-all duration-200 font-medium ${showBookmarks ? 'bg-blue-100' : ''}`}
                >
                  <BookmarkIcon className="h-5 w-5" />
                  <span className="text-sm font-medium">
                    Закладки {bookmarkedNews.length > 0 && `(${bookmarkedNews.length})`}
                  </span>
                </button>
                <div className="flex items-center space-x-2">
                  <ClockIcon className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-500">Обновлено: {new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                      selectedCategory === category.id
                        ? 'bg-blue-100 text-blue-700 shadow-sm'
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

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(showBookmarks ? bookmarkedNewsItems : filteredNews).map((news) => (
                <article 
                  key={news.id} 
                  className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-200 overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        news.category === 'academic' ? 'bg-blue-100 text-blue-700' :
                        news.category === 'events' ? 'bg-green-100 text-green-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>
                        {categories.find(c => c.id === news.category)?.name}
                      </span>
                    </div>
                    <button
                      onClick={() => toggleBookmark(news.id)}
                      className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200"
                    >
                      {isBookmarked(news.id) ? (
                        <BookmarkIcon className="h-5 w-5 text-blue-600" />
                      ) : (
                        <BookmarkSlashIcon className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        {new Date(news.date).toLocaleDateString()}
                      </span>
                      <span className="flex items-center">
                        <UserGroupIcon className="h-4 w-4 mr-1" />
                        {news.author}
                      </span>
                      <span className="flex items-center">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        {news.readTime}
                      </span>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                      {news.title}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {news.content}
                    </p>
                    <button 
                      onClick={() => setSelectedNews(news)}
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group"
                    >
                      Читать далее
                      <ChevronRightIcon className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* News Modal */}
        {selectedNews && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-2 sm:p-4 z-50">
            <div className="bg-white rounded-2xl sm:rounded-3xl max-w-xs sm:max-w-md md:max-w-2xl w-full max-h-[90vh] overflow-y-auto mx-auto shadow-2xl animate-slide-up">
              <div className="relative h-40 sm:h-64">
                <img
                  src={selectedNews.image}
                  alt={selectedNews.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedNews(null)}
                  className="absolute top-2 right-2 sm:top-4 sm:right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <XMarkIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" />
                </button>
              </div>
              <div className="p-3 sm:p-6">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      selectedNews.category === 'academic' ? 'bg-blue-100 text-blue-700' :
                      selectedNews.category === 'events' ? 'bg-green-100 text-green-700' :
                      'bg-purple-100 text-purple-700'
                    }`}>
                      {categories.find(c => c.id === selectedNews.category)?.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(selectedNews.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button 
                      onClick={() => toggleBookmark(selectedNews.id)}
                      className="p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                    >
                      {isBookmarked(selectedNews.id) ? (
                        <BookmarkIcon className="h-5 w-5 text-blue-600" />
                      ) : (
                        <BookmarkSlashIcon className="h-5 w-5" />
                      )}
                    </button>
                    <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200">
                      <ShareIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <h1 className="text-lg sm:text-3xl font-bold text-gray-900 mb-4">
                  {selectedNews.title}
                </h1>

                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 text-xs sm:text-sm text-gray-500 mb-6 space-y-2 sm:space-y-0">
                  <span className="flex items-center">
                    <UserGroupIcon className="h-5 w-5 mr-2" />
                    {selectedNews.author}
                  </span>
                  <span className="flex items-center">
                    <ClockIcon className="h-5 w-5 mr-2" />
                    {selectedNews.readTime} чтения
                  </span>
                </div>

                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-600 leading-relaxed">
                    {selectedNews.content}
                  </p>
                  <p className="text-gray-600 leading-relaxed mt-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <p className="text-gray-600 leading-relaxed mt-4">
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                  <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto justify-end">
                    <button 
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-xs sm:text-base"
                      onClick={() => handleShare(selectedNews)}
                    >
                      Поделиться
                    </button>
                    <button 
                      onClick={() => toggleBookmark(selectedNews.id)}
                      className={`px-4 py-2 border rounded-lg transition-colors duration-200 text-xs sm:text-base ${
                        isBookmarked(selectedNews.id)
                          ? 'border-blue-600 text-blue-600 hover:bg-blue-50'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {isBookmarked(selectedNews.id) ? 'Удалить из закладок' : 'Сохранить'}
                    </button>
                    <button
                      onClick={() => setSelectedNews(null)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 text-xs sm:text-base"
                    >
                      Закрыть
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {shareStatus && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-xl shadow-lg z-50 animate-fade-in">
            {shareStatus}
          </div>
        )}
      </div>
    </div>
  );
};

export default News; 