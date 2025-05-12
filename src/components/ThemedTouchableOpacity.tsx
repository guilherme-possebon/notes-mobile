import React, { useEffect, useRef } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  Animated,
} from "react-native";
import ThemedView from "./ThemedView";
import { useTheme } from "../context/ThemeContext";

interface TabItemProps {
  onPress: () => void;
  showValidation?: boolean;
  children: React.ReactNode;
  containerStyle?: ViewStyle;
  borderColor?: string;
  contentStyle?: ViewStyle;
  isDisabled?: boolean;
  backgroundColor?: string;
}

export default function ThemedTouchableOpacity({
  onPress,
  showValidation = false,
  children,
  containerStyle,
  borderColor,
  contentStyle,
  isDisabled = false,
  backgroundColor,
}: TabItemProps) {
  const errorOpacity = useRef(new Animated.Value(0)).current;
  const { colors } = useTheme();
  const styles = getStyles(colors);

  useEffect(() => {
    Animated.timing(errorOpacity, {
      toValue: showValidation ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [showValidation]);
  return (
    <TouchableOpacity
      style={[
        containerStyle ? containerStyle : styles.container,
        {
          borderColor: borderColor,
          backgroundColor: backgroundColor
            ? backgroundColor
            : colors.background,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="button"
      disabled={isDisabled}
    >
      <ThemedView style={[contentStyle ? contentStyle : styles.content]}>
        {children}
      </ThemedView>
    </TouchableOpacity>
  );
}

const getStyles = (colors: ReturnType<typeof useTheme>["colors"]) =>
  StyleSheet.create({
    container: {
      paddingVertical: 16,
      paddingHorizontal: 32,
      borderRadius: 12,
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
