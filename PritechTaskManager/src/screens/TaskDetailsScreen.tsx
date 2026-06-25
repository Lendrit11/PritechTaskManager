
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Calendar, CheckCircle2, Circle, ArrowLeft, FileText } from 'lucide-react-native';

export const TaskDetailsScreen = ({ route, navigation }: any) => {
  const { task } = route.params;
  const isCompleted = task.status === 'completed';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color="#1e293b" />
          <Text style={styles.backText}>Kthehu</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        {/* IKONA DHE STATUASI KRYESOR */}
        <View style={styles.statusBadgeContainer}>
          <View style={[styles.statusBadge, isCompleted ? styles.badgeCompleted : styles.badgePending]}>
            {isCompleted ? (
              <CheckCircle2 size={16} color="#10b981" style={{ marginRight: 6 }} />
            ) : (
              <Circle size={16} color="#f59e0b" style={{ marginRight: 6 }} />
            )}
            <Text style={[styles.badgeText, isCompleted ? styles.textCompleted : styles.textPending]}>
              {isCompleted ? 'E përfunduar' : 'Në pritje (E hapur)'}
            </Text>
          </View>
        </View>

        {/* TITULLI */}
        <Text style={styles.title}>{task.title}</Text>

        {/* DATA E KRIJIMIT */}
        <View style={styles.metaRow}>
          <Calendar size={16} color="#94a3b8" style={{ marginRight: 6 }} />
          <Text style={styles.metaLabel}>Data e krijimit:</Text>
          <Text style={styles.metaValue}>{task.createdAt}</Text>
        </View>

        <View style={styles.divider} />

        {/* PËRSHKRIMI */}
        <View style={styles.descriptionSection}>
          <View style={styles.sectionHeader}>
            <FileText size={18} color="#64748b" style={{ marginRight: 6 }} />
            <Text style={styles.sectionTitle}>Përshkrimi i Detyrës</Text>
          </View>
          <Text style={styles.descriptionText}>{task.description}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: 4,
  },
  backText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginLeft: 6,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 3,
  },
  statusBadgeContainer: {
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeCompleted: {
    backgroundColor: '#e6f4ea',
  },
  badgePending: {
    backgroundColor: '#fef3c7',
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '600',
  },
  textCompleted: {
    color: '#10b981',
  },
  textPending: {
    color: '#d97706',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 16,
    lineHeight: 28,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  metaLabel: {
    fontSize: 14,
    color: '#64748b',
    marginRight: 4,
  },
  metaValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
  },
  divider: {
    height: 1,
    backgroundColor: '#f1f5f9',
    marginBottom: 20,
  },
  descriptionSection: {
    marginTop: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#475569',
  },
  descriptionText: {
    fontSize: 15,
    color: '#334155',
    lineHeight: 22,
  },
});