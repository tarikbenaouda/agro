import { Colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={["left", "right", "bottom"]}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() =>
              router.canGoBack() ? router.back() : router.replace("/")
            }
            style={styles.backBtn}
            activeOpacity={0.8}
          >
            <Ionicons name="arrow-back" size={20} color={Colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.screenTitle}>Profil</Text>
          <View style={{ width: 44 }} />
        </View>

        <View style={styles.card}>
          <Image
            source={require("../assets/images/engineer.jpg")}
            style={styles.avatar}
          />
          <Text style={styles.name}>Abdenour Mahmoud</Text>
          <Text style={styles.subtitle}>Exploitant · Relizane, Algérie</Text>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>19</Text>
              <Text style={styles.statLabel}>Parcelles</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>4</Text>
              <Text style={styles.statLabel}>Programmes</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>87</Text>
              <Text style={styles.statLabel}>Logs</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.editBtn} activeOpacity={0.85}>
            <Text style={styles.editText}>Modifier le profil</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Détails de la ferme</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoKey}>Superficie</Text>
            <Text style={styles.infoValue}>24 ha</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoKey}>Sol</Text>
            <Text style={styles.infoValue}>Argilo-calcaire</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoKey}>Irrigation</Text>
            <Text style={styles.infoValue}>Goutte-à-goutte</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Actions rapides</Text>
          <TouchableOpacity style={styles.actionItem} activeOpacity={0.85}>
            <Ionicons name="create-outline" size={18} color={Colors.primary} />
            <Text style={styles.actionText}>Ajouter une note</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionItem} activeOpacity={0.85}>
            <Ionicons
              name="settings-outline"
              size={18}
              color={Colors.primary}
            />
            <Text style={styles.actionText}>Paramètres</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { padding: 18, paddingBottom: 40 },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#e6f0ea",
  },
  screenTitle: {
    fontSize: 18,
    fontFamily: "Poppins_700Bold",
    color: Colors.textPrimary,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e7efe7",
    marginBottom: 16,
  },
  avatar: { width: 92, height: 92, borderRadius: 18, marginBottom: 12 },
  name: { fontSize: 20, fontFamily: "Poppins_700Bold", color: "#17331a" },
  subtitle: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    color: "#6f7f6d",
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginTop: 8,
  },
  statItem: { alignItems: "center", flex: 1 },
  statValue: {
    fontSize: 20,
    fontFamily: "Poppins_700Bold",
    color: Colors.primary,
  },
  statLabel: { fontSize: 12, color: "#7b8a74" },
  editBtn: {
    marginTop: 12,
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 12,
  },
  editText: { color: "#fff", fontFamily: "Poppins_600SemiBold" },
  section: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#e7efe7",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontFamily: "Poppins_600SemiBold",
    color: "#244a20",
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  infoKey: { color: "#6f7f6d" },
  infoValue: { color: "#17331a", fontFamily: "Poppins_600SemiBold" },
  actionItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
  },
  actionText: {
    marginLeft: 8,
    color: "#244a20",
    fontFamily: "Poppins_600SemiBold",
  },
  bottomSpacer: {
    width: "100%",
    height: 88,
  },
});
