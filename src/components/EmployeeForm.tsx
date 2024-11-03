import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Employee } from '../types';

interface EmployeeFormProps {
  employee?: Employee;
  onSubmit: (data: Omit<Employee, 'id'>) => void;
  onClose: () => void;
}

export function EmployeeForm({ employee, onSubmit, onClose }: EmployeeFormProps) {
  const [name, setName] = useState(employee?.name ?? '');
  const [position, setPosition] = useState(employee?.position ?? '');
  const [color, setColor] = useState(employee?.color ?? '#4F46E5');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, position, color });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {employee ? '従業員を編集' : '従業員を追加'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">名前</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">役職</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">表示色</label>
            <input
              type="color"
              className="mt-1 block w-full h-10 rounded-md border-gray-300 shadow-sm"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            {employee ? '更新' : '追加'}
          </button>
        </form>
      </div>
    </div>
  );
}