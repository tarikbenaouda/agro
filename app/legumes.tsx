import { Colors } from "@/constants/colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LegumesScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={["left", "right", "bottom"]}>
      <View style={styles.root}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.8}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={22} color={Colors.textPrimary} />
          </TouchableOpacity>

          <View style={styles.brandCenter} pointerEvents="none">
            <MaterialCommunityIcons name="carrot" size={20} color="#b71c1c" />
            <Text style={styles.title}>Les légumes</Text>
          </View>

          <View style={styles.placeholder} />
        </View>

        {/* Empty state */}
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons name="carrot" size={72} color="#f5c6c6" />
          <Text style={styles.emptyTitle}>Aucun légume</Text>
          <Text style={styles.emptySubtitle}>
            Vous n&apos;avez pas encore ajouté de culture dans cette catégorie.
          </Text>
          <TouchableOpacity
            style={styles.createButton}
            activeOpacity={0.85}
            onPress={() => {}}
          >
            <Ionicons name="add-circle-outline" size={20} color="#ffffff" />
            <Text style={styles.createButtonText}>Créer une culture</Text>
          </TouchableOpacity>
        </View>
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
    gap: 6,
    pointerEvents: "none",
  },
  title: {
    fontSize: 18,
    fontFamily: "Poppins_700Bold",
    color: Colors.textPrimary,
    marginLeft: 4,
  },
  placeholder: {
    width: 44,
    height: 44,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 36,
    gap: 12,
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: "Poppins_700Bold",
    color: "#17331a",
    textAlign: "center",
    marginTop: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "#6f7f6d",
    textAlign: "center",
    lineHeight: 21,
  },
  createButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#b71c1c",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 999,
    marginTop: 8,
    shadowColor: "#b71c1c",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  createButtonText: {
    fontSize: 15,
    fontFamily: "Poppins_600SemiBold",
    color: "#ffffff",
  },
});
