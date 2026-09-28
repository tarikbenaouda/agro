import { Colors } from "@/constants/colors";
import { ReactNode, useMemo } from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import {
  SafeAreaInsetsContext,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

type Props = {
  children: ReactNode;
  backgroundColor?: string;
};

/**
 * Reserves the OS status-bar strip and keeps all app UI below it.
 * The system bar stays visible; this view is only a layout ceiling.
 */
export default function SystemStatusBarLimit({
  children,
  backgroundColor = Colors.background,
}: Props) {
  const insets = useSafeAreaInsets();
  const androidFallback =
    Platform.OS === "android" && insets.top < 1
      ? (StatusBar.currentHeight ?? 24)
      : 0;

  const contentInsets = useMemo(
    () => ({ ...insets, top: 0 }),
    [insets],
  );

  return (
    <View
      style={[
        styles.shell,
        { paddingTop: androidFallback, backgroundColor },
      ]}
    >
      <SafeAreaView
        style={[styles.shell, { backgroundColor }]}
        edges={{ top: "maximum", right: "off", bottom: "off", left: "off" }}
      >
        <SafeAreaInsetsContext.Provider value={contentInsets}>
          {children}
        </SafeAreaInsetsContext.Provider>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    flex: 1,
  },
});
