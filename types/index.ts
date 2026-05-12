export type TaskType = 'irrigation' | 'fertilizing' | 'pesticide' | 'pruning' | 'observation';
export type TreeId = 'olive' | 'orange';

export interface ProgramDay {
  tasks: TaskType[];
  instruction: string;
}

export interface WaterLog {
  done: boolean;
  litersPerTree?: number;
}

export interface FertilizerLog {
  done: boolean;
  product?: string;
  quantityPerTree?: string;
}

export interface PesticideLog {
  done: boolean;
  product?: string;
  quantityPerTree?: string;
}

export interface FarmerLog {
  treeId: TreeId;
  date: string; // YYYY-MM-DD
  irrigation: WaterLog;
  fertilizer: FertilizerLog;
  pesticide: PesticideLog;
  notes: string;
  loggedAt: string; // ISO timestamp
}

export interface DayCalendarData {
  dateString: string; // YYYY-MM-DD
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  hasProgram: boolean;
  activityCount: number; // 0-3 for heatmap
}
