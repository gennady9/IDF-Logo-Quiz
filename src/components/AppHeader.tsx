import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors, fonts, spacing } from "@/theme";

/** Keep header chrome LTR so "back" stays on the physical right in an RTL app. */
const ltrLayoutProps =
  Platform.OS === "web" ? ({ dir: "ltr" } as const) : undefined;
const ltrLayoutStyle =
  Platform.OS === "web" ? undefined : ({ direction: "ltr" } as const);

type AppHeaderProps = {
  title?: string;
  leftIcon?: keyof typeof MaterialIcons.glyphMap;
  rightIcon?: keyof typeof MaterialIcons.glyphMap;
  /** Text label for a back/nav control (e.g. "חזור"). Placed on the right. */
  backLabel?: string;
  onBackPress?: () => void;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  leftAccessibilityLabel?: string;
  rightAccessibilityLabel?: string;
  /** When true, shows title + icon clustered on the start side (quiz style). */
  clustered?: boolean;
};

function HeaderIconButton({
  name,
  color,
  onPress,
  accessibilityLabel,
}: {
  name: keyof typeof MaterialIcons.glyphMap;
  color: string;
  onPress?: () => void;
  accessibilityLabel?: string;
}) {
  if (!onPress) {
    return (
      <View style={styles.iconBtn}>
        <MaterialIcons name={name} size={24} color={color} />
      </View>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      hitSlop={8}
      style={({ pressed }) => [styles.iconBtn, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
    >
      <MaterialIcons name={name} size={24} color={color} />
    </Pressable>
  );
}

function HeaderTextButton({
  label,
  onPress,
  accessibilityLabel,
}: {
  label: string;
  onPress: () => void;
  accessibilityLabel?: string;
}) {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={8}
      style={({ pressed }) => [styles.textBtn, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
    >
      <Text style={styles.textBtnLabel}>{label}</Text>
    </Pressable>
  );
}

export function AppHeader({
  title = 'חידון סמלי צה"ל',
  leftIcon,
  rightIcon,
  backLabel,
  onBackPress,
  onLeftPress,
  onRightPress,
  leftAccessibilityLabel,
  rightAccessibilityLabel,
  clustered = false,
}: AppHeaderProps) {
  const insets = useSafeAreaInsets();

  const backControl =
    backLabel && onBackPress ? (
      <HeaderTextButton label={backLabel} onPress={onBackPress} />
    ) : null;

  const rightControl = backControl ? (
    backControl
  ) : rightIcon ? (
    <HeaderIconButton
      name={rightIcon}
      color={colors.onSurfaceVariant}
      onPress={onRightPress}
      accessibilityLabel={rightAccessibilityLabel}
    />
  ) : (
    <View style={styles.iconPlaceholder} />
  );

  if (clustered) {
    return (
      <View
        {...ltrLayoutProps}
        style={[styles.bar, ltrLayoutStyle, { paddingTop: insets.top + spacing.xs }]}
      >
        <View style={styles.cluster}>
          {leftIcon ? (
            onLeftPress ? (
              <HeaderIconButton
                name={leftIcon}
                color={colors.primary}
                onPress={onLeftPress}
                accessibilityLabel={leftAccessibilityLabel}
              />
            ) : (
              <MaterialIcons name={leftIcon} size={24} color={colors.primary} />
            )
          ) : null}
          <Text style={styles.titleClustered}>{title}</Text>
        </View>
        {rightControl}
      </View>
    );
  }

  return (
    <View
      {...ltrLayoutProps}
      style={[styles.bar, ltrLayoutStyle, { paddingTop: insets.top + spacing.xs }]}
    >
      {leftIcon ? (
        <HeaderIconButton
          name={leftIcon}
          color={colors.onSurfaceVariant}
          onPress={onLeftPress}
          accessibilityLabel={leftAccessibilityLabel}
        />
      ) : (
        <View style={styles.iconPlaceholder} />
      )}
      <Text style={styles.title}>{title}</Text>
      {rightControl}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: colors.surfaceContainer,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.marginMobile,
    paddingBottom: spacing.xs,
    zIndex: 50,
  },
  cluster: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    flex: 1,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 20,
    lineHeight: 28,
    color: colors.primary,
    textAlign: "center",
    flex: 1,
    writingDirection: "rtl",
  },
  titleClustered: {
    fontFamily: fonts.bold,
    fontSize: 20,
    lineHeight: 28,
    color: colors.primary,
    letterSpacing: -0.3,
    writingDirection: "rtl",
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  textBtn: {
    minHeight: 40,
    paddingHorizontal: spacing.sm,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  textBtnLabel: {
    fontFamily: fonts.bold,
    fontSize: 16,
    lineHeight: 22,
    color: colors.primary,
    writingDirection: "rtl",
  },
  iconPlaceholder: {
    width: 40,
    height: 40,
  },
  pressed: {
    backgroundColor: colors.surfaceVariant,
    transform: [{ scale: 0.95 }],
  },
});
