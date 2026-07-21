import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View, type ImageSourcePropType } from "react-native";

import { ProgressBar } from "@/components/ProgressBar";
import { colors, fonts, radii, spacing } from "@/theme";

type NestedCategoryTileProps = {
  nameHe: string;
  coverImage?: ImageSourcePropType | null;
  coverRevealed: boolean;
  completed: number;
  total: number;
  onPress: () => void;
};

/** Folder-style tile for nested categories — visually distinct from quiz LogoTiles. */
export function NestedCategoryTile({
  nameHe,
  coverImage,
  coverRevealed,
  completed,
  total,
  onPress,
}: NestedCategoryTileProps) {
  const ratio = total === 0 ? 0 : completed / total;
  const title = coverRevealed ? nameHe : "???";

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.tile,
        coverRevealed && styles.revealed,
        pressed && styles.pressed,
      ]}
      accessibilityRole="button"
      accessibilityLabel={`${title}, קטגוריה, ${completed} מתוך ${total}`}
    >
      <View style={styles.imageWrap}>
        {coverImage ? (
          <Image source={coverImage} style={styles.image} contentFit="contain" />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderMark}>?</Text>
          </View>
        )}

        <View style={styles.folderBadge}>
          <MaterialIcons name="folder-open" size={14} color={colors.onPrimary} />
        </View>

        <View style={styles.stackHint} pointerEvents="none">
          <View style={[styles.stackLayer, styles.stackBack]} />
          <View style={[styles.stackLayer, styles.stackMid]} />
        </View>
      </View>

      <View style={styles.captionRow}>
        <MaterialIcons name="chevron-left" size={18} color={colors.outline} />
        <Text
          style={[styles.caption, coverRevealed && styles.captionDone]}
          numberOfLines={1}
        >
          {title}
        </Text>
      </View>

      <View style={styles.progressBlock}>
        <Text style={styles.meta}>
          {completed}/{total}
        </Text>
        <ProgressBar progress={ratio} height={8} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: radii.lg,
    padding: spacing.sm,
    borderWidth: 1.5,
    borderColor: colors.primaryFixedDim,
    borderStyle: "dashed",
    gap: spacing.sm,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  revealed: {
    borderStyle: "solid",
    backgroundColor: "rgba(62, 82, 25, 0.06)",
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
    width: "78%",
    height: "78%",
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
  folderBadge: {
    position: "absolute",
    top: 6,
    left: 6,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  stackHint: {
    position: "absolute",
    right: 8,
    bottom: 8,
    width: 28,
    height: 22,
  },
  stackLayer: {
    position: "absolute",
    right: 0,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    backgroundColor: colors.surfaceContainerLowest,
  },
  stackBack: {
    width: 22,
    height: 16,
    bottom: 4,
    right: 4,
    opacity: 0.55,
  },
  stackMid: {
    width: 22,
    height: 16,
    bottom: 0,
    right: 0,
    opacity: 0.9,
  },
  captionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },
  caption: {
    flexShrink: 1,
    fontFamily: fonts.bold,
    fontSize: 13,
    color: colors.onSurfaceVariant,
    textAlign: "center",
  },
  captionDone: {
    color: colors.primary,
  },
  progressBlock: {
    gap: 4,
  },
  meta: {
    fontFamily: fonts.mono,
    fontSize: 10,
    lineHeight: 14,
    color: colors.outline,
    textAlign: "center",
  },
});
