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

type CerealParcelsScreenProps = {
  cerealName: string;
};

const PARCELS_BY_CEREAL: Record<string, ParcelSensorData[]> = {
  Orge: [
    {
      id: 1,
      moisture: 39,
      soilTemp: 19.4,
      airTemp: 27.1,
      humidity: 58,
      ph: 6.2,
      ec: 1.8,
      nitrogen: 51,
      status: "Bon",
    },
    {
      id: 2,
      moisture: 29,
      soilTemp: 21.8,
      airTemp: 29.6,
      humidity: 52,
      ph: 5.9,
      ec: 2.2,
      nitrogen: 44,
      status: "Surveiller",
    },
    {
      id: 3,
      moisture: 44,
      soilTemp: 20.0,
      airTemp: 27.8,
      humidity: 61,
      ph: 6.4,
      ec: 1.6,
      nitrogen: 56,
      status: "Bon",
    },
    {
      id: 4,
      moisture: 35,
      soilTemp: 20.9,
      airTemp: 28.9,
      humidity: 55,
      ph: 6.1,
      ec: 1.9,
      nitrogen: 48,
      status: "Surveiller",
    },
    {
      id: 5,
      moisture: 47,
      soilTemp: 18.8,
      airTemp: 26.5,
      humidity: 64,
      ph: 6.5,
      ec: 1.5,
      nitrogen: 59,
      status: "Bon",
    },
    {
      id: 6,
      moisture: 41,
      soilTemp: 19.7,
      airTemp: 27.4,
      humidity: 60,
      ph: 6.3,
      ec: 1.7,
      nitrogen: 54,
      status: "Bon",
    },
    {
      id: 7,
      moisture: 27,
      soilTemp: 22.2,
      airTemp: 30.0,
      humidity: 49,
      ph: 5.8,
      ec: 2.4,
      nitrogen: 42,
      status: "Surveiller",
    },
    {
      id: 8,
      moisture: 43,
      soilTemp: 19.1,
      airTemp: 26.9,
      humidity: 62,
      ph: 6.6,
      ec: 1.4,
      nitrogen: 57,
      status: "Bon",
    },
  ],
  Avoine: [
    {
      id: 1,
      moisture: 51,
      soilTemp: 17.8,
      airTemp: 24.9,
      humidity: 69,
      ph: 6.9,
      ec: 1.2,
      nitrogen: 36,
      status: "Bon",
    },
    {
      id: 2,
      moisture: 46,
      soilTemp: 18.5,
      airTemp: 25.7,
      humidity: 66,
      ph: 6.7,
      ec: 1.4,
      nitrogen: 34,
      status: "Bon",
    },
    {
      id: 3,
      moisture: 38,
      soilTemp: 19.2,
      airTemp: 26.4,
      humidity: 62,
      ph: 6.5,
      ec: 1.6,
      nitrogen: 31,
      status: "Surveiller",
    },
    {
      id: 4,
      moisture: 55,
      soilTemp: 17.1,
      airTemp: 24.2,
      humidity: 72,
      ph: 7.0,
      ec: 1.1,
      nitrogen: 39,
      status: "Bon",
    },
    {
      id: 5,
      moisture: 43,
      soilTemp: 18.9,
      airTemp: 25.9,
      humidity: 64,
      ph: 6.6,
      ec: 1.5,
      nitrogen: 33,
      status: "Bon",
    },
    {
      id: 6,
      moisture: 34,
      soilTemp: 20.1,
      airTemp: 27.0,
      humidity: 58,
      ph: 6.3,
      ec: 1.8,
      nitrogen: 29,
      status: "Surveiller",
    },
    {
      id: 7,
      moisture: 49,
      soilTemp: 17.9,
      airTemp: 25.1,
      humidity: 68,
      ph: 6.8,
      ec: 1.3,
      nitrogen: 37,
      status: "Bon",
    },
    {
      id: 8,
      moisture: 40,
      soilTemp: 19.5,
      airTemp: 26.7,
      humidity: 60,
      ph: 6.4,
      ec: 1.7,
      nitrogen: 30,
      status: "Surveiller",
    },
  ],
};

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

export default function CerealParcelsScreen({
  cerealName,
}: CerealParcelsScreenProps) {
  const [selectedParcelId, setSelectedParcelId] = useState(1);
  const parcels = PARCELS_BY_CEREAL[cerealName] ?? PARCELS_BY_CEREAL.Orge;
  const selectedParcel = useMemo(
    () =>
      parcels.find((parcel) => parcel.id === selectedParcelId) ?? parcels[0],
    [parcels, selectedParcelId],
  );

  return (
    <SafeAreaView style={styles.safe} edges={["left", "right", "bottom"]}>
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
            <Text style={styles.title}>{cerealName} · Parcelles</Text>
          </View>

          <View style={styles.placeholder} />
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.grid}>
            {parcels.map((parcel) => {
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
              <Metric label="Dernière lecture" value={"Aujourd'hui 10:24"} />
            </View>
          </View>
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
