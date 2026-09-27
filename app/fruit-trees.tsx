import { Colors } from "@/constants/colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
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

const TREE_CARDS = [
  {
    title: "Olivier",
    subtitle: "Consulter les parcelles d'oliviers",
    image: require("../assets/images/olives.jpg"),
    accent: Colors.oliveAccent,
    treeId: "olive" as const,
  },
  {
    title: "Oranger",
    subtitle: "Consulter les parcelles d'orangers",
    image: require("../assets/images/oranges.jpg"),
    accent: Colors.orangeAccent,
    treeId: "orange" as const,
  },
  {
    title: "Ma ferme",
    subtitle: "Visualiser le plan de votre exploitation",
    image: require("../assets/images/leaf.png"),
    accent: Colors.oliveDark,
    route: "/farm" as const,
  },
];

export default function FruitTreesScreen() {
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
              name="leaf"
              size={20}
              color={Colors.oliveAccent}
            />
            <Text style={styles.title}>Les arbres fruitiers</Text>
          </View>

          <View style={styles.placeholder} />
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.subtitle}>
            Choisissez une culture pour ouvrir son calendrier.
          </Text>

          {TREE_CARDS.map((tree) => (
            <TouchableOpacity
              key={tree.title}
              style={styles.card}
              activeOpacity={0.86}
              onPress={() => {
                if (tree.treeId) {
                  router.push({
                    pathname: "/fruit-trees/[treeId]",
                    params: { treeId: tree.treeId },
                  });
                  return;
                }

                router.push("../farm");
              }}
            >
              <Image
                source={
                  typeof tree.image === "string"
                    ? { uri: tree.image }
                    : tree.image
                }
                style={styles.image}
              />
              <View style={styles.cardBody}>
                <Text style={styles.cardTitle}>{tree.title}</Text>
                <Text style={styles.cardSubtitle}>{tree.subtitle}</Text>
                <View
                  style={[
                    styles.badge,
                    { backgroundColor: tree.accent + "18" },
                  ]}
                >
                  <Text style={[styles.badgeText, { color: tree.accent }]}>
                    Ouvrir
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
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
  titleWrap: {
    flexDirection: "row",
    alignItems: "center",
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
    paddingBottom: 24,
    gap: 14,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "#6f7f6d",
    marginBottom: 6,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e1ece0",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 170,
    backgroundColor: "#dfe9dd",
  },
  cardBody: {
    padding: 16,
    gap: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: "Poppins_700Bold",
    color: "#17331a",
  },
  cardSubtitle: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    color: "#6f7f6d",
    lineHeight: 19,
  },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    marginTop: 2,
  },
  badgeText: {
    fontSize: 12,
    fontFamily: "Poppins_600SemiBold",
  },
});
