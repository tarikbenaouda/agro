import { Colors } from "@/constants/colors";
import { CULTURE_GROUPS } from "@/constants/cultures";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const findCulture = (cultureId?: string | string[]) => {
  const rawId = Array.isArray(cultureId) ? cultureId[0] : cultureId;
  if (!rawId) return undefined;

  let title = rawId;
  try {
    title = decodeURIComponent(rawId);
  } catch {
    title = rawId;
  }

  return CULTURE_GROUPS.flatMap((group) => group.cultures).find(
    (culture) => culture.title === title,
  );
};

export default function CultureDetailsScreen() {
  const { cultureId } = useLocalSearchParams<{ cultureId: string }>();
  const culture = findCulture(cultureId);

  if (!culture) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.root}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
              activeOpacity={0.8}
              accessibilityLabel="Retour"
            >
              <Ionicons
                name="arrow-back"
                size={22}
                color={Colors.textPrimary}
              />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Culture</Text>
            <View style={styles.placeholder} />
          </View>
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>Culture introuvable</Text>
            <Text style={styles.emptyText}>
              Cette fiche technique n’est pas disponible.
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  const { technicalDetails } = culture;
  const rows = [
    { label: "Semis", value: technicalDetails.sowingPeriod },
    { label: "Mode", value: technicalDetails.method },
    { label: "Profondeur", value: technicalDetails.depth },
    { label: "Écartement entre lignes", value: technicalDetails.rowSpacing },
    { label: "Écartement entre plants", value: technicalDetails.plantSpacing },
    { label: "Dose", value: technicalDetails.seedRate },
    { label: "Récolte", value: technicalDetails.harvest },
    { label: "Eau", value: technicalDetails.waterNeeds },
    { label: "Fertilisation", value: technicalDetails.fertilization },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.root}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.8}
            accessibilityLabel="Retour"
          >
            <Ionicons name="arrow-back" size={22} color={Colors.textPrimary} />
          </TouchableOpacity>
          <View style={styles.headerCenter} pointerEvents="none">
            <MaterialCommunityIcons
              name="leaf"
              size={18}
              color={Colors.oliveAccent}
            />
            <Text style={styles.headerTitle}>{culture.title}</Text>
          </View>
          <View style={styles.placeholder} />
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[0]}
        >
          <View style={styles.identityHeader}>
            <Image source={culture.image} style={styles.identityImage} />
            <View style={styles.titleRow}>
              <Text style={styles.title}>{culture.title}</Text>
              {culture.recommended ? (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    Recommandée dans votre région
                  </Text>
                </View>
              ) : null}
            </View>
          </View>

          <View style={styles.introDivider}>
            <Text style={styles.introText}>
              Consultez les informations techniques de cette culture.
            </Text>
          </View>

          <Text style={styles.sectionTitle}>Fiche technique</Text>
          <View style={styles.detailsCard}>
            {rows.map((row) => (
              <View key={row.label} style={styles.detailRow}>
                <Text style={styles.detailLabel}>{row.label}</Text>
                <Text style={styles.detailValue}>{row.value}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Maladies et ravageurs</Text>
          <View style={styles.diseasesCard}>
            {technicalDetails.diseases.map((disease) => (
              <View key={disease} style={styles.diseaseRow}>
                <View style={styles.diseaseDot} />
                <Text style={styles.diseaseText}>{disease}</Text>
              </View>
            ))}
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
    minHeight: 68,
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
  },
  headerCenter: {
    position: "absolute",
    left: 58,
    right: 58,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 6,
  },
  headerTitle: {
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
    paddingBottom: 32,
    gap: 14,
  },
  identityHeader: {
    minHeight: 280,
    flexDirection: "column",
    alignItems: "stretch",
    paddingVertical: 10,
    paddingHorizontal: 0,
    backgroundColor: "#F4FAF2",
    borderBottomWidth: 1,
    borderBottomColor: "#e1ece0",
    zIndex: 2,
  },
  identityImage: {
    width: "100%",
    height: 220,
    borderRadius: 16,
    marginBottom: 10,
    backgroundColor: "#e8f5e9",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  title: {
    flexShrink: 1,
    fontSize: 24,
    fontFamily: "Poppins_700Bold",
    color: Colors.textPrimary,
  },
  badge: {
    flexShrink: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 7,
    backgroundColor: Colors.oliveMuted,
  },
  badgeText: {
    fontSize: 10,
    fontFamily: "Poppins_600SemiBold",
    color: Colors.oliveDark,
  },
  introDivider: {
    paddingTop: 2,
  },
  introText: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    color: Colors.textMuted,
  },
  sectionTitle: {
    marginTop: 8,
    fontSize: 18,
    fontFamily: "Poppins_700Bold",
    color: Colors.textPrimary,
  },
  detailsCard: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e1ece0",
  },
  detailRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#edf4ec",
    gap: 3,
  },
  detailRowLast: {
    borderBottomWidth: 0,
  },
  detailLabel: {
    fontSize: 12,
    fontFamily: "Poppins_600SemiBold",
    color: Colors.textMuted,
  },
  detailValue: {
    fontSize: 14,
    lineHeight: 21,
    fontFamily: "Poppins_400Regular",
    color: Colors.textPrimary,
  },
  diseasesCard: {
    padding: 16,
    gap: 12,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e1ece0",
  },
  diseaseRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  diseaseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.orangeAccent,
  },
  diseaseText: {
    flex: 1,
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: Colors.textPrimary,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: "Poppins_700Bold",
    color: Colors.textPrimary,
  },
  emptyText: {
    marginTop: 8,
    fontSize: 14,
    textAlign: "center",
    fontFamily: "Poppins_400Regular",
    color: Colors.textMuted,
  },
});
