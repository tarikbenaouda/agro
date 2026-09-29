import { Colors } from "@/constants/colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaskedView from "@react-native-masked-view/masked-view";
import { BlurTargetView, BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useRef, useState } from "react";
import {
  Image,
  ImageSourcePropType,
  Modal,
  Pressable,
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

type CropRoute =
  | "/program/olive"
  | "/program/orange"
  | "/fruit-trees"
  | "/cereales"
  | "/cultures-fourrageres"
  | "/legumes";

type CropCard = {
  title: string;
  status: string;
  image: string | ImageSourcePropType;
  accent: string;
  route?: CropRoute;
};

type WeatherIconName = React.ComponentProps<typeof Ionicons>["name"];

type WeatherSnapshot = {
  temperature: string;
  condition: string;
  humidity: string;
  wind: string;
  todayRange: string;
  location: string;
  icon: WeatherIconName;
  iconColor: string;
};

type Project = {
  id: string;
  name: string;
  category: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
};

// Horizontal padding of the screen. The carousel cancels it with a negative
// margin so cards can scroll to the real screen edge, and the blur zones
// use the same width.
const SCREEN_PADDING = 20;
const EDGE_WIDTH = SCREEN_PADDING;

const DEFAULT_WEATHER: WeatherSnapshot = {
  temperature: "--°C",
  condition: "Météo indisponible",
  humidity: "--",
  wind: "--",
  todayRange: "-- / --",
  location: "Position indisponible",
  icon: "cloud-outline",
  iconColor: "#d8e6d6",
};

const weatherFromCode = (
  weatherCode?: number,
): Pick<WeatherSnapshot, "condition" | "icon" | "iconColor"> => {
  if (weatherCode == null) {
    return {
      condition: "Condition inconnue",
      icon: "cloud-outline",
      iconColor: "#d8e6d6",
    };
  }

  if (weatherCode === 0) {
    return { condition: "Ensoleillé", icon: "sunny", iconColor: "#F8C14B" };
  }

  if ([1, 2].includes(weatherCode)) {
    return {
      condition: "Partiellement nuageux",
      icon: "partly-sunny",
      iconColor: "#F8C14B",
    };
  }

  if (weatherCode === 3 || (weatherCode >= 45 && weatherCode <= 48)) {
    return {
      condition: "Nuageux",
      icon: "cloud",
      iconColor: "#d8e6d6",
    };
  }

  if ((weatherCode >= 51 && weatherCode <= 67) || weatherCode === 80) {
    return {
      condition: "Pluie faible",
      icon: "rainy-outline",
      iconColor: "#92C5FF",
    };
  }

  if ((weatherCode >= 81 && weatherCode <= 82) || weatherCode >= 95) {
    return {
      condition: "Pluie forte",
      icon: "rainy",
      iconColor: "#92C5FF",
    };
  }

  if (weatherCode >= 71 && weatherCode <= 77) {
    return {
      condition: "Neige",
      icon: "snow",
      iconColor: "#eaf2ff",
    };
  }

  return {
    condition: "Conditions variables",
    icon: "cloud-outline",
    iconColor: "#d8e6d6",
  };
};

const formatLocationLabel = (
  reverseGeocode: Location.LocationGeocodedAddress[],
  lat: number,
  lon: number,
): string => {
  const first = reverseGeocode[0];
  if (!first) {
    return `${lat.toFixed(2)}, ${lon.toFixed(2)}`;
  }

  const city = first.city || first.subregion || first.region;
  const country = first.country;

  if (city && country) return `${city}, ${country}`;
  if (city) return city;
  if (country) return country;

  return `${lat.toFixed(2)}, ${lon.toFixed(2)}`;
};

const CROP_CARDS: CropCard[] = [
  {
    title: "Les céréales",
    status: "3 cultures",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80",
    accent: "#2D5A27",
    route: "/cereales",
  },
  {
    title: "Les arbres fruitiers",
    status: "2 cultures",
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
    route: "/cultures-fourrageres",
  },
  {
    title: "Les légumes",
    status: "En croissance",
    image:
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=900&q=80",
    accent: "#b71c1c",
    route: "/legumes",
  },
];

type DailyTask = {
  icon: string;
  title: string;
  time: string;
  color: string;
  background: string;
};

const DAILY_TASK_POOL: DailyTask[] = [
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
  {
    icon: "magnify",
    title: "Inspection des feuilles de blé",
    time: "Aujourd’hui · 13:30",
    color: Colors.observation,
    background: Colors.observationBg,
  },
  {
    icon: "weather-sunny",
    title: "Vérification de la météo",
    time: "Aujourd’hui · 14:15",
    color: Colors.observation,
    background: Colors.observationBg,
  },
  {
    icon: "bug-outline",
    title: "Surveillance des ravageurs",
    time: "Aujourd’hui · 15:00",
    color: Colors.pesticide,
    background: Colors.pesticideBg,
  },
  {
    icon: "sprout",
    title: "Contrôle de la croissance des cultures",
    time: "Aujourd’hui · 16:00",
    color: Colors.fertilizing,
    background: Colors.fertilizingBg,
  },
  {
    icon: "water-check",
    title: "Contrôle des goutteurs",
    time: "Aujourd’hui · 17:30",
    color: Colors.irrigation,
    background: Colors.irrigationBg,
  },
];

const createDailyTasks = (): DailyTask[] => {
  return [...DAILY_TASK_POOL].sort(() => Math.random() - 0.5).slice(0, 3);
};

const NOTIFICATIONS = [
  {
    id: "1",
    icon: "water" as const,
    title: "Irrigation programmée",
    body: "La parcelle P14 sera irriguée demain à 06:30.",
    time: "Il y a 15 min",
    color: "#2196F3",
    bg: "#e3f2fd",
  },
  {
    id: "2",
    icon: "alert-circle" as const,
    title: "Alerte ravageurs",
    body: "Des pucerons ont été détectés sur la culture d'oliviers.",
    time: "Il y a 1 h",
    color: "#e53935",
    bg: "#ffebee",
  },
  {
    id: "3",
    icon: "leaf" as const,
    title: "Fertilisation recommandée",
    body: "Apportez de l'azote à la parcelle est cette semaine.",
    time: "Il y a 3 h",
    color: "#43a047",
    bg: "#e8f5e9",
  },
  {
    id: "4",
    icon: "weather-rainy" as const,
    title: "Prévisions météo",
    body: "Des pluies modérées attendues dans 2 jours.",
    time: "Il y a 5 h",
    color: "#546e7a",
    bg: "#eceff1",
  },
];

// Prototype data: only one project for now
const PROJECTS: Project[] = [
  {
    id: "1",
    name: "Ma ferme",
    category: "Investissement agricole",
    icon: "sprout",
  },
];

// Blur that fades from fully blurred at the screen edge to fully sharp
// on the inner side. Cards get progressively blurred as they slide into it.
const EdgeBlur = ({
  side,
  blurTarget,
}: {
  side: "left" | "right";
  blurTarget: React.RefObject<View | null>;
}) => (
  <MaskedView
    pointerEvents="none"
    style={[styles.edgeBlur, side === "left" ? { left: 0 } : { right: 0 }]}
    maskElement={
      <LinearGradient
        colors={
          side === "left"
            ? ["rgba(0,0,0,1)", "rgba(0,0,0,0)"]
            : ["rgba(0,0,0,0)", "rgba(0,0,0,1)"]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={StyleSheet.absoluteFill}
      />
    }
  >
    <BlurView
      intensity={80}
      tint="light"
      blurMethod="dimezisBlurView"
      blurTarget={blurTarget}
      style={StyleSheet.absoluteFill}
    />
  </MaskedView>
);

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [weather, setWeather] = useState<WeatherSnapshot>(DEFAULT_WEATHER);
  const [isWeatherLoading, setIsWeatherLoading] = useState(true);
  const [dailyTasks] = useState<DailyTask[]>(createDailyTasks);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(PROJECTS[0].id);

  const cropCarouselRef = useRef<View>(null);

  useFocusEffect(
    useCallback(() => {
      let mounted = true;

      const loadWeather = async () => {
        try {
          let latitude = 35.7412; // Default to Relizane, Algeria
          let longitude = 0.5559;

          try {
            const savedLoc = await AsyncStorage.getItem("selectedLocation");
            if (savedLoc) {
              const loc = JSON.parse(savedLoc);
              if (loc.latitude && loc.longitude) {
                latitude = loc.latitude;
                longitude = loc.longitude;
              }
            }
          } catch (e) {
            console.error("Failed to load location from storage", e);
          }

          const [reverseGeocode, weatherResponse] = await Promise.all([
            Location.reverseGeocodeAsync({ latitude, longitude }),
            fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=1`,
            ),
          ]);

          if (!weatherResponse.ok) {
            throw new Error(
              `Weather request failed (${weatherResponse.status})`,
            );
          }

          const payload: {
            current?: {
              temperature_2m?: number;
              relative_humidity_2m?: number;
              wind_speed_10m?: number;
              weather_code?: number;
            };
            daily?: {
              temperature_2m_max?: number[];
              temperature_2m_min?: number[];
            };
          } = await weatherResponse.json();

          const current = payload.current;
          const parsed = weatherFromCode(current?.weather_code);

          if (!mounted) return;

          setWeather({
            temperature:
              typeof current?.temperature_2m === "number"
                ? `${Math.round(current.temperature_2m)}°C`
                : "--°C",
            condition: parsed.condition,
            humidity:
              typeof current?.relative_humidity_2m === "number"
                ? `${Math.round(current.relative_humidity_2m)}%`
                : "--",
            wind:
              typeof current?.wind_speed_10m === "number"
                ? `${Math.round(current.wind_speed_10m)} km/h`
                : "--",
            todayRange:
              typeof payload.daily?.temperature_2m_min?.[0] === "number" &&
              typeof payload.daily?.temperature_2m_max?.[0] === "number"
                ? `${Math.round(payload.daily.temperature_2m_min[0])}° / ${Math.round(payload.daily.temperature_2m_max[0])}°`
                : "-- / --",
            location: formatLocationLabel(reverseGeocode, latitude, longitude),
            icon: parsed.icon,
            iconColor: parsed.iconColor,
          });
        } catch {
          if (!mounted) return;
          setWeather(DEFAULT_WEATHER);
        } finally {
          if (mounted) {
            setIsWeatherLoading(false);
          }
        }
      };

      void loadWeather();

      return () => {
        mounted = false;
      };
    }, []),
  );

  const openCrop = (route?: CropRoute) => {
    if (!route) return;
    router.push(route);
  };

  return (
    <SafeAreaView style={styles.safe} edges={["left", "right", "bottom"]}>
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
              onPress={() => setShowProjects(true)}
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
              onPress={() => setShowNotifications(true)}
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

          {/* Projects Modal */}
          <Modal
            visible={showProjects}
            transparent
            animationType="fade"
            onRequestClose={() => setShowProjects(false)}
          >
            <Pressable
              style={styles.projOverlay}
              onPress={() => setShowProjects(false)}
            >
              <Pressable style={styles.projPanel} onPress={() => {}}>
                <View style={styles.notifHeader}>
                  <Text style={styles.notifTitle}>Mes projets</Text>
                  <TouchableOpacity onPress={() => setShowProjects(false)}>
                    <Ionicons name="close" size={22} color="#4a5e48" />
                  </TouchableOpacity>
                </View>

                {PROJECTS.map((p) => {
                  const selected = p.id === selectedProjectId;
                  return (
                    <TouchableOpacity
                      key={p.id}
                      activeOpacity={0.8}
                      style={[
                        styles.projItem,
                        selected && styles.projItemSelected,
                      ]}
                      onPress={() => {
                        setSelectedProjectId(p.id);
                        setShowProjects(false);
                      }}
                    >
                      <View style={styles.projIconWrap}>
                        <MaterialCommunityIcons
                          name={p.icon}
                          size={20}
                          color={stylesData.primary}
                        />
                      </View>
                      <View style={styles.projInfo}>
                        <Text style={styles.projName}>{p.name}</Text>
                        <Text style={styles.projCategory}>{p.category}</Text>
                      </View>
                      {selected && (
                        <Ionicons
                          name="checkmark-circle"
                          size={22}
                          color={stylesData.primary}
                        />
                      )}
                    </TouchableOpacity>
                  );
                })}

                <TouchableOpacity
                  style={styles.projAddButton}
                  activeOpacity={0.85}
                  onPress={() => {
                    // Prototype: intentionally does nothing
                  }}
                >
                  <Ionicons name="add" size={20} color="#ffffff" />
                  <Text style={styles.projAddText}>Ajouter un projet</Text>
                </TouchableOpacity>
              </Pressable>
            </Pressable>
          </Modal>

          {/* Notifications Modal */}
          <Modal
            visible={showNotifications}
            transparent
            animationType="fade"
            onRequestClose={() => setShowNotifications(false)}
          >
            <Pressable
              style={styles.notifOverlay}
              onPress={() => setShowNotifications(false)}
            >
              <Pressable style={styles.notifPanel} onPress={() => {}}>
                <View style={styles.notifHeader}>
                  <Text style={styles.notifTitle}>Notifications</Text>
                  <TouchableOpacity onPress={() => setShowNotifications(false)}>
                    <Ionicons name="close" size={22} color="#4a5e48" />
                  </TouchableOpacity>
                </View>
                {NOTIFICATIONS.map((n, idx) => (
                  <View
                    key={n.id}
                    style={[
                      styles.notifItem,
                      idx < NOTIFICATIONS.length - 1 && styles.notifItemBorder,
                    ]}
                  >
                    <View
                      style={[styles.notifIconWrap, { backgroundColor: n.bg }]}
                    >
                      <MaterialCommunityIcons
                        name={n.icon}
                        size={20}
                        color={n.color}
                      />
                    </View>
                    <View style={styles.notifBody}>
                      <Text style={styles.notifItemTitle}>{n.title}</Text>
                      <Text style={styles.notifItemBody}>{n.body}</Text>
                      <Text style={styles.notifItemTime}>{n.time}</Text>
                    </View>
                  </View>
                ))}
              </Pressable>
            </Pressable>
          </Modal>

          <View style={styles.greetingBlock}>
            <Text style={styles.greetingTitle}>Bonjour, Abdenour! 🍃</Text>
            <Text style={styles.greetingSubtitle}>
              Gérez vos cultures intelligemment
            </Text>
          </View>

          <TouchableOpacity
            style={styles.weatherCard}
            activeOpacity={0.8}
            onPress={() => router.push("/map")}
          >
            <View style={styles.weatherTopRow}>
              <View style={styles.weatherLeft}>
                <View style={styles.weatherIconCircle}>
                  <Ionicons
                    name={weather.icon}
                    size={22}
                    color={weather.iconColor}
                  />
                </View>
                <View>
                  <Text style={styles.weatherTemp}>{weather.temperature}</Text>
                  <Text style={styles.weatherCondition}>
                    {isWeatherLoading
                      ? "Chargement météo..."
                      : weather.condition}
                  </Text>
                </View>
              </View>

              <View style={styles.weatherRight}>
                <Text style={styles.weatherStat}>
                  Humidité: {weather.humidity}
                </Text>
                <Text style={styles.weatherStat}>Vent: {weather.wind}</Text>
                <Text style={styles.weatherStat}>
                  Min/Max: {weather.todayRange}
                </Text>
              </View>
            </View>

            <View style={styles.locationRow}>
              <Ionicons name="location-sharp" size={15} color="#d9f5d6" />
              <Text style={styles.locationText}>{weather.location}</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Mes Cultures</Text>
            <TouchableOpacity activeOpacity={0.75}>
              <Text style={styles.sectionAction}>Voir tout &gt;</Text>
            </TouchableOpacity>
          </View>

          {/* Carousel: extends to the screen edges, with blurred edge zones */}
          <View style={styles.cropRowWrap}>
            <BlurTargetView>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.cropRow}
              >
                {CROP_CARDS.map((crop) => (
                  <TouchableOpacity
                    key={crop.title}
                    style={styles.cropCard}
                    activeOpacity={0.85}
                    onPress={
                      crop.route ? () => openCrop(crop.route) : undefined
                    }
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
                        <Text
                          style={[styles.statusText, { color: crop.accent }]}
                        >
                          {crop.status}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </BlurTargetView>

            <EdgeBlur side="left" blurTarget={cropCarouselRef} />
            <EdgeBlur side="right" blurTarget={cropCarouselRef} />
          </View>

          <View style={styles.farmSectionHeader}>
            <Text style={styles.sectionTitle}>Ma ferme</Text>
            <Text style={styles.farmSectionHint}>Vue d&apos;ensemble</Text>
          </View>

          <TouchableOpacity
            style={styles.farmCard}
            activeOpacity={0.88}
            onPress={() => router.push("/farm")}
          >
            <Image
              source={require("../assets/images/leaf.png")}
              style={styles.farmImage}
            />
            <View style={styles.farmCardBody}>
              <Text style={styles.farmCardTitle}>
                Plan de l&apos;exploitation
              </Text>
              <Text style={styles.farmCardSubtitle}>
                Visualisez vos parcelles et leurs mesures au même endroit.
              </Text>
              <View style={styles.farmAction}>
                <Text style={styles.farmActionText}>Ouvrir le plan</Text>
                <Ionicons
                  name="arrow-forward"
                  size={17}
                  color={stylesData.primary}
                />
              </View>
            </View>
          </TouchableOpacity>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Tâches du jour</Text>
          </View>

          <View style={styles.taskList}>
            {dailyTasks.map((task) => (
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
    paddingHorizontal: SCREEN_PADDING,
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
    fontSize: 11,
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

  // ── Mes Cultures carousel ─────────────────────────────────
  cropRowWrap: {
    // Cancel the screen padding so the scroll view reaches both screen edges
    marginHorizontal: -SCREEN_PADDING,
    marginBottom: 24,
  },
  cropRow: {
    // Re-add the padding inside the scrollable content
    paddingHorizontal: SCREEN_PADDING,
    paddingBottom: 4, // ← space below the cards
    gap: 14,
  },
  edgeBlur: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: EDGE_WIDTH,
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
  cropRowTarget: {
    flex: 1,
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

  // ── Ma ferme ──────────────────────────────────────────────
  farmSectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  farmSectionHint: {
    fontSize: 13,
    fontFamily: "Poppins_600SemiBold",
    color: "#6f7f6d",
  },
  farmCard: {
    flexDirection: "row",
    minHeight: 132,
    backgroundColor: "#eaf4e7",
    borderRadius: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#cfe3c8",
    marginBottom: 26,
  },
  farmImage: {
    width: 112,
    height: "100%",
    backgroundColor: "#d2e8cf",
  },
  farmCardBody: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    justifyContent: "center",
    gap: 6,
  },
  farmCardTitle: {
    fontSize: 17,
    fontFamily: "Poppins_700Bold",
    color: "#17331a",
  },
  farmCardSubtitle: {
    fontSize: 12,
    lineHeight: 18,
    fontFamily: "Poppins_400Regular",
    color: "#5f765e",
  },
  farmAction: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 3,
  },
  farmActionText: {
    fontSize: 12,
    fontFamily: "Poppins_700Bold",
    color: stylesData.primary,
  },

  // ── Tasks ─────────────────────────────────────────────────
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

  // ── Bottom bar (unused here, kept from original) ──────────
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

  // ── Notification popover ──────────────────────────────────
  notifOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingTop: 60,
    paddingRight: 14,
  },
  notifPanel: {
    width: 310,
    backgroundColor: "#ffffff",
    borderRadius: 18,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
    overflow: "hidden",
  },
  notifHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#edf3ec",
  },
  notifTitle: {
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
    color: "#17331a",
  },
  notifItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  notifItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#f0f6ef",
  },
  notifIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  notifBody: {
    flex: 1,
    gap: 2,
  },
  notifItemTitle: {
    fontSize: 13.5,
    fontFamily: "Poppins_600SemiBold",
    color: "#1b321c",
  },
  notifItemBody: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    color: "#5f765e",
    lineHeight: 17,
  },
  notifItemTime: {
    fontSize: 11,
    fontFamily: "Poppins_400Regular",
    color: "#9eb09c",
    marginTop: 2,
  },

  // ── Projects popover ──────────────────────────────────────
  projOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "flex-start",
    alignItems: "flex-start", // anchored top-left, under the hamburger
    paddingTop: 60,
    paddingLeft: 14,
  },
  projPanel: {
    width: 300,
    backgroundColor: "#ffffff",
    borderRadius: 18,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
    overflow: "hidden",
  },
  projItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  projItemSelected: {
    backgroundColor: "#eaf4e7",
  },
  projIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#dcefd9",
    alignItems: "center",
    justifyContent: "center",
  },
  projInfo: {
    flex: 1,
    gap: 2,
  },
  projName: {
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
    color: "#1b321c",
  },
  projCategory: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    color: "#5f765e",
  },
  projAddButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    margin: 14,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: stylesData.primary,
  },
  projAddText: {
    fontSize: 13.5,
    fontFamily: "Poppins_600SemiBold",
    color: "#ffffff",
  },
});
