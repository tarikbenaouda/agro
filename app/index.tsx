import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/colors';
import { TreeId } from '@/types';
import { useFarmerLog } from '@/hooks/useFarmerLog';
import TreeCard from '@/components/TreeCard';

export default function HomeScreen() {
  const { getAllLogs } = useFarmerLog();
  const [oliveLogs, setOliveLogs] = useState(0);
  const [orangeLogs, setOrangeLogs] = useState(0);

  const logoAnim = useRef(new Animated.Value(1)).current;
  const taglineAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Entrance animations
    Animated.stagger(180, [
      Animated.timing(logoAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.timing(taglineAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
    ]).start();

    // Load log counts
    getAllLogs('olive').then((logs) => setOliveLogs(logs.length));
    getAllLogs('orange').then((logs) => setOrangeLogs(logs.length));
  }, []);

  const goToProgram = (treeId: TreeId) => {
    router.push(`/program/${treeId}` as any);
  };

  return (
    <View style={styles.root}>
      {/* Background gradient */}
      <LinearGradient
        colors={['#f0fdf4', '#f8fff9', '#ffffff']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.8, y: 1 }}
      />

      {/* Decorative glow orbs */}
      <View style={[styles.orb, styles.orbTopLeft]} pointerEvents="none" />
      <View style={[styles.orb, styles.orbBottomRight]} pointerEvents="none" />

      <SafeAreaView style={styles.safe}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <Animated.View
            style={[
              styles.header,
              {
                opacity: logoAnim,
                transform: [{ translateY: logoAnim.interpolate({ inputRange: [0, 1], outputRange: [-20, 0] }) }],
              },
            ]}
          >
            <Text style={styles.appName}>AGRO</Text>
            <View style={styles.accentLine} />
          </Animated.View>

          <Animated.Text
            style={[
              styles.tagline,
              {
                opacity: taglineAnim,
                transform: [{ translateY: taglineAnim.interpolate({ inputRange: [0, 1], outputRange: [10, 0] }) }],
              },
            ]}
          >
            Smart Farming, Naturally 🌱
          </Animated.Text>

          <Text style={styles.sectionLabel}>SELECT YOUR CROP</Text>

          {/* Tree Cards */}
          <TreeCard
            treeId="olive"
            logsCount={oliveLogs}
            onPress={() => goToProgram('olive')}
          />
          <TreeCard
            treeId="orange"
            logsCount={orangeLogs}
            onPress={() => goToProgram('orange')}
          />

          {/* Footer */}
          <Text style={styles.footer}>
            All data stored locally on your device 🔒
          </Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  safe: {
    flex: 1,
  },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 8,
  },
  appName: {
    fontSize: 52,
    fontFamily: 'Poppins_700Bold',
    color: Colors.oliveAccent,
    letterSpacing: 14,
    textAlign: 'center',
  },
  accentLine: {
    width: 60,
    height: 3,
    backgroundColor: Colors.oliveAccent,
    borderRadius: 2,
    marginTop: 2,
    opacity: 0.6,
  },
  tagline: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: Colors.textMuted,
    textAlign: 'center',
    marginBottom: 40,
    letterSpacing: 0.5,
  },
  sectionLabel: {
    fontSize: 11,
    fontFamily: 'Poppins_600SemiBold',
    color: Colors.textMuted,
    letterSpacing: 2,
    marginBottom: 16,
  },
  orb: {
    position: 'absolute',
    borderRadius: 999,
  },
  orbTopLeft: {
    width: 260,
    height: 260,
    backgroundColor: Colors.oliveAccent,
    top: -100,
    left: -100,
    opacity: 0.10,
  },
  orbBottomRight: {
    width: 220,
    height: 220,
    backgroundColor: Colors.orangeAccent,
    bottom: 60,
    right: -80,
    opacity: 0.08,
  },
  footer: {
    textAlign: 'center',
    color: Colors.textDisabled,
    fontSize: 11,
    fontFamily: 'Poppins_400Regular',
    marginTop: 20,
    letterSpacing: 0.3,
  },
});
