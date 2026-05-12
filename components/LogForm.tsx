import { Colors } from '@/constants/colors';
import { useFarmerLog } from '@/hooks/useFarmerLog';
import { FarmerLog, TreeId } from '@/types';
import * as Haptics from 'expo-haptics';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

interface LogFormProps {
  treeId: TreeId;
  date: string;
  onSaved: (log: FarmerLog) => void;
}

const accentFor = (treeId: TreeId) =>
  treeId === 'olive' ? Colors.oliveAccent : Colors.orangeAccent;

export default function LogForm({ treeId, date, onSaved }: LogFormProps) {
  const { getLog, saveLog } = useFarmerLog();
  const accent = accentFor(treeId);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  // Irrigation
  const [irrigDone, setIrrigDone] = useState(false);
  const [irrigLiters, setIrrigLiters] = useState('');

  // Fertilizer
  const [fertDone, setFertDone] = useState(false);
  const [fertProduct, setFertProduct] = useState('');
  const [fertQty, setFertQty] = useState('');

  // Pesticide
  const [pestDone, setPestDone] = useState(false);
  const [pestProduct, setPestProduct] = useState('');
  const [pestQty, setPestQty] = useState('');

  // Notes
  const [notes, setNotes] = useState('');

  // Load existing log
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getLog(treeId, date).then((log) => {
      if (cancelled) return;
      if (log) {
        setIrrigDone(log.irrigation?.done ?? false);
        setIrrigLiters(log.irrigation?.litersPerTree?.toString() ?? '');
        setFertDone(log.fertilizer?.done ?? false);
        setFertProduct(log.fertilizer?.product ?? '');
        setFertQty(log.fertilizer?.quantityPerTree ?? '');
        setPestDone(log.pesticide?.done ?? false);
        setPestProduct(log.pesticide?.product ?? '');
        setPestQty(log.pesticide?.quantityPerTree ?? '');
        setNotes(log.notes ?? '');
        setLastSaved(log.loggedAt ?? null);
      } else {
        setIrrigDone(false); setIrrigLiters('');
        setFertDone(false); setFertProduct(''); setFertQty('');
        setPestDone(false); setPestProduct(''); setPestQty('');
        setNotes('');
        setLastSaved(null);
      }
      setLoading(false);
    });
    return () => { cancelled = true; };
  }, [treeId, date]);

  // Validation
  const irrigValid = !irrigDone || (irrigLiters.trim() !== '' && !isNaN(Number(irrigLiters)));
  const fertValid = !fertDone || (fertProduct.trim() !== '' && fertQty.trim() !== '');
  const pestValid = !pestDone || (pestProduct.trim() !== '' && pestQty.trim() !== '');
  const canSave = irrigValid && fertValid && pestValid;

  const validationHints: string[] = [];
  if (!irrigValid) validationHints.push('Enter liters per tree for irrigation');
  if (!fertValid) validationHints.push('Enter product name and quantity for fertilizing');
  if (!pestValid) validationHints.push('Enter product name and quantity for pesticide');

  const handleSave = async () => {
    if (!canSave) return;
    setSaving(true);
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const log: FarmerLog = {
      treeId,
      date,
      irrigation: { done: irrigDone, litersPerTree: irrigDone ? Number(irrigLiters) : undefined },
      fertilizer: { done: fertDone, product: fertDone ? fertProduct : undefined, quantityPerTree: fertDone ? fertQty : undefined },
      pesticide: { done: pestDone, product: pestDone ? pestProduct : undefined, quantityPerTree: pestDone ? pestQty : undefined },
      notes,
      loggedAt: new Date().toISOString(),
    };
    await saveLog(log);
    setLastSaved(log.loggedAt);
    setSaving(false);
    onSaved(log);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color={accent} size="small" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Irrigation */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionIcon}>💧</Text>
          <Text style={styles.sectionTitle}>Irrigation</Text>
          <Switch
            value={irrigDone}
            onValueChange={(v) => { setIrrigDone(v); Haptics.selectionAsync(); }}
            trackColor={{ false: Colors.border, true: accent + '66' }}
            thumbColor={irrigDone ? accent : Colors.textMuted}
          />
        </View>
        {irrigDone && (
          <View style={styles.fieldsContainer}>
            <Text style={styles.fieldLabel}>
              Liters per tree <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={[styles.input, !irrigValid && styles.inputError]}
              placeholder="e.g. 45"
              placeholderTextColor={Colors.textMuted}
              keyboardType="numeric"
              value={irrigLiters}
              onChangeText={setIrrigLiters}
            />
          </View>
        )}
      </View>

      <View style={styles.divider} />

      {/* Fertilizing */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionIcon}>🌿</Text>
          <Text style={styles.sectionTitle}>Fertilizing</Text>
          <Switch
            value={fertDone}
            onValueChange={(v) => { setFertDone(v); Haptics.selectionAsync(); }}
            trackColor={{ false: Colors.border, true: accent + '66' }}
            thumbColor={fertDone ? accent : Colors.textMuted}
          />
        </View>
        {fertDone && (
          <View style={styles.fieldsContainer}>
            <Text style={styles.fieldLabel}>
              Product name <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={[styles.input, fertDone && fertProduct.trim() === '' && styles.inputError]}
              placeholder="e.g. NPK 20-20-20"
              placeholderTextColor={Colors.textMuted}
              value={fertProduct}
              onChangeText={setFertProduct}
            />
            <Text style={[styles.fieldLabel, { marginTop: 10 }]}>
              Quantity per tree <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={[styles.input, fertDone && fertQty.trim() === '' && styles.inputError]}
              placeholder="e.g. 200g"
              placeholderTextColor={Colors.textMuted}
              value={fertQty}
              onChangeText={setFertQty}
            />
          </View>
        )}
      </View>

      <View style={styles.divider} />

      {/* Pesticide */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionIcon}>🐛</Text>
          <Text style={styles.sectionTitle}>Pesticide / Treatment</Text>
          <Switch
            value={pestDone}
            onValueChange={(v) => { setPestDone(v); Haptics.selectionAsync(); }}
            trackColor={{ false: Colors.border, true: accent + '66' }}
            thumbColor={pestDone ? accent : Colors.textMuted}
          />
        </View>
        {pestDone && (
          <View style={styles.fieldsContainer}>
            <Text style={styles.fieldLabel}>
              Product name <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={[styles.input, pestDone && pestProduct.trim() === '' && styles.inputError]}
              placeholder="e.g. Spinosad bait"
              placeholderTextColor={Colors.textMuted}
              value={pestProduct}
              onChangeText={setPestProduct}
            />
            <Text style={[styles.fieldLabel, { marginTop: 10 }]}>
              Quantity per tree <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={[styles.input, pestDone && pestQty.trim() === '' && styles.inputError]}
              placeholder="e.g. 0.5L or 5ml"
              placeholderTextColor={Colors.textMuted}
              value={pestQty}
              onChangeText={setPestQty}
            />
          </View>
        )}
      </View>

      <View style={styles.divider} />

      {/* Notes */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionIcon}>📝</Text>
          <Text style={styles.sectionTitle}>Field Notes</Text>
        </View>
        <TextInput
          style={[styles.input, styles.notesInput]}
          placeholder="Weather, observations, anything notable…"
          placeholderTextColor={Colors.textMuted}
          value={notes}
          onChangeText={setNotes}
          multiline
          numberOfLines={3}
        />
      </View>

      {/* Validation hints */}
      {!canSave && (
        <View style={styles.validationBox}>
          {validationHints.map((h, i) => (
            <Text key={i} style={styles.validationText}>• {h}</Text>
          ))}
        </View>
      )}

      {/* Save button */}
      <TouchableOpacity
        style={[
          styles.saveBtn,
          { backgroundColor: canSave ? accent : Colors.textDisabled },
        ]}
        onPress={handleSave}
        disabled={!canSave || saving}
        activeOpacity={0.8}
      >
        {saving ? (
          <ActivityIndicator color={Colors.background} size="small" />
        ) : (
          <Text style={styles.saveBtnText}>Save Log</Text>
        )}
      </TouchableOpacity>

      {lastSaved && (
        <Text style={styles.lastSaved}>
          Last saved: {new Date(lastSaved).toLocaleString()}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
  },
  section: {
    paddingVertical: 14,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  sectionIcon: {
    fontSize: 20,
  },
  sectionTitle: {
    flex: 1,
    fontSize: 15,
    color: Colors.textPrimary,
    fontFamily: 'Poppins_600SemiBold',
  },
  fieldsContainer: {
    marginTop: 12,
  },
  fieldLabel: {
    fontSize: 12,
    color: Colors.textMuted,
    fontFamily: 'Poppins_400Regular',
    marginBottom: 6,
    letterSpacing: 0.3,
  },
  required: {
    color: Colors.error,
  },
  input: {
    backgroundColor: Colors.glass,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: Colors.textPrimary,
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
  },
  inputError: {
    borderColor: Colors.error + '88',
  },
  notesInput: {
    marginTop: 10,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
  },
  validationBox: {
    backgroundColor: Colors.error + '18',
    borderRadius: 10,
    padding: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: Colors.error + '44',
  },
  validationText: {
    color: Colors.error,
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    lineHeight: 20,
  },
  saveBtn: {
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  saveBtnText: {
    color: Colors.background,
    fontFamily: 'Poppins_700Bold',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  lastSaved: {
    textAlign: 'center',
    color: Colors.textMuted,
    fontSize: 11,
    fontFamily: 'Poppins_400Regular',
    marginTop: 4,
  },
});
