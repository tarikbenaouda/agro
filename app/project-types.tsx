import AppHeader from "@/components/AppHeader";
import { Colors } from "@/constants/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type ProjectType = {
  title: string;
  description: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
};

const PROJECT_TYPES: ProjectType[] = [
  {
    title: "Investissement agricole",
    description:
      "Préparez et suivez un investissement dans le secteur agricole.",
    icon: "cash-plus",
  },
  {
    title: "Serre agricole",
    description: "Organisez la mise en place et le suivi de votre serre.",
    icon: "greenhouse",
  },
  {
    title: "Élevage de tilapia",
    description: "Structurez votre projet d’élevage et son suivi quotidien.",
    icon: "fish",
  },
  {
    title: "Champignon",
    description: "Planifiez votre production de champignons étape par étape.",
    icon: "mushroom-outline",
  },
  {
    title: "Conseil agronomique",
    description: "Accédez aux outils d’aide pour accompagner vos clients.",
    icon: "account-hard-hat",
  },
];

export default function ProjectTypesScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <AppHeader
        title="Nouveau projet"
        showBack
        onBack={() => router.back()}
        centerIcon="sprout"
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.intro}>
          <Text style={styles.title}>Quel projet souhaitez-vous créer ?</Text>
          <Text style={styles.subtitle}>
            Choisissez le type de projet qui correspond à votre activité.
          </Text>
        </View>

        <View style={styles.cardList}>
          {PROJECT_TYPES.map((projectType) => (
            <TouchableOpacity
              key={projectType.title}
              style={styles.card}
              activeOpacity={0.86}
              onPress={() => {}}
            >
              <View style={styles.iconPanel}>
                <MaterialCommunityIcons
                  name={projectType.icon}
                  size={32}
                  color={Colors.oliveAccent}
                />
              </View>
              <View style={styles.cardBody}>
                <Text style={styles.cardTitle}>{projectType.title}</Text>
                <Text style={styles.cardDescription}>
                  {projectType.description}
                </Text>
                <View style={styles.cardAction}>
                  <Text style={styles.cardActionText}>Choisir ce type</Text>
                  <MaterialCommunityIcons
                    name="arrow-right"
                    size={18}
                    color={Colors.oliveAccent}
                  />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F4FAF2",
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 130,
  },
  intro: {
    marginBottom: 22,
  },
  title: {
    color: "#17331a",
    fontFamily: "Poppins_700Bold",
    fontSize: 22,
    lineHeight: 30,
  },
  subtitle: {
    color: "#5f765e",
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    lineHeight: 20,
    marginTop: 7,
  },
  cardList: {
    gap: 14,
  },
  card: {
    flexDirection: "row",
    minHeight: 132,
    backgroundColor: "#eaf4e7",
    borderRadius: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#cfe3c8",
  },
  iconPanel: {
    width: 94,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#d2e8cf",
  },
  cardBody: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    justifyContent: "center",
    gap: 6,
  },
  cardTitle: {
    color: "#17331a",
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
  },
  cardDescription: {
    color: "#5f765e",
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    lineHeight: 18,
  },
  cardAction: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 2,
  },
  cardActionText: {
    color: Colors.oliveAccent,
    fontFamily: "Poppins_700Bold",
    fontSize: 12,
  },
});
