import { useMemo } from 'react';
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  format,
} from 'date-fns';
import { FarmerLog, TreeId, ProgramDay, TaskType } from '@/types';
import { useFarmerLog } from './useFarmerLog';

export interface CalendarDayData {
  dateString: string;
  day: number;
  hasProgram: boolean;
  tasks: TaskType[];
  activityCount: number; // 0–3
}

export function useCalendarData(
  treeId: TreeId,
  currentMonth: Date,
  resolvedProgram: Record<string, ProgramDay>,
  logs: Record<string, FarmerLog>
) {
  const { getActivityCount } = useFarmerLog();

  // Build the grid of day data for the currently visible month
  const calendarDays = useMemo<(CalendarDayData | null)[]>(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

    // Monday-first offset (0=Mon … 6=Sun)
    let startOffset = getDay(monthStart); // 0=Sun
    startOffset = startOffset === 0 ? 6 : startOffset - 1;

    const cells: (CalendarDayData | null)[] = Array(startOffset).fill(null);

    for (const day of daysInMonth) {
      const dateString = format(day, 'yyyy-MM-dd');
      const log = logs[dateString];
      const programDay = resolvedProgram[dateString];
      cells.push({
        dateString,
        day: day.getDate(),
        hasProgram: !!programDay,
        tasks: programDay?.tasks || [],
        activityCount: log ? getActivityCount(log) : 0,
      });
    }

    // Pad to complete last row (multiple of 7)
    while (cells.length % 7 !== 0) cells.push(null);

    return cells;
  }, [currentMonth, resolvedProgram, logs]);

  return { calendarDays };
}
