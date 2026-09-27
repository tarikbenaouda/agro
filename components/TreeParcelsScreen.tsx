import { Colors } from "@/constants/colors";
import { TreeId } from "@/types";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ParcelStatus = "Bon" | "Surveiller";

type ParcelSensorData = {
  id: number;
  moisture: number;
  soilTemp: number;
  airTemp: number;
  humidity: number;
  ph: number;
  ec: number;
  nitrogen: number;
  status: ParcelStatus;
};

const TREE_META: Record<
  TreeId,
  {
    name: string;
    calendarLabel: string;
    accent: string;
    parcels: ParcelSensorData[];
  }
> = {
  olive: {
    name: "Olivier",
    calendarLabel: "Ouvrir le calendrier des oliviers",
    accent: Colors.oliveAccent,
    parcels: [
      {
        id: 1,
        moisture: 42,
        soilTemp: 20.1,
        airTemp: 28.4,
        humidity: 61,
        ph: 6.7,
        ec: 1.5,
        nitrogen: 43,
        status: "Bon",
      },
      {
        id: 2,
        moisture: 36,
        soilTemp: 21.3,
        airTemp: 29.0,
        humidity: 58,
        ph: 6.4,
        ec: 1.7,
        nitrogen: 39,
        status: "Surveiller",
      },
      {
        id: 3,
        moisture: 48,
        soilTemp: 19.7,
        airTemp: 27.8,
        humidity: 64,
        ph: 6.8,
        ec: 1.4,
        nitrogen: 46,
        status: "Bon",
      },
      {
        id: 4,
        moisture: 33,
        soilTemp: 22.0,
        airTemp: 30.1,
        humidity: 56,
        ph: 6.3,
        ec: 1.9,
        nitrogen: 37,
        status: "Surveiller",
      },
    ],
  },
  orange: {
    name: "Oranger",
    calendarLabel: "Ouvrir le calendrier des orangers",
    accent: Colors.orangeAccent,
    parcels: [
      {
        id: 1,
        moisture: 51,
        soilTemp: 22.4,
        airTemp: 30.2,
        humidity: 64,
        ph: 6.5,
        ec: 1.6,
        nitrogen: 48,
        status: "Bon",
      },
      {
        id: 2,
        moisture: 38,
        soilTemp: 23.1,
        airTemp: 31.0,
        humidity: 59,
        ph: 6.2,
        ec: 1.9,
        nitrogen: 41,
        status: "Surveiller",
      },
      {
        id: 3,
        moisture: 46,
        soilTemp: 21.8,
        airTemp: 29.6,
        humidity: 67,
        ph: 6.7,
        ec: 1.4,
        nitrogen: 52,
        status: "Bon",
      },
      {
        id: 4,
        moisture: 43,
        soilTemp: 22.7,
        airTemp: 30.5,
        humidity: 62,
        ph: 6.4,
        ec: 1.7,
        nitrogen: 45,
        status: "Bon",
      },
    ],
  },
};

const STATUS_COLORS = {
  Bon: { solid: "#2e7d32", soft: "#e3f7e2", text: "#2e7d32" },
  Surveiller: { solid: "#e07a00", soft: "#fff1de", text: "#b35e00" },
} as const;

type TreeParcelsScreenProps = {
  treeId: TreeId;
};

