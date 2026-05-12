import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/colors';
import { TreeId } from '@/types';
import * as Haptics from 'expo-haptics';

interface TreeCardProps {
  treeId: TreeId;
  logsCount: number;
  onPress: () => void;
}

const TREE_CONFIG = {
  olive: {
    emoji: '🫒',
    name: 'Olive',
    subtitle: 'Olea europaea',
    gradientStart: 'rgba(77, 124, 15, 0.09)',
    gradientEnd: 'rgba(255, 255, 255, 0)',
    accent: Colors.oliveAccent,
    accentMuted: Colors.oliveMuted,
    description: 'Manage irrigation, pruning, fertilizing, and olive fly control across the full season.',
  },
  orange: {
    emoji: '🍊',
    name: 'Orange',
    subtitle: 'Citrus sinensis',
    gradientStart: 'rgba(194, 65, 12, 0.09)',
    gradientEnd: 'rgba(255, 255, 255, 0)',
    accent: Colors.orangeAccent,
    accentMuted: Colors.orangeMuted,
    description: 'Track bloom care, fruit development, harvest timing, and post-season recovery.',
  },
};

export default function TreeCard({ treeId, logsCount, onPress }: TreeCardProps) {
  const cfg = TREE_CONFIG[treeId];
  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const delay = treeId === 'olive' ? 100 : 280;
    Animated.parallel([
      Animated.timing(slideAnim, { toValue: 0, duration: 500, delay, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, delay, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.wrapper,
        { transform: [{ translateY: slideAnim }], opacity: fadeAnim },
      ]}
    >
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          onPress();
        }}
        activeOpacity={0.88}
      >
        <View style={[styles.card, { borderColor: cfg.accent + '2a' }]}>
          <LinearGradient
            colors={[cfg.gradientStart, cfg.gradientEnd]}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
          {/* Accent top bar */}
          <View style={[styles.accentBar, { backgroundColor: cfg.accent }]} />

          <View style={styles.content}>
            {/* Emoji */}
            <Text style={styles.emoji}>{cfg.emoji}</Text>

            {/* Name & Latin */}
            <Text style={[styles.name, { color: cfg.accent }]}>{cfg.name}</Text>
            <Text style={styles.subtitle}>{cfg.subtitle}</Text>

            {/* Description */}
            <Text style={styles.description}>{cfg.description}</Text>

            {/* Stats row */}
            <View style={[styles.statsRow, { backgroundColor: cfg.accent + '15' }]}>
              <Text style={[styles.statsIcon]}>📋</Text>
              <Text style={[styles.statsText, { color: cfg.accent }]}>
                {logsCount} {logsCount === 1 ? 'day' : 'days'} logged
              </Text>
            </View>

            {/* CTA */}
            <View style={[styles.ctaRow]}>
              <Text style={[styles.ctaText, { color: cfg.accent }]}>View Program  →</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    marginBottom: 16,
  },
  touchable: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  card: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  accentBar: {
    height: 3,
    width: '100%',
  },
  content: {
    padding: 22,
    paddingTop: 18,
    gap: 6,
  },
  emoji: {
    fontSize: 44,
    marginBottom: 4,
  },
  name: {
    fontSize: 28,
    fontFamily: 'Poppins_700Bold',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 13,
    fontFamily: 'Poppins_400Regular',
    color: Colors.textMuted,
    fontStyle: 'italic',
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    fontFamily: 'Poppins_400Regular',
    color: Colors.textSecondary,
    lineHeight: 21,
    marginBottom: 10,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  statsIcon: {
    fontSize: 14,
  },
  statsText: {
    fontSize: 13,
    fontFamily: 'Poppins_600SemiBold',
  },
  ctaRow: {
    alignSelf: 'flex-end',
  },
  ctaText: {
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    letterSpacing: 0.5,
  },
});
