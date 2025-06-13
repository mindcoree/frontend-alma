'use client';

import { useState } from 'react';
import {
  BuildingOffice2Icon,
  AcademicCapIcon,
  BeakerIcon,
  MicrophoneIcon,
  VideoCameraIcon,
  ComputerDesktopIcon,
  UserGroupIcon,
  MapPinIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

interface Floor {
  number: number;
  name: string;
  facilities: Facility[];
}

interface Facility {
  id: string;
  name: string;
  description: string;
  icon: any;
  capacity?: number;
  currentOccupancy?: number;
  type: 'classroom' | 'laboratory' | 'office' | 'studio' | 'common';
}

const buildings = [
  {
    id: 'kb',
    name: 'Knowledge Building',
    floors: [
      {
        number: 3,
        name: 'Graduate School of Business',
        facilities: [
          {
            id: 'mba-1',
            name: 'MBA Программы',
            description: 'Аудитория для программ MBA и докторантуры',
            icon: AcademicCapIcon,
            capacity: 30,
            currentOccupancy: 25,
            type: 'classroom' as const,
          },
          {
            id: 'mba-2',
            name: 'Ассоциация MBA',
            description: 'Зал заседаний ассоциации MBA',
            icon: UserGroupIcon,
            capacity: 20,
            currentOccupancy: 15,
            type: 'classroom' as const,
          },
        ],
      },
      {
        number: 4,
        name: 'Инновационные лаборатории',
        facilities: [
          {
            id: 'design-lab',
            name: 'DesignLab',
            description: 'Лаборатория дизайна и креативных технологий',
            icon: BeakerIcon,
            capacity: 25,
            currentOccupancy: 20,
            type: 'laboratory' as const,
          },
          {
            id: 'media-lab',
            name: 'MediaLab',
            description: 'Лаборатория журналистики и мультимедиа',
            icon: VideoCameraIcon,
            capacity: 20,
            currentOccupancy: 18,
            type: 'laboratory' as const,
          },
          {
            id: 'cyber-lab',
            name: 'Cyber Security Lab',
            description: 'Лаборатория кибербезопасности',
            icon: ComputerDesktopIcon,
            capacity: 15,
            currentOccupancy: 12,
            type: 'laboratory' as const,
          },
        ],
      },
      {
        number: 5,
        name: 'Администрация',
        facilities: [
          {
            id: 'rector',
            name: 'Офис ректора',
            description: 'Приемная ректора и зал заседаний',
            icon: BuildingOffice2Icon,
            type: 'office' as const,
          },
          {
            id: 'trustees',
            name: 'Попечительский совет',
            description: 'Зал заседаний попечительского совета',
            icon: UserGroupIcon,
            type: 'office' as const,
          },
        ],
      },
    ],
  },
];

const specializedLabs = [
  {
    id: 'lab-1',
    name: 'Лаборатория робототехники',
    description: 'Современная лаборатория для разработки и тестирования роботов. Оснащена 3D-принтерами, станками с ЧПУ и набором электронных компонентов.',
    capacity: 20,
    currentOccupancy: 15,
    equipment: [
      '3D-принтеры',
      'Станки с ЧПУ',
      'Наборы Arduino',
      'Сенсоры и датчики',
      'Паяльные станции'
    ],
    schedule: 'Пн-Пт: 9:00-18:00',
    location: 'Корпус A, 3 этаж',
    image: '/images/robotics-lab.jpg'
  },
  {
    id: 'lab-2',
    name: 'Лаборатория искусственного интеллекта',
    description: 'Передовая лаборатория для исследований в области машинного обучения и искусственного интеллекта. Оснащена мощными вычислительными серверами.',
    capacity: 15,
    currentOccupancy: 8,
    equipment: [
      'GPU-серверы',
      'Рабочие станции',
      'Наборы данных',
      'Специализированное ПО'
    ],
    schedule: 'Пн-Пт: 10:00-19:00',
    location: 'Корпус B, 2 этаж',
    image: '/images/ai-lab.jpg'
  },
  {
    id: 'lab-3',
    name: 'Лаборатория виртуальной реальности',
    description: 'Инновационная лаборатория для разработки VR/AR приложений. Оснащена современными VR-шлемами и оборудованием для трекинга движений.',
    capacity: 10,
    currentOccupancy: 5,
    equipment: [
      'VR-шлемы',
      'Контроллеры',
      'Трекинговые системы',
      'Мощные ПК'
    ],
    schedule: 'Пн-Пт: 11:00-20:00',
    location: 'Корпус C, 1 этаж',
    image: '/images/vr-lab.jpg'
  }
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

export default function CampusMap() {
  const [selectedBuilding, setSelectedBuilding] = useState(buildings[0]);
  const [selectedFloor, setSelectedFloor] = useState(buildings[0].floors[0]);
  const [showSpecializedLabs, setShowSpecializedLabs] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Карта кампуса</h1>

      {/* Общая информация о кампусе */}
      <div className="bg-gradient-to-r from-blue-50 to-red-50 rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">О кампусе</h2>
        <p className="text-gray-600 mb-4">
          Наш кампус представляет собой современный образовательный комплекс, оснащенный передовыми технологиями и оборудованием. 
          Здесь созданы все условия для эффективного обучения и научных исследований.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-lg text-white">
            <h3 className="font-semibold mb-2">Классы</h3>
            <p className="text-blue-50">20 современных аудиторий с интерактивным оборудованием</p>
          </div>
          <div className="bg-gradient-to-br from-red-500 to-red-600 p-4 rounded-lg text-white">
            <h3 className="font-semibold mb-2">Лаборатории</h3>
            <p className="text-red-50">10 специализированных лабораторий для практических занятий</p>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-red-500 p-4 rounded-lg text-white">
            <h3 className="font-semibold mb-2">Общая площадь</h3>
            <p className="text-white/90">5000 м² образовательного пространства</p>
          </div>
        </div>
      </div>

      {/* Специализированные лаборатории */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Специализированные лаборатории</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {specializedLabs.map((lab) => (
            <div key={lab.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative h-48 bg-gradient-to-r from-blue-500 to-red-500">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white mb-1">{lab.name}</h3>
                  <p className="text-sm text-white/90">{lab.location}</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">{lab.description}</p>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-500 mb-1">
                    <span>Занятость</span>
                    <span>{lab.currentOccupancy}/{lab.capacity}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-red-500 h-2 rounded-full"
                      style={{ width: `${(lab.currentOccupancy / lab.capacity) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Оборудование</h4>
                  <div className="flex flex-wrap gap-2">
                    {lab.equipment.map((item, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gradient-to-r from-blue-50 to-red-50 text-blue-600 text-sm rounded-full border border-blue-100"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <ClockIcon className="h-4 w-4 mr-1 text-blue-500" />
                    {lab.schedule}
                  </div>
                  <button className="text-blue-600 hover:text-red-600 font-medium transition-colors duration-200">
                    Подробнее
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Существующий код для зданий и этажей */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Выбор здания и этажа */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-gray-900">{selectedBuilding.name}</h2>
              <div className="flex space-x-2">
                {selectedBuilding.floors.map((floor) => (
                  <button
                    key={floor.number}
                    onClick={() => setSelectedFloor(floor)}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      selectedFloor.number === floor.number
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {floor.number} этаж
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-md font-medium text-gray-900">{selectedFloor.name}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedFloor.facilities.map((facility: Facility) => (
                  <div key={facility.id} className="border rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <facility.icon className="h-6 w-6 text-blue-500 mt-1" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{facility.name}</p>
                        <p className="text-sm text-gray-500">{facility.description}</p>
                        {facility.capacity !== undefined && facility.currentOccupancy !== undefined && (
                          <div className="mt-2 flex items-center space-x-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${(facility.currentOccupancy / facility.capacity) * 100}%` }}
                              />
                            </div>
                            <span className="text-xs text-gray-500">
                              {facility.currentOccupancy}/{facility.capacity}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 