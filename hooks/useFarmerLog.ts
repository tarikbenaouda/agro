import AsyncStorage from '@react-native-async-storage/async-storage';
import { FarmerLog, TreeId } from '@/types';

const getKey = (treeId: TreeId, date: string) => `agro_log_${treeId}_${date}`;

export const useFarmerLog = () => {
  const getLog = async (treeId: TreeId, date: string): Promise<FarmerLog | null> => {
    try {
      const json = await AsyncStorage.getItem(getKey(treeId, date));
      return json ? (JSON.parse(json) as FarmerLog) : null;
    } catch {
      return null;
    }
  };

  const saveLog = async (log: FarmerLog): Promise<void> => {
    try {
      const entry: FarmerLog = { ...log, loggedAt: new Date().toISOString() };
      await AsyncStorage.setItem(getKey(log.treeId, log.date), JSON.stringify(entry));
    } catch (e) {
      console.error('Failed to save log', e);
    }
  };

  const getAllLogs = async (treeId: TreeId): Promise<FarmerLog[]> => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const logKeys = keys.filter((k) => k.startsWith(`agro_log_${treeId}_`));
      if (logKeys.length === 0) return [];
      const pairs = await AsyncStorage.multiGet(logKeys);
      return pairs
        .filter(([, v]) => v !== null)
        .map(([, v]) => JSON.parse(v!) as FarmerLog)
        .filter(Boolean);
    } catch {
      return [];
    }
  };

  const getActivityCount = (log: FarmerLog): number => {
    let count = 0;
    if (log.irrigation?.done) count++;
    if (log.fertilizer?.done) count++;
    if (log.pesticide?.done) count++;
    return count;
  };

  return { getLog, saveLog, getAllLogs, getActivityCount };
};
