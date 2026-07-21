import { useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";

import { colors, fonts, radii, spacing } from "@/theme";

type FeedbackKind = "correct" | "wrong" | null;

type FeedbackBannerProps = {
  kind: FeedbackKind;
  message: string;
};

export function FeedbackBanner({ kind, message }: FeedbackBannerProps) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(8);

  useEffect(() => {
    if (!kind) {
      opacity.value = withTiming(0, { duration: 160 });
      return;
    }
    opacity.value = withTiming(1, { duration: 200 });
    translateY.value = withSequence(
      withTiming(-2, { duration: 160 }),
      withTiming(0, { duration: 160 }),
    );
  }, [kind, message, opacity, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  if (!kind || kind === "correct") return null;

  return (
    <Animated.View style={[styles.banner, styles.wrong, animatedStyle]}>
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  banner: {
    borderRadius: radii.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
  },
  wrong: {
    backgroundColor: colors.errorContainer,
    borderColor: colors.error,
  },
  text: {
    fontFamily: fonts.bold,
    fontSize: 15,
    textAlign: "center",
    color: colors.onSurface,
  },
});
