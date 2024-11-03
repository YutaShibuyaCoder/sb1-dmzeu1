import React, { useState } from 'react';
import { format, addWeeks, subWeeks } from 'date-fns';
import { Calendar, ChevronLeft, ChevronRight, Plus, Users } from 'lucide-react';
import { Calendar as CalendarComponent } from './components/Calendar';
import { ShiftForm } from './components/ShiftForm';
import { EmployeeManagement } from './components/EmployeeManagement';
import { Employee, Shift } from './types';

const INITIAL_EMPLOYEES: Employee[] = [
  { id: '1', name: '山田太郎', position: 'マネージャー', color: '#4F46E5' },
  { id: '2', name: '佐藤花子', position: 'スタッフ', color: '#059669' },
  { id: '3', name: '鈴木一郎', position: 'スタッフ', color: '#DC2626' },
];

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [showShiftForm, setShowShiftForm] = useState(false);
  const [showEmployeeManagement, setShowEmployeeManagement] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>(INITIAL_EMPLOYEES);

  const handlePrevWeek = () => setSelectedDate(subWeeks(selectedDate, 1));
  const handleNextWeek = () => setSelectedDate(addWeeks(selectedDate, 1));

  const handleAddShift = (shiftData: Omit<Shift, 'id'>) => {
    const newShift: Shift = {
      ...shiftData,
      id: Math.random().toString(36).substr(2, 9),
    };
    setShifts([...shifts, newShift]);
    setShowShiftForm(false);
  };

  const handleUpdateEmployees = (updatedEmployees: Employee[]) => {
    setEmployees(updatedEmployees);
    // シフトの整合性を保つため、削除された従業員のシフトも削除
    const activeEmployeeIds = new Set(updatedEmployees.map(emp => emp.id));
    setShifts(shifts.filter(shift => activeEmployeeIds.has(shift.employeeId)));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-6 w-6 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">シフト管理</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowEmployeeManagement(true)}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <Users className="h-5 w-5" />
                <span>従業員管理</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button
              onClick={handlePrevWeek}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <h2 className="text-xl font-semibold">
              {format(selectedDate, 'yyyy年 M月')}
            </h2>
            <button
              onClick={handleNextWeek}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          <button
            onClick={() => setShowShiftForm(true)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>シフトを追加</span>
          </button>
        </div>

        <CalendarComponent
          shifts={shifts}
          employees={employees}
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
        />

        {showShiftForm && (
          <ShiftForm
            employees={employees}
            selectedDate={selectedDate}
            onSubmit={handleAddShift}
            onClose={() => setShowShiftForm(false)}
          />
        )}

        {showEmployeeManagement && (
          <EmployeeManagement
            employees={employees}
            onUpdateEmployees={handleUpdateEmployees}
            onClose={() => setShowEmployeeManagement(false)}
          />
        )}
      </main>
    </div>
  );
}

export default App;