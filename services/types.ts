
// Student and attendance related types
export interface Student {
  id: string;
  name: string;
  rollNumber: string;
  email?: string;
}

export interface AttendanceLog {
  id: string;
  studentId: string;
  subject: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  timestamp: string;
  notes?: string;
}

export interface SubjectAttendance {
  subject: string;
  totalClasses: number;
  attendedClasses: number;
  percentage: number;
  logs: AttendanceLog[];
}

// Express types with proper typing
export interface AuthRequest extends Request {
  user?: any;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

export type RequestHandler = (req: any, res: any) => void;

export type AuthMiddleware = (req: any, res: any, next: any) => void;

export type ErrorHandler = (err: any, req: any, res: any, next: any) => void;

// Component prop types
export interface LoginScreenProps {
  onSubmit: (credentials: LoginCredentials) => void;
  isLoading: boolean;
  error: string | null;
}

export interface AttendanceDashboardProps {
  data: SubjectAttendance[];
  onBack: () => void;
}

export interface SubjectCardProps {
  subject: SubjectAttendance;
  onClick?: (subject: SubjectAttendance) => void;
}

export interface DetailedLogTableProps {
  logs: AttendanceLog[];
}

export interface OverallProgressProps {
  percentage: number;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

// UI Component props
export interface ButtonProps {
  variant?: 'primary' | 'secondary';
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export interface InputProps {
  className?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

export interface AlertProps {
  message: string;
  className?: string;
}