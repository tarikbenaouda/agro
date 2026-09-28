import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { addMonths, subMonths } from 'date-fns';
import { Colors } from '@/constants/colors';
import { FarmerLog, TreeId } from '@/types';
import { useProgram } from '@/hooks/useProgram';
import { useFarmerLog } from '@/hooks/useFarmerLog';
import HeatmapCalendar from '@/components/HeatmapCalendar';
import DayPanel from '@/components/DayPanel';
import * as Haptics from 'expo-haptics';

const TREE_META: Record<TreeId, { emoji: string; name: string; accent: string }> = {
  olive: { emoji: '🫒', name: 'Olive Program', accent: Colors.oliveAccent },
  orange: { emoji: '🍊', name: 'Orange Program', accent: Colors.orangeAccent },
};

export default function ProgramScreen() {
  const { treeId } = useLocalSearchParams<{ treeId: string }>();
  const id = (treeId === 'olive' || treeId === 'orange' ? treeId : 'olive') as TreeId;
  const meta = TREE_META[id];

  const today = new Date();
  const minMonth = subMonths(today, 12);
  const maxMonth = addMonths(today, 12);

  const { resolvedProgram, getProgramDay } = useProgram(id);
  const { getAllLogs } = useFarmerLog();

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [logs, setLogs] = useState<Record<string, FarmerLog>>({});
  const panelAnim = useRef(new Animated.Value(0)).current;

  const refreshLogs = useCallback(async () => {
    const allLogs = await getAllLogs(id);
    const map: Record<string, FarmerLog> = {};
    for (const log of allLogs) {
      map[log.date] = log;
    }
    setLogs(map);
  }, [id]);

  useEffect(() => {
    refreshLogs();
  }, [refreshLogs]);

  const handleSelectDate = useCallback(
    (date: string) => {
      Haptics.selectionAsync();
      setSelectedDate(date);
      Animated.spring(panelAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 80,
        friction: 10,
      }).start();
    },
    [panelAnim]
  );

  const handleLogSaved = useCallback((log: FarmerLog) => {
    setLogs((prev) => ({ ...prev, [log.date]: log }));
  }, []);

  const programDay = selectedDate ? getProgramDay(selectedDate) : null;

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={['#f0fdf4', '#f8fff9', '#ffffff']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      {/* Decorative accent glow */}
      <View style={[styles.glowOrb, { backgroundColor: meta.accent }]} pointerEvents="none" />

      <SafeAreaView style={styles.safe} edges={['left', 'right']}>
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => {
              Haptics.selectionAsync();
              router.back();
            }}
            style={styles.backBtn}
          >
            <Text style={[styles.backArrow, { color: meta.accent }]}>←</Text>
          </TouchableOpacity>
          <Text style={styles.emoji}>{meta.emoji}</Text>
          <Text style={[styles.headerTitle, { color: meta.accent }]}>{meta.name}</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Accent border line under header */}
        <View style={[styles.headerLine, { backgroundColor: meta.accent }]} />

        {/* Scrollable entire body */}
        <ScrollView
          style={styles.scrollBody}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Calendar top section */}
          <View style={styles.calendarSection}>
            <HeatmapCalendar
              treeId={id}
              resolvedProgram={resolvedProgram}
              logs={logs}
              selectedDate={selectedDate}
              onSelectDate={handleSelectDate}
              minMonth={minMonth}
              maxMonth={maxMonth}
            />
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Day panel bottom section */}
          <Animated.View
            style={[styles.dayPanelSection, { opacity: selectedDate ? panelAnim : 1 }]}
          >
            <DayPanel
              treeId={id}
              selectedDate={selectedDate}
              programDay={programDay}
              onLogSaved={handleLogSaved}
            />
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  safe: {
    flex: 1,
  },
  glowOrb: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    top: -120,
    right: -80,
    opacity: 0.07,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 10,
    gap: 8,
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.glass,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
  },
  backArrow: {
    fontSize: 20,
    fontFamily: 'Poppins_600SemiBold',
  },
  emoji: {
    fontSize: 22,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'Poppins_700Bold',
    letterSpacing: 0.4,
  },
  headerLine: {
    height: 2,
    marginHorizontal: 16,
    borderRadius: 1,
    opacity: 0.4,
    marginBottom: 4,
  },
  scrollBody: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  calendarSection: {
    paddingBottom: 8,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
  },
  dayPanelSection: {
    flex: 1,
  },
});
