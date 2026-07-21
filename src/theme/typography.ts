export const fonts = {
  regular: "HankenGrotesk_400Regular",
  bold: "HankenGrotesk_700Bold",
  extraBold: "HankenGrotesk_800ExtraBold",
  mono: "JetBrainsMono_700Bold",
} as const;

export const typography = {
  headlineLg: {
    fontFamily: fonts.extraBold,
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: -0.64,
  },
  headlineLgMobile: {
    fontFamily: fonts.extraBold,
    fontSize: 26,
    lineHeight: 32,
  },
  headlineMd: {
    fontFamily: fonts.bold,
    fontSize: 20,
    lineHeight: 28,
  },
  bodyLg: {
    fontFamily: fonts.regular,
    fontSize: 18,
    lineHeight: 26,
  },
  bodyMd: {
    fontFamily: fonts.regular,
    fontSize: 16,
    lineHeight: 24,
  },
  labelCaps: {
    fontFamily: fonts.mono,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 1.2,
    fontWeight: "700" as const,
  },
  statValue: {
    fontFamily: fonts.mono,
    fontSize: 24,
    lineHeight: 24,
  },
  button: {
    fontFamily: fonts.bold,
    fontSize: 20,
    lineHeight: 28,
  },
} as const;
