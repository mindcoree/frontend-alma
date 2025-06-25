import React, { useState } from 'react';
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
  ArrowRightIcon,
  ChevronRightIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

interface Floor {
  number: number;
  name: string;
  facilities: Facility[];
  image: string;
}

interface Facility {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  capacity?: number;
  currentOccupancy?: number;
  type: 'classroom' | 'laboratory' | 'office' | 'studio' | 'common';
  image: string;
}

interface Building {
  id: string;
  name: string;
  image: string;
  description: string;
  floors: Floor[];
}

interface SpecializedLab {
  id: string;
  name: string;
  description: string;
  capacity: number;
  currentOccupancy: number;
  equipment: string[];
  schedule: string;
  location: string;
  image: string;
}

const buildings: Building[] = [
  {
    id: 'kb',
    name: 'Knowledge Building',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    description: 'Современное здание, оснащенное передовыми технологиями для обучения и исследований',
    floors: [
      {
        number: 3,
        name: 'Graduate School of Business',
        image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        facilities: [
          {
            id: 'mba-1',
            name: 'MBA Programs',
            description: 'Аудитория для программ MBA и докторантуры',
            icon: AcademicCapIcon,
            capacity: 30,
            currentOccupancy: 25,
            type: 'classroom',
            image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
          },
          {
            id: 'mba-2',
            name: 'MBA Association',
            description: 'Зал заседаний Ассоциации MBA',
            icon: UserGroupIcon,
            capacity: 20,
            currentOccupancy: 15,
            type: 'classroom',
            image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
          },
        ],
      },
      {
        number: 4,
        name: 'Innovation Labs',
        image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        facilities: [
          {
            id: 'design-lab',
            name: 'DesignLab',
            description: 'Лаборатория дизайна и креативных технологий',
            icon: BeakerIcon,
            capacity: 25,
            currentOccupancy: 20,
            type: 'laboratory',
            image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
          },
          {
            id: 'media-lab',
            name: 'MediaLab',
            description: 'Лаборатория журналистики и мультимедиа',
            icon: VideoCameraIcon,
            capacity: 20,
            currentOccupancy: 18,
            type: 'laboratory',
            image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
          },
          {
            id: 'cyber-lab',
            name: 'Cyber Security Lab',
            description: 'Лаборатория кибербезопасности',
            icon: ComputerDesktopIcon,
            capacity: 15,
            currentOccupancy: 12,
            type: 'laboratory',
            image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
          },
        ],
      },
      {
        number: 5,
        name: 'Administration',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        facilities: [
          {
            id: 'rector',
            name: 'Rector\'s Office',
            description: 'Приемная и зал заседаний ректора',
            icon: BuildingOffice2Icon,
            type: 'office',
            image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
          },
          {
            id: 'trustees',
            name: 'Board of Trustees',
            description: 'Зал заседаний Попечительского совета',
            icon: UserGroupIcon,
            type: 'office',
            image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
          },
        ],
      },
    ],
  },
];

const specializedLabs: SpecializedLab[] = [
  {
    id: 'lab-1',
    name: 'Robotics Laboratory',
    description: 'Современная лаборатория для разработки и тестирования роботов. Оснащена 3D-принтерами, ЧПУ-станками и электронными компонентами.',
    capacity: 20,
    currentOccupancy: 15,
    equipment: [
      '3D Printers',
      'CNC Machines',
      'Arduino Kits',
      'Sensors and Detectors',
      'Soldering Stations'
    ],
    schedule: 'Пн-Пт: 9:00-18:00',
    location: 'Building A, 3rd Floor',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: 'lab-2',
    name: 'Artificial Intelligence Laboratory',
    description: 'Передовая лаборатория для исследований в области машинного обучения и искусственного интеллекта. Оснащена мощными вычислительными серверами.',
    capacity: 15,
    currentOccupancy: 8,
    equipment: [
      'GPU Servers',
      'Workstations',
      'Datasets',
      'Specialized Software'
    ],
    schedule: 'Пн-Пт: 10:00-19:00',
    location: 'Building B, 2nd Floor',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: 'lab-3',
    name: 'Virtual Reality Laboratory',
    description: 'Инновационная лаборатория для разработки VR/AR приложений. Оснащена современными VR-шлемами и оборудованием для отслеживания движений.',
    capacity: 10,
    currentOccupancy: 5,
    equipment: [
      'VR Headsets',
      'Controllers',
      'Tracking Systems',
      'Powerful PCs'
    ],
    schedule: 'Пн-Пт: 11:00-20:00',
    location: 'Building C, 1st Floor',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  }
];

