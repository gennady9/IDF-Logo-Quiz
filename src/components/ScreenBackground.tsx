import { StyleSheet, View, type ViewProps } from "react-native";

import { colors } from "@/theme";

type ScreenBackgroundProps = ViewProps & {
  children: React.ReactNode;
};

/** Off-white canvas with a subtle topographic-style dot grid. */
export function ScreenBackground({ children, style, ...rest }: ScreenBackgroundProps) {
  return (
    <View style={[styles.root, style]} {...rest}>
      <View style={[styles.pattern, { pointerEvents: "none" }]}>
        {Array.from({ length: 28 }).map((_, row) => (
          <View key={row} style={styles.patternRow}>
            {Array.from({ length: 18 }).map((__, col) => (
              <View key={col} style={styles.dot} />
            ))}
          </View>
        ))}
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
    overflow: "hidden",
  },
  pattern: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    opacity: 0.55,
    gap: 12,
    paddingTop: 4,
    paddingHorizontal: 2,
  },
  patternRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 4,
  },
  dot: {
    width: 2,
    height: 2,
    borderRadius: 1,
    backgroundColor: colors.surfaceVariant,
  },
});
