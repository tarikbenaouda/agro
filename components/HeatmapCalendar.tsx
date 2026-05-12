import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  PanResponder,
  StyleSheet,
  Animated,
} from 'react-native';
import { format, addMonths, subMonths, isToday, startOfMonth } from 'date-fns';
import { Colors } from '@/constants/colors';
import { useCalendarData } from '@/hooks/useCalendarData';
import { FarmerLog, TreeId, TaskType } from '@/types';

const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const CELL_SIZE = 42;
const CELL_GAP = 5;

interface HeatmapCalendarProps {
  treeId: TreeId;
  resolvedProgram: Record<string, unknown>;
  logs: Record<string, FarmerLog>;
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
  minMonth: Date;
  maxMonth: Date;
}

export default function HeatmapCalendar({
  treeId,
  resolvedProgram,
  logs,
  selectedDate,
  onSelectDate,
  minMonth,
  maxMonth,
}: HeatmapCalendarProps) {
  const isOlive = treeId === 'olive';
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // Use refs to prevent race conditions during rapid swiping
  const currentMonthRef = useRef(currentMonth);
  currentMonthRef.current = currentMonth;
  const isAnimating = useRef(false);

  const slideAnim = useRef(new Animated.Value(0)).current;

  const { calendarDays } = useCalendarData(treeId, currentMonth, resolvedProgram, logs);

  const navigate = useCallback(
    (direction: 'next' | 'prev', fromOffset: number = 0) => {
      if (isAnimating.current) return;

      const toMonth =
        direction === 'next'
          ? addMonths(currentMonthRef.current, 1)
          : subMonths(currentMonthRef.current, 1);

      // Bounce back if limits hit
      if (direction === 'next' && startOfMonth(toMonth) > startOfMonth(maxMonth)) {
        if (fromOffset !== 0) Animated.spring(slideAnim, { toValue: 0, useNativeDriver: true }).start();
        return;
      }
      if (direction === 'prev' && startOfMonth(toMonth) < startOfMonth(minMonth)) {
        if (fromOffset !== 0) Animated.spring(slideAnim, { toValue: 0, useNativeDriver: true }).start();
        return;
      }

      isAnimating.current = true;
      const outValue = direction === 'next' ? -400 : 400;
      
      Animated.timing(slideAnim, { toValue: outValue, duration: 150, useNativeDriver: true }).start(() => {
        // Change month once it's fully off-screen
        setCurrentMonth(toMonth);
        slideAnim.setValue(-outValue); // Snap to opposite side immediately
        
        Animated.timing(slideAnim, { toValue: 0, duration: 180, useNativeDriver: true }).start(() => {
          isAnimating.current = false;
        });
      });
    },
    [maxMonth, minMonth, slideAnim]
  );

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, gs) => {
        return !isAnimating.current && Math.abs(gs.dx) > 15 && Math.abs(gs.dx) > Math.abs(gs.dy) * 1.5;
      },
      onPanResponderMove: (_, gs) => {
        if (!isAnimating.current) {
          slideAnim.setValue(gs.dx);
        }
      },
      onPanResponderRelease: (_, gs) => {
        if (isAnimating.current) return;
        
        if (gs.dx < -60) {
          navigate('next', gs.dx);
        } else if (gs.dx > 60) {
          navigate('prev', gs.dx);
        } else {
          // Did not swipe far enough, snap back to center
          Animated.spring(slideAnim, { toValue: 0, useNativeDriver: true }).start();
        }
      },
      onPanResponderTerminate: () => {
        if (!isAnimating.current) {
          Animated.spring(slideAnim, { toValue: 0, useNativeDriver: true }).start();
        }
      }
    })
  ).current;

  const getHeatColor = (count: number) => {
    if (isOlive) {
      if (count === 0) return Colors.heatEmpty;
      if (count === 1) return Colors.heatLevel1;
      if (count === 2) return Colors.heatLevel2;
      return Colors.heatLevel3;
    } else {
      if (count === 0) return Colors.heatEmptyOrange;
      if (count === 1) return Colors.heatLevel1Orange;
      if (count === 2) return Colors.heatLevel2Orange;
      return Colors.heatLevel3Orange;
    }
  };

  // Use white text on darker heat cells for readability
  const getDayTextColor = (count: number) => {
    return count >= 2 ? '#ffffff' : Colors.textSecondary;
  };

  const getTaskColor = (task: TaskType) => {
    switch (task) {
      case 'irrigation': return Colors.irrigation; // Blue
      case 'fertilizing': return Colors.fertilizing; // Green
      case 'pesticide': return Colors.pesticide; // Orange/Red
      case 'pruning': return Colors.pruning;
      case 'observation': return Colors.observation;
      default: return Colors.programDot;
    }
  };

  const accent = isOlive ? Colors.oliveAccent : Colors.orangeAccent;

  const canGoPrev = startOfMonth(subMonths(currentMonth, 1)) >= startOfMonth(minMonth);
  const canGoNext = startOfMonth(addMonths(currentMonth, 1)) <= startOfMonth(maxMonth);

  return (
    <View style={styles.container}>
      {/* Month Navigation Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigate('prev')}
          disabled={!canGoPrev}
          style={styles.navBtn}
        >
          <Text style={[styles.navArrow, !canGoPrev && styles.navArrowDisabled]}>‹</Text>
        </TouchableOpacity>
        <Text style={[styles.monthLabel, { color: accent }]}>
          {format(currentMonth, 'MMMM yyyy')}
        </Text>
        <TouchableOpacity
          onPress={() => navigate('next')}
          disabled={!canGoNext}
          style={styles.navBtn}
        >
          <Text style={[styles.navArrow, !canGoNext && styles.navArrowDisabled]}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Weekday labels */}
      <View style={styles.weekRow}>
        {WEEKDAYS.map((d) => (
          <Text key={d} style={styles.weekday}>
            {d}
          </Text>
        ))}
      </View>

      {/* Day grid */}
      <Animated.View
        {...panResponder.panHandlers}
        style={[styles.grid, { transform: [{ translateX: slideAnim }] }]}
      >
        {calendarDays.map((cell, idx) => {
          if (!cell) {
            return <View key={`e-${idx}`} style={styles.emptyCell} />;
          }
          const isSelected = selectedDate === cell.dateString;
          const isTodayDate = isToday(new Date(cell.dateString));
          const heatColor = getHeatColor(cell.activityCount);
          const textColor = getDayTextColor(cell.activityCount);

          return (
            <TouchableOpacity
              key={cell.dateString}
              style={[
                styles.dayCell,
                { backgroundColor: heatColor },
                isTodayDate && [styles.todayCell, { borderColor: accent }],
                isSelected && [styles.selectedCell, { backgroundColor: accent + '44', borderColor: accent }],
              ]}
              onPress={() => onSelectDate(cell.dateString)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.dayText,
                  { color: textColor },
                  isTodayDate && [styles.todayText, { color: accent }],
                  isSelected && { color: Colors.textPrimary, fontFamily: 'Poppins_700Bold' },
                ]}
              >
                {cell.day}
              </Text>
              {cell.tasks.length > 0 && (
                <View style={styles.dotContainer}>
                  {cell.tasks.slice(0, 3).map((task, i) => (
                    <View key={i} style={[styles.dot, { backgroundColor: getTaskColor(task) }]} />
                  ))}
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </Animated.View>

      {/* Legend */}
      <View style={styles.legend}>
        <Text style={styles.legendLabel}>Less</Text>
        {[Colors.heatEmpty, isOlive ? Colors.heatLevel1 : Colors.heatLevel1Orange, isOlive ? Colors.heatLevel2 : Colors.heatLevel2Orange, isOlive ? Colors.heatLevel3 : Colors.heatLevel3Orange].map((c, i) => (
          <View key={i} style={[styles.legendCell, { backgroundColor: c }]} />
        ))}
        <Text style={styles.legendLabel}>More activity</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 14,
    paddingTop: 8,
    paddingBottom: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 4,
  },
  navBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navArrow: {
    fontSize: 28,
    color: Colors.textPrimary,
    lineHeight: 32,
  },
  navArrowDisabled: {
    color: Colors.textDisabled,
  },
  monthLabel: {
    fontSize: 17,
    fontFamily: 'Poppins_700Bold',
    letterSpacing: 0.5,
  },
  weekRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  weekday: {
    width: CELL_SIZE + CELL_GAP,
    textAlign: 'center',
    fontSize: 11,
    color: Colors.textMuted,
    fontFamily: 'Poppins_600SemiBold',
    letterSpacing: 0.5,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: CELL_GAP,
  },
  dayCell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'transparent',
    position: 'relative',
  },
  emptyCell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
  },
  todayCell: {
    borderWidth: 2,
  },
  selectedCell: {
    borderWidth: 2,
  },
  dayText: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontFamily: 'Poppins_400Regular',
  },
  todayText: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 13,
  },
  dotContainer: {
    position: 'absolute',
    bottom: 3,
    flexDirection: 'row',
    gap: 2,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 10,
    paddingHorizontal: 2,
  },
  legendCell: {
    width: 13,
    height: 13,
    borderRadius: 3,
  },
  legendLabel: {
    fontSize: 10,
    color: Colors.textMuted,
    fontFamily: 'Poppins_400Regular',
    marginHorizontal: 2,
  },
});
