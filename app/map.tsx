import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import WebView, { WebViewMessageEvent } from "react-native-webview";

const DEFAULT_COORD = { latitude: 35.7412, longitude: 0.5559 };

/**
 * Builds a self-contained HTML page that:
 *  - loads Leaflet from CDN (works offline after first load via webview cache)
 *  - centers on `lat/lon` with a draggable marker
 *  - posts { latitude, longitude } back to RN on every marker move or map tap
 */
function buildLeafletHTML(lat: number, lon: number): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <style>
    html, body, #map { height: 100%; margin: 0; padding: 0; }
    body { background: #c8dfc4; }
    .leaflet-tile-container img { background: #c8dfc4; }
  </style>
</head>
<body>
<div id="map"></div>
<script>
  var map = L.map('map').setView([${lat}, ${lon}], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19,
    keepBuffer: 5,
    updateWhenIdle: true,
    updateWhenZooming: true
  }).addTo(map);

  var marker = L.marker([${lat}, ${lon}], { draggable: true }).addTo(map);

  function postCoord(latlng) {
    var msg = JSON.stringify({ latitude: latlng.lat, longitude: latlng.lng });
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(msg);
    }
  }

  marker.on('dragend', function(e) { postCoord(e.target.getLatLng()); });

  map.on('click', function(e) {
    marker.setLatLng(e.latlng);
    postCoord(e.latlng);
  });

  // Allow native side to update marker position
  window.addEventListener('message', function(e) {
    try {
      var data = JSON.parse(e.data);
      if (data.latitude && data.longitude) {
        var ll = [data.latitude, data.longitude];
        marker.setLatLng(ll);
        map.setView(ll, map.getZoom());
      }
    } catch (_) {}
  });
</script>
</body>
</html>`;
}

export default function MapScreen() {
  const webViewRef = useRef<WebView>(null);

  const [selectedCoord, setSelectedCoord] = useState<{
    latitude: number;
    longitude: number;
  }>(DEFAULT_COORD);

  const [initialCoord, setInitialCoord] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  // Load previously saved location from storage
  useEffect(() => {
    const loadLocation = async () => {
      try {
        const savedLoc = await AsyncStorage.getItem("selectedLocation");
        if (savedLoc) {
          const loc = JSON.parse(savedLoc);
          if (loc.latitude && loc.longitude) {
            setInitialCoord({
              latitude: loc.latitude,
              longitude: loc.longitude,
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
      setInitialCoord(DEFAULT_COORD);
    };
    loadLocation();
  }, []);

  // Receive tap / drag events from Leaflet
  const handleMessage = (event: WebViewMessageEvent) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (
        typeof data.latitude === "number" &&
        typeof data.longitude === "number"
      ) {
        setSelectedCoord({
          latitude: data.latitude,
          longitude: data.longitude,
        });
      }
    } catch (_) {}
  };

  const saveLocation = async () => {
    try {
      await AsyncStorage.setItem(
        "selectedLocation",
        JSON.stringify(selectedCoord),
      );
      router.back();
    } catch (e) {
      console.error("Failed to save location", e);
    }
  };

  if (!initialCoord) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2D5A27" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#17331a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sélectionnez une position</Text>
      </View>

      {/* Coordinates display */}
      <View style={styles.coordBanner}>
        <Ionicons name="location-sharp" size={14} color="#2D5A27" />
        <Text style={styles.coordText}>
          {selectedCoord.latitude.toFixed(5)},{" "}
          {selectedCoord.longitude.toFixed(5)}
        </Text>
      </View>

      {/* OpenStreetMap via Leaflet */}
      <View style={styles.mapContainer}>
        <WebView
          ref={webViewRef}
          originWhitelist={["*"]}
          source={{
            html: buildLeafletHTML(
              initialCoord.latitude,
              initialCoord.longitude,
            ),
          }}
          onMessage={handleMessage}
          javaScriptEnabled
          domStorageEnabled
          style={styles.map}
          startInLoadingState
          renderLoading={() => (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#2D5A27" />
            </View>
          )}
        />
      </View>

      {/* Footer */}
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
  coordBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  coordText: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    color: "#5f765e",
  },
  mapContainer: {
    flex: 1,
    borderRadius: 16,
    overflow: "hidden",
    marginHorizontal: 12,
  },
  map: {
    flex: 1,
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
