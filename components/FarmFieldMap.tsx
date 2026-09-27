import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import Svg, { G, Polygon, Text as SvgText } from "react-native-svg";

/**
 * FarmFieldMap
 * ------------
 * Interactive SVG map of the field, replacing the P1-P4 button grid.
 * Tapping a parcel selects it and shows its sensor data below the map,
 * same fields you already display: humidité sol, temp sol, temp air,
 * humidité air, pH, EC, azote, dernière lecture.
 *
 * Requirements:
 *   expo install react-native-svg
 *
 * NOTE: the polygon points below are a stylized approximation of your
 * hand-drawn schema (proportions/relative placement, not pixel-traced).
 * Tweak the `points` arrays to match your real plot boundaries whenever
 * you have exact survey coordinates.
 */

// ---- viewBox size for the whole field sketch ----
const VB_WIDTH = 680;
const VB_HEIGHT = 600;

// ---- colors ----
const COLORS = {
  oranger: "#f7cd8a", // fill for orange parcels (unselected)
  orangerSelected: "#e08a1e",
  olivier: "#cfe3c1", // fill for olive parcels (unselected)
  olivierSelected: "#4c8c3c",
  serre: "#d8d8d8",
  stroke: "#2f5233",
  statusBon: "#dff3df",
  statusBonText: "#1d6b1d",
  statusSurveiller: "#ffe6c7",
  statusSurveillerText: "#b5641a",
} as const;

type ParcelType = "oranger" | "olivier" | "serre";
type ParcelStatus = "bon" | "surveiller";

type Parcel = {
  id: string;
  type: ParcelType;
  status: ParcelStatus;
  points: string;
  label: { x: number; y: number };
  data: {
    sol: number;
    tempSol: number;
    tempAir: number;
    humAir: number;
    ph: number;
    ec: number;
    azote: number;
  };
};

