import React, { useEffect, useRef } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  Animated,
} from "react-native";
import ThemedText, { ThemedTextProps } from "./ThemedText";
import ThemedView from "./ThemedView";
import { useTheme } from "../context/ThemeContext";
import Icon from "./Icon";

interface TabItemProps {
  onPress: () => void;
  showValidation?: boolean;
  children: React.ReactNode;
  containerStyle?: ViewStyle;
  borderStyle?: string;
  contentStyle?: ViewStyle;
  isDisabled?: boolean;
}

export default function ThemedTouchableOpacity({
  onPress,
  showValidation = false,
  children,
  containerStyle,
  borderStyle,
  contentStyle,
  isDisabled = false,
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
        { borderColor: borderStyle },
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
