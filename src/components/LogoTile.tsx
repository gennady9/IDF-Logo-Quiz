import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";

import type { QuizItem } from "@/types/quiz";
import { colors, fonts, radii, spacing } from "@/theme";

type LogoTileProps = {
  item: QuizItem;
  completed: boolean;
  onPress: () => void;
};

export function LogoTile({ item, completed, onPress }: LogoTileProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.tile,
        completed && styles.completed,
        pressed && styles.pressed,
      ]}
      accessibilityRole="button"
      accessibilityLabel={completed ? `${item.nameHe}, נפתר` : "סמל לא מזוהה"}
    >
      <View style={styles.imageWrap}>
        {item.image ? (
          <Image source={item.image} style={styles.image} contentFit="contain" />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderMark}>?</Text>
          </View>
        )}
        {completed ? (
          <View style={styles.checkBadge}>
            <MaterialIcons name="check" size={14} color={colors.onPrimary} />
          </View>
        ) : null}
      </View>
      <Text style={[styles.caption, completed && styles.captionDone]} numberOfLines={1}>
        {completed ? item.nameHe : "???"}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: radii.lg,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.surfaceVariant,
    gap: spacing.sm,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  completed: {
    backgroundColor: "rgba(62, 82, 25, 0.06)",
    borderColor: colors.primaryFixedDim,
  },
  pressed: {
    opacity: 0.92,
    transform: [{ scale: 0.97 }],
  },
  imageWrap: {
    aspectRatio: 1,
    borderRadius: radii.md,
    backgroundColor: colors.surfaceContainerLow,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "85%",
    height: "85%",
  },
  placeholder: {
    width: "70%",
    height: "70%",
    borderRadius: radii.md,
    borderWidth: 1.5,
    borderColor: colors.outlineVariant,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surfaceContainer,
  },
  placeholderMark: {
    fontFamily: fonts.extraBold,
    fontSize: 28,
    color: colors.outline,
  },
  checkBadge: {
    position: "absolute",
    top: 6,
    left: 6,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  caption: {
    fontFamily: fonts.bold,
    fontSize: 13,
    color: colors.onSurfaceVariant,
    textAlign: "center",
  },
  captionDone: {
    color: colors.primary,
  },
});
