'use client';

import { useState } from 'react';
import {
  AcademicCapIcon,
  BookOpenIcon,
  ClockIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  UserIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';

interface Teacher {
  id: string;
  name: string;
  position: string;
  email: string;
  phone: string;
  office: string;
}

interface Course {
  id: string;
  name: string;
  credits: number;
  hours: number;
  description: string;
  prerequisites?: string[];
  outcomes: string[];
  teachers: Teacher[];
  topics: {
    week: number;
    title: string;
    description: string;
    teacher: Teacher;
  }[];
}

interface Semester {
  id: number;
  name: string;
  weeks: number;
  courses: Course[];
}

interface CourseYear {
  id: number;
  name: string;
  semesters: Semester[];
}

const courseYears: CourseYear[] = [
  {
    id: 1,
    name: '1 курс',
    semesters: [
      {
        id: 1,
        name: '1 семестр',
        weeks: 15,
        courses: [
          {
            id: 'CS101',
            name: 'Введение в программирование',
            credits: 5,
            hours: 90,
            description: 'Базовый курс программирования, охватывающий основные концепции и практические навыки разработки.',
            outcomes: [
              'Понимание основных концепций программирования',
              'Умение писать и отладывать код',
              'Работа с базовыми структурами данных'
            ],
            teachers: [
              {
                id: 'T1',
                name: 'Иванов Иван Иванович',
                position: 'Старший преподаватель',
                email: 'ivanov@alma.edu.kz',
                phone: '+7 (727) 123-45-67',
                office: 'Корпус A, каб. 301'
              }
            ],
            topics: [
              {
                week: 1,
                title: 'Введение в программирование',
                description: 'Основные концепции, история развития, современные языки программирования',
                teacher: {
                  id: 'T1',
                  name: 'Иванов Иван Иванович',
                  position: 'Старший преподаватель',
                  email: 'ivanov@alma.edu.kz',
                  phone: '+7 (727) 123-45-67',
                  office: 'Корпус A, каб. 301'
                }
              },
              {
                week: 2,
                title: 'Переменные и типы данных',
                description: 'Работа с переменными, основные типы данных, преобразование типов',
                teacher: {
                  id: 'T1',
                  name: 'Иванов Иван Иванович',
                  position: 'Старший преподаватель',
                  email: 'ivanov@alma.edu.kz',
                  phone: '+7 (727) 123-45-67',
                  office: 'Корпус A, каб. 301'
                }
              }
            ]
          }
        ]
      },
      {
        id: 2,
        name: '2 семестр',
        weeks: 15,
        courses: [
          {
            id: 'CS102',
            name: 'Объектно-ориентированное программирование',
            credits: 5,
            hours: 90,
            description: 'Изучение принципов ООП и их применение в разработке программного обеспечения.',
            outcomes: [
              'Понимание принципов ООП',
              'Умение проектировать классы и объекты',
              'Работа с наследованием и полиморфизмом'
            ],
            teachers: [
              {
                id: 'T2',
                name: 'Петров Петр Петрович',
                position: 'Доцент',
                email: 'petrov@alma.edu.kz',
                phone: '+7 (727) 123-45-68',
                office: 'Корпус B, каб. 205'
              }
            ],
            topics: [
              {
                week: 1,
                title: 'Введение в ООП',
                description: 'Основные концепции ООП, классы и объекты',
                teacher: {
                  id: 'T2',
                  name: 'Петров Петр Петрович',
                  position: 'Доцент',
                  email: 'petrov@alma.edu.kz',
                  phone: '+7 (727) 123-45-68',
                  office: 'Корпус B, каб. 205'
                }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 2,
    name: '2 курс',
    semesters: [
      {
        id: 3,
        name: '1 семестр',
        weeks: 15,
        courses: [
          {
            id: 'CS201',
            name: 'Базы данных',
            credits: 4,
            hours: 60,
            description: 'Изучение основ проектирования и работы с базами данных.',
            outcomes: [
              'Понимание принципов работы с базами данных',
              'Умение проектировать схемы БД',
              'Работа с SQL-запросами'
            ],
            teachers: [
              {
                id: 'T3',
                name: 'Сидорова Анна Ивановна',
                position: 'Профессор',
                email: 'sidorova@alma.edu.kz',
                phone: '+7 (727) 123-45-69',
                office: 'Корпус C, каб. 401'
              }
            ],
            topics: [
              {
                week: 1,
                title: 'Введение в базы данных',
                description: 'Основные концепции, типы баз данных',
                teacher: {
                  id: 'T3',
                  name: 'Сидорова Анна Ивановна',
                  position: 'Профессор',
                  email: 'sidorova@alma.edu.kz',
                  phone: '+7 (727) 123-45-69',
                  office: 'Корпус C, каб. 401'
                }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 3,
    name: '3 курс',
    semesters: [
      {
        id: 5,
        name: '1 семестр',
        weeks: 15,
        courses: [
          {
            id: 'CS301',
            name: 'Машинное обучение',
            credits: 6,
            hours: 90,
            description: 'Изучение основ машинного обучения и искусственного интеллекта.',
            outcomes: [
              'Понимание основных алгоритмов машинного обучения',
              'Умение применять ML-алгоритмы на практике',
              'Работа с данными для обучения моделей'
            ],
            teachers: [
              {
                id: 'T4',
                name: 'Козлов Алексей Петрович',
                position: 'Профессор',
                email: 'kozlov@alma.edu.kz',
                phone: '+7 (727) 123-45-70',
                office: 'Корпус D, каб. 501'
              }
            ],
            topics: [
              {
                week: 1,
                title: 'Введение в машинное обучение',
                description: 'Основные концепции, типы задач, области применения',
                teacher: {
                  id: 'T4',
                  name: 'Козлов Алексей Петрович',
                  position: 'Профессор',
                  email: 'kozlov@alma.edu.kz',
                  phone: '+7 (727) 123-45-70',
                  office: 'Корпус D, каб. 501'
                }
              }
            ]
          }
        ]
      }
    ]
  }
];

export default function Syllabus() {
  const [activeYear, setActiveYear] = useState<number>(1);
  const [expandedSemester, setExpandedSemester] = useState<number | null>(null);
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);

  const toggleSemester = (semesterId: number) => {
    setExpandedSemester(expandedSemester === semesterId ? null : semesterId);
  };

  const toggleCourse = (courseId: string) => {
    setExpandedCourse(expandedCourse === courseId ? null : courseId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center space-x-3 mb-8">
        <AcademicCapIcon className="h-8 w-8 text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-900">Электронный силлабус</h1>
      </div>

      {/* Описание силлабуса */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">О силлабусе</h2>
        <p className="text-gray-600 mb-4">
          Электронный силлабус содержит подробную информацию о всех учебных дисциплинах, преподаваемых в AlmaU. 
          Здесь вы найдете детальное описание каждого предмета, информацию о преподавателях, 
          расписание занятий и требования к обучению.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-lg text-white">
            <h3 className="font-semibold mb-2">Структура обучения</h3>
            <p className="text-blue-50">3 года обучения, 6 семестров</p>
          </div>
          <div className="bg-gradient-to-br from-red-500 to-red-600 p-4 rounded-lg text-white">
            <h3 className="font-semibold mb-2">Длительность семестров</h3>
            <p className="text-red-50">1-2 семестры: 15 недель, 3 семестр: 10 недель</p>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-red-500 p-4 rounded-lg text-white">
            <h3 className="font-semibold mb-2">Формат обучения</h3>
            <p className="text-white/90">Лекции, практические занятия, лабораторные работы</p>
          </div>
        </div>
      </div>

      {/* Вкладки курсов */}
      <div className="mb-8">
        <div className="flex space-x-4 border-b border-gray-200">
          {courseYears.map((year) => (
            <button
              key={year.id}
              onClick={() => setActiveYear(year.id)}
              className={`px-4 py-2 font-medium text-lg ${
                activeYear === year.id
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {year.name}
            </button>
          ))}
        </div>
      </div>

      {/* Семестры выбранного курса */}
      <div className="space-y-6">
        {courseYears
          .find((year) => year.id === activeYear)
          ?.semesters.map((semester) => (
            <div key={semester.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <button
                onClick={() => toggleSemester(semester.id)}
                className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-red-500 text-white flex items-center justify-between hover:from-blue-600 hover:to-red-600 transition-colors duration-200"
              >
                <div className="flex items-center space-x-3">
                  <CalendarIcon className="h-6 w-6" />
                  <span className="text-lg font-semibold">{semester.name}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                    {semester.weeks} недель
                  </span>
                  {expandedSemester === semester.id ? (
                    <ChevronUpIcon className="h-5 w-5" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5" />
                  )}
                </div>
              </button>

              {expandedSemester === semester.id && (
                <div className="p-6 space-y-4">
                  {semester.courses.map((course) => (
                    <div key={course.id} className="border rounded-lg overflow-hidden">
                      <button
                        onClick={() => toggleCourse(course.id)}
                        className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 flex items-center justify-between transition-colors duration-200"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900">{course.name}</h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span>{course.credits} кредитов</span>
                              <span>•</span>
                              <span>{course.hours} часов</span>
                            </div>
                          </div>
                        </div>
                        {expandedCourse === course.id ? (
                          <ChevronUpIcon className="h-5 w-5 text-gray-500" />
                        ) : (
                          <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                        )}
                      </button>

                      {expandedCourse === course.id && (
                        <div className="p-4 space-y-4">
                          <p className="text-gray-600">{course.description}</p>

                          {/* Информация о преподавателях */}
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Преподаватели</h4>
                            <div className="space-y-3">
                              {course.teachers.map((teacher) => (
                                <div key={teacher.id} className="bg-gray-50 p-3 rounded-lg">
                                  <div className="flex items-center space-x-3">
                                    <UserIcon className="h-5 w-5 text-blue-500" />
                                    <div>
                                      <h5 className="font-medium text-gray-900">{teacher.name}</h5>
                                      <p className="text-sm text-gray-600">{teacher.position}</p>
                                      <div className="mt-1 text-sm text-gray-500">
                                        <p>Email: {teacher.email}</p>
                                        <p>Телефон: {teacher.phone}</p>
                                        <p>Кабинет: {teacher.office}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Результаты обучения */}
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Результаты обучения</h4>
                            <ul className="list-disc list-inside text-gray-600">
                              {course.outcomes.map((outcome, index) => (
                                <li key={index}>{outcome}</li>
                              ))}
                            </ul>
                          </div>

                          {/* План занятий по неделям */}
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">План занятий</h4>
                            <div className="space-y-3">
                              {course.topics.map((topic) => (
                                <div key={topic.week} className="bg-gray-50 p-3 rounded-lg">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <ClockIcon className="h-4 w-4 text-blue-500" />
                                    <span className="font-medium text-gray-900">Неделя {topic.week}</span>
                                  </div>
                                  <h5 className="font-medium text-gray-900 mb-1">{topic.title}</h5>
                                  <p className="text-sm text-gray-600 mb-2">{topic.description}</p>
                                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                                    <UserIcon className="h-4 w-4" />
                                    <span>Преподаватель: {topic.teacher.name}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
} 