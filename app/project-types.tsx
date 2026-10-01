import AppHeader from "@/components/AppHeader";
import { Colors } from "@/constants/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
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

// Placeholder list. Add the remaining wilayas here when the complete resource is ready.
const WILAYAS = ["Adrar", "Chlef", "Alger", "Blida", "Bouira"];

export default function ProjectTypesScreen() {
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(
    null,
  );
  const [selectedWilaya, setSelectedWilaya] = useState("");
  const [isWilayaPickerOpen, setIsWilayaPickerOpen] = useState(false);
  const [landSize, setLandSize] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const successTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (successTimer.current) clearTimeout(successTimer.current);
    };
  }, []);

  const closeProjectModal = () => {
    if (isSending) return;
    setSelectedProject(null);
    setIsWilayaPickerOpen(false);
  };

  const handleSendRequest = () => {
    if (isSending) return;

    setIsSending(true);
    setIsWilayaPickerOpen(false);

    setTimeout(() => {
      setIsSending(false);
      setSelectedProject(null);
      setLandSize("");
      setSelectedWilaya("");
      setDescription("");
      setEmail("");
      setShowSuccess(true);
      successTimer.current = setTimeout(() => setShowSuccess(false), 5000);
    }, 2000);
  };

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
              onPress={() => setSelectedProject(projectType)}
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

      <Modal
        visible={selectedProject !== null}
        transparent
        animationType="slide"
        onRequestClose={closeProjectModal}
      >
        <KeyboardAvoidingView
          style={styles.modalOverlay}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <Pressable
            style={styles.modalDismissArea}
            onPress={closeProjectModal}
          />
          <View style={styles.modalPanel}>
            <View style={styles.modalHeader}>
              <View style={styles.modalHeaderCopy}>
                <Text style={styles.modalTitle}>Démarrer un projet</Text>
                <Text style={styles.modalSubtitle}>
                  {selectedProject?.title}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={closeProjectModal}
                disabled={isSending}
                accessibilityLabel="Fermer"
              >
                <MaterialCommunityIcons
                  name="close"
                  size={21}
                  color="#466247"
                />
              </TouchableOpacity>
            </View>

            <ScrollView
              style={styles.formScroll}
              contentContainerStyle={styles.formContent}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <Text style={styles.question}>
                Êtes-vous intéressé par le démarrage d’un plan de{" "}
                {selectedProject?.title.toLowerCase()} ?
              </Text>
              <Text style={styles.formHint}>
                Envoyez-nous votre demande et notre équipe vous répondra
                prochainement.
              </Text>

              <Text style={styles.fieldLabel}>Superficie du terrain</Text>
              <TextInput
                style={styles.input}
                value={landSize}
                onChangeText={setLandSize}
                placeholder="Ex. 2 hectares"
                placeholderTextColor="#9caf9b"
                keyboardType="decimal-pad"
              />

              <Text style={styles.fieldLabel}>Wilaya</Text>
              <TouchableOpacity
                style={styles.selectInput}
                onPress={() => setIsWilayaPickerOpen((isOpen) => !isOpen)}
                activeOpacity={0.8}
                disabled={isSending}
              >
                <Text
                  style={[
                    styles.selectText,
                    !selectedWilaya && styles.placeholderText,
                  ]}
                >
                  {selectedWilaya || "Sélectionnez votre wilaya"}
                </Text>
                <MaterialCommunityIcons
                  name={isWilayaPickerOpen ? "chevron-up" : "chevron-down"}
                  size={21}
                  color="#5f765e"
                />
              </TouchableOpacity>

              {isWilayaPickerOpen ? (
                <View style={styles.wilayaMenu}>
                  <ScrollView
                    nestedScrollEnabled
                    showsVerticalScrollIndicator
                    style={styles.wilayaList}
                  >
                    {WILAYAS.map((wilaya) => (
                      <TouchableOpacity
                        key={wilaya}
                        style={styles.wilayaOption}
                        onPress={() => {
                          setSelectedWilaya(wilaya);
                          setIsWilayaPickerOpen(false);
                        }}
                      >
                        <Text style={styles.wilayaOptionText}>{wilaya}</Text>
                        {selectedWilaya === wilaya ? (
                          <MaterialCommunityIcons
                            name="check"
                            size={18}
                            color={Colors.oliveAccent}
                          />
                        ) : null}
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              ) : null}

              <Text style={styles.fieldLabel}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={description}
                onChangeText={setDescription}
                placeholder="Parlez-nous de votre besoin"
                placeholderTextColor="#9caf9b"
                multiline
                textAlignVertical="top"
              />

              <Text style={styles.fieldLabel}>Adresse e-mail</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="vous@exemple.com"
                placeholderTextColor="#9caf9b"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />

              <TouchableOpacity
                style={[styles.sendButton, isSending && styles.sendButtonBusy]}
                onPress={handleSendRequest}
                activeOpacity={0.85}
                disabled={isSending}
              >
                {isSending ? (
                  <ActivityIndicator color="#ffffff" />
                ) : (
                  <>
                    <Text style={styles.sendButtonText}>
                      Envoyer la demande
                    </Text>
                    <MaterialCommunityIcons
                      name="send"
                      size={18}
                      color="#ffffff"
                    />
                  </>
                )}
              </TouchableOpacity>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {showSuccess ? (
        <View style={styles.successBar}>
          <MaterialCommunityIcons
            name="check-circle"
            size={22}
            color="#ffffff"
          />
          <Text style={styles.successText}>
            Votre demande a été envoyée, notre équipe vous répondra bientôt.
          </Text>
        </View>
      ) : null}
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
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(18, 39, 20, 0.42)",
  },
  modalDismissArea: {
    flex: 1,
  },
  modalPanel: {
    maxHeight: "91%",
    backgroundColor: "#f8fcf7",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  modalHeaderCopy: {
    flex: 1,
    paddingRight: 12,
  },
  modalTitle: {
    color: "#17331a",
    fontFamily: "Poppins_700Bold",
    fontSize: 20,
  },
  modalSubtitle: {
    color: Colors.oliveAccent,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 13,
    marginTop: 3,
  },
  closeButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#eaf4e7",
    alignItems: "center",
    justifyContent: "center",
  },
  formScroll: {
    flexGrow: 0,
  },
  formContent: {
    paddingBottom: 28,
  },
  question: {
    color: "#254528",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 5,
  },
  formHint: {
    color: "#6d826c",
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 16,
  },
  fieldLabel: {
    color: "#355637",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: "#cfe3c8",
    borderRadius: 12,
    backgroundColor: "#ffffff",
    color: "#17331a",
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    paddingHorizontal: 14,
  },
  textArea: {
    minHeight: 88,
    paddingTop: 12,
  },
  selectInput: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#cfe3c8",
    borderRadius: 12,
    backgroundColor: "#ffffff",
    paddingHorizontal: 14,
  },
  selectText: {
    color: "#17331a",
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
  },
  placeholderText: {
    color: "#9caf9b",
  },
  wilayaMenu: {
    borderWidth: 1,
    borderColor: "#cfe3c8",
    borderRadius: 12,
    backgroundColor: "#ffffff",
    marginTop: 6,
    overflow: "hidden",
  },
  wilayaList: {
    maxHeight: 170,
  },
  wilayaOption: {
    minHeight: 42,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#edf5eb",
  },
  wilayaOptionText: {
    color: "#355637",
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
  },
  sendButton: {
    minHeight: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    borderRadius: 14,
    backgroundColor: Colors.oliveAccent,
    marginTop: 22,
  },
  sendButtonBusy: {
    opacity: 0.75,
  },
  sendButtonText: {
    color: "#ffffff",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 13,
  },
  successBar: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 112,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    minHeight: 58,
    borderRadius: 14,
    backgroundColor: "#2e7d32",
    paddingHorizontal: 16,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.16,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  successText: {
    flex: 1,
    color: "#ffffff",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    lineHeight: 18,
  },
});
