import React, { useEffect, useRef } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  Animated,
} from "react-native";
import ThemedText, { ThemedTextProps } from "./ThemedText";
import ThemedView from "./ThemedView";
import colors from "../theme/colors";

interface TabItemProps {
  label: string;
  onPress: () => void;
  icon?: React.ReactNode;
  textType?: ThemedTextProps["type"];
  containerStyle?: ViewStyle;
  contentStyle?: string;
  borderStyle?: string;
  accessibilityHint?: string;
  showValidation?: boolean;
}

export default function ThemedTouchableOpacity({
  icon,
  label,
  onPress,
  textType = "default",
  containerStyle,
  contentStyle,
  borderStyle,
  showValidation = false,
  accessibilityHint = `Press to ${label.toLowerCase()}`,
}: TabItemProps) {
  const errorOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(errorOpacity, {
      toValue: showValidation ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [showValidation]);
  return (
    <TouchableOpacity
      style={[styles.container, containerStyle, { borderColor: borderStyle }]}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint={accessibilityHint}
    >
      <ThemedView style={[styles.content]}>
        <ThemedText>{icon}</ThemedText>
        <ThemedText type={textType} style={{ color: contentStyle }}>
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
    color: colors.text,
  },
});
