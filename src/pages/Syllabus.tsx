import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpenIcon,
  AcademicCapIcon,
  ClockIcon,
  UserIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CalendarIcon,
  ChartBarIcon,
  DocumentTextIcon,
  BookmarkIcon,
  CheckCircleIcon,
  ClipboardDocumentListIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline';

interface Topic {
  id: number;
  title: string;
  description: string;
  duration: string;
  materials: string[];
  details?: {
    lectures: string[];
    assignments: string[];
    readings: string[];
    learningOutcomes: string[];
  };
}

interface Course {
  id: string;
  name: string;
  code: string;
  credits: number;
  instructor: string;
  semester: number;
  year: number;
  description: string;
  topics: Topic[];
  prerequisites: string[];
  objectives: string[];
}

const sampleCourses: Course[] = [
  {
    id: 'CS101',
    name: 'Introduction to Programming',
    code: 'CS101',
    credits: 6,
    instructor: 'Dr. John Smith',
    semester: 1,
    year: 1,
    description: 'An introductory course to programming concepts and practices using Python.',
    topics: [
      {
        id: 1,
        title: 'Introduction to Python',
        description: 'Basic syntax, variables, and data types',
        duration: '2 weeks',
        materials: ['Python for Beginners', 'Online Tutorials'],
        details: {
          lectures: [
            'Introduction to Programming',
            'Python Basics',
            'Variables and Data Types'
          ],
          assignments: [
            'Hello World Program',
            'Basic Calculator',
            'Data Type Conversion'
          ],
          readings: [
            'Python Documentation',
            'Programming Fundamentals'
          ],
          learningOutcomes: [
            'Understand basic programming concepts',
            'Write simple Python programs',
            'Use variables and data types effectively'
          ]
        }
      },
      {
        id: 2,
        title: 'Control Structures',
        description: 'Loops, conditionals, and program flow',
        duration: '3 weeks',
        materials: ['Programming Logic', 'Practice Exercises'],
        details: {
          lectures: [
            'If Statements',
            'Loops and Iterations',
            'Switch Cases'
          ],
          assignments: [
            'Grade Calculator',
            'Number Guessing Game',
            'Pattern Printing'
          ],
          readings: [
            'Control Flow in Python',
            'Programming Patterns'
          ],
          learningOutcomes: [
            'Implement control structures',
            'Write programs with loops',
            'Handle program flow'
          ]
        }
      }
    ],
    prerequisites: ['None'],
    objectives: [
      'Understand fundamental programming concepts',
      'Write and debug Python programs',
      'Solve basic programming problems',
      'Develop logical thinking skills'
    ]
  },
  {
    id: 'CS103',
    name: 'Computer Architecture',
    code: 'CS103',
    credits: 6,
    instructor: 'Dr. Maria Garcia',
    semester: 1,
    year: 1,
    description: 'Study of computer hardware, organization, and architecture fundamentals.',
    topics: [
      {
        id: 1,
        title: 'Digital Logic and Boolean Algebra',
        description: 'Basic digital circuits and logic gates',
        duration: '3 weeks',
        materials: ['Digital Design', 'Logic Simulator'],
        details: {
          lectures: [
            'Boolean Algebra',
            'Logic Gates',
            'Combinational Circuits'
          ],
          assignments: [
            'Logic Gate Implementation',
            'Circuit Design',
            'Boolean Expression Simplification'
          ],
          readings: [
            'Digital Logic Design',
            'Boolean Algebra Basics'
          ],
          learningOutcomes: [
            'Understand digital logic concepts',
            'Design basic circuits',
            'Simplify boolean expressions'
          ]
        }
      },
      {
        id: 2,
        title: 'CPU Architecture',
        description: 'Processor design and organization',
        duration: '4 weeks',
        materials: ['Computer Organization', 'CPU Simulator'],
        details: {
          lectures: [
            'CPU Components',
            'Instruction Set Architecture',
            'Pipelining'
          ],
          assignments: [
            'CPU Design Project',
            'Instruction Set Analysis',
            'Performance Evaluation'
          ],
          readings: [
            'Modern CPU Architecture',
            'Computer Organization'
          ],
          learningOutcomes: [
            'Understand CPU components',
            'Analyze instruction sets',
            'Evaluate CPU performance'
          ]
        }
      }
    ],
    prerequisites: ['None'],
    objectives: [
      'Understand computer hardware components',
      'Analyze computer architecture',
      'Design basic digital circuits',
      'Evaluate system performance'
    ]
  },
  {
    id: 'CS102',
    name: 'Web Development Basics',
    code: 'CS102',
    credits: 6,
    instructor: 'Dr. Sarah Johnson',
    semester: 2,
    year: 1,
    description: 'Introduction to web development technologies and practices.',
    topics: [
      {
        id: 1,
        title: 'HTML and CSS',
        description: 'Web page structure and styling',
        duration: '3 weeks',
        materials: ['Web Development Guide', 'HTML/CSS Tutorials'],
        details: {
          lectures: [
            'HTML Basics',
            'CSS Styling',
            'Responsive Design'
          ],
          assignments: [
            'Personal Portfolio Page',
            'Responsive Layout',
            'CSS Animations'
          ],
          readings: [
            'HTML5 Documentation',
            'CSS Best Practices'
          ],
          learningOutcomes: [
            'Create structured web pages',
            'Style pages with CSS',
            'Implement responsive designs'
          ]
        }
      },
      {
        id: 2,
        title: 'JavaScript Fundamentals',
        description: 'Client-side programming basics',
        duration: '4 weeks',
        materials: ['JavaScript Guide', 'Interactive Examples'],
        details: {
          lectures: [
            'JavaScript Syntax',
            'DOM Manipulation',
            'Event Handling'
          ],
          assignments: [
            'Interactive Form',
            'Dynamic Content',
            'Simple Game'
          ],
          readings: [
            'JavaScript Documentation',
            'Modern JavaScript'
          ],
          learningOutcomes: [
            'Write JavaScript code',
            'Manipulate web page content',
            'Handle user interactions'
          ]
        }
      }
    ],
    prerequisites: ['CS101'],
    objectives: [
      'Understand web development fundamentals',
      'Create responsive web pages',
      'Implement client-side functionality',
      'Follow web development best practices'
    ]
  },
  {
    id: 'CS201',
    name: 'Data Structures and Algorithms',
    code: 'CS201',
    credits: 6,
    instructor: 'Dr. Michael Chen',
    semester: 1,
    year: 2,
    description: 'Study of fundamental data structures and algorithms.',
    topics: [
      {
        id: 1,
        title: 'Basic Data Structures',
        description: 'Arrays, linked lists, stacks, and queues',
        duration: '4 weeks',
        materials: ['Data Structures Guide', 'Algorithm Visualizations'],
        details: {
          lectures: [
            'Array Operations',
            'Linked Lists',
            'Stack and Queue Implementation'
          ],
          assignments: [
            'Custom Array Implementation',
            'Linked List Operations',
            'Stack/Queue Applications'
          ],
          readings: [
            'Data Structures Textbook',
            'Algorithm Analysis'
          ],
          learningOutcomes: [
            'Implement basic data structures',
            'Analyze time complexity',
            'Choose appropriate data structures'
          ]
        }
      },
      {
        id: 2,
        title: 'Search and Sort Algorithms',
        description: 'Common algorithms and their analysis',
        duration: '3 weeks',
        materials: ['Algorithm Guide', 'Sorting Visualizations'],
        details: {
          lectures: [
            'Linear and Binary Search',
            'Bubble and Quick Sort',
            'Algorithm Complexity'
          ],
          assignments: [
            'Search Algorithm Implementation',
            'Sorting Algorithm Comparison',
            'Performance Analysis'
          ],
          readings: [
            'Algorithm Design',
            'Sorting Techniques'
          ],
          learningOutcomes: [
            'Implement search algorithms',
            'Apply sorting techniques',
            'Analyze algorithm efficiency'
          ]
        }
      }
    ],
    prerequisites: ['CS101', 'CS102'],
    objectives: [
      'Understand data structure concepts',
      'Implement common algorithms',
      'Analyze algorithm efficiency',
      'Apply appropriate solutions to problems'
    ]
  }
];

