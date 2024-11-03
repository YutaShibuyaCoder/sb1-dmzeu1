import React from 'react';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { ja } from 'date-fns/locale';
import { Shift, Employee } from '../types';

interface CalendarProps {
  shifts: Shift[];
  employees: Employee[];
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

export function Calendar({ shifts, employees, selectedDate, onDateSelect }: CalendarProps) {
  const weekStart = startOfWeek(selectedDate, { locale: ja });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="grid grid-cols-7 gap-4">
        {weekDays.map((day) => (
          <div
            key={day.toString()}
            className={`p-4 rounded-lg cursor-pointer transition-colors
              ${isSameDay(day, selectedDate) ? 'bg-blue-100' : 'hover:bg-gray-50'}`}
            onClick={() => onDateSelect(day)}
          >
            <div className="text-sm font-medium text-gray-600">
              {format(day, 'E', { locale: ja })}
            </div>
            <div className="text-lg font-bold">
              {format(day, 'd')}
            </div>
            <div className="mt-2 space-y-1">
              {shifts
                .filter((shift) => isSameDay(new Date(shift.start), day))
                .map((shift) => {
                  const employee = employees.find((e) => e.id === shift.employeeId);
                  return (
                    <div
                      key={shift.id}
                      className="text-xs p-1 rounded"
                      style={{ backgroundColor: employee?.color + '40' }}
                    >
                      {employee?.name} {format(new Date(shift.start), 'HH:mm')}
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}