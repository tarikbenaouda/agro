import { Colors } from "@/constants/colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type AlertItem = {
  id: string;
  type: "warning" | "danger" | "info";
  title: string;
  description: string;
  timestamp: string;
  icon: string;
  priority: "haute" | "moyenne" | "basse";
};

const ALERTS: AlertItem[] = [
  {
    id: "1",
    type: "danger",
    title: "Risque de mildiou elevé",
    description:
      "Conditions climatiques favorables au développement du mildiou sur vos oliviers. Action recommandée: traitement préventif.",
    timestamp: "Il y a 2 heures",
    icon: "leaf",
    priority: "haute",
  },
  {
    id: "2",
    type: "warning",
    title: "Irrigation recommandée",
    description:
      "Le taux d'humidité du sol est passé en dessous du seuil optimal pour les orangers.",
    timestamp: "Il y a 5 heures",
    icon: "water",
    priority: "haute",
  },
  {
    id: "3",
    type: "info",
    title: "Prévision météorologique",
    description:
      "Pluies attendues ce week-end. Bonne opportunité pour l'observation des cultures.",
    timestamp: "Il y a 1 jour",
    icon: "cloud-outline",
    priority: "moyenne",
  },
  {
    id: "4",
    type: "warning",
    title: "Infestation d'insectes détectée",
    description:
      "Présence de pucerons sur les parcelles 3 et 5. Vérification recommandée.",
    timestamp: "Il y a 1 jour",
    icon: "bug",
    priority: "haute",
  },
  {
    id: "5",
    type: "info",
    title: "Maintenance de système d'irrigation",
    description:
      "Maintenance programmée du système de goutte-à-goutte mardi 15/05/2026.",
    timestamp: "Il y a 3 jours",
    icon: "settings-outline",
    priority: "basse",
  },
  {
    id: "6",
    type: "warning",
    title: "Température élevée prévue",
    description:
      "Vague de chaleur prévue pour la semaine prochaine. Vérifiez l'irrigation.",
    timestamp: "Il y a 3 jours",
    icon: "sunny",
    priority: "moyenne",
  },
];

