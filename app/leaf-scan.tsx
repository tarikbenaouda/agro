import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef } from "react";
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const PRIMARY = "#2D5A27";
const FRAME_H = 288;

export default function LeafScanScreen() {
  const insets = useSafeAreaInsets();
  const [permission, requestPermission] = useCameraPermissions();
  const autoRequestOnce = useRef(false);

  const scanPhase = useSharedValue(0);

  useEffect(() => {
    scanPhase.value = withRepeat(
      withTiming(1, {
        duration: 2400,
        easing: Easing.inOut(Easing.sin),
      }),
      -1,
      true,
    );
  }, [scanPhase]);

  const beamStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(scanPhase.value, [0, 1], [20, FRAME_H - 36]),
      },
    ],
  }));

  useEffect(() => {
    if (Platform.OS === "web") return;
    if (!permission || permission.granted || autoRequestOnce.current) return;
    autoRequestOnce.current = true;
    void requestPermission();
  }, [permission, requestPermission]);

  const showPermissionGate =
    Platform.OS !== "web" && permission != null && !permission.granted;

  if (Platform.OS === "web") {
    return (
      <SafeAreaView style={styles.outer}>
        <StatusBar style="dark" />
        <View style={[styles.toolbar, { paddingTop: Math.max(insets.top, 8) }]}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.back()}
            activeOpacity={0.8}
          >
            <Ionicons name="chevron-back" size={28} color="#17331a" />
          </TouchableOpacity>
          <Text style={styles.toolbarTitle}>Analyse feuille</Text>
          <View style={styles.toolbarSpacer} />
        </View>
        <View style={styles.webPlaceholder}>
          <Ionicons name="phone-portrait-outline" size={56} color={PRIMARY} />
          <Text style={styles.webTitle}>Caméra non disponible sur le web</Text>
          <Text style={styles.webSubtitle}>
            Ouvrez l’application sur un téléphone pour scanner une feuille et
            lancer l’analyse (IA à venir).
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (permission == null) {
    return (
      <View style={styles.loadingRoot}>
        <ActivityIndicator size="large" color={PRIMARY} />
        <Text style={styles.loadingText}>Préparation de la caméra…</Text>
      </View>
    );
  }

  if (showPermissionGate) {
    return (
      <SafeAreaView style={styles.outer}>
        <StatusBar style="dark" />
        <View style={[styles.toolbar, { paddingTop: Math.max(insets.top, 8) }]}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.back()}
            activeOpacity={0.8}
          >
            <Ionicons name="chevron-back" size={28} color="#17331a" />
          </TouchableOpacity>
          <Text style={styles.toolbarTitle}>Analyse feuille</Text>
          <View style={styles.toolbarSpacer} />
        </View>
        <View style={styles.permissionBody}>
          <Ionicons name="camera-outline" size={52} color={PRIMARY} />
          <Text style={styles.permissionTitle}>Accès à la caméra</Text>
          <Text style={styles.permissionBodyText}>
            Autorisez la caméra pour placer une feuille dans le cadre et lancer
            le balayage (détection IA à venir).
          </Text>
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={requestPermission}
            activeOpacity={0.85}
          >
            <Text style={styles.primaryBtnText}>Autoriser la caméra</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.cameraRoot}>
      <StatusBar style="light" />
      <CameraView style={StyleSheet.absoluteFill} facing="back" />

      <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
        <View
          style={[
            styles.topBar,
            { paddingTop: Math.max(insets.top, 12), paddingHorizontal: 12 },
          ]}
        >
          <TouchableOpacity
            style={styles.backBtnLight}
            onPress={() => router.back()}
            activeOpacity={0.85}
          >
            <Ionicons name="chevron-back" size={28} color="#ffffff" />
          </TouchableOpacity>
          <View style={styles.scanningPill}>
            <View style={styles.pulseDot} />
            <Text style={styles.scanningPillText}>Balayage en cours</Text>
          </View>
          <View style={styles.toolbarSpacer} />
        </View>

        <View style={styles.centerMeta} pointerEvents="none">
          <Text style={styles.hint}>Cadrez une feuille nette et bien éclairée</Text>
          <View style={[styles.scanFrame, { height: FRAME_H }]}>
            <View style={styles.cornerTL} />
            <View style={styles.cornerTR} />
            <View style={styles.cornerBL} />
            <View style={styles.cornerBR} />
            <Animated.View style={[styles.scanBeam, beamStyle]} />
          </View>
        </View>

        <View
          style={[
            styles.bottomPanel,
            { paddingBottom: Math.max(insets.bottom, 20) },
          ]}
        >
          <Text style={styles.bottomTitle}>Analyse IA (démo)</Text>
          <Text style={styles.bottomCaption}>
            La caméra est active et le balayage simulé tourne en boucle. La
            détection des maladies sera branchée ici plus tard.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    backgroundColor: "#F4FAF2",
  },
  cameraRoot: {
    flex: 1,
    backgroundColor: "#000000",
  },
  loadingRoot: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    backgroundColor: "#F4FAF2",
  },
  loadingText: {
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
    color: "#4a5c48",
  },
  toolbar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  toolbarTitle: {
    flex: 1,
    textAlign: "center",
    fontFamily: "Poppins_700Bold",
    fontSize: 17,
    color: "#17331a",
  },
  toolbarSpacer: {
    width: 44,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backBtnLight: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "rgba(0,0,0,0.35)",
    alignItems: "center",
    justifyContent: "center",
  },
  scanningPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: "#7bed9f",
  },
  scanningPillText: {
    color: "#ffffff",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 13,
    letterSpacing: 0.2,
  },
  centerMeta: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  hint: {
    color: "#e8fce8",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
    textShadowColor: "rgba(0,0,0,0.65)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
  },
  scanFrame: {
    width: "88%",
    maxWidth: 340,
    borderRadius: 20,
    position: "relative",
    overflow: "hidden",
  },
  scanBeam: {
    position: "absolute",
    left: 12,
    right: 12,
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(123,237,159,0.95)",
    shadowColor: "#7bed9f",
    shadowOpacity: 1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 0 },
    elevation: 4,
  },
  cornerTL: {
    position: "absolute",
    width: 28,
    height: 28,
    borderColor: "rgba(255,255,255,0.95)",
    zIndex: 2,
    top: 0,
    left: 0,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderTopLeftRadius: 14,
  },
  cornerTR: {
    position: "absolute",
    width: 28,
    height: 28,
    borderColor: "rgba(255,255,255,0.95)",
    zIndex: 2,
    top: 0,
    right: 0,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderTopRightRadius: 14,
  },
  cornerBL: {
    position: "absolute",
    width: 28,
    height: 28,
    borderColor: "rgba(255,255,255,0.95)",
    zIndex: 2,
    bottom: 0,
    left: 0,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderBottomLeftRadius: 14,
  },
  cornerBR: {
    position: "absolute",
    width: 28,
    height: 28,
    borderColor: "rgba(255,255,255,0.95)",
    zIndex: 2,
    bottom: 0,
    right: 0,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderBottomRightRadius: 14,
  },
  bottomPanel: {
    paddingHorizontal: 22,
    paddingTop: 16,
    backgroundColor: "rgba(0,0,0,0.55)",
  },
  bottomTitle: {
    color: "#ffffff",
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    marginBottom: 6,
  },
  bottomCaption: {
    color: "rgba(255,255,255,0.85)",
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    lineHeight: 19,
  },
  webPlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    paddingHorizontal: 32,
  },
  webTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: 18,
    color: "#17331a",
    textAlign: "center",
  },
  webSubtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#556b53",
    textAlign: "center",
    lineHeight: 21,
  },
  permissionBody: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 14,
    paddingHorizontal: 28,
  },
  permissionTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: 20,
    color: "#17331a",
    textAlign: "center",
  },
  permissionBodyText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#556b53",
    textAlign: "center",
    lineHeight: 21,
    marginBottom: 8,
  },
  primaryBtn: {
    backgroundColor: PRIMARY,
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 16,
    marginTop: 6,
  },
  primaryBtnText: {
    color: "#ffffff",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 15,
  },
});