// ---- parcel geometry + mock data (replace `data` with your real feed) ----
const PARCELS: Parcel[] = [
  {
    id: "P03",
    type: "oranger",
    status: "bon",
    points: "108,20 252,20 252,110 108,110",
    label: { x: 180, y: 65 },
    data: {
      sol: 46,
      tempSol: 22.8,
      tempAir: 30.5,
      humAir: 61,
      ph: 6.4,
      ec: 1.7,
      azote: 44,
    },
  },
  {
    id: "P02",
    type: "oranger",
    status: "bon",
    points: "252,20 380,20 380,110 252,110",
    label: { x: 316, y: 65 },
    data: {
      sol: 49,
      tempSol: 22.5,
      tempAir: 30.1,
      humAir: 63,
      ph: 6.5,
      ec: 1.6,
      azote: 47,
    },
  },
  {
    id: "P01",
    type: "oranger",
    status: "bon",
    points: "380,20 520,20 520,110 380,110",
    label: { x: 450, y: 65 },
    data: {
      sol: 51,
      tempSol: 22.4,
      tempAir: 30.2,
      humAir: 64,
      ph: 6.5,
      ec: 1.6,
      azote: 48,
    },
  },
  {
    id: "P10",
    type: "oranger",
    status: "surveiller",
    points: "520,20 600,20 650,70 650,120 590,130 520,110",
    label: { x: 585, y: 65 },
    data: {
      sol: 34,
      tempSol: 23.6,
      tempAir: 31.4,
      humAir: 55,
      ph: 6.1,
      ec: 2.0,
      azote: 39,
    },
  },
  {
    id: "P13",
    type: "serre",
    status: "bon",
    points: "650,20 650,220 600,220 590,130 650,120",
    label: { x: 630, y: 130 },
    data: {
      sol: 55,
      tempSol: 24.0,
      tempAir: 27.0,
      humAir: 70,
      ph: 6.6,
      ec: 1.5,
      azote: 50,
    },
  },
  {
    id: "P04",
    type: "oranger",
    status: "bon",
    points: "108,110 252,110 252,190 108,190",
    label: { x: 180, y: 150 },
    data: {
      sol: 48,
      tempSol: 22.6,
      tempAir: 30.0,
      humAir: 62,
      ph: 6.5,
      ec: 1.6,
      azote: 46,
    },
  },
  {
    id: "P08",
    type: "oranger",
    status: "bon",
    points: "252,110 380,110 380,190 252,190",
    label: { x: 316, y: 150 },
    data: {
      sol: 47,
      tempSol: 22.9,
      tempAir: 30.3,
      humAir: 60,
      ph: 6.4,
      ec: 1.7,
      azote: 45,
    },
  },
  {
    id: "P09",
    type: "oranger",
    status: "bon",
    points: "380,110 520,110 520,190 380,190",
    label: { x: 450, y: 150 },
    data: {
      sol: 50,
      tempSol: 22.3,
      tempAir: 30.0,
      humAir: 63,
      ph: 6.5,
      ec: 1.6,
      azote: 47,
    },
  },
  {
    id: "P12",
    type: "oranger",
    status: "surveiller",
    points: "520,120 600,120 600,200 520,200",
    label: { x: 560, y: 160 },
    data: {
      sol: 38,
      tempSol: 23.1,
      tempAir: 31.0,
      humAir: 59,
      ph: 6.2,
      ec: 1.9,
      azote: 41,
    },
  },
  {
    id: "P05",
    type: "oranger",
    status: "bon",
    points: "108,190 252,190 252,270 108,270",
    label: { x: 180, y: 230 },
    data: {
      sol: 49,
      tempSol: 22.5,
      tempAir: 30.1,
      humAir: 62,
      ph: 6.5,
      ec: 1.6,
      azote: 46,
    },
  },
  {
    id: "P07",
    type: "oranger",
    status: "bon",
    points: "252,190 380,190 380,270 252,270",
    label: { x: 316, y: 230 },
    data: {
      sol: 47,
      tempSol: 22.7,
      tempAir: 30.4,
      humAir: 61,
      ph: 6.4,
      ec: 1.7,
      azote: 45,
    },
  },
  {
    id: "P11",
    type: "oranger",
    status: "bon",
    points: "380,190 520,190 520,270 380,270",
    label: { x: 450, y: 230 },
    data: {
      sol: 48,
      tempSol: 22.6,
      tempAir: 30.2,
      humAir: 62,
      ph: 6.4,
      ec: 1.6,
      azote: 46,
    },
  },
  {
    id: "P06",
    type: "oranger",
    status: "bon",
    points: "200,270 360,270 360,350 250,350 200,300",
    label: { x: 280, y: 310 },
    data: {
      sol: 50,
      tempSol: 22.4,
      tempAir: 30.0,
      humAir: 64,
      ph: 6.6,
      ec: 1.5,
      azote: 48,
    },
  },
  {
    id: "P14",
    type: "oranger",
    status: "bon",
    points: "360,270 520,270 520,350 360,350",
    label: { x: 440, y: 310 },
    data: {
      sol: 46,
      tempSol: 22.9,
      tempAir: 30.3,
      humAir: 60,
      ph: 6.3,
      ec: 1.7,
      azote: 44,
    },
  },
  {
    id: "P16",
    type: "olivier",
    status: "bon",
    points: "360,350 520,350 520,420 360,420",
    label: { x: 440, y: 385 },
    data: {
      sol: 44,
      tempSol: 21.8,
      tempAir: 29.5,
      humAir: 58,
      ph: 6.9,
      ec: 1.3,
      azote: 38,
    },
  },
  {
    id: "P15",
    type: "olivier",
    status: "bon",
    points: "540,350 640,350 640,420 540,420",
    label: { x: 590, y: 385 },
    data: {
      sol: 43,
      tempSol: 21.9,
      tempAir: 29.7,
      humAir: 57,
      ph: 6.8,
      ec: 1.4,
      azote: 37,
    },
  },
  {
    id: "P18",
    type: "olivier",
    status: "bon",
    points: "360,420 534,420 534,500 424,500 360,450",
    label: { x: 447, y: 460 },
    data: {
      sol: 42,
      tempSol: 21.7,
      tempAir: 29.4,
      humAir: 58,
      ph: 6.9,
      ec: 1.3,
      azote: 36,
    },
  },
  {
    id: "P17",
    type: "olivier",
    status: "bon",
    points: "540,420 640,420 640,500 540,500",
    label: { x: 590, y: 460 },
    data: {
      sol: 45,
      tempSol: 21.6,
      tempAir: 29.6,
      humAir: 59,
      ph: 6.8,
      ec: 1.4,
      azote: 39,
    },
  },
  {
    id: "P19",
    type: "olivier",
    status: "surveiller",
    points: "540,500 640,500 640,580 540,580",
    label: { x: 590, y: 545 },
    data: {
      sol: 33,
      tempSol: 22.4,
      tempAir: 30.6,
      humAir: 52,
      ph: 6.5,
      ec: 1.9,
      azote: 32,
    },
  },
];

function fillFor(parcel: Parcel, isSelected: boolean): string {
  if (parcel.type === "serre") return COLORS.serre;
  if (parcel.type === "olivier")
    return isSelected ? COLORS.olivierSelected : COLORS.olivier;
  return isSelected ? COLORS.orangerSelected : COLORS.oranger;
}

function StatusBadge({ status }: { status: ParcelStatus }) {
  const bon = status === "bon";
  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: bon ? COLORS.statusBon : COLORS.statusSurveiller },
      ]}
    >
      <Text
        style={{
          color: bon ? COLORS.statusBonText : COLORS.statusSurveillerText,
          fontWeight: "700",
        }}
      >
        {bon ? "Bon" : "Surveiller"}
      </Text>
    </View>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.metricBox}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
    </View>
  );
}

