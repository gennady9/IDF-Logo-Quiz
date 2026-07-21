import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

import { colors, fonts } from "@/theme";

type ProgressCircleProps = {
  progress: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  trackColor?: string;
  label?: string;
  showPercent?: boolean;
};

export function ProgressCircle({
  progress,
  size = 56,
  strokeWidth = 5,
  color = colors.primary,
  trackColor = colors.surfaceContainerHigh,
  label,
  showPercent = false,
}: ProgressCircleProps) {
  const clamped = Math.max(0, Math.min(1, progress));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const start = display;
    const delta = clamped - start;
    if (Math.abs(delta) < 0.001) {
      setDisplay(clamped);
      return;
    }

    const duration = 400;
    const startedAt = Date.now();
    let frame = 0;

    const tick = () => {
      const t = Math.min(1, (Date.now() - startedAt) / duration);
      const eased = 1 - (1 - t) * (1 - t);
      setDisplay(start + delta * eased);
      if (t < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // Only re-run when target progress changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clamped]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;
  const percent = Math.round(clamped * 100);
  const dashOffset = circumference * (1 - display);

  return (
    <View style={[styles.wrap, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${center} ${center})`}
        />
      </Svg>
      <View style={[styles.center, { pointerEvents: "none" }]}>
        {label ? (
          <Text style={styles.label} numberOfLines={1}>
            {label}
          </Text>
        ) : showPercent ? (
          <Text style={styles.percent}>{percent}%</Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  center: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontFamily: fonts.bold,
    fontSize: 12,
    color: colors.onSurface,
  },
  percent: {
    fontFamily: fonts.mono,
    fontSize: 13,
    color: colors.onSurface,
  },
});
