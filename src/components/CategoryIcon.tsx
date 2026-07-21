import Svg, { Circle, Path, Rect } from "react-native-svg";

import type { CategoryIcon as CategoryIconKind } from "@/types/quiz";

type CategoryIconProps = {
  kind: CategoryIconKind;
  color: string;
  size?: number;
};

export function CategoryIcon({ kind, color, size = 28 }: CategoryIconProps) {
  const stroke = color;
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 48 48",
    fill: "none" as const,
  };

  switch (kind) {
    case "unit-tag":
      return (
        <Svg {...common}>
          <Path
            d="M24 6L40 14V26C40 34 32.5 40.5 24 43C15.5 40.5 8 34 8 26V14L24 6Z"
            stroke={stroke}
            strokeWidth={2.4}
            strokeLinejoin="round"
          />
          <Path
            d="M24 18V30M18 24H30"
            stroke={stroke}
            strokeWidth={2.4}
            strokeLinecap="round"
          />
        </Svg>
      );
    case "rank":
      return (
        <Svg {...common}>
          <Path d="M10 34L24 24L38 34" stroke={stroke} strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" />
          <Path d="M10 26L24 16L38 26" stroke={stroke} strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" />
          <Path d="M10 18L24 8L38 18" stroke={stroke} strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
      );
    case "beret":
      return (
        <Svg {...common}>
          <Path
            d="M8 28C8 28 12 18 24 18C36 18 40 28 40 28C40 32 34 36 24 36C14 36 8 32 8 28Z"
            stroke={stroke}
            strokeWidth={2.4}
            strokeLinejoin="round"
          />
          <Path d="M28 18C30 14 34 12 38 12" stroke={stroke} strokeWidth={2.4} strokeLinecap="round" />
          <Circle cx="24" cy="28" r="2.2" fill={stroke} />
        </Svg>
      );
    case "beret-pin":
      return (
        <Svg {...common}>
          <Path
            d="M16 14L32 14L34 20L30 34H18L14 20L16 14Z"
            stroke={stroke}
            strokeWidth={2.4}
            strokeLinejoin="round"
          />
          <Path d="M24 34V42" stroke={stroke} strokeWidth={2.4} strokeLinecap="round" />
          <Circle cx="24" cy="22" r="2.5" fill={stroke} />
        </Svg>
      );
    case "pin":
      return (
        <Svg {...common}>
          <Circle cx="24" cy="16" r="8" stroke={stroke} strokeWidth={2.4} />
          <Path d="M24 24V40" stroke={stroke} strokeWidth={2.4} strokeLinecap="round" />
          <Path d="M20 40H28" stroke={stroke} strokeWidth={2.4} strokeLinecap="round" />
          <Circle cx="24" cy="16" r="2.5" fill={stroke} />
        </Svg>
      );
    case "flag":
      return (
        <Svg {...common}>
          <Path d="M12 8V40" stroke={stroke} strokeWidth={2.4} strokeLinecap="round" />
          <Path
            d="M12 10H34L28 18L34 26H12"
            stroke={stroke}
            strokeWidth={2.4}
            strokeLinejoin="round"
          />
        </Svg>
      );
    case "decoration":
      return (
        <Svg {...common}>
          <Path
            d="M24 8L27.5 18H38L29.5 24.5L33 35L24 28.5L15 35L18.5 24.5L10 18H20.5L24 8Z"
            stroke={stroke}
            strokeWidth={2.2}
            strokeLinejoin="round"
          />
          <Rect x="18" y="36" width="12" height="4" rx="1" stroke={stroke} strokeWidth={2} />
        </Svg>
      );
  }
}
