import { Colors } from "@/constants/colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Culture = {
  title: string;
  image: ImageSourcePropType;
  recommended?: boolean;
};

const CULTURE_GROUPS: { title: string; cultures: Culture[] }[] = [
  {
    title: "Céréales",
    cultures: [
      {
        title: "Blé",
        image: require("../assets/images/wheat.jpg"),
        recommended: true,
      },
      {
        title: "Orge",
        image: require("../assets/images/barley.jpg"),
        recommended: true,
      },
      { title: "Avoine", image: require("../assets/images/oats.jpg") },
      {
        title: "Maïs",
        image: require("../assets/images/wheat.jpg"),
        recommended: true,
      },
      { title: "Sorgho", image: require("../assets/images/barley.jpg") },
      { title: "Seigle", image: require("../assets/images/oats.jpg") },
    ],
  },
  {
    title: "Arbres fruitiers",
    cultures: [
      {
        title: "Olivier",
        image: require("../assets/images/olives.jpg"),
        recommended: true,
      },
      {
        title: "Oranger",
        image: require("../assets/images/oranges.jpg"),
        recommended: true,
      },
      {
        title: "Citronnier",
        image: require("../assets/images/oranges.jpg"),
        recommended: true,
      },
      {
        title: "Amandier",
        image: require("../assets/images/olives.jpg"),
        recommended: true,
      },
      { title: "Figuier", image: require("../assets/images/olives.jpg") },
      { title: "Grenadier", image: require("../assets/images/oranges.jpg") },
    ],
  },
  {
    title: "Légumineuses",
    cultures: [
      {
        title: "Pois chiche",
        image: require("../assets/images/oats.jpg"),
        recommended: true,
      },
      {
        title: "Lentille",
        image: require("../assets/images/oats.jpg"),
        recommended: true,
      },
      { title: "Fève", image: require("../assets/images/leaf.png") },
      { title: "Pois", image: require("../assets/images/leaf.png") },
      { title: "Haricot", image: require("../assets/images/leaf.png") },
      { title: "Soja", image: require("../assets/images/leaf.png") },
    ],
  },
  {
    title: "Cultures maraîchères",
    cultures: [
      {
        title: "Tomate",
        image: require("../assets/images/oranges.jpg"),
        recommended: true,
      },
      { title: "Pomme de terre", image: require("../assets/images/wheat.jpg") },
      {
        title: "Oignon",
        image: require("../assets/images/wheat.jpg"),
        recommended: true,
      },
      { title: "Carotte", image: require("../assets/images/wheat.jpg") },
      { title: "Poivron", image: require("../assets/images/oranges.jpg") },
      { title: "Courgette", image: require("../assets/images/leaf.png") },
    ],
  },
  {
    title: "Plantes aromatiques",
    cultures: [
      {
        title: "Menthe",
        image: require("../assets/images/leaf.png"),
        recommended: true,
      },
      { title: "Basilic", image: require("../assets/images/leaf.png") },
      {
        title: "Thym",
        image: require("../assets/images/leaf.png"),
        recommended: true,
      },
      {
        title: "Romarin",
        image: require("../assets/images/leaf.png"),
        recommended: true,
      },
      { title: "Coriandre", image: require("../assets/images/leaf.png") },
      { title: "Persil", image: require("../assets/images/leaf.png") },
    ],
  },
];

export default function CulturesScreen() {
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
              name="leaf"
              size={20}
              color={Colors.oliveAccent}
            />
            <Text style={styles.title}>Cultures</Text>
          </View>

          <View style={styles.placeholder} />
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.subtitle}>
            Découvrez les cultures adaptées à votre exploitation.
          </Text>

          {CULTURE_GROUPS.map((group) => (
            <View key={group.title} style={styles.group}>
              <Text style={styles.groupTitle}>{group.title}</Text>
              {group.cultures.map((culture) => (
                <TouchableOpacity
                  key={culture.title}
                  style={styles.card}
                  activeOpacity={0.86}
                  onPress={() => undefined}
                >
                  <Image source={culture.image} style={styles.image} />
                  <View style={styles.cardText}>
                    <Text style={styles.cardTitle}>{culture.title}</Text>
                    {culture.recommended ? (
                      <View style={styles.badge}>
                        <Text style={styles.badgeText}>
                          Recommandée dans votre région
                        </Text>
                      </View>
                    ) : null}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
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
  placeholder: {
    width: 44,
    height: 44,
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 8,
    paddingBottom: 24,
    gap: 20,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "#6f7f6d",
    marginBottom: 6,
  },
  group: {
    gap: 10,
  },
  groupTitle: {
    fontSize: 17,
    fontFamily: "Poppins_700Bold",
    color: Colors.textPrimary,
  },
  card: {
    minHeight: 72,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e1ece0",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  image: {
    width: 52,
    height: 52,
    borderRadius: 10,
    marginRight: 12,
    backgroundColor: "#e8f5e9",
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
    color: Colors.textPrimary,
  },
  badge: {
    alignSelf: "flex-start",
    marginTop: 4,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
    backgroundColor: Colors.oliveMuted,
  },
  badgeText: {
    fontSize: 10,
    fontFamily: "Poppins_600SemiBold",
    color: Colors.oliveDark,
  },
  cardSubtitle: {
    marginTop: 2,
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    color: Colors.textMuted,
  },
});