const Syllabus: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number>(1);
  const [selectedSemester, setSelectedSemester] = useState<number>(1);
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);

  const semesters = [
    { id: 1, name: 'First Semester', weeks: 15 },
    { id: 2, name: 'Second Semester', weeks: 15 },
    { id: 3, name: 'Third Semester', weeks: 10 }
  ];

  const coursesInSemester = sampleCourses.filter(
    course => course.year === selectedYear && course.semester === selectedSemester
  );

  const totalCredits = coursesInSemester.reduce((sum, course) => sum + course.credits, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow-2xl rounded-3xl overflow-hidden"
        >
          {/* Header with Stats */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-10"></div>
            <div className="relative p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
                    <BookOpenIcon className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Course Syllabus</h1>
                    <p className="text-sm text-gray-600 mt-1">Academic Year {selectedYear}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-50 rounded-xl p-3">
                    <div className="text-sm text-blue-600 font-medium">Total Credits</div>
                    <div className="text-2xl font-bold text-blue-700">{totalCredits}</div>
                  </div>
                  <div className="bg-indigo-50 rounded-xl p-3">
                    <div className="text-sm text-indigo-600 font-medium">Courses</div>
                    <div className="text-2xl font-bold text-indigo-700">{coursesInSemester.length}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Year Navigation */}
          <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex flex-wrap gap-3">
              {[1, 2, 3].map((year) => (
                <motion.button
                  key={year}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedYear(year);
                    setSelectedSemester(1);
                  }}
                  className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    selectedYear === year
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <AcademicCapIcon className="h-5 w-5" />
                    <span>Year {year}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Semester Navigation */}
          <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex flex-wrap gap-3">
              {semesters.map((semester) => (
                <motion.button
                  key={semester.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedSemester(semester.id)}
                  className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    selectedSemester === semester.id
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <CalendarIcon className="h-5 w-5" />
                    <span>{semester.name}</span>
                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                      {semester.weeks} weeks
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Courses List */}
          <div className="p-6">
            <div className="grid gap-6">
              {coursesInSemester.map((course) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  {/* Course Header */}
                  <div
                    className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => setExpandedCourse(expandedCourse === course.id ? null : course.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
                              <AcademicCapIcon className="h-6 w-6 text-white" />
                            </div>
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900">{course.name}</h3>
                            <div className="flex items-center space-x-4 mt-1">
                              <p className="text-sm text-gray-500">{course.code}</p>
                              <div className="flex items-center text-sm text-gray-500">
                                <ClockIcon className="h-4 w-4 mr-1" />
                                {course.credits} Credits
                              </div>
                              <div className="flex items-center text-sm text-gray-500">
                                <UserIcon className="h-4 w-4 mr-1" />
                                {course.instructor}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {expandedCourse === course.id ? (
                          <ChevronUpIcon className="h-6 w-6 text-gray-400" />
                        ) : (
                          <ChevronDownIcon className="h-6 w-6 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Course Details */}
                  <AnimatePresence>
                    {expandedCourse === course.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="border-t border-gray-200"
                      >
                        <div className="p-6 space-y-8">
                          {/* Description */}
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 mb-3">Description</h4>
                            <p className="text-sm text-gray-600 leading-relaxed">{course.description}</p>
                          </div>

                          {/* Topics */}
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 mb-3">Course Topics</h4>
                            <div className="grid gap-4">
                              {course.topics.map((topic) => (
                                <div key={topic.id} className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl shadow-sm">
                                  <div 
                                    className="cursor-pointer"
                                    onClick={() => setExpandedTopic(expandedTopic === `${course.id}-${topic.id}` ? null : `${course.id}-${topic.id}`)}
                                  >
                                    <div className="flex items-start justify-between">
                                      <div>
                                        <h5 className="text-sm font-medium text-gray-900">{topic.title}</h5>
                                        <p className="text-sm text-gray-600 mt-1">{topic.description}</p>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                                          {topic.duration}
                                        </span>
                                        {expandedTopic === `${course.id}-${topic.id}` ? (
                                          <ChevronUpIcon className="h-5 w-5 text-gray-400" />
                                        ) : (
                                          <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                                        )}
                                      </div>
                                    </div>
                                  </div>

                                  <AnimatePresence>
                                    {expandedTopic === `${course.id}-${topic.id}` && (
                                      <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="mt-4 pt-4 border-t border-gray-200"
                                      >
                                        <div className="space-y-4">
                                          {/* Lectures */}
                                          <div>
                                            <h6 className="text-xs font-medium text-gray-900 mb-2 flex items-center">
                                              <AcademicCapIcon className="h-4 w-4 mr-1 text-blue-600" />
                                              Lectures
                                            </h6>
                                            <ul className="space-y-2">
                                              {topic.details?.lectures.map((lecture, index) => (
                                                <li key={index} className="text-sm text-gray-600 flex items-start">
                                                  <span className="text-blue-600 mr-2">•</span>
                                                  {lecture}
                                                </li>
                                              ))}
                                            </ul>
                                          </div>

                                          {/* Assignments */}
                                          <div>
                                            <h6 className="text-xs font-medium text-gray-900 mb-2 flex items-center">
                                              <ClipboardDocumentListIcon className="h-4 w-4 mr-1 text-green-600" />
                                              Assignments
                                            </h6>
                                            <ul className="space-y-2">
                                              {topic.details?.assignments.map((assignment, index) => (
                                                <li key={index} className="text-sm text-gray-600 flex items-start">
                                                  <span className="text-green-600 mr-2">•</span>
                                                  {assignment}
                                                </li>
                                              ))}
                                            </ul>
                                          </div>

                                          {/* Readings */}
                                          <div>
                                            <h6 className="text-xs font-medium text-gray-900 mb-2 flex items-center">
                                              <BookOpenIcon className="h-4 w-4 mr-1 text-purple-600" />
                                              Required Readings
                                            </h6>
                                            <ul className="space-y-2">
                                              {topic.details?.readings.map((reading, index) => (
                                                <li key={index} className="text-sm text-gray-600 flex items-start">
                                                  <span className="text-purple-600 mr-2">•</span>
                                                  {reading}
                                                </li>
                                              ))}
                                            </ul>
                                          </div>

                                          {/* Learning Outcomes */}
                                          <div>
                                            <h6 className="text-xs font-medium text-gray-900 mb-2 flex items-center">
                                              <LightBulbIcon className="h-4 w-4 mr-1 text-yellow-600" />
                                              Learning Outcomes
                                            </h6>
                                            <ul className="space-y-2">
                                              {topic.details?.learningOutcomes.map((outcome, index) => (
                                                <li key={index} className="text-sm text-gray-600 flex items-start">
                                                  <span className="text-yellow-600 mr-2">•</span>
                                                  {outcome}
                                                </li>
                                              ))}
                                            </ul>
                                          </div>
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>

                                  <div className="mt-3">
                                    <div className="text-xs text-gray-500 font-medium mb-2">Materials:</div>
                                    <div className="flex flex-wrap gap-2">
                                      {topic.materials.map((material, index) => (
                                        <span
                                          key={index}
                                          className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                                        >
                                          {material}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Objectives */}
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 mb-3">Learning Objectives</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {course.objectives.map((objective, index) => (
                                <div key={index} className="flex items-start space-x-2 bg-gradient-to-br from-gray-50 to-white p-3 rounded-lg">
                                  <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                                  <span className="text-sm text-gray-600">{objective}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Prerequisites */}
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 mb-3">Prerequisites</h4>
                            <div className="flex flex-wrap gap-2">
                              {course.prerequisites.map((prereq, index) => (
                                <span
                                  key={index}
                                  className="text-xs bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 px-3 py-1 rounded-full"
                                >
                                  {prereq}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Syllabus; 