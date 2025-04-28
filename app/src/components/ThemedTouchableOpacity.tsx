import React from "react";
import { TouchableOpacity, StyleSheet, ViewStyle } from "react-native";
import ThemedText, { ThemedTextProps } from "./ThemedText";
import ThemedView from "./ThemedView";
import colors from "../theme/colors";

interface TabItemProps {
  label: string;
  onPress: () => void;
  icon?: React.ReactNode;
  textType?: ThemedTextProps["type"];
  containerStyle?: ViewStyle;
  contentStyle?: ViewStyle;
  accessibilityHint?: string;
}

export default function ThemedTouchableOpacity({
  icon,
  label,
  onPress,
  textType = "default",
  containerStyle,
  contentStyle,
  accessibilityHint = `Press to ${label.toLowerCase()}`,
}: TabItemProps) {
  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint={accessibilityHint}
    >
      <ThemedView style={[styles.content, contentStyle]}>
        {icon}
        <ThemedText type={textType} style={styles.label}>
          {label}
        </ThemedText>
      </ThemedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  label: {
    color: colors.primary,
  },
});
