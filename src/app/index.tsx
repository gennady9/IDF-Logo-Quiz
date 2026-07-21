import { useRouter, type Href } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppHeader } from "@/components/AppHeader";
import { CategoryCard } from "@/components/CategoryCard";
import { ScreenBackground } from "@/components/ScreenBackground";
import { useProgressContext } from "@/context/ProgressContext";
import { categories, getDescendantItems } from "@/data/quizData";
import { colors, fonts, spacing } from "@/theme";

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { progress } = useProgressContext();

  return (
    <ScreenBackground>
      <AppHeader />
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + spacing.xl },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.intro}>
          <Text style={styles.title}>בחר קטגוריה</Text>
          <Text style={styles.subtitle}>בחר נושא כדי להתחיל בחידון.</Text>
        </View>

        <View style={styles.grid}>
          {categories.map((category) => {
            const allItems = getDescendantItems(category);
            const done = allItems.filter((item) => progress[item.id]).length;
            return (
              <View key={category.id} style={styles.gridItem}>
                <CategoryCard
                  nameHe={category.nameHe}
                  accent={category.accent}
                  icon={category.icon}
                  completed={done}
                  total={allItems.length}
                  onPress={() => router.push(`/category/${category.id}` as Href)}
                />
              </View>
            );
          })}
        </View>
      </ScrollView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.marginMobile,
    paddingTop: spacing.lg,
    gap: spacing.lg,
    maxWidth: 896,
    width: "100%",
    alignSelf: "center",
  },
  intro: {
    gap: spacing.xs,
    alignItems: "center",
  },
  title: {
    fontFamily: fonts.extraBold,
    fontSize: 26,
    lineHeight: 32,
    color: colors.onBackground,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 16,
    lineHeight: 24,
    color: colors.outline,
    textAlign: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.gutter,
  },
  gridItem: {
    width: "47%",
    flexGrow: 1,
    flexBasis: "47%",
    maxWidth: "48.5%",
  },
});