export default function FarmFieldMap() {
  const [selectedId, setSelectedId] = useState("P01");
  const selected = PARCELS.find((p) => p.id === selectedId);
  const { width: screenWidth } = useWindowDimensions();
  const mapWidth = Math.min(VB_WIDTH, Math.max(screenWidth - 32, 1));
  const mapHeight = mapWidth * (VB_HEIGHT / VB_WIDTH);

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
        style={styles.verticalScroll}
        contentContainerStyle={styles.verticalContent}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
      >
        <View style={styles.header}>
          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
            accessibilityLabel="Retour"
          >
            <Ionicons name="arrow-back" size={22} color="#1f3d1f" />
          </Pressable>
          <Text style={styles.title}>Plan de la ferme</Text>
          <View style={styles.headerPlaceholder} />
        </View>
        <Text style={styles.subtitle}>
          Touchez une parcelle pour consulter ses mesures.
        </Text>

        <ScrollView
          horizontal
          nestedScrollEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.mapScroll}
        >
          <Svg
            width={mapWidth}
            height={mapHeight}
            viewBox={`0 0 ${VB_WIDTH} ${VB_HEIGHT}`}
          >
            {PARCELS.map((parcel) => {
              const isSelected = parcel.id === selectedId;
              return (
                <G key={parcel.id}>
                  <Polygon
                    points={parcel.points}
                    fill={fillFor(parcel, isSelected)}
                    stroke={COLORS.stroke}
                    strokeWidth={isSelected ? 3 : 1.5}
                    onPress={() => setSelectedId(parcel.id)}
                  />
                  <SvgText
                    x={parcel.label.x}
                    y={parcel.label.y}
                    fontSize={13}
                    fontWeight="bold"
                    fill="#1f3d1f"
                    textAnchor="middle"
                    onPress={() => setSelectedId(parcel.id)}
                  >
                    {parcel.id}
                  </SvgText>
                </G>
              );
            })}
          </Svg>
        </ScrollView>

        <View style={styles.legendRow}>
          <View style={styles.legendItem}>
            <View
              style={[styles.legendSwatch, { backgroundColor: COLORS.oranger }]}
            />
            <Text style={styles.legendText}>Orangers</Text>
          </View>
          <View style={styles.legendItem}>
            <View
              style={[styles.legendSwatch, { backgroundColor: COLORS.olivier }]}
            />
            <Text style={styles.legendText}>Oliviers</Text>
          </View>
          <View style={styles.legendItem}>
            <View
              style={[styles.legendSwatch, { backgroundColor: COLORS.serre }]}
            />
            <Text style={styles.legendText}>Serre</Text>
          </View>
        </View>

        {selected && (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Parcelle {selected.id}</Text>
              <StatusBadge status={selected.status} />
            </View>

            <View style={styles.metricsGrid}>
              <Metric label="Humidité sol" value={`${selected.data.sol}%`} />
              <Metric label="Temp. sol" value={`${selected.data.tempSol}°C`} />
              <Metric label="Temp. air" value={`${selected.data.tempAir}°C`} />
              <Metric label="Humidité air" value={`${selected.data.humAir}%`} />
              <Metric label="pH" value={`${selected.data.ph}`} />
              <Metric label="EC" value={`${selected.data.ec} mS/cm`} />
              <Metric label="Azote" value={`${selected.data.azote} ppm`} />
              <Metric label="Dernière lecture" value="Aujourd'hui 10:24" />
            </View>

            {selected.type !== "serre" ? (
              <Pressable
                style={styles.calendarBtn}
                onPress={() =>
                  router.push(
                    selected.type === "olivier"
                      ? "/program/olive"
                      : "/program/orange",
                  )
                }
              >
                <Text style={styles.calendarBtnText}>
                  {selected.type === "olivier"
                    ? "Ouvrir le calendrier des oliviers"
                    : "Ouvrir le calendrier des orangers"}{" "}
                  →
                </Text>
              </Pressable>
            ) : null}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f3f7f1",
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  verticalScroll: { flex: 1 },
  verticalContent: { paddingBottom: 24 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  headerPlaceholder: { width: 40, height: 40 },
  title: { fontSize: 22, fontWeight: "800", color: "#1f3d1f" },
  subtitle: { color: "#5b6b5b", marginTop: 4, marginBottom: 12 },
  mapScroll: {
    flexGrow: 0,
    marginBottom: 10,
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  legendRow: { flexDirection: "row", gap: 16, marginBottom: 14 },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginRight: 16,
  },
  legendSwatch: {
    width: 14,
    height: 14,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#2f5233",
  },
  legendText: { color: "#3a4a3a", fontSize: 13 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  cardTitle: { fontSize: 18, fontWeight: "800", color: "#1f3d1f" },
  badge: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20 },
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  metricBox: {
    width: "48%",
    backgroundColor: "#f3f7f1",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  metricLabel: { color: "#6b7a6b", fontSize: 12, marginBottom: 4 },
  metricValue: { fontSize: 17, fontWeight: "800", color: "#1f3d1f" },
  calendarBtn: {
    backgroundColor: "#c1470f",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  calendarBtnText: { color: "#fff", fontWeight: "700" },
});