export default function TreeParcelsScreen({ treeId }: TreeParcelsScreenProps) {
  const tree = TREE_META[treeId];
  const [selectedParcelId, setSelectedParcelId] = useState(1);
  const selectedParcel = useMemo(
    () =>
      tree.parcels.find((parcel) => parcel.id === selectedParcelId) ??
      tree.parcels[0],
    [selectedParcelId, tree.parcels],
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.root}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.8}
            onPress={() => router.back()}
            accessibilityLabel="Retour"
          >
            <Ionicons name="arrow-back" size={22} color={Colors.textPrimary} />
          </TouchableOpacity>

          <View style={styles.brandCenter} pointerEvents="none">
            <MaterialCommunityIcons
              name="sprout"
              size={20}
              color={tree.accent}
            />
            <Text style={styles.title}>{tree.name} · Parcelles</Text>
          </View>

          <View style={styles.placeholder} />
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.subtitle}>
            Sélectionnez une parcelle pour consulter ses mesures.
          </Text>

          <View style={styles.grid}>
            {tree.parcels.map((parcel) => {
              const selected = parcel.id === selectedParcelId;
              const palette = STATUS_COLORS[parcel.status];

              return (
                <TouchableOpacity
                  key={parcel.id}
                  activeOpacity={0.86}
                  onPress={() => setSelectedParcelId(parcel.id)}
                  style={[
                    styles.parcel,
                    {
                      borderColor: palette.solid,
                      backgroundColor: selected ? palette.solid : palette.soft,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.parcelText,
                      { color: selected ? "#ffffff" : palette.text },
                    ]}
                  >
                    P{parcel.id}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.sensorCard}>
            <View style={styles.sensorHeaderRow}>
              <Text style={styles.sensorTitle}>
                Parcelle P{selectedParcel.id}
              </Text>
              <View
                style={[
                  styles.statusBadge,
                  selectedParcel.status === "Bon"
                    ? styles.statusGood
                    : styles.statusWatch,
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    selectedParcel.status === "Bon"
                      ? styles.statusGoodText
                      : styles.statusWatchText,
                  ]}
                >
                  {selectedParcel.status}
                </Text>
              </View>
            </View>

            <View style={styles.metricsGrid}>
              <Metric
                label="Humidité sol"
                value={`${selectedParcel.moisture}%`}
              />
              <Metric
                label="Temp. sol"
                value={`${selectedParcel.soilTemp}°C`}
              />
              <Metric label="Temp. air" value={`${selectedParcel.airTemp}°C`} />
              <Metric
                label="Humidité air"
                value={`${selectedParcel.humidity}%`}
              />
              <Metric label="pH" value={`${selectedParcel.ph}`} />
              <Metric label="EC" value={`${selectedParcel.ec} mS/cm`} />
              <Metric label="Azote" value={`${selectedParcel.nitrogen} ppm`} />
              <Metric label="Dernière lecture" value="Aujourd'hui 10:24" />
            </View>
          </View>

          <TouchableOpacity
            style={[styles.calendarButton, { backgroundColor: tree.accent }]}
            activeOpacity={0.86}
            onPress={() => router.push(`/program/${treeId}`)}
          >
            <Ionicons name="calendar-outline" size={20} color="#ffffff" />
            <Text style={styles.calendarButtonText}>{tree.calendarLabel}</Text>
            <Ionicons name="arrow-forward" size={18} color="#ffffff" />
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.metricItem}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F4FAF2" },
  root: { flex: 1, backgroundColor: "#F4FAF2" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#e1ece0",
    zIndex: 2,
  },
  brandCenter: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 6,
  },
  title: {
    fontSize: 18,
    fontFamily: "Poppins_700Bold",
    color: Colors.textPrimary,
  },
  placeholder: { width: 44, height: 44 },
  content: {
    paddingHorizontal: 18,
    paddingTop: 8,
    paddingBottom: 24,
    gap: 14,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "#6f7f6d",
    marginBottom: 6,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 8,
    columnGap: 8,
  },
  parcel: {
    width: "48.5%",
    height: 72,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
  },
  parcelText: { fontSize: 20, fontFamily: "Poppins_700Bold" },
  sensorCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e1ece0",
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  sensorHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  sensorTitle: {
    fontSize: 18,
    fontFamily: "Poppins_700Bold",
    color: "#17331a",
  },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 999 },
  statusGood: { backgroundColor: "#e3f7e2" },
  statusWatch: { backgroundColor: "#fff1de" },
  statusText: { fontSize: 12, fontFamily: "Poppins_600SemiBold" },
  statusGoodText: { color: "#2e7d32" },
  statusWatchText: { color: "#e07a00" },
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 8,
  },
  metricItem: {
    width: "48%",
    backgroundColor: "#f4faf2",
    borderWidth: 1,
    borderColor: "#e2eee0",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    minHeight: 62,
    justifyContent: "space-between",
  },
  metricLabel: {
    fontSize: 12,
    color: "#6f7f6d",
    fontFamily: "Poppins_400Regular",
  },
  metricValue: {
    marginTop: 4,
    fontSize: 15,
    color: "#17331a",
    fontFamily: "Poppins_700Bold",
  },
  calendarButton: {
    minHeight: 56,
    borderRadius: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  calendarButtonText: {
    flex: 1,
    color: "#ffffff",
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
  },
});
