import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  SafeAreaView, 
  Keyboard,
  ActivityIndicator
} from 'react-native';
import { useTasks } from '../context/TaskContext';
import { TaskCard } from '../components/TaskCard';
import { EmptyState } from '../components/EmptyState';
import { Plus, Search } from 'lucide-react-native';

export const HomeScreen = ({ navigation }: any) => {
  const { tasks, addTask, toggleTaskStatus, deleteTask, isLoading } = useTasks();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'completed' | 'not completed'>('all');

  const handleAddTask = () => {
    if (!title.trim()) {
      setError('Titulli i detyrës është i detyrueshëm!');
      return;
    }
    
    addTask(title, description);
    setTitle('');
    setDescription('');
    setError('');
    Keyboard.dismiss(); // Mbyll tastierën pas shtimit
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || task.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4f46e5" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        
        {/* HEADER / FORMA E SHTIMIT */}
        <View style={styles.formContainer}>
          <Text style={styles.headerTitle}>Menaxhuesi i Detyrave</Text>
          
          <TextInput
            style={[styles.input, error ? styles.inputError : null]}
            placeholder="Titulli i detyrës..."
            placeholderTextColor="#94a3b8"
            value={title}
            onChangeText={(text) => {
              setTitle(text);
              if (text) setError(''); 
            }}
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Përshkrimi i shkurtër (opsionale)..."
            placeholderTextColor="#94a3b8"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={2}
          />

          <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
            <Plus size={20} color="#fff" style={{ marginRight: 4 }} />
            <Text style={styles.addButtonText}>Shto Detyrë</Text>
          </TouchableOpacity>
        </View>

        {/* BARA E KËRKIMIT (BONUS 1) */}
        <View style={styles.searchContainer}>
          <Search size={20} color="#94a3b8" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Kërko detyra sipas titullit..."
            placeholderTextColor="#94a3b8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* FILTRAT (BONUS 2) */}
        <View style={styles.filterContainer}>
          {(['all', 'not completed', 'completed'] as const).map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterButton,
                activeFilter === filter && styles.activeFilterButton
              ]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text style={[
                styles.filterButtonText,
                activeFilter === filter && styles.activeFilterButtonText
              ]}>
                {filter === 'all' && 'Të gjitha'}
                {filter === 'not completed' && 'E hapur'}
                {filter === 'completed' && 'Kryer'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* LISTA E TASK-EVE */}
        <FlatList
          data={filteredTasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskCard
              task={item}
              onToggle={() => toggleTaskStatus(item.id)}
              onDelete={() => deleteTask(item.id)}
              onPress={() => navigation.navigate('TaskDetails', { task: item })} // Navigimi te Detajet
            />
          )}
          ListEmptyComponent={<EmptyState message={searchQuery ? "Nuk u gjet asnjë detyrë me këtë titull." : undefined} />}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        />

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc', // Sfond i pastër dritë
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 16,
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  input: {
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    color: '#1e293b',
    marginBottom: 10,
  },
  inputError: {
    borderWidth: 1,
    borderColor: '#ef4444',
  },
  textArea: {
    height: 60,
    textAlignVertical: 'top',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 13,
    marginBottom: 10,
    marginTop: -4,
    fontWeight: '500',
  },
  addButton: {
    backgroundColor: '#4f46e5', // Indigo ngjyrë moderne
    borderRadius: 8,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 15,
    color: '#1e293b',
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
  },
  filterButton: {
    flex: 1,
    backgroundColor: '#e2e8f0',
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
  },
  activeFilterButton: {
    backgroundColor: '#4f46e5',
  },
  filterButtonText: {
    color: '#475569',
    fontWeight: '600',
    fontSize: 13,
  },
  activeFilterButtonText: {
    color: '#fff',
  },
});