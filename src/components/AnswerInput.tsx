import { StyleSheet, Text, TextInput, View } from "react-native";

import { colors, fonts, radii, spacing } from "@/theme";

type AnswerInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
  editable?: boolean;
  hintLetter?: string | null;
};

export function AnswerInput({
  value,
  onChangeText,
  onSubmit,
  editable = true,
  hintLetter,
}: AnswerInputProps) {
  return (
    <View style={styles.wrap}>
      {hintLetter ? (
        <Text style={styles.hint}>רמז: מתחיל ב־{hintLetter}</Text>
      ) : null}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        editable={editable}
        placeholder="הקלד את הניחוש שלך כאן.."
        placeholderTextColor={colors.outline}
        style={styles.input}
        autoCorrect={false}
        autoCapitalize="none"
        returnKeyType="done"
        textAlign="center"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: spacing.xs,
    width: "100%",
  },
  hint: {
    fontFamily: fonts.mono,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 1,
    color: colors.secondary,
    textAlign: "center",
  },
  input: {
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: colors.surfaceVariant,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontFamily: fonts.regular,
    fontSize: 18,
    lineHeight: 26,
    color: colors.onSurface,
    textAlign: "center",
    writingDirection: "rtl",
  },
});
