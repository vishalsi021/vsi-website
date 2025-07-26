export interface Credentials {
  userId: string;
  password?: string; // Password can be optional on the frontend type
}

export interface SubjectAttendance {
  name: string;
  code: string;
  present: number;
  total: number;
  percentage: number;
}

export interface DetailedLogEntry {
  date: string;
  subject: string;
  topic: string;
  status: 'PRESENT' | 'ABSENT';
}

export interface AttendanceData {
  name: string;
  userId: string;
  overall: number;
  subjects: SubjectAttendance[];
  detailedLog: DetailedLogEntry[];
  fromCache?: boolean;
}