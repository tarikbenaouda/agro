import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';
import { TaskType } from '@/types';

const TASK_CONFIG: Record<TaskType, { label: string; icon: string; color: string; bg: string }> = {
  irrigation: { label: 'Irrigation', icon: '💧', color: Colors.irrigation, bg: Colors.irrigationBg },
  fertilizing: { label: 'Fertilizing', icon: '🌿', color: Colors.fertilizing, bg: Colors.fertilizingBg },
  pesticide: { label: 'Pesticide', icon: '🐛', color: Colors.pesticide, bg: Colors.pesticideBg },
  pruning: { label: 'Pruning', icon: '✂️', color: Colors.pruning, bg: Colors.pruningBg },
  observation: { label: 'Observation', icon: '🔍', color: Colors.observation, bg: Colors.observationBg },
};

interface TaskBadgeProps {
  task: TaskType;
  small?: boolean;
}

export default function TaskBadge({ task, small }: TaskBadgeProps) {
  const config = TASK_CONFIG[task];
  return (
    <View style={[styles.badge, { backgroundColor: config.bg }, small && styles.small]}>
      <Text style={[styles.icon, small && styles.smallIcon]}>{config.icon}</Text>
      {!small && (
        <Text style={[styles.label, { color: config.color }]}>{config.label}</Text>
      )}
    </View>
  );
}

export { TASK_CONFIG };

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    gap: 5,
    marginRight: 6,
    marginBottom: 6,
  },
  small: {
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 12,
  },
  icon: {
    fontSize: 13,
  },
  smallIcon: {
    fontSize: 10,
  },
  label: {
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
    letterSpacing: 0.3,
  },
});
