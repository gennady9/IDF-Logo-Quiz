import { Pressable, StyleSheet, Text, View } from "react-native";

import { CategoryIcon } from "@/components/CategoryIcon";
import { ProgressBar } from "@/components/ProgressBar";
import type { CategoryIcon as CategoryIconKind } from "@/types/quiz";
import { colors, fonts, radii, spacing } from "@/theme";

type CategoryCardProps = {
  nameHe: string;
  accent: string;
  icon: CategoryIconKind;
  completed: number;
  total: number;
  onPress: () => void;
};

/** Top-level category card (home screen). */
export function CategoryCard({
  nameHe,
  accent,
  icon,
  completed,
  total,
  onPress,
}: CategoryCardProps) {
  const ratio = total === 0 ? 0 : completed / total;
  const percent = Math.round(ratio * 100);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel={`${nameHe}, ${completed} מתוך ${total}`}
    >
      <View style={[styles.iconWrap, { backgroundColor: colors.surfaceContainerLow }]}>
        <CategoryIcon kind={icon} color={accent} size={32} />
      </View>

      <Text style={styles.title} numberOfLines={2}>
        {nameHe}
      </Text>

      <View style={styles.progressBlock}>
        <View style={styles.metaRow}>
          <Text style={styles.meta}>{percent}%</Text>
          <Text style={styles.meta}>
            {completed}/{total}
          </Text>
        </View>
        <ProgressBar progress={ratio} height={12} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.surfaceVariant,
    padding: spacing.md,
    minHeight: 192,
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  pressed: {
    borderColor: colors.primaryFixedDim,
    transform: [{ scale: 0.98 }],
    backgroundColor: colors.surfaceContainerLow,
  },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: radii.full,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.sm,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 20,
    lineHeight: 28,
    color: colors.onSurface,
    textAlign: "center",
    marginBottom: spacing.xs,
  },
  progressBlock: {
    width: "100%",
    marginTop: "auto",
    gap: 4,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  meta: {
    fontFamily: fonts.mono,
    fontSize: 10,
    lineHeight: 14,
    color: colors.outline,
  },
});
