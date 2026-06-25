
export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'not completed'; 
  createdAt: string;
}