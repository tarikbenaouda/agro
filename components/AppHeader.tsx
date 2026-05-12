import { Colors } from "@/constants/colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  title?: string;
  showMenu?: boolean;
  onMenu?: () => void;
  showBack?: boolean;
  onBack?: () => void;
  showBell?: boolean;
  onBell?: () => void;
  centerIcon?: string;
};

export default function AppHeader({
  title,
  showMenu = false,
  onMenu,
  showBack = false,
  onBack,
  showBell = false,
  onBell,
  centerIcon = "leaf",
}: Props) {
  return (
    <View style={styles.header}>
      <View style={styles.sideLeft}>
        {showMenu ? (
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={onMenu}
            activeOpacity={0.75}
          >
            <Ionicons name="menu" size={22} color={Colors.textPrimary} />
          </TouchableOpacity>
        ) : showBack ? (
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={onBack}
            activeOpacity={0.75}
          >
            <Ionicons name="arrow-back" size={22} color={Colors.textPrimary} />
          </TouchableOpacity>
        ) : (
          <View style={styles.iconPlaceholder} />
        )}
      </View>

      <View pointerEvents="none" style={styles.center}>
        <MaterialCommunityIcons
          name={centerIcon as any}
          size={18}
          color={Colors.oliveAccent}
        />
        {title ? <Text style={styles.title}>{title}</Text> : null}
      </View>

      <View style={styles.sideRight}>
        {showBell ? (
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={onBell}
            activeOpacity={0.75}
          >
            <View>
              <Ionicons
                name="notifications-outline"
                size={22}
                color={Colors.textPrimary}
              />
              <View style={styles.dot} />
            </View>
          </TouchableOpacity>
        ) : (
          <View style={styles.iconPlaceholder} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
    position: "relative",
  },
  sideLeft: {
    width: 48,
    alignItems: "flex-start",
  },
  sideRight: {
    width: 48,
    alignItems: "flex-end",
  },
  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#e6f0ea",
  },
  iconPlaceholder: {
    width: 44,
    height: 44,
  },
  center: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  title: {
    marginLeft: 8,
    fontSize: 18,
    fontFamily: "Poppins_700Bold",
    color: Colors.textPrimary,
  },
  dot: {
    position: "absolute",
    top: -3,
    right: -3,
    width: 9,
    height: 9,
    borderRadius: 9,
    backgroundColor: "#e53935",
    borderWidth: 2,
    borderColor: "#ffffff",
  },
});
