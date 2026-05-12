import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function AppSplash() {
  return (
    <View style={styles.container}>
      <View style={styles.glowTop} />
      <View style={styles.glowBottom} />

      <View style={styles.logoWrap}>
        <Ionicons name="leaf" size={54} color="#ffffff" />
      </View>

      <Text style={styles.title}>AGO APP</Text>
      <Text style={styles.subtitle}>Cultivez intelligemment</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#2D5A27",
    alignItems: "center",
    justifyContent: "center",
  },
  glowTop: {
    position: "absolute",
    top: -90,
    left: -90,
    width: 240,
    height: 240,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.09)",
  },
  glowBottom: {
    position: "absolute",
    bottom: -120,
    right: -80,
    width: 260,
    height: 260,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  logoWrap: {
    width: 108,
    height: 108,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.18)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    marginBottom: 22,
  },
  title: {
    fontSize: 34,
    fontFamily: "Poppins_700Bold",
    letterSpacing: 2,
    color: "#ffffff",
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "rgba(255,255,255,0.9)",
    letterSpacing: 0.4,
  },
});
