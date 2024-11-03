export interface Employee {
  id: string;
  name: string;
  position: string;
  color: string;
}

export interface Shift {
  id: string;
  employeeId: string;
  start: Date;
  end: Date;
  notes?: string;
}