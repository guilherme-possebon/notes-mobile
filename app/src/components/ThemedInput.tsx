import React, { useState } from "react";
import ThemedView from "./ThemedView";
import { StyleSheet, TextInput, TextInputProps } from "react-native";
import colors from "../theme/colors";

interface ThemedInputProps extends TextInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  isMultiline?: boolean;
}

export default function ThemedInput({
  placeholder,
  value,
  onChangeText,
  isMultiline = false,
  ...rest
}: ThemedInputProps) {
  const [inputHeight, setInputHeight] = useState(60);
  const MAX_HEIGHT = 200;

  return (
    <ThemedView style={styles.container}>
      <TextInput
        style={[
          styles.inputText,
          { height: Math.min(Math.max(60, inputHeight), MAX_HEIGHT) },
        ]}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={colors.placeholder}
        multiline={isMultiline}
        scrollEnabled={isMultiline}
        onContentSizeChange={(e) => {
          setInputHeight(e.nativeEvent.contentSize.height);
        }}
        {...rest}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  inputText: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 16,
    color: colors.text,
    fontSize: 16,
    textAlignVertical: "top",
  },
});
