import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";
import { useEffect, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const VISIBLE_PATHS = ["/", "/alertes", "/profile"];

const isVisiblePath = (pathname: string) => VISIBLE_PATHS.includes(pathname);

export default function BottomNav() {
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const isVisible = isVisiblePath(pathname);
  const [slideAnim] = useState(() => new Animated.Value(isVisible ? 0 : 140));

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isVisible ? 0 : 140,
      duration: 260,
      useNativeDriver: true,
    }).start();
  }, [isVisible, slideAnim]);

  const isActive = (path: string) => pathname === path;
  const activeColor = "#2D5A27";
  const inactiveColor = "#8ca58a";

  return (
    <Animated.View
      style={[
        styles.bottomBarWrap,
        {
          paddingBottom: Math.max(insets.bottom, 12),
          transform: [{ translateY: slideAnim }],
        },
      ]}
      pointerEvents={isVisible ? "auto" : "none"}
    >
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.tabItem}
          activeOpacity={0.8}
          onPress={() => router.replace("/")}
        >
          <Ionicons
            name="home"
            size={22}
            color={isActive("/") ? activeColor : inactiveColor}
          />
          <Text
            style={[styles.tabLabel, isActive("/") && styles.tabLabelActive]}
          >
            Accueil
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          activeOpacity={0.8}
          onPress={() => router.replace("/cultures")}
        >
          <Ionicons
            name="leaf"
            size={22}
            color={isActive("/cultures") ? activeColor : inactiveColor}
          />
          <Text
            style={[
              styles.tabLabel,
              isActive("/cultures") && styles.tabLabelActive,
            ]}
          >
            Cultures
          </Text>
        </TouchableOpacity>

        <View style={styles.centerButtonSlot}>
          <TouchableOpacity
            style={styles.centerButton}
            activeOpacity={0.85}
            onPress={() => router.push("/leaf-scan")}
            accessibilityLabel="Analyser une feuille avec la caméra"
          >
            <MaterialCommunityIcons
              name="leaf-circle-outline"
              size={32}
              color="#ffffff"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.tabItem}
          activeOpacity={0.8}
          onPress={() => router.replace("/alertes")}
        >
          <Ionicons
            name="warning-outline"
            size={22}
            color={isActive("/alertes") ? activeColor : inactiveColor}
          />
          <Text
            style={[
              styles.tabLabel,
              isActive("/alertes") && styles.tabLabelActive,
            ]}
          >
            Alertes
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          activeOpacity={0.8}
          onPress={() => router.replace("/profile")}
        >
          <Ionicons
            name="person-outline"
            size={22}
            color={isActive("/profile") ? activeColor : inactiveColor}
          />
          <Text
            style={[
              styles.tabLabel,
              isActive("/profile") && styles.tabLabelActive,
            ]}
          >
            Profil
          </Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
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
    color: "#2D5A27",
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
    backgroundColor: "#2D5A27",
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
