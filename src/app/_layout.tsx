import "react-native-gesture-handler";

import {
  HankenGrotesk_400Regular,
  HankenGrotesk_700Bold,
  HankenGrotesk_800ExtraBold,
} from "@expo-google-fonts/hanken-grotesk";
import { JetBrainsMono_700Bold } from "@expo-google-fonts/jetbrains-mono";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { I18nManager, StatusBar } from "react-native";

import { ProgressContext } from "@/context/ProgressContext";
import { useProgress } from "@/hooks/useProgress";
import { colors, fonts } from "@/theme";

SplashScreen.preventAutoHideAsync();

I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

function ProgressProvider({ children }: { children: React.ReactNode }) {
  const progress = useProgress();
  return (
    <ProgressContext.Provider value={progress}>{children}</ProgressContext.Provider>
  );
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    HankenGrotesk_400Regular,
    HankenGrotesk_700Bold,
    HankenGrotesk_800ExtraBold,
    JetBrainsMono_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ProgressProvider>
      <StatusBar barStyle="dark-content" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.surfaceContainer },
          headerTintColor: colors.primary,
          headerTitleStyle: {
            fontFamily: fonts.bold,
            color: colors.primary,
          },
          headerShadowVisible: false,
          headerBackTitle: "חזרה",
          contentStyle: { backgroundColor: colors.background },
          animation: "slide_from_left",
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="category/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="quiz/[itemId]" options={{ headerShown: false }} />
      </Stack>
    </ProgressProvider>
  );
}
