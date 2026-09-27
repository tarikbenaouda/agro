import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { MapPressEvent, Marker, Region } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

const DEFAULT_REGION = {
  latitude: 35.7412,
  longitude: 0.5559,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export default function MapScreen() {
  const [selectedCoord, setSelectedCoord] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [initialRegion, setInitialRegion] = useState<Region | null>(null);

  useEffect(() => {
    const loadLocation = async () => {
      try {
        const savedLoc = await AsyncStorage.getItem("selectedLocation");
        if (savedLoc) {
          const loc = JSON.parse(savedLoc);
          if (loc.latitude && loc.longitude) {
            setInitialRegion({
              latitude: loc.latitude,
              longitude: loc.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            });
            setSelectedCoord({
              latitude: loc.latitude,
              longitude: loc.longitude,
            });
            return;
          }
        }
      } catch (e) {
        console.error(e);
      }
      setInitialRegion(DEFAULT_REGION);
      setSelectedCoord({
        latitude: DEFAULT_REGION.latitude,
        longitude: DEFAULT_REGION.longitude,
      });
    };
    loadLocation();
  }, []);

  const handleMapPress = (event: MapPressEvent) => {
    setSelectedCoord(event.nativeEvent.coordinate);
  };

  const saveLocation = async () => {
    if (selectedCoord) {
      try {
        await AsyncStorage.setItem(
          "selectedLocation",
          JSON.stringify(selectedCoord),
        );
        router.back();
      } catch (e) {
        console.error("Failed to save location", e);
      }
    }
  };

  if (!initialRegion) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2D5A27" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#17331a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sélectionnez une position</Text>
      </View>

      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={initialRegion}
          onPress={handleMapPress}
        >
          {selectedCoord && <Marker coordinate={selectedCoord} />}
        </MapView>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.saveButton} onPress={saveLocation}>
          <Text style={styles.saveButtonText}>Enregistrer la position</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4FAF2",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F4FAF2",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    color: "#17331a",
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  footer: {
    padding: 20,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderColor: "#e1ece0",
  },
  saveButton: {
    backgroundColor: "#2D5A27",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  saveButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },
});
