import { Pressable, StyleSheet, Text, type PressableProps, View } from "react-native";

import { colors, fonts, radii, spacing } from "@/theme";

type TactileButtonProps = Omit<PressableProps, "children"> & {
  label: string;
  variant?: "primary" | "secondary" | "outline";
  icon?: React.ReactNode;
};

export function TactileButton({
  label,
  variant = "primary",
  icon,
  disabled,
  style,
  ...rest
}: TactileButtonProps) {
  if (variant === "outline") {
    return (
      <Pressable
        disabled={disabled}
        style={(state) => [
          styles.outline,
          disabled && styles.disabled,
          state.pressed && styles.outlinePressed,
          typeof style === "function" ? style(state) : style,
        ]}
        accessibilityRole="button"
        {...rest}
      >
        <Text style={styles.outlineLabel}>{label}</Text>
      </Pressable>
    );
  }

  if (variant === "secondary") {
    return (
      <Pressable
        disabled={disabled}
        style={(state) => [
          styles.secondary,
          disabled && styles.disabled,
          state.pressed && styles.secondaryPressed,
          typeof style === "function" ? style(state) : style,
        ]}
        accessibilityRole="button"
        {...rest}
      >
        <Text style={styles.secondaryLabel}>{label}</Text>
      </Pressable>
    );
  }

  return (
    <Pressable
      disabled={disabled}
      style={(state) => [
        styles.primaryWrap,
        disabled && styles.disabled,
        state.pressed && styles.primaryPressed,
        typeof style === "function" ? style(state) : style,
      ]}
      accessibilityRole="button"
      {...rest}
    >
      <View style={styles.primaryFace}>
        {icon}
        <Text style={styles.primaryLabel}>{label}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  primaryWrap: {
    borderRadius: radii.md,
    backgroundColor: colors.primaryDeep,
    paddingBottom: 4,
  },
  primaryFace: {
    backgroundColor: colors.primary,
    borderRadius: radii.md,
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
  },
  primaryPressed: {
    paddingBottom: 0,
    transform: [{ translateY: 4 }],
  },
  primaryLabel: {
    fontFamily: fonts.bold,
    fontSize: 20,
    lineHeight: 28,
    color: colors.onPrimary,
  },
  secondary: {
    backgroundColor: colors.secondaryContainer,
    borderRadius: radii.md,
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.md,
    alignItems: "center",
    borderBottomWidth: 3,
    borderBottomColor: colors.secondary,
  },
  secondaryPressed: {
    borderBottomWidth: 0,
    transform: [{ translateY: 3 }],
  },
  secondaryLabel: {
    fontFamily: fonts.bold,
    fontSize: 18,
    lineHeight: 26,
    color: colors.onSecondaryContainer,
  },
  outline: {
    borderRadius: radii.md,
    borderWidth: 2,
    borderColor: colors.outline,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  outlinePressed: {
    backgroundColor: colors.surfaceContainerLow,
  },
  outlineLabel: {
    fontFamily: fonts.bold,
    fontSize: 20,
    lineHeight: 28,
    color: colors.onSurfaceVariant,
  },
  disabled: {
    opacity: 0.45,
  },
});
