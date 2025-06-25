import React, { useState } from 'react';
import {
  CalculatorIcon,
  CalendarIcon,
  CreditCardIcon,
  DocumentTextIcon,
  BanknotesIcon,
  ArrowTrendingUpIcon,
  ClockIcon,
  FunnelIcon,
  ChevronDownIcon,
  ArrowDownTrayIcon,
  ReceiptPercentIcon,
  ChartBarIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { motion } from 'framer-motion';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface PaymentSchedule {
  id: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid' | 'overdue';
  type: 'tuition' | 'dormitory' | 'other';
  description: string;
  paymentMethod?: string;
  receiptNumber?: string;
}

interface FinancialSummary {
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  nextPayment: {
    date: string;
    amount: number;
  };
  paymentHistory: {
    month: string;
    amount: number;
  }[];
}

const paymentSchedules: PaymentSchedule[] = [
  {
    id: '1',
    date: '2024-03-15',
    amount: 1500000,
    status: 'paid',
    type: 'tuition',
    description: 'Первый транш за весенний семестр',
    paymentMethod: 'Kaspi',
    receiptNumber: 'RCP-2024-001',
  },
  {
    id: '2',
    date: '2024-04-15',
    amount: 1500000,
    status: 'pending',
    type: 'tuition',
    description: 'Второй транш за весенний семестр',
  },
  {
    id: '3',
    date: '2024-05-15',
    amount: 1500000,
    status: 'pending',
    type: 'tuition',
    description: 'Третий транш за весенний семестр',
  },
  {
    id: '4',
    date: '2024-02-01',
    amount: 150000,
    status: 'paid',
    type: 'dormitory',
    description: 'Оплата за общежитие (февраль)',
    paymentMethod: 'Kaspi',
    receiptNumber: 'RCP-2024-002',
  },
  {
    id: '5',
    date: '2024-03-01',
    amount: 150000,
    status: 'paid',
    type: 'dormitory',
    description: 'Оплата за общежитие (март)',
    paymentMethod: 'Kaspi',
    receiptNumber: 'RCP-2024-003',
  },
  {
    id: '6',
    date: '2024-04-01',
    amount: 150000,
    status: 'pending',
    type: 'dormitory',
    description: 'Оплата за общежитие (апрель)',
  },
  {
    id: '7',
    date: '2024-05-01',
    amount: 150000,
    status: 'pending',
    type: 'dormitory',
    description: 'Оплата за общежитие (май)',
  },
  {
    id: '8',
    date: '2024-01-15',
    amount: 1500000,
    status: 'overdue',
    type: 'tuition',
    description: 'Первый транш за осенний семестр',
  },
  {
    id: '9',
    date: '2024-02-15',
    amount: 1500000,
    status: 'overdue',
    type: 'tuition',
    description: 'Второй транш за осенний семестр',
  },
];

const financialSummary: FinancialSummary = {
  totalAmount: 4800000,
  paidAmount: 3150000,
  remainingAmount: 1650000,
  nextPayment: {
    date: '2024-04-15',
    amount: 1500000,
  },
  paymentHistory: [
    { month: 'Янв', amount: 1500000 },
    { month: 'Фев', amount: 150000 },
    { month: 'Мар', amount: 1500000 },
    { month: 'Апр', amount: 0 },
    { month: 'Май', amount: 0 },
    { month: 'Июн', amount: 0 },
  ],
};

const Finance: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedSemester, setSelectedSemester] = useState('spring');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<PaymentSchedule | null>(null);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [calculatorAmount, setCalculatorAmount] = useState('');
  const [calculatorMonths, setCalculatorMonths] = useState('1');
  const [calculatorType, setCalculatorType] = useState('tuition');
  const [selectedHistoryType, setSelectedHistoryType] = useState<'all' | 'tuition' | 'dormitory'>('all');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-KZ', {
      style: 'currency',
      currency: 'KZT',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Оплачено';
      case 'pending':
        return 'Ожидает оплаты';
      case 'overdue':
        return 'Просрочено';
      default:
        return status;
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'tuition':
        return 'Обучение';
      case 'dormitory':
        return 'Общежитие';
      case 'other':
        return 'Прочее';
      default:
        return type;
    }
  };

  const filteredPayments = paymentSchedules.filter(payment => {
    const matchesStatus = selectedStatus === 'all' || payment.status === selectedStatus;
    const matchesType = selectedType === 'all' || payment.type === selectedType;
    return matchesStatus && matchesType;
  });

  const maxPaymentAmount = Math.max(...financialSummary.paymentHistory.map(p => p.amount));

  const calculateMonthlyPayment = () => {
    const amount = parseFloat(calculatorAmount);
    const months = parseInt(calculatorMonths);
    if (isNaN(amount) || isNaN(months) || months < 1) return 0;
    return amount / months;
  };

  // Данные для графиков
  const paymentHistoryData = {
    labels: financialSummary.paymentHistory.map(p => p.month),
    datasets: [
      {
        label: 'Сумма платежей',
        data: financialSummary.paymentHistory.map(p => p.amount),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const paymentDistributionData = {
    labels: ['Обучение', 'Общежитие'],
    datasets: [
      {
        data: [75, 25],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(34, 197, 94, 0.8)',
        ],
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(34, 197, 94)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const paymentStatusData = {
    labels: ['Оплачено', 'Ожидает', 'Просрочено'],
    datasets: [
      {
        data: [60, 30, 10],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(234, 179, 8, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderColor: [
          'rgb(34, 197, 94)',
          'rgb(234, 179, 8)',
          'rgb(239, 68, 68)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const monthlyComparisonData = {
    labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн'],
    datasets: [
      {
        label: 'Обучение',
        data: [1500000, 0, 1500000, 0, 0, 0],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
      },
      {
        label: 'Общежитие',
        data: [0, 150000, 150000, 150000, 150000, 0],
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return formatCurrency(value);
          }
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  // Фильтрация данных для графика Bar
  const getFilteredHistory = () => {
    if (selectedHistoryType === 'all') return financialSummary.paymentHistory;
    if (selectedHistoryType === 'tuition') {
      // Предполагаем, что платежи за обучение — это те, где amount >= 1_000_000
      return financialSummary.paymentHistory.map((p) => ({ ...p, amount: p.amount >= 1000000 ? p.amount : 0 }));
    }
    if (selectedHistoryType === 'dormitory') {
      // Платежи за общежитие — amount < 1_000_000 и > 0
      return financialSummary.paymentHistory.map((p) => ({ ...p, amount: p.amount > 0 && p.amount < 1000000 ? p.amount : 0 }));
    }
    return financialSummary.paymentHistory;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="bg-white shadow-2xl rounded-3xl overflow-hidden border">
          {/* Hero Section */}
          <div className="text-center p-6 sm:p-8 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Финансовый портал</h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">Управление платежами и финансовой информацией</p>
          </div>
          {/* Финансовая сводка */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <div className="bg-white rounded-2xl shadow-sm p-6 transform hover:scale-105 transition-all duration-300 animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Общая сумма</h3>
                <BanknotesIcon className="h-6 w-6 text-blue-500" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(financialSummary.totalAmount)}</p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm p-6 transform hover:scale-105 transition-all duration-300 animate-fade-in" style={{ animationDelay: '100ms' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Оплачено</h3>
                <CreditCardIcon className="h-6 w-6 text-green-500" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(financialSummary.paidAmount)}</p>
              <div className="mt-2 h-2 bg-gray-200 rounded-full">
                <div 
                  className="h-2 bg-green-500 rounded-full transition-all duration-500"
                  style={{ width: `${(financialSummary.paidAmount / financialSummary.totalAmount) * 100}%` }}
                />
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm p-6 transform hover:scale-105 transition-all duration-300 animate-fade-in" style={{ animationDelay: '200ms' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Осталось оплатить</h3>
                <ArrowTrendingUpIcon className="h-6 w-6 text-yellow-500" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(financialSummary.remainingAmount)}</p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm p-6 transform hover:scale-105 transition-all duration-300 animate-fade-in" style={{ animationDelay: '300ms' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Следующий платеж</h3>
                <ClockIcon className="h-6 w-6 text-red-500" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(financialSummary.nextPayment.amount)}</p>
              <p className="text-sm text-gray-600 mt-2">До {new Date(financialSummary.nextPayment.date).toLocaleDateString('ru-RU')}</p>
            </div>
          </div>
          {/* График платежей */}
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">История платежей</h2>
                <p className="text-sm text-gray-500 mt-1">Статистика платежей за последние 6 месяцев</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  className={`px-3 py-1.5 text-sm rounded-lg transition-colors duration-200 font-medium ${selectedHistoryType === 'all' ? 'bg-blue-50 text-blue-600 shadow' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                  onClick={() => setSelectedHistoryType('all')}
                >
                  Все
                </button>
                <button
                  className={`px-3 py-1.5 text-sm rounded-lg transition-colors duration-200 font-medium ${selectedHistoryType === 'tuition' ? 'bg-blue-50 text-blue-600 shadow' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                  onClick={() => setSelectedHistoryType('tuition')}
                >
                  Обучение
                </button>
                <button
                  className={`px-3 py-1.5 text-sm rounded-lg transition-colors duration-200 font-medium ${selectedHistoryType === 'dormitory' ? 'bg-blue-50 text-blue-600 shadow' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                  onClick={() => setSelectedHistoryType('dormitory')}
                >
                  Общежитие
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-64 bg-gray-50 rounded-xl p-4">
                <Bar 
                  data={{
                    labels: getFilteredHistory().map(p => p.month),
                    datasets: [
                      {
                        label: 'Сумма платежей',
                        data: getFilteredHistory().map(p => p.amount),
                        backgroundColor: 'rgba(59, 130, 246, 0.8)',
                        borderRadius: 4,
                      }
                    ]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false
                      },
                      tooltip: {
                        callbacks: {
                          label: function(context) {
                            return formatCurrency(context.raw as number);
                          }
                        }
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          callback: function(value: any) {
                            return formatCurrency(value);
                          }
                        }
                      }
                    }
                  }}
                />
              </div>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">Средний платеж</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {formatCurrency(financialSummary.paymentHistory.reduce((acc, curr) => acc + curr.amount, 0) / financialSummary.paymentHistory.length)}
                    </span>
                  </div>
                  <div className="h-1 bg-gray-200 rounded-full">
                    <div className="h-1 bg-blue-500 rounded-full" style={{ width: '75%' }} />
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">Максимальный платеж</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {formatCurrency(maxPaymentAmount)}
                    </span>
                  </div>
                  <div className="h-1 bg-gray-200 rounded-full">
                    <div className="h-1 bg-green-500 rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">Общая сумма</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {formatCurrency(financialSummary.paymentHistory.reduce((acc, curr) => acc + curr.amount, 0))}
                    </span>
                  </div>
                  <div className="h-1 bg-gray-200 rounded-full">
                    <div className="h-1 bg-purple-500 rounded-full" style={{ width: '85%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Фильтры */}
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-xl bg-white shadow-sm hover:bg-gray-50 transition-all duration-300"
                >
                  <FunnelIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-gray-700">Фильтры</span>
                  <ChevronDownIcon className={`h-5 w-5 text-gray-400 ml-2 transition-transform duration-300 ${showFilters ? 'transform rotate-180' : ''}`} />
                </button>
                <button className="flex items-center px-4 py-2 border border-gray-300 rounded-xl bg-white shadow-sm hover:bg-gray-50 transition-all duration-300">
                  <ArrowDownTrayIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-gray-700">Экспорт</span>
                </button>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="2024">2023-2024</option>
                    <option value="2023">2022-2023</option>
                  </select>
                </div>
                <div className="flex-1">
                  <select
                    value={selectedSemester}
                    onChange={(e) => setSelectedSemester(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="spring">Весенний</option>
                    <option value="fall">Осенний</option>
                  </select>
                </div>
              </div>
            </div>

            {showFilters && (
              <div className="mt-4 pt-4 border-t border-gray-200 animate-slide-down">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Статус</label>
                    <div className="flex flex-wrap gap-2">
                      {['all', 'paid', 'pending', 'overdue'].map((status) => (
                        <button
                          key={status}
                          onClick={() => setSelectedStatus(status)}
                          className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                            selectedStatus === status
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {getStatusText(status)}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Тип платежа</label>
                    <div className="flex flex-wrap gap-2">
                      {['all', 'tuition', 'dormitory', 'other'].map((type) => (
                        <button
                          key={type}
                          onClick={() => setSelectedType(type)}
                          className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                            selectedType === type
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {getTypeText(type)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* График платежей */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">График платежей</h2>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setShowCalculator(true)}
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-xl bg-white shadow-sm hover:bg-gray-50 transition-all duration-300"
                >
                  <ReceiptPercentIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-gray-700">Калькулятор</span>
                </button>
                <button 
                  onClick={() => setShowAnalytics(true)}
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-xl bg-white shadow-sm hover:bg-gray-50 transition-all duration-300"
                >
                  <ChartBarIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-gray-700">Аналитика</span>
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Дата
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Описание
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Сумма
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Статус
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Действия
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPayments.map((payment, index) => (
                    <tr 
                      key={payment.id}
                      className="hover:bg-gray-50 transition-colors duration-200"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(payment.date).toLocaleDateString('ru-RU')}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <div>
                          <p className="font-medium">{payment.description}</p>
                          <p className="text-gray-500">{getTypeText(payment.type)}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(payment.amount)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 text-xs rounded-full ${getStatusColor(payment.status)}`}>
                          {getStatusText(payment.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {payment.status === 'pending' && (
                          <button 
                            onClick={() => {
                              setSelectedPayment(payment);
                              setShowPaymentModal(true);
                            }}
                            className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                          >
                            Оплатить
                          </button>
                        )}
                        {payment.status === 'paid' && (
                          <button className="text-gray-600 hover:text-gray-800 transition-colors duration-200">
                            <DocumentTextIcon className="h-5 w-5" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
        {/* Модальные окна */}
        {showPaymentModal && selectedPayment && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 animate-slide-up">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Оплата</h3>
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Сумма к оплате</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(selectedPayment.amount)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Описание</p>
                  <p className="text-gray-900">{selectedPayment.description}</p>
                </div>
                <div className="pt-4">
                  <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition-colors duration-200">
                    Перейти к оплате
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {showCalculator && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 animate-slide-up">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Калькулятор платежей</h3>
                <button
                  onClick={() => setShowCalculator(false)}
                  className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Тип платежа</label>
                  <select
                    value={calculatorType}
                    onChange={(e) => setCalculatorType(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="tuition">Обучение</option>
                    <option value="dormitory">Общежитие</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Общая сумма</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={calculatorAmount}
                      onChange={(e) => setCalculatorAmount(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Введите сумму"
                    />
                    <span className="absolute right-4 top-2 text-gray-500">₸</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Количество месяцев</label>
                  <select
                    value={calculatorMonths}
                    onChange={(e) => setCalculatorMonths(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {[1, 2, 3, 4, 5, 6].map((month) => (
                      <option key={month} value={month}>
                        {month} {month === 1 ? 'месяц' : month < 5 ? 'месяца' : 'месяцев'}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Ежемесячный платеж:</span>
                    <span className="text-xl font-bold text-gray-900">
                      {formatCurrency(calculateMonthlyPayment())}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Общая сумма:</span>
                    <span className="text-xl font-bold text-gray-900">
                      {formatCurrency(parseFloat(calculatorAmount) || 0)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {showAnalytics && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-start justify-center p-2 sm:p-4 z-50 animate-fade-in overflow-y-auto">
            <div className="bg-white rounded-3xl w-full max-w-4xl p-3 sm:p-4 my-2 sm:my-4 animate-slide-up">
              <div className="sticky top-0 bg-white rounded-t-3xl p-2 flex items-center justify-between mb-3 sm:mb-4 z-10">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Финансовая аналитика</h3>
                <button
                  onClick={() => setShowAnalytics(false)}
                  className="text-gray-400 hover:text-gray-500 transition-colors duration-200 p-2"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
                  <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">Тенденции платежей</h4>
                  <div className="h-36 sm:h-40">
                    <Line data={paymentHistoryData} options={{
                      ...chartOptions,
                      maintainAspectRatio: false,
                      plugins: {
                        ...chartOptions.plugins,
                        legend: {
                          display: false
                        }
                      }
                    }} />
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
                  <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">Распределение платежей</h4>
                  <div className="h-36 sm:h-40">
                    <Doughnut data={paymentDistributionData} options={{
                      ...doughnutOptions,
                      maintainAspectRatio: false,
                      plugins: {
                        ...doughnutOptions.plugins,
                        legend: {
                          position: 'bottom' as const,
                          labels: {
                            boxWidth: 10,
                            padding: 10,
                            font: {
                              size: 11
                            }
                          }
                        }
                      }
                    }} />
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
                  <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">Статус платежей</h4>
                  <div className="h-36 sm:h-40">
                    <Doughnut data={paymentStatusData} options={{
                      ...doughnutOptions,
                      maintainAspectRatio: false,
                      plugins: {
                        ...doughnutOptions.plugins,
                        legend: {
                          position: 'bottom' as const,
                          labels: {
                            boxWidth: 10,
                            padding: 10,
                            font: {
                              size: 11
                            }
                          }
                        }
                      }
                    }} />
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
                  <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">Сравнение по месяцам</h4>
                  <div className="h-36 sm:h-40">
                    <Bar data={monthlyComparisonData} options={{
                      ...chartOptions,
                      maintainAspectRatio: false,
                      plugins: {
                        ...chartOptions.plugins,
                        legend: {
                          position: 'bottom' as const,
                          labels: {
                            boxWidth: 10,
                            padding: 10,
                            font: {
                              size: 11
                            }
                          }
                        }
                      }
                    }} />
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

export default Finance; 