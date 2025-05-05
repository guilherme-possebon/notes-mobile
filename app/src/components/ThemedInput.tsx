import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import ThemedText from "./ThemedText";
import Icon from "./Icon";
import ThemedView from "./ThemedView";
import { useTheme } from "../context/ThemeContext";

interface ThemedInputProps extends TextInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  isMultiline?: boolean;
  showValidation?: boolean;
}

const ThemedInput = React.forwardRef<TextInput, ThemedInputProps>(
  (
    {
      placeholder,
      value,
      onChangeText,
      isMultiline = false,
      showValidation = false,
      ...rest
    }: ThemedInputProps,
    ref
  ) => {
    const { colors } = useTheme();
    const styles = getStyles(colors);
    const [inputHeight, setInputHeight] = useState(60);
    const [isFocused, setIsFocused] = useState(false);
    const errorOpacity = useRef(new Animated.Value(0)).current;
    const animatedLabel = useRef(new Animated.Value(value ? 1 : 0)).current;
    const MAX_HEIGHT = 200;

    const isInvalid = showValidation && value.trim().length === 0;

    useEffect(() => {
      Animated.timing(animatedLabel, {
        toValue: isFocused || value ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }, [isFocused, value]);

    const labelStyle = {
      position: "absolute" as const,
      left: 16,
      top: animatedLabel.interpolate({
        inputRange: [0, 1],
        outputRange: [18, -8],
      }),
      fontSize: animatedLabel.interpolate({
        inputRange: [0, 1],
        outputRange: [16, 12],
      }),
      color: isInvalid ? colors.error : colors.placeholder,
      backgroundColor: colors.background,
      paddingHorizontal: 4,
      zIndex: 2,
    };

    useEffect(() => {
      Animated.timing(errorOpacity, {
        toValue: isInvalid ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }, [isInvalid]);

    return (
      <ThemedView>
        <ThemedView style={[styles.container]}>
          <Animated.Text style={labelStyle}>
            <ThemedText
              type={value || isFocused ? "smallSemiBold" : "defaultSemiBold"}
              style={[{ color: isInvalid ? colors.error : colors.text }]}
            >
              {placeholder}
            </ThemedText>
          </Animated.Text>

          <TextInput
            ref={ref}
            style={[
              styles.inputText,
              {
                height: Math.min(Math.max(60, inputHeight), MAX_HEIGHT),
                borderColor: isInvalid ? colors.error : colors.border,
              },
            ]}
            value={value}
            onChangeText={onChangeText}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            multiline={isMultiline}
            scrollEnabled={isMultiline}
            onContentSizeChange={(e) => {
              setInputHeight(e.nativeEvent.contentSize.height);
            }}
            {...rest}
          />
          <Animated.View style={{ opacity: errorOpacity }}>
            <ThemedView style={[styles.warnText]}>
              <Icon name={"warning"} color={colors.error} size={12} />
              <ThemedText type="smallSemiBold" style={{ color: colors.error }}>
                Este campo é obrigatório
              </ThemedText>
            </ThemedView>
          </Animated.View>
        </ThemedView>
      </ThemedView>
    );
  }
);

const getStyles = (colors: ReturnType<typeof useTheme>["colors"]) =>
  StyleSheet.create({
    container: {
      position: "relative",
      justifyContent: "center",
    },
    inputText: {
      borderWidth: 1,
      borderRadius: 8,
      paddingTop: 20,
      paddingBottom: 8,
      paddingHorizontal: 16,
      fontSize: 16,
      color: colors.text,
      backgroundColor: colors.background,
      textAlignVertical: "top",
    },
    warnText: {
      display: "flex",
      gap: 8,
      color: colors.error,
      flexDirection: "row",
      alignItems: "center",
      marginLeft: 4,
      marginTop: 4,
    },
  });

export default ThemedInput;
