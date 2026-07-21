import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

import { TactileButton } from "@/components/TactileButton";
import { colors, fonts, radii, spacing } from "@/theme";
import type { QuizItem } from "@/types/quiz";

type SuccessPanelProps = {
  item: QuizItem;
  categoryName: string;
  onBackToCategories: () => void;
  onNext?: () => void;
  hasNext: boolean;
  /** When true, show skip celebration copy instead of a correct-answer win. */
  skipped?: boolean;
};

export function SuccessPanel({
  item,
  categoryName,
  onBackToCategories,
  onNext,
  hasNext,
  skipped = false,
}: SuccessPanelProps) {
  return (
    <View style={styles.root}>
      <View style={styles.card}>
        <View style={[styles.corner, styles.cornerTL]} />
        <View style={[styles.corner, styles.cornerTR]} />
        <View style={[styles.corner, styles.cornerBL]} />
        <View style={[styles.corner, styles.cornerBR]} />

        <View style={styles.logoRing}>
          {item.image ? (
            <Image
              source={item.image}
              style={styles.logo}
              contentFit="contain"
            />
          ) : (
            <Text style={styles.placeholder}>?</Text>
          )}
        </View>

        <Text style={styles.name}>{item.nameHe}</Text>
      </View>

      <View style={styles.celebration}>
        <View style={styles.checkCircle}>
          <MaterialIcons
            name={skipped ? "sentiment-satisfied-alt" : "check-circle"}
            size={36}
            color={colors.onPrimary}
          />
        </View>
        <Text style={styles.headline}>
          {skipped ? "לפחות ניסיתם!" : "כל הכבוד!"}
        </Text>
        <Text style={styles.subtitle}>
          {skipped ? "העיקר שהתקדמתם — ממשיכים הלאה" : "זיהית נכון את הסמל"}
        </Text>
      </View>

      <View style={styles.actions}>
        <TactileButton
          label="חזרה לקטגוריות"
          onPress={onBackToCategories}
          icon={
            <MaterialIcons
              name="arrow-back"
              size={22}
              color={colors.onPrimary}
            />
          }
        />
        {hasNext && onNext ? (
          <TactileButton
            label="המשך לשאלה הבאה"
            variant="outline"
            onPress={onNext}
          />
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: "100%",
    maxWidth: 420,
    alignSelf: "center",
    justifyContent: "center",
    gap: spacing.lg,
  },
  card: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.surfaceVariant,
    padding: spacing.md,
    alignItems: "center",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  corner: {
    position: "absolute",
    width: 16,
    height: 16,
    borderColor: colors.outlineVariant,
  },
  cornerTL: {
    top: 8,
    left: 8,
    borderTopWidth: 2,
    borderLeftWidth: 2,
  },
  cornerTR: {
    top: 8,
    right: 8,
    borderTopWidth: 2,
    borderRightWidth: 2,
  },
  cornerBL: {
    bottom: 8,
    left: 8,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
  },
  cornerBR: {
    bottom: 8,
    right: 8,
    borderBottomWidth: 2,
    borderRightWidth: 2,
  },
  logoRing: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 4,
    borderColor: "rgba(62, 82, 25, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
  },
  logo: {
    width: 112,
    height: 112,
  },
  placeholder: {
    fontFamily: fonts.extraBold,
    fontSize: 48,
    color: colors.outline,
  },
  name: {
    fontFamily: fonts.bold,
    fontSize: 20,
    lineHeight: 28,
    color: colors.onSurface,
    textAlign: "center",
  },
  chips: {
    flexDirection: "row",
    gap: spacing.xs,
    marginTop: spacing.md,
  },
  chip: {
    backgroundColor: colors.surfaceVariant,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radii.full,
  },
  chipText: {
    fontFamily: fonts.mono,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 1.2,
    color: colors.onSurfaceVariant,
  },
  celebration: {
    alignItems: "center",
  },
  checkCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.xs,
    shadowColor: colors.primary,
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  headline: {
    fontFamily: fonts.extraBold,
    fontSize: 26,
    lineHeight: 32,
    color: colors.primary,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 16,
    lineHeight: 24,
    color: colors.onSurfaceVariant,
    marginTop: 4,
  },
  actions: {
    gap: spacing.sm,
    width: "100%",
  },
});
