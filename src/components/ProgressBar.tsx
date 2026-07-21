import { StyleSheet, View } from "react-native";

import { colors, radii } from "@/theme";

type ProgressBarProps = {
  progress: number;
  height?: number;
  trackColor?: string;
  fillColor?: string;
  rounded?: boolean;
};

export function ProgressBar({
  progress,
  height = 12,
  trackColor = colors.surfaceContainerHigh,
  fillColor = colors.primary,
  rounded = true,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(1, progress));

  return (
    <View
      style={[
        styles.track,
        {
          height,
          backgroundColor: trackColor,
          borderRadius: rounded ? radii.full : 0,
        },
      ]}
    >
      <View
        style={[
          styles.fill,
          {
            width: `${clamped * 100}%`,
            backgroundColor: fillColor,
            borderRadius: rounded ? radii.full : 0,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: "100%",
    overflow: "hidden",
  },
  fill: {
    height: "100%",
  },
});
