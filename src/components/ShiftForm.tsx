import React, { useState } from 'react';
import { format } from 'date-fns';
import { X } from 'lucide-react';
import { Employee } from '../types';

interface ShiftFormProps {
  employees: Employee[];
  selectedDate: Date;
  onSubmit: (data: {
    employeeId: string;
    start: Date;
    end: Date;
    notes?: string;
  }) => void;
  onClose: () => void;
}

export function ShiftForm({ employees, selectedDate, onSubmit, onClose }: ShiftFormProps) {
  const [employeeId, setEmployeeId] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);

    const start = new Date(selectedDate);
    start.setHours(startHour, startMinute);

    const end = new Date(selectedDate);
    end.setHours(endHour, endMinute);

    onSubmit({ employeeId, start, end, notes });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">シフトを追加</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">日付</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-50"
              value={format(selectedDate, 'yyyy/MM/dd')}
              disabled
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">従業員</label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              required
            >
              <option value="">選択してください</option>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.name} - {employee.position}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">開始時間</label>
              <input
                type="time"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">終了時間</label>
              <input
                type="time"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">メモ</label>
            <textarea
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            保存
          </button>
        </form>
      </div>
    </div>
  );
}