import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter, type Href } from "expo-router";
import { useMemo } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppHeader } from "@/components/AppHeader";
import { CategoryIcon } from "@/components/CategoryIcon";
import { LogoTile } from "@/components/LogoTile";
import { NestedCategoryTile } from "@/components/NestedCategoryTile";
import { ProgressBar } from "@/components/ProgressBar";
import { ScreenBackground } from "@/components/ScreenBackground";
import { useProgressContext } from "@/context/ProgressContext";
import { categories, getCategoryById, getDescendantItems } from "@/data/quizData";
import { colors, fonts, radii, spacing } from "@/theme";

export default function CategoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { progress } = useProgressContext();

  const category = useMemo(() => getCategoryById(id), [id]);

  const isTopLevel = useMemo(
    () => categories.some((entry) => entry.id === id),
    [id],
  );

  const allItems = useMemo(
    () => (category ? getDescendantItems(category) : []),
    [category],
  );

  /** Father logo for this folder — first direct item, not a descendant from a child folder. */
  const cover = !isTopLevel ? category?.items[0] : undefined;
  const coverRevealed = !cover || Boolean(progress[cover.id]);

  const listItems = useMemo(() => {
    if (!category) return [];
    // Nested: cover lives in the header, so don't also show it in the grid.
    if (cover) return category.items.slice(1);
    return category.items;
  }, [category, cover]);

  const goBack = () => {
    if (router.canGoBack()) router.back();
    else router.replace("/");
  };

  if (!category) {
    return (
      <ScreenBackground>
        <AppHeader clustered backLabel="חזור" onBackPress={goBack} />
        <View style={styles.centered}>
          <Text style={styles.error}>הקטגוריה לא נמצאה</Text>
        </View>
      </ScreenBackground>
    );
  }

  const completed = allItems.filter((item) => progress[item.id]).length;
  const ratio = allItems.length === 0 ? 0 : completed / allItems.length;
  const percent = Math.round(ratio * 100);
  const headerTitle = isTopLevel || coverRevealed ? category.nameHe : "???";

  const headerInner = (
    <>
      <View style={styles.headerTop}>
        <View style={cover ? styles.coverFrame : styles.iconWrap}>
          {cover?.image ? (
            <>
              <View style={styles.coverIconWrap}>
                <Image
                  source={cover.image}
                  style={styles.coverImage}
                  contentFit="contain"
                />
              </View>
              {coverRevealed ? (
                <View style={styles.checkBadge}>
                  <MaterialIcons name="check" size={12} color={colors.onPrimary} />
                </View>
              ) : null}
            </>
          ) : (
            <CategoryIcon kind={category.icon} color={category.accent} size={26} />
          )}
        </View>
        <View style={styles.headerText}>
          <Text
            style={[
              styles.categoryTitle,
              cover && !coverRevealed && styles.categoryTitleHidden,
            ]}
          >
            {headerTitle}
          </Text>
          <Text style={styles.meta}>
            {completed} מתוך {allItems.length} הושלמו · {percent}%
            {cover ? " · לחצו לזיהוי" : ""}
          </Text>
        </View>
        {cover ? (
          <MaterialIcons name="chevron-left" size={22} color={colors.outline} />
        ) : null}
      </View>
      <ProgressBar progress={ratio} height={12} />
    </>
  );

  return (
    <ScreenBackground>
      <AppHeader clustered backLabel="חזור" onBackPress={goBack} />
      <FlatList
        data={listItems}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={listItems.length > 0 ? styles.row : undefined}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + spacing.xxl },
        ]}
        ListHeaderComponent={
          <View style={styles.headerBlock}>
            {cover ? (
              <Pressable
                onPress={() => router.push(`/quiz/${cover.id}` as Href)}
                style={({ pressed }) => [
                  styles.header,
                  styles.headerClickable,
                  coverRevealed && styles.headerRevealed,
                  pressed && styles.headerPressed,
                ]}
                accessibilityRole="button"
                accessibilityLabel={
                  coverRevealed ? `זיהוי מחדש: ${category.nameHe}` : "לחצו לזיהוי הסמל"
                }
              >
                {headerInner}
              </Pressable>
            ) : (
              <View style={styles.header}>{headerInner}</View>
            )}

            {category.children.length > 0 ? (
              <View style={styles.nestedSection}>
                <View style={styles.nestedLabelRow}>
                  <MaterialIcons name="folder-open" size={16} color={colors.outline} />
                  <Text style={styles.nestedLabel}>תת־קטגוריות</Text>
                </View>
                <View style={styles.childGrid}>
                  {category.children.map((child) => {
                    const childItems = getDescendantItems(child);
                    const childDone = childItems.filter((i) => progress[i.id]).length;
                    const childCover = childItems[0];
                    const childCoverRevealed = childCover
                      ? Boolean(progress[childCover.id])
                      : true;
                    return (
                      <View key={child.id} style={styles.childItem}>
                        <NestedCategoryTile
                          nameHe={child.nameHe}
                          coverImage={childCover?.image}
                          coverRevealed={childCoverRevealed}
                          completed={childDone}
                          total={childItems.length}
                          onPress={() => router.push(`/category/${child.id}` as Href)}
                        />
                      </View>
                    );
                  })}
                </View>
              </View>
            ) : null}

            {listItems.length > 0 && category.children.length > 0 ? (
              <View style={styles.nestedLabelRow}>
                <MaterialIcons name="style" size={16} color={colors.outline} />
                <Text style={styles.nestedLabel}>סמלים</Text>
              </View>
            ) : null}
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.tileWrap}>
            <LogoTile
              item={item}
              completed={Boolean(progress[item.id])}
              onPress={() => router.push(`/quiz/${item.id}` as Href)}
            />
          </View>
        )}
        ListEmptyComponent={
          category.children.length === 0 && listItems.length === 0 && !cover ? (
            <Text style={styles.empty}>אין פריטים בקטגוריה זו</Text>
          ) : null
        }
        showsVerticalScrollIndicator={false}
      />
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.marginMobile,
    paddingTop: spacing.lg,
    gap: spacing.md,
    maxWidth: 560,
    width: "100%",
    alignSelf: "center",
  },
  headerBlock: {
    gap: spacing.md,
    marginBottom: spacing.sm,
  },
  header: {
    gap: spacing.sm,
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.surfaceVariant,
    padding: spacing.md,
  },
  headerClickable: {
    borderColor: colors.primaryFixedDim,
  },
  headerRevealed: {
    backgroundColor: "rgba(62, 82, 25, 0.06)",
  },
  headerPressed: {
    opacity: 0.92,
    transform: [{ scale: 0.99 }],
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: radii.full,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surfaceContainerLow,
  },
  coverFrame: {
    width: 64,
    height: 64,
    position: "relative",
  },
  coverIconWrap: {
    width: 64,
    height: 64,
    borderRadius: radii.md,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surfaceContainerLow,
  },
  coverImage: {
    width: "85%",
    height: "85%",
  },
  checkBadge: {
    position: "absolute",
    top: -4,
    left: -4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    flex: 1,
    gap: 2,
  },
  categoryTitle: {
    fontFamily: fonts.bold,
    fontSize: 20,
    lineHeight: 28,
    color: colors.onSurface,
    textAlign: "right",
  },
  categoryTitleHidden: {
    color: colors.onSurfaceVariant,
    letterSpacing: 2,
  },
  meta: {
    fontFamily: fonts.mono,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.8,
    color: colors.onSurfaceVariant,
    textAlign: "right",
  },
  nestedSection: {
    gap: spacing.sm,
  },
  nestedLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 6,
  },
  nestedLabel: {
    fontFamily: fonts.mono,
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 0.6,
    color: colors.outline,
    textTransform: "uppercase",
  },
  childGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
  },
  childItem: {
    width: "47%",
    flexGrow: 1,
    flexBasis: "47%",
    maxWidth: "48.5%",
  },
  row: {
    gap: spacing.md,
  },
  tileWrap: {
    flex: 1,
  },
  empty: {
    fontFamily: fonts.regular,
    fontSize: 15,
    color: colors.onSurfaceVariant,
    textAlign: "center",
    paddingVertical: spacing.lg,
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
