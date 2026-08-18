import { Colors } from "@/constants/colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ParcelSensorData = {
  id: number;
  moisture: number;
  soilTemp: number;
  airTemp: number;
  humidity: number;
  ph: number;
  ec: number;
  nitrogen: number;
  status: "Bon" | "Surveiller";
};

const PARCELS: ParcelSensorData[] = [
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
  {
    id: 5,
    moisture: 45,
    soilTemp: 20.4,
    airTemp: 28.2,
    humidity: 62,
    ph: 6.6,
    ec: 1.5,
    nitrogen: 41,
    status: "Bon",
  },
  {
    id: 6,
    moisture: 40,
    soilTemp: 21.0,
    airTemp: 28.7,
    humidity: 60,
    ph: 6.5,
    ec: 1.6,
    nitrogen: 40,
    status: "Bon",
  },
  {
    id: 7,
    moisture: 31,
    soilTemp: 22.4,
    airTemp: 30.5,
    humidity: 54,
    ph: 6.2,
    ec: 2.0,
    nitrogen: 35,
    status: "Surveiller",
  },
  {
    id: 8,
    moisture: 47,
    soilTemp: 20.0,
    airTemp: 27.9,
    humidity: 63,
    ph: 6.9,
    ec: 1.3,
    nitrogen: 45,
    status: "Bon",
  },
];

const STATUS_COLORS = {
  Bon: {
    solid: "#2e7d32",
    soft: "#e3f7e2",
    text: "#2e7d32",
  },
  Surveiller: {
    solid: "#e07a00",
    soft: "#fff1de",
    text: "#b35e00",
  },
} as const;

export default function WheatParcelsScreen() {
  const [selectedParcelId, setSelectedParcelId] = useState<number>(1);

  const selectedParcel = useMemo(
    () =>
      PARCELS.find((parcel) => parcel.id === selectedParcelId) ?? PARCELS[0],
    [selectedParcelId],
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.root}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.8}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={22} color={Colors.textPrimary} />
          </TouchableOpacity>

          <View style={styles.brandCenter} pointerEvents="none">
            <MaterialCommunityIcons
              name="sprout"
              size={20}
              color={Colors.oliveAccent}
            />
            <Text style={styles.title}>Blé · Parcelles</Text>
          </View>

          <View style={styles.placeholder} />
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.grid}>
            {PARCELS.map((parcel) => {
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
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>Humidité sol</Text>
                <Text style={styles.metricValue}>
                  {selectedParcel.moisture}%
                </Text>
              </View>
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>Temp. sol</Text>
                <Text style={styles.metricValue}>
                  {selectedParcel.soilTemp}°C
                </Text>
              </View>
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>Temp. air</Text>
                <Text style={styles.metricValue}>
                  {selectedParcel.airTemp}°C
                </Text>
              </View>
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>Humidité air</Text>
                <Text style={styles.metricValue}>
                  {selectedParcel.humidity}%
                </Text>
              </View>
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>pH</Text>
                <Text style={styles.metricValue}>{selectedParcel.ph}</Text>
              </View>
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>EC</Text>
                <Text style={styles.metricValue}>
                  {selectedParcel.ec} mS/cm
                </Text>
              </View>
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>Azote</Text>
                <Text style={styles.metricValue}>
                  {selectedParcel.nitrogen} ppm
                </Text>
              </View>
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>Dernière lecture</Text>
                <Text style={styles.metricValue}>{"Aujourd'hui 10:24"}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F4FAF2",
  },
  root: {
    flex: 1,
    backgroundColor: "#F4FAF2",
  },
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
    pointerEvents: "none",
    gap: 6,
  },
  title: {
    fontSize: 18,
    fontFamily: "Poppins_700Bold",
    color: Colors.textPrimary,
  },
  placeholder: {
    width: 44,
    height: 44,
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 8,
    paddingBottom: 18,
    gap: 12,
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
    marginBottom: 4,
  },
  parcel: {
    width: "48.5%",
    height: 72,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
  },
  parcelText: {
    fontSize: 20,
    fontFamily: "Poppins_700Bold",
  },
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
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },
  statusGood: {
    backgroundColor: "#e3f7e2",
  },
  statusWatch: {
    backgroundColor: "#fff1de",
  },
  statusText: {
    fontSize: 12,
    fontFamily: "Poppins_600SemiBold",
  },
  statusGoodText: {
    color: "#2e7d32",
  },
  statusWatchText: {
    color: "#e07a00",
  },
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
});
