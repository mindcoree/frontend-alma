'use client';

import { useState } from 'react';
import {
  CalculatorIcon,
  CalendarIcon,
  CreditCardIcon,
  DocumentTextIcon,
  BanknotesIcon,
  ArrowTrendingUpIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

interface PaymentSchedule {
  id: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid' | 'overdue';
  type: 'tuition' | 'dormitory' | 'other';
  description: string;
}

interface FinancialSummary {
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  nextPayment: {
    date: string;
    amount: number;
  };
}

const paymentSchedules: PaymentSchedule[] = [
  {
    id: '1',
    date: '2024-03-15',
    amount: 1500000,
    status: 'paid',
    type: 'tuition',
    description: 'Первый транш за весенний семестр',
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
  },
  {
    id: '5',
    date: '2024-03-01',
    amount: 150000,
    status: 'paid',
    type: 'dormitory',
    description: 'Оплата за общежитие (март)',
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
};

export default function Finance() {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedSemester, setSelectedSemester] = useState('spring');

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Финансовый портал</h1>
        <p className="text-xl text-gray-600">
          Управление платежами и финансовой информацией
        </p>
      </div>

      {/* Финансовая сводка */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Общая сумма</h3>
            <BanknotesIcon className="h-6 w-6 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(financialSummary.totalAmount)}</p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Оплачено</h3>
            <CreditCardIcon className="h-6 w-6 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(financialSummary.paidAmount)}</p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Осталось оплатить</h3>
            <ArrowTrendingUpIcon className="h-6 w-6 text-yellow-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(financialSummary.remainingAmount)}</p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Следующий платеж</h3>
            <ClockIcon className="h-6 w-6 text-red-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(financialSummary.nextPayment.amount)}</p>
          <p className="text-sm text-gray-600 mt-2">До {new Date(financialSummary.nextPayment.date).toLocaleDateString('ru-RU')}</p>
        </div>
      </div>

      {/* Фильтры */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
              Учебный год
            </label>
            <select
              id="year"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="2024">2023-2024</option>
              <option value="2023">2022-2023</option>
            </select>
          </div>
          <div className="flex-1">
            <label htmlFor="semester" className="block text-sm font-medium text-gray-700 mb-1">
              Семестр
            </label>
            <select
              id="semester"
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="spring">Весенний</option>
              <option value="fall">Осенний</option>
            </select>
          </div>
        </div>
      </div>

      {/* График платежей */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">График платежей</h2>
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
              {paymentSchedules.map((payment) => (
                <tr key={payment.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(payment.date).toLocaleDateString('ru-RU')}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {payment.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(payment.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(payment.status)}`}>
                      {getStatusText(payment.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {payment.status === 'pending' && (
                      <button className="text-blue-600 hover:text-blue-800">
                        Оплатить
                      </button>
                    )}
                    {payment.status === 'paid' && (
                      <button className="text-gray-600 hover:text-gray-800">
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

      {/* Информация о способах оплаты */}
      <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Способы оплаты</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Онлайн-оплата</h3>
            <p className="text-gray-600 text-sm">
              Оплата через личный кабинет с помощью банковской карты
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Банковский перевод</h3>
            <p className="text-gray-600 text-sm">
              Перевод на расчетный счет университета
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">В кассе университета</h3>
            <p className="text-gray-600 text-sm">
              Оплата наличными или картой в кассе
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 