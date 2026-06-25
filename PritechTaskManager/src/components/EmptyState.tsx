import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ClipboardX } from 'lucide-react-native';

interface EmptyStateProps {
  message?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ 
  message = "Nuk u gjet asnjë detyrë. Shto një detyrë të re më sipër!" 
}) => {
  return (
    <View style={styles.container}>
      {/* Ikonë e bukur nga lucide-react-native */}
      <ClipboardX size={64} color="#94a3b8" strokeWidth={1.5} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    marginTop: 40,
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 22,
  },
});