export default function AlertesScreen() {
  const getAlertColor = (type: "warning" | "danger" | "info") => {
    switch (type) {
      case "danger":
        return "#e53935";
      case "warning":
        return "#f6a623";
      case "info":
        return "#2196F3";
      default:
        return "#666";
    }
  };

  const getPriorityColor = (priority: "haute" | "moyenne" | "basse") => {
    switch (priority) {
      case "haute":
        return { bg: "#fee3e3", text: "#c62828" };
      case "moyenne":
        return { bg: "#fff3e0", text: "#e65100" };
      case "basse":
        return { bg: "#e3f2fd", text: "#0d47a1" };
      default:
        return { bg: "#f5f5f5", text: "#666" };
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backBtn}
            activeOpacity={0.8}
          >
            <Ionicons name="arrow-back" size={20} color={Colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.screenTitle}>Alertes</Text>
          <View style={{ width: 44 }} />
        </View>

        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryNumber}>3</Text>
              <Text style={styles.summaryLabel}>Critiques</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryNumber}>2</Text>
              <Text style={styles.summaryLabel}>Moyennes</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryNumber}>1</Text>
              <Text style={styles.summaryLabel}>Basse</Text>
            </View>
          </View>
        </View>

        <View style={styles.filterRow}>
          <TouchableOpacity style={styles.filterBtn} activeOpacity={0.8}>
            <Text style={styles.filterBtnText}>Toutes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterBtn, styles.filterBtnInactive]}
            activeOpacity={0.8}
          >
            <Text style={styles.filterBtnTextInactive}>Critiques</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterBtn, styles.filterBtnInactive]}
            activeOpacity={0.8}
          >
            <Text style={styles.filterBtnTextInactive}>Non lues</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.alertsList}>
          {ALERTS.map((alert) => {
            const alertColor = getAlertColor(alert.type);
            const priorityColors = getPriorityColor(alert.priority);

            return (
              <TouchableOpacity
                key={alert.id}
                style={styles.alertCard}
                activeOpacity={0.85}
              >
                <View style={styles.alertLeft}>
                  <View
                    style={[
                      styles.alertIconWrap,
                      { backgroundColor: alertColor + "18" },
                    ]}
                  >
                    {alert.icon === "leaf" && (
                      <MaterialCommunityIcons
                        name="leaf"
                        size={22}
                        color={alertColor}
                      />
                    )}
                    {alert.icon === "water" && (
                      <MaterialCommunityIcons
                        name="water"
                        size={22}
                        color={alertColor}
                      />
                    )}
                    {alert.icon === "cloud-outline" && (
                      <Ionicons
                        name="cloud-outline"
                        size={22}
                        color={alertColor}
                      />
                    )}
                    {alert.icon === "bug" && (
                      <MaterialCommunityIcons
                        name="bug"
                        size={22}
                        color={alertColor}
                      />
                    )}
                    {alert.icon === "settings-outline" && (
                      <Ionicons
                        name="settings-outline"
                        size={22}
                        color={alertColor}
                      />
                    )}
                    {alert.icon === "sunny" && (
                      <Ionicons name="sunny" size={22} color={alertColor} />
                    )}
                  </View>
                </View>

                <View style={styles.alertContent}>
                  <View style={styles.alertTitleRow}>
                    <Text style={styles.alertTitle}>{alert.title}</Text>
                    <View
                      style={[
                        styles.priorityBadge,
                        { backgroundColor: priorityColors.bg },
                      ]}
                    >
                      <Text
                        style={[
                          styles.priorityText,
                          { color: priorityColors.text },
                        ]}
                      >
                        {alert.priority}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.alertDescription}>
                    {alert.description}
                  </Text>
                  <Text style={styles.alertTime}>{alert.timestamp}</Text>
                </View>

                <View style={styles.alertRight}>
                  <View
                    style={[styles.unreadDot, { backgroundColor: alertColor }]}
                  />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    padding: 18,
    paddingBottom: 40,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  screenTitle: {
    fontSize: 24,
    fontFamily: "Poppins_700Bold",
    color: Colors.textPrimary,
  },
  summaryCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#e1ece0",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  summaryItem: {
    alignItems: "center",
    flex: 1,
  },
  summaryNumber: {
    fontSize: 28,
    fontFamily: "Poppins_700Bold",
    color: "#2D5A27",
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    color: "#7b8c79",
  },
  summaryDivider: {
    width: 1,
    height: 40,
    backgroundColor: "#e1ece0",
  },
  filterRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  filterBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#2D5A27",
    alignItems: "center",
    justifyContent: "center",
  },
  filterBtnInactive: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e1ece0",
  },
  filterBtnText: {
    fontSize: 13,
    fontFamily: "Poppins_600SemiBold",
    color: "#ffffff",
  },
  filterBtnTextInactive: {
    fontSize: 13,
    fontFamily: "Poppins_600SemiBold",
    color: "#7b8c79",
  },
  alertsList: {
    gap: 12,
  },
  alertCard: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#e3ede1",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  alertLeft: {
    marginRight: 12,
  },
  alertIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  alertContent: {
    flex: 1,
    gap: 6,
  },
  alertTitleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 10,
  },
  alertTitle: {
    fontSize: 15,
    fontFamily: "Poppins_600SemiBold",
    color: "#1b321c",
    flex: 1,
  },
  alertDescription: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    color: "#6f7f6d",
    lineHeight: 18,
  },
  alertTime: {
    fontSize: 11.5,
    fontFamily: "Poppins_400Regular",
    color: "#9fb49e",
    marginTop: 2,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    minWidth: 50,
    alignItems: "center",
  },
  priorityText: {
    fontSize: 11,
    fontFamily: "Poppins_600SemiBold",
  },
  alertRight: {
    justifyContent: "flex-start",
    marginLeft: 8,
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 999,
  },
});
