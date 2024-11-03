import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Employee } from '../types';
import { EmployeeList } from './EmployeeList';
import { EmployeeForm } from './EmployeeForm';

interface EmployeeManagementProps {
  employees: Employee[];
  onUpdateEmployees: (employees: Employee[]) => void;
  onClose: () => void;
}

export function EmployeeManagement({
  employees,
  onUpdateEmployees,
  onClose,
}: EmployeeManagementProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | undefined>();

  const handleAddEmployee = (data: Omit<Employee, 'id'>) => {
    const newEmployee: Employee = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
    };
    onUpdateEmployees([...employees, newEmployee]);
    setShowForm(false);
  };

  const handleEditEmployee = (data: Omit<Employee, 'id'>) => {
    if (!editingEmployee) return;
    const updatedEmployees = employees.map((emp) =>
      emp.id === editingEmployee.id ? { ...data, id: emp.id } : emp
    );
    onUpdateEmployees(updatedEmployees);
    setEditingEmployee(undefined);
  };

  const handleDeleteEmployee = (employeeId: string) => {
    if (confirm('この従業員を削除してもよろしいですか？')) {
      const updatedEmployees = employees.filter((emp) => emp.id !== employeeId);
      onUpdateEmployees(updatedEmployees);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">従業員管理</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="mb-6">
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            従業員を追加
          </button>
        </div>

        <EmployeeList
          employees={employees}
          onEdit={(employee) => setEditingEmployee(employee)}
          onDelete={handleDeleteEmployee}
        />

        {(showForm || editingEmployee) && (
          <EmployeeForm
            employee={editingEmployee}
            onSubmit={editingEmployee ? handleEditEmployee : handleAddEmployee}
            onClose={() => {
              setShowForm(false);
              setEditingEmployee(undefined);
            }}
          />
        )}
      </div>
    </div>
  );
}