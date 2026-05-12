import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { format, parseISO } from 'date-fns';
import { Colors } from '@/constants/colors';

import { FarmerLog, ProgramDay, TreeId } from '@/types';
import TaskBadge from './TaskBadge';
import GlassCard from './GlassCard';
import LogForm from './LogForm';

interface DayPanelProps {
  treeId: TreeId;
  selectedDate: string | null;
  programDay: ProgramDay | null;
  onLogSaved: (log: FarmerLog) => void;
}

const accentFor = (treeId: TreeId) =>
  treeId === 'olive' ? Colors.oliveAccent : Colors.orangeAccent;

export default function DayPanel({ treeId, selectedDate, programDay, onLogSaved }: DayPanelProps) {
  const accent = accentFor(treeId);

  if (!selectedDate) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>📅</Text>
        <Text style={styles.emptyTitle}>Select a Day</Text>
        <Text style={styles.emptySubtitle}>
          Tap any day on the calendar above to view its program and log your activities.
        </Text>
      </View>
    );
  }

  const parsedDate = parseISO(selectedDate);
  const formattedDate = format(parsedDate, 'EEEE, d MMMM yyyy');

  return (
    <View style={styles.panelContainer}>
      {/* Date Header */}
      <View style={styles.dateHeader}>
        <Text style={[styles.dateText, { color: accent }]}>{formattedDate}</Text>
        {programDay && (
          <View style={styles.badgeRow}>
            {programDay.tasks.map((t) => (
              <TaskBadge key={t} task={t} />
            ))}
          </View>
        )}
      </View>

      {/* Program Card */}
      {programDay ? (
        <GlassCard accentColor={accent} style={styles.programCard}>
          <View style={styles.programContent}>
            <Text style={styles.programLabel}>📋  Today's Program</Text>
            <Text style={styles.programInstruction}>{programDay.instruction}</Text>
          </View>
        </GlassCard>
      ) : (
        <GlassCard style={styles.programCard}>
          <View style={styles.programContent}>
            <Text style={styles.noProgramText}>
              🌱  No scheduled program task for this day. You can still log any activities performed.
            </Text>
          </View>
        </GlassCard>
      )}

      {/* Log Form Section */}
      <View style={styles.logSection}>
        <Text style={styles.logSectionTitle}>Your Daily Log</Text>
        <LogForm treeId={treeId} date={selectedDate} onSaved={onLogSaved} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  panelContainer: {
    paddingBottom: 40,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingVertical: 60,
    gap: 12,
  },
  emptyIcon: {
    fontSize: 48,
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
  },
  dateHeader: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  dateText: {
    fontSize: 17,
    fontFamily: 'Poppins_700Bold',
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  programCard: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  programContent: {
    padding: 16,
  },
  programLabel: {
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
    color: Colors.textMuted,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  programInstruction: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  noProgramText: {
    fontSize: 13,
    fontFamily: 'Poppins_400Regular',
    color: Colors.textMuted,
    lineHeight: 22,
  },
  logSection: {
    marginHorizontal: 0,
  },
  logSectionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
    color: Colors.textPrimary,
    paddingHorizontal: 16,
    paddingBottom: 4,
    marginBottom: 4,
    letterSpacing: 0.3,
  },
});