const CampusMap: React.FC = () => {
  const [selectedBuilding, setSelectedBuilding] = useState<Building>(buildings[0]);
  const [selectedFloor, setSelectedFloor] = useState<Floor>(buildings[0].floors[0]);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [selectedLab, setSelectedLab] = useState<SpecializedLab | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">
          {/* Header */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-10"></div>
            <div className="relative p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
                  <MapPinIcon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Карта кампуса</h1>
                  <p className="text-sm text-gray-600 mt-1">Обновлено: {new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Campus Overview */}
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <div className="rounded-2xl overflow-hidden shadow-lg mb-8">
              <div className="relative h-64">
                <img
                  src={selectedBuilding.image}
                  alt={selectedBuilding.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h2 className="text-3xl font-bold text-white mb-2">{selectedBuilding.name}</h2>
                  <p className="text-white/90">{selectedBuilding.description}</p>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl text-white">
                    <h3 className="text-xl font-semibold mb-2">Аудитории</h3>
                    <p className="text-blue-50">20 современных аудиторий с интерактивным оборудованием</p>
                  </div>
                  <div className="bg-gradient-to-br from-red-500 to-red-600 p-6 rounded-xl text-white">
                    <h3 className="text-xl font-semibold mb-2">Лаборатории</h3>
                    <p className="text-red-50">10 специализированных лабораторий для практических занятий</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl text-white">
                    <h3 className="text-xl font-semibold mb-2">Общая площадь</h3>
                    <p className="text-purple-50">5000 м² образовательного пространства</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Specialized Laboratories */}
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Специализированные лаборатории</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {specializedLabs.map((lab) => (
                <div key={lab.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="relative h-48 rounded-t-2xl overflow-hidden">
                    <img
                      src={lab.image}
                      alt={lab.name}
                      className="w-full h-full object-cover"
                    />
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
                        <span>Загруженность</span>
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
                            className="px-3 py-1 bg-gradient-to-r from-blue-50 to-red-50 text-blue-600 text-sm rounded-full border border-blue-100"
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
                      <button
                        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                        onClick={() => setSelectedLab(lab)}
                      >
                        Подробнее
                        <ArrowRightIcon className="h-4 w-4 ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Buildings and Floors */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="relative h-48">
                    <img
                      src={selectedFloor.image}
                      alt={selectedFloor.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h2 className="text-2xl font-bold text-white mb-2">{selectedFloor.name}</h2>
                      <div className="flex space-x-2">
                        {selectedBuilding.floors.map((floor) => (
                          <button
                            key={floor.number}
                            onClick={() => setSelectedFloor(floor)}
                            className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                              selectedFloor.number === floor.number
                                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                                : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
                            }`}
                          >
                            Этаж {floor.number}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {selectedFloor.facilities.map((facility) => (
                        <div 
                          key={facility.id} 
                          className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer"
                          onClick={() => setSelectedFacility(facility)}
                        >
                          <div className="relative h-40 rounded-t-2xl overflow-hidden">
                            <img
                              src={facility.image}
                              alt={facility.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-4 left-4">
                              <facility.icon className="h-8 w-8 text-white mb-2" />
                              <h3 className="text-lg font-semibold text-white">{facility.name}</h3>
                            </div>
                          </div>
                          <div className="p-4">
                            <p className="text-gray-600 text-sm mb-3">{facility.description}</p>
                            {facility.capacity !== undefined && facility.currentOccupancy !== undefined && (
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm text-gray-500">
                                  <span>Загруженность</span>
                                  <span>{facility.currentOccupancy}/{facility.capacity}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-gradient-to-r from-blue-500 to-red-500 h-2 rounded-full"
                                    style={{ width: `${(facility.currentOccupancy / facility.capacity) * 100}%` }}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Facility Modal */}
        {selectedFacility && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-2 sm:p-4 z-50">
            <div className="bg-white rounded-2xl sm:rounded-3xl max-w-xs sm:max-w-md md:max-w-2xl w-full max-h-[90vh] overflow-y-auto mx-auto shadow-2xl animate-slide-up">
              <div className="relative h-40 sm:h-64">
                <img
                  src={selectedFacility.image}
                  alt={selectedFacility.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedFacility(null)}
                  className="absolute top-2 right-2 sm:top-4 sm:right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <XMarkIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" />
                </button>
              </div>
              <div className="p-3 sm:p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <selectedFacility.icon className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />
                  <div>
                    <h2 className="text-lg sm:text-2xl font-bold text-gray-900">{selectedFacility.name}</h2>
                    <p className="text-gray-500 text-xs sm:text-base">{selectedFacility.type}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4 text-xs sm:text-base">{selectedFacility.description}</p>
                {selectedFacility.capacity !== undefined && selectedFacility.currentOccupancy !== undefined && (
                  <div className="mb-4">
                    <div className="flex justify-between text-xs sm:text-sm text-gray-500 mb-2">
                      <span>Текущая загруженность</span>
                      <span>{selectedFacility.currentOccupancy}/{selectedFacility.capacity}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-red-500 h-2 rounded-full"
                        style={{ width: `${(selectedFacility.currentOccupancy / selectedFacility.capacity) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
                <div className="flex justify-end">
                  <button
                    onClick={() => setSelectedFacility(null)}
                    className="px-4 py-2 sm:px-6 sm:py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold shadow hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 text-xs sm:text-base"
                  >
                    Закрыть
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Lab Modal */}
        {selectedLab && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2 sm:p-4 animate-fade-in">
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-xs sm:max-w-md md:max-w-2xl mx-auto overflow-hidden animate-slide-up">
              <div className="relative h-40 sm:h-64">
                <img
                  src={selectedLab.image}
                  alt={selectedLab.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedLab(null)}
                  className="absolute top-2 right-2 sm:top-4 sm:right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <XMarkIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 sm:p-6">
                  <h2 className="text-lg sm:text-2xl font-bold text-white mb-1">{selectedLab.name}</h2>
                  <p className="text-white/90 text-xs sm:text-base">{selectedLab.location}</p>
                </div>
              </div>
              <div className="p-3 sm:p-6 space-y-4 sm:space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 sm:mb-4">
                  <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-0">
                    <ClockIcon className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
                    <span className="text-gray-700 font-medium text-xs sm:text-base">{selectedLab.schedule}</span>
                  </div>
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <span className="text-xs sm:text-sm text-gray-500">Загруженность:</span>
                    <span className="font-semibold text-blue-700 text-xs sm:text-base">{selectedLab.currentOccupancy}/{selectedLab.capacity}</span>
                    <div className="w-20 sm:w-32 bg-gray-200 rounded-full h-2 ml-1 sm:ml-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-red-500 h-2 rounded-full"
                        style={{ width: `${(selectedLab.currentOccupancy / selectedLab.capacity) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">Описание</h3>
                  <p className="text-gray-600 leading-relaxed text-xs sm:text-base">{selectedLab.description}</p>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">Оборудование</h3>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {selectedLab.equipment.map((item, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 sm:px-3 sm:py-1 bg-gradient-to-r from-blue-50 to-red-50 text-blue-700 text-xs sm:text-sm rounded-full border border-blue-100 shadow-sm"
                      >
                        <BeakerIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-blue-400" />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => setSelectedLab(null)}
                    className="px-4 py-2 sm:px-6 sm:py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold shadow hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 text-xs sm:text-base"
                  >
                    Закрыть
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CampusMap; 