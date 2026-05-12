import { Colors } from "@/constants/colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

type CropCard = {
  title: string;
  status: string;
  image: string | ImageSourcePropType;
  accent: string;
  route?: "/program/olive" | "/program/orange" | "/fruit-trees";
};

const CROP_CARDS: CropCard[] = [
  {
    title: "Les céréales",
    status: "7 cultures",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80",
    accent: "#2D5A27",
  },
  {
    title: "Les arbres fruitiers",
    status: "Oliviers & Orangers",
    image: require("../assets/images/oranges.jpg"),
    accent: "#2D5A27",
    route: "/fruit-trees",
  },
  {
    title: "Les cultures fourragères",
    status: "Sous suivi",
    image:
      "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=900&q=80",
    accent: "#6b8f72",
  },
  {
    title: "Les légumes",
    status: "En croissance",
    image:
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=900&q=80",
    accent: "#b71c1c",
  },
];

const DAILY_TASKS = [
  {
    icon: "water",
    title: "Irrigation de la parcelle nord",
    time: "Aujourd’hui · 06:30",
    color: Colors.irrigation,
    background: Colors.irrigationBg,
  },
  {
    icon: "leaf",
    title: "Fertilisation organique",
    time: "Aujourd’hui · 09:15",
    color: Colors.fertilizing,
    background: Colors.fertilizingBg,
  },
  {
    icon: "flask-outline",
    title: "Contrôle du pH du sol",
    time: "Aujourd’hui · 11:00",
    color: Colors.pruning,
    background: Colors.pruningBg,
  },
];

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  const openCrop = (
    route?: "/program/olive" | "/program/orange" | "/fruit-trees",
  ) => {
    if (!route) return;
    router.push(route);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.root}>
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: 130 + insets.bottom },
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.headerIconButton}
              activeOpacity={0.75}
            >
              <Ionicons name="menu" size={24} color={stylesData.icon} />
            </TouchableOpacity>

            <View style={styles.brandCenter} pointerEvents="none">
              <MaterialCommunityIcons
                name="leaf"
                size={20}
                color={stylesData.primary}
              />
              <Text style={styles.brandText}>AGRO APP</Text>
            </View>

            <TouchableOpacity
              style={styles.headerIconButton}
              activeOpacity={0.75}
            >
              <View style={styles.bellWrap}>
                <Ionicons
                  name="notifications-outline"
                  size={24}
                  color={stylesData.icon}
                />
                <View style={styles.notificationDot} />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.greetingBlock}>
            <Text style={styles.greetingTitle}>Bonjour, Agriculteur! 🍃</Text>
            <Text style={styles.greetingSubtitle}>
              Gérez vos cultures intelligemment
            </Text>
          </View>

          <View style={styles.weatherCard}>
            <View style={styles.weatherTopRow}>
              <View style={styles.weatherLeft}>
                <View style={styles.weatherIconCircle}>
                  <Ionicons name="sunny" size={22} color="#F8C14B" />
                </View>
                <View>
                  <Text style={styles.weatherTemp}>24°C</Text>
                  <Text style={styles.weatherCondition}>Ensoleillé</Text>
                </View>
              </View>

              <View style={styles.weatherRight}>
                <Text style={styles.weatherStat}>Humidité: 60%</Text>
                <Text style={styles.weatherStat}>Vent: 15 km/h</Text>
              </View>
            </View>

            <View style={styles.locationRow}>
              <Ionicons name="location-sharp" size={15} color="#d9f5d6" />
              <Text style={styles.locationText}>
                Relizane (غليزان), Algérie
              </Text>
            </View>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Mes Cultures</Text>
            <TouchableOpacity activeOpacity={0.75}>
              <Text style={styles.sectionAction}>Voir tout &gt;</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.cropRow}
          >
            {CROP_CARDS.map((crop) => {
              return (
                <TouchableOpacity
                  key={crop.title}
                  style={styles.cropCard}
                  activeOpacity={0.85}
                  onPress={crop.route ? () => openCrop(crop.route) : undefined}
                >
                  <Image
                    source={
                      typeof crop.image === "string"
                        ? { uri: crop.image }
                        : crop.image
                    }
                    style={styles.cropImage}
                  />
                  <View style={styles.cropCardBody}>
                    <Text style={styles.cropTitle}>{crop.title}</Text>
                    <View
                      style={[
                        styles.statusBadge,
                        { backgroundColor: crop.accent + "18" },
                      ]}
                    >
                      <Text style={[styles.statusText, { color: crop.accent }]}>
                        {crop.status}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Tâches du jour</Text>
          </View>

          <View style={styles.taskList}>
            {DAILY_TASKS.map((task) => (
              <TouchableOpacity
                key={task.title}
                style={styles.taskItem}
                activeOpacity={0.8}
              >
                <View
                  style={[
                    styles.taskIconWrap,
                    { backgroundColor: task.background },
                  ]}
                >
                  <MaterialCommunityIcons
                    name={task.icon as any}
                    size={22}
                    color={task.color}
                  />
                </View>

                <View style={styles.taskContent}>
                  <Text style={styles.taskTitle}>{task.title}</Text>
                  <Text style={styles.taskTime}>{task.time}</Text>
                </View>

                <Ionicons name="chevron-forward" size={20} color="#9fb49e" />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <View
          style={[
            styles.bottomBarWrap,
            { paddingBottom: Math.max(insets.bottom, 12) },
          ]}
        >
          <View style={styles.bottomBar}>
            <TouchableOpacity style={styles.tabItem} activeOpacity={0.8}>
              <Ionicons name="home" size={22} color={stylesData.primary} />
              <Text style={[styles.tabLabel, styles.tabLabelActive]}>
                Accueil
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tabItem} activeOpacity={0.8}>
              <Ionicons name="leaf" size={22} color="#8ca58a" />
              <Text style={styles.tabLabel}>Cultures</Text>
            </TouchableOpacity>

            <View style={styles.centerButtonSlot}>
              <TouchableOpacity
                style={styles.centerButton}
                activeOpacity={0.85}
              >
                <Ionicons name="add" size={30} color="#ffffff" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.tabItem} activeOpacity={0.8}>
              <Ionicons name="warning-outline" size={22} color="#8ca58a" />
              <Text style={styles.tabLabel}>Alertes</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tabItem} activeOpacity={0.8}>
              <Ionicons name="person-outline" size={22} color="#8ca58a" />
              <Text style={styles.tabLabel}>Profil</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const stylesData = {
  primary: "#2D5A27",
  icon: "#244a20",
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F4FAF2",
  },
  root: {
    flex: 1,
    backgroundColor: "#F4FAF2",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
    height: 56,
  },
  headerIconButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
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
  bellWrap: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  notificationDot: {
    position: "absolute",
    top: -1,
    right: -1,
    width: 9,
    height: 9,
    zIndex: 2,
    borderRadius: 999,
    backgroundColor: "#e53935",
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  brandText: {
    fontSize: 18,
    fontFamily: "Poppins_700Bold",
    color: stylesData.primary,
    letterSpacing: 0.8,
  },
  greetingBlock: {
    marginBottom: 18,
  },
  greetingTitle: {
    fontSize: 26,
    fontFamily: "Poppins_700Bold",
    color: "#17331a",
    marginBottom: 6,
  },
  greetingSubtitle: {
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
    color: "#6f7f6d",
  },
  weatherCard: {
    backgroundColor: "#23481f",
    borderRadius: 20,
    padding: 18,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  weatherTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },
  weatherLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  weatherIconCircle: {
    width: 46,
    height: 46,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  weatherTemp: {
    fontSize: 28,
    fontFamily: "Poppins_700Bold",
    color: "#ffffff",
  },
  weatherCondition: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "#d7ead5",
    marginTop: 2,
  },
  weatherRight: {
    justifyContent: "center",
    alignItems: "flex-end",
    gap: 4,
  },
  weatherStat: {
    fontSize: 13,
    fontFamily: "Poppins_600SemiBold",
    color: "#e7f5e5",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 14,
  },
  locationText: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    color: "#dcefd9",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "Poppins_700Bold",
    color: "#17331a",
  },
  sectionAction: {
    fontSize: 13,
    fontFamily: "Poppins_600SemiBold",
    color: stylesData.primary,
  },
  cropRow: {
    paddingRight: 4,
    gap: 14,
    marginBottom: 24,
  },
  cropCard: {
    width: 160,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e1ece0",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  cropCardDisabled: {
    opacity: 0.7,
  },
  cropImage: {
    width: "100%",
    height: 110,
    backgroundColor: "#dfe9dd",
  },
  cropCardBody: {
    padding: 12,
    gap: 10,
  },
  cropTitle: {
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
    color: "#17331a",
  },
  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  statusText: {
    fontSize: 12,
    fontFamily: "Poppins_600SemiBold",
  },
  taskList: {
    gap: 12,
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#e3ede1",
  },
  taskIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  taskContent: {
    flex: 1,
    gap: 4,
  },
  taskTitle: {
    fontSize: 15,
    fontFamily: "Poppins_600SemiBold",
    color: "#1b321c",
  },
  taskTime: {
    fontSize: 12.5,
    fontFamily: "Poppins_400Regular",
    color: "#7b8c79",
  },
  bottomBarWrap: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingTop: 6,
    backgroundColor: "transparent",
  },
  bottomBar: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    borderRadius: 24,
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 10,
    borderWidth: 1,
    borderColor: "#e1ece0",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  tabLabel: {
    fontSize: 11,
    fontFamily: "Poppins_600SemiBold",
    color: "#88a187",
  },
  tabLabelActive: {
    color: stylesData.primary,
  },
  centerButtonSlot: {
    width: 64,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -22,
  },
  centerButton: {
    width: 56,
    height: 56,
    borderRadius: 999,
    backgroundColor: stylesData.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
    borderWidth: 4,
    borderColor: "#ffffff",
  },
});
