import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Circle, CheckCircle2, Trash2, Calendar } from 'lucide-react-native';
import { Task } from '../types/task';

interface TaskCardProps {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
  onPress: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onToggle, onDelete, onPress }) => {
  const isCompleted = task.status === 'completed';

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      
      {/* 1. Butoni i Statusit (Check / Uncheck) */}
      <TouchableOpacity style={styles.statusButton} onPress={onToggle}>
        {isCompleted ? (
          <CheckCircle2 size={24} color="#10b981" fill="#e6f4ea" />
        ) : (
          <Circle size={24} color="#94a3b8" />
        )}
      </TouchableOpacity>

      {/* 2. Tekstet e Taskut (Titulli dhe Përshkrimi) */}
      <View style={styles.textContainer}>
        <Text 
          style={[styles.title, isCompleted && styles.completedText]} 
          numberOfLines={1}
        >
          {task.title}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {task.description}
        </Text>
        
        {/* Data e krijimit */}
        <View style={styles.dateContainer}>
          <Calendar size={12} color="#94a3b8" style={{ marginRight: 4 }} />
          <Text style={styles.dateText}>{task.createdAt}</Text>
        </View>
      </View>

      {/* 3. Butoni për Fshirje (Trash) */}
      <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
        <Trash2 size={20} color="#ef4444" />
      </TouchableOpacity>
      
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    // Hijet (Shadows) për një pamje moderne pastër "Clean UI"
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statusButton: {
    marginRight: 12,
    padding: 4,
  },
  textContainer: {
    flex: 1,
    paddingRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#94a3b8',
  },
  description: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 6,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 11,
    color: '#94a3b8',
  },
  deleteButton: {
    padding: 8,
  },
});