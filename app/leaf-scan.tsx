import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import { useEffect, useRef } from "react";
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const PRIMARY = "#2D5A27";

export default function LeafScanScreen() {
  const insets = useSafeAreaInsets();
  const [permission, requestPermission] = useCameraPermissions();
  const autoRequestOnce = useRef(false);

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
      <SafeAreaView style={styles.outer} edges={["left", "right", "bottom"]}>
        <View style={[styles.toolbar, { paddingTop: 8 }]}>
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
      <SafeAreaView style={styles.outer} edges={["left", "right", "bottom"]}>
        <View style={[styles.toolbar, { paddingTop: 8 }]}>
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
            Autorisez la caméra pour capturer une plante et préparer une analyse
            IA.
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
      <CameraView style={StyleSheet.absoluteFill} facing="back" />

      <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
        <View style={[styles.topBar, { paddingTop: 12, paddingHorizontal: 12 }]}>
          <TouchableOpacity
            style={styles.backBtnLight}
            onPress={() => router.back()}
            activeOpacity={0.85}
          >
            <Ionicons name="chevron-back" size={28} color="#ffffff" />
          </TouchableOpacity>
          <View style={styles.aiPill}>
            <Ionicons name="sparkles-outline" size={14} color="#e6ffe2" />
            <Text style={styles.aiPillText}>IA</Text>
          </View>
          <View style={styles.toolbarSpacer} />
        </View>

        <View style={styles.centerMeta} pointerEvents="none" />

        <TouchableOpacity
          style={[
            styles.floatingAiButton,
            { bottom: Math.max(insets.bottom, 16) + 128 },
          ]}
          activeOpacity={0.85}
          accessibilityLabel="Détecter santé plante"
        >
          <Ionicons name="sparkles" size={24} color="#ffffff" />
        </TouchableOpacity>

        <View
          style={[
            styles.bottomPanel,
            { paddingBottom: Math.max(insets.bottom, 20) },
          ]}
        >
          <Text style={styles.bottomTitle}>Détection IA plante</Text>
          <Text style={styles.bottomCaption}>
            Appuyez sur le bouton IA pour lancer la détection des maladies et
            l'état de santé de la plante. Le bouton est visuel uniquement pour
            le moment.
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
  aiPill: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  aiPillText: {
    color: "#ffffff",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 13,
    letterSpacing: 0.2,
  },
  centerMeta: {
    flex: 1,
  },
  floatingAiButton: {
    position: "absolute",
    right: 20,
    width: 58,
    height: 58,
    borderRadius: 999,
    backgroundColor: PRIMARY,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.28,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
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
