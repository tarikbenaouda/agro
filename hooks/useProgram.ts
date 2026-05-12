import { useMemo } from 'react';
import {
  format,
  differenceInCalendarDays,
  parseISO,
  subMonths,
  addMonths,
} from 'date-fns';
import programs from '@/constants/programs';
import { ProgramDay, TreeId } from '@/types';

function resolveToNearestDate(mmdd: string, today: Date): string {
  const [mm, dd] = mmdd.split('-').map(Number);
  const candidates = [-1, 0, 1].map(
    (offset) => new Date(today.getFullYear() + offset, mm - 1, dd)
  );
  const nearest = candidates.reduce((best, candidate) => {
    const diffBest = Math.abs(differenceInCalendarDays(today, best));
    const diffCandidate = Math.abs(differenceInCalendarDays(today, candidate));
    return diffCandidate < diffBest ? candidate : best;
  });
  return format(nearest, 'yyyy-MM-dd');
}

export function useProgram(treeId: TreeId) {
  const today = useMemo(() => new Date(), []);
  const rawProgram = programs[treeId];

  // Resolve MM-DD → YYYY-MM-DD (nearest occurrence, no duplicates)
  const resolvedProgram = useMemo<Record<string, ProgramDay>>(() => {
    const resolved: Record<string, ProgramDay> = {};
    const windowStart = subMonths(today, 12);
    const windowEnd = addMonths(today, 12);

    for (const [mmdd, dayData] of Object.entries(rawProgram)) {
      const nearestDateStr = resolveToNearestDate(mmdd, today);
      const nearestDate = parseISO(nearestDateStr);
      if (nearestDate >= windowStart && nearestDate <= windowEnd) {
        resolved[nearestDateStr] = dayData;
      }
    }
    return resolved;
  }, [treeId]);

  const getProgramDay = (date: string): ProgramDay | null =>
    resolvedProgram[date] ?? null;

  return { resolvedProgram, getProgramDay };
}
