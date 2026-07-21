import { Image } from "expo-image";
import { useLocalSearchParams, useRouter, type Href } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AnswerInput } from "@/components/AnswerInput";
import { AppHeader } from "@/components/AppHeader";
import { FeedbackBanner } from "@/components/FeedbackBanner";
import { ProgressBar } from "@/components/ProgressBar";
import { ScreenBackground } from "@/components/ScreenBackground";
import { SuccessPanel } from "@/components/SuccessPanel";
import { TactileButton } from "@/components/TactileButton";
import { useProgressContext } from "@/context/ProgressContext";
import {
  getCategoryById,
  getItemById,
  getParentCategory,
} from "@/data/quizData";
import { colors, fonts, radii, spacing } from "@/theme";
import { matchesAnswer } from "@/utils/answers";

type FeedbackKind = "correct" | "wrong" | null;

export default function QuizScreen() {
  const { itemId } = useLocalSearchParams<{ itemId: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { markComplete, isComplete, progress } = useProgressContext();

  const item = useMemo(() => getItemById(itemId), [itemId]);
  const category = useMemo(
    () => (item ? getCategoryById(item.categoryId) : undefined),
    [item],
  );

  const questionIndex = useMemo(() => {
    if (!item || !category) return 0;
    return category.items.findIndex((entry) => entry.id === item.id);
  }, [item, category]);

  const nextItem = useMemo(() => {
    if (!item || !category) return undefined;
    return category.items.find(
      (entry, index) => index > questionIndex && !progress[entry.id],
    );
  }, [item, category, questionIndex, progress]);

  /** Context label that must not reveal the answer. */
  const contextLabel = useMemo(() => {
    if (!item || !category) return "";
    const spoils =
      category.nameHe === item.nameHe ||
      item.answers.some((answer) => answer === category.nameHe);
    if (!spoils) return category.nameHe;
    return getParentCategory(category.id)?.nameHe ?? "נחש את הסמל";
  }, [item, category]);

  const [answer, setAnswer] = useState("");
  const [hintLetter, setHintLetter] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ kind: FeedbackKind; message: string }>({
    kind: null,
    message: "",
  });
  const [locked, setLocked] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [skipped, setSkipped] = useState(false);

  const shakeX = useSharedValue(0);
  const logoScale = useSharedValue(1);

  useEffect(() => {
    setAnswer("");
    setHintLetter(null);
    setFeedback({ kind: null, message: "" });
    setLocked(false);
    setShowSuccess(false);
    setSkipped(false);

    if (item && isComplete(item.id)) {
      setLocked(true);
      setShowSuccess(true);
      setFeedback({ kind: "correct", message: `כבר פתרתם: ${item.nameHe}` });
    }
  }, [item, isComplete, itemId]);

  const shakeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shakeX.value }],
  }));

  const logoStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
  }));

  if (!item || !category) {
    return (
      <ScreenBackground>
        <AppHeader
          clustered
          backLabel="חזור"
          onBackPress={() => router.back()}
        />
        <View style={styles.centered}>
          <Text style={styles.error}>הסמל לא נמצא</Text>
        </View>
      </ScreenBackground>
    );
  }

  const primaryAnswer = item.answers[0] ?? item.nameHe;
  const totalQuestions = category.items.length;
  const currentQuestion = questionIndex + 1;
  const progressRatio = totalQuestions === 0 ? 0 : currentQuestion / totalQuestions;

  const goToCategory = () => {
    router.replace(`/category/${item.categoryId}` as Href);
  };

  const goToNext = () => {
    if (nextItem) {
      router.replace(`/quiz/${nextItem.id}` as Href);
    } else {
      goToCategory();
    }
  };

  const triggerShake = () => {
    shakeX.value = withSequence(
      withTiming(-10, { duration: 50 }),
      withTiming(10, { duration: 50 }),
      withTiming(-8, { duration: 50 }),
      withTiming(8, { duration: 50 }),
      withTiming(0, { duration: 50 }),
    );
  };

  const triggerSuccess = () => {
    logoScale.value = withSequence(
      withTiming(1.06, { duration: 180 }),
      withTiming(1, { duration: 220 }),
    );
  };

  const handleSubmit = async () => {
    if (locked || !answer.trim()) return;

    if (matchesAnswer(answer, item.answers)) {
      setLocked(true);
      setSkipped(false);
      setFeedback({ kind: "correct", message: `נכון! ${item.nameHe}` });
      triggerSuccess();
      await markComplete(item.id);
      setShowSuccess(true);
      return;
    }

    triggerShake();
    setFeedback({
      kind: "wrong",
      message: "לא מדויק. נסו שוב",
    });
    setAnswer("");
  };

  const handleHint = () => {
    if (locked || hintLetter) return;
    const letter = primaryAnswer.trim().charAt(0);
    setHintLetter(letter || null);
  };

  const handleSkip = async () => {
    if (locked) return;
    setLocked(true);
    setSkipped(true);
    triggerSuccess();
    await markComplete(item.id);
    setShowSuccess(true);
  };

  const handleBack = () => {
    if (router.canGoBack()) router.back();
    else goToCategory();
  };

  if (showSuccess) {
    return (
      <ScreenBackground>
        <AppHeader
          leftIcon="military-tech"
          rightIcon="account-circle"
        />
        <ScrollView
          contentContainerStyle={[
            styles.successContent,
            { paddingBottom: insets.bottom + spacing.xl },
          ]}
          showsVerticalScrollIndicator={false}
        >
          <SuccessPanel
            item={item}
            categoryName={category.nameHe}
            onBackToCategories={goToCategory}
            onNext={goToNext}
            hasNext={Boolean(nextItem)}
            skipped={skipped}
          />
        </ScrollView>
      </ScreenBackground>
    );
  }

  return (
    <ScreenBackground>
      <AppHeader clustered backLabel="חזור" onBackPress={handleBack} />

      <View style={styles.quizMeta}>
        <View style={styles.metaCenter}>
          <Text style={styles.questionLabel}>
            שאלה {currentQuestion} מתוך {totalQuestions}
          </Text>
          <Text style={styles.categoryLabel}>{contextLabel}</Text>
        </View>
      </View>

      <View style={styles.progressTrack}>
        <ProgressBar
          progress={progressRatio}
          height={12}
          trackColor={colors.surfaceVariant}
          rounded={false}
        />
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={12}
      >
        <ScrollView
          contentContainerStyle={[
            styles.content,
            { paddingBottom: insets.bottom + spacing.xxl },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.logoStage}>
            <View style={styles.logoGlow} />
            <Animated.View style={[styles.logoCard, logoStyle]}>
              {item.image ? (
                <Image source={item.image} style={styles.logo} contentFit="contain" />
              ) : (
                <View style={styles.placeholder}>
                  <Text style={styles.placeholderMark}>?</Text>
                </View>
              )}
            </Animated.View>
          </View>

          <Text style={styles.prompt}>האם אתה יודע?</Text>

          <Animated.View style={shakeStyle}>
            <AnswerInput
              value={answer}
              onChangeText={setAnswer}
              onSubmit={handleSubmit}
              editable={!locked}
              hintLetter={hintLetter}
            />
          </Animated.View>

          <TactileButton
            label="שלח תשובה"
            onPress={handleSubmit}
            disabled={locked || !answer.trim()}
          />

          <FeedbackBanner kind={feedback.kind} message={feedback.message} />

          <View style={styles.secondaryRow}>
            <TactileButton
              label="רמז"
              variant="secondary"
              onPress={handleHint}
              disabled={locked || Boolean(hintLetter)}
              style={styles.flexBtn}
            />
            <TactileButton
              label="דלג"
              variant="outline"
              onPress={handleSkip}
              disabled={locked}
              style={styles.flexBtn}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  quizMeta: {
    backgroundColor: colors.surfaceContainerLowest,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceVariant,
    paddingHorizontal: spacing.marginMobile,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: 448,
    width: "100%",
    alignSelf: "center",
  },
  metaCenter: {
    flex: 1,
    alignItems: "center",
  },
  questionLabel: {
    fontFamily: fonts.mono,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 1.2,
    color: colors.onSurfaceVariant,
    textTransform: "uppercase",
  },
  categoryLabel: {
    fontFamily: fonts.bold,
    fontSize: 20,
    lineHeight: 28,
    color: colors.onSurface,
  },
  progressTrack: {
    maxWidth: 448,
    width: "100%",
    alignSelf: "center",
  },
  content: {
    paddingHorizontal: spacing.marginMobile,
    paddingTop: spacing.lg,
    gap: spacing.md,
    maxWidth: 448,
    width: "100%",
    alignSelf: "center",
  },
  successContent: {
    paddingHorizontal: spacing.marginMobile,
    paddingTop: spacing.lg,
    flexGrow: 1,
    justifyContent: "center",
  },
  logoStage: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    width: "100%",
    paddingVertical: spacing.sm,
  },
  logoGlow: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: colors.primaryGlow,
  },
  logoCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.surfaceVariant,
    aspectRatio: 1,
    maxWidth: 280,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.lg,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  logo: {
    width: "90%",
    height: "90%",
  },
  placeholder: {
    width: "80%",
    height: "80%",
    borderRadius: radii.lg,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: colors.outlineVariant,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    backgroundColor: colors.surfaceContainerLow,
  },
  placeholderMark: {
    fontFamily: fonts.extraBold,
    fontSize: 56,
    color: colors.outline,
  },
  prompt: {
    fontFamily: fonts.extraBold,
    fontSize: 26,
    lineHeight: 32,
    color: colors.onSurface,
    textAlign: "center",
  },
  secondaryRow: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  flexBtn: {
    flex: 1,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  error: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.error,
  },
});
