import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../types/task';

interface TaskContextType {
  tasks: Task[];
  addTask: (title: string, description: string) => void;
  toggleTaskStatus: (id: string) => void;
  deleteTask: (id: string) => void;
  isLoading: boolean;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);
const STORAGE_KEY = '@pritech_tasks_key';

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

 
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const savedTasks = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedTasks) {
          
          setTasks(JSON.parse(savedTasks));
        } else {
          // Fetch nga një API Publik (Kërkesë Kryesore)
          const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=3');
          const data = await response.json();
          
          const initialTasks: Task[] = data.map((todo: any) => ({
            id: `api-${todo.id}`,
            title: todo.title,
            description: 'Detyrë e ngarkuar automatikisht nga API publik.',
            status: todo.completed ? 'completed' : 'not completed',
            createdAt: new Date().toLocaleDateString('sq-AL'),
          }));
          
          setTasks(initialTasks);
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(initialTasks));
        }
      } catch (error) {
        console.error('Gabim gjatë ngarkimit të të dhënave:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
  }, []);

  const addTask = async (title: string, description: string) => {
    if (!title.trim()) return; 

    const newTask: Task = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim() || 'Nuk ka përshkrim.',
      status: 'not completed',
      createdAt: new Date().toLocaleDateString('sq-AL'),
    };

    const updatedTasks = [newTask, ...tasks];
    setTasks(updatedTasks);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
  };

  const toggleTaskStatus = async (id: string) => {
    const updatedTasks = tasks.map(task => 
      task.id === id 
        ? { ...task, status: (task.status === 'completed' ? 'not completed' : 'completed') as 'completed' | 'not completed' }
        : task
    );
    setTasks(updatedTasks);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
  };

  const deleteTask = async (id: string) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleTaskStatus, deleteTask, isLoading }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks duhet të përdoret brenda një TaskProvider');
  }
  return context;
};