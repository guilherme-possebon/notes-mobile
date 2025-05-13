import React, { useRef, useState } from "react";
import { Modal, StyleSheet, TextInput } from "react-native";
import ThemedText from "./ThemedText";
import ThemedView from "./ThemedView";
import { useTheme } from "../context/ThemeContext";
import Icon from "./Icon";
import ThemedTouchableOpacity from "./ThemedTouchableOpacity";
import Details from "./Details";
import { useOptionsButtons } from "../context/OptionsButtonsContext";
import { useOptions } from "../context/OptionsContext";

export default function Options() {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const { optionsButton, setOptionsButton } = useOptionsButtons();
  const { options } = useOptions();

  function editOption() {
    setOptionsButton(() => ({ edit: true, delete: false }));
  }

  function deleteOption() {
    setOptionsButton(() => ({ edit: false, delete: true }));
  }

  function cancelOption() {
    setOptionsButton(() => ({ edit: false, delete: false }));
  }

  return (
    <>
      <ThemedView style={styles.optionContainer}>
        {!optionsButton.delete && !optionsButton.edit && (
          <>
            <ThemedText type="smallTitle" style={styles.title}>
              Clique na ação desejada
            </ThemedText>
            <Details
              id={options.id}
              title={options.title}
              note={options.note}
              created_at={options.created_at}
              updated_at={options.updated_at}
            />
            <ThemedView style={styles.buttonContainer}>
              {/* Deletar */}
              <ThemedTouchableOpacity
                onPress={deleteOption}
                borderColor={colors.danger}
                backgroundColor={colors.background}
              >
                <ThemedView style={styles.buttonStyle}>
                  <Icon name={"trash-o"} size={24} color={colors.danger} />
                  <ThemedText color={colors.danger} type="defaultSemiBold">
                    Deletar
                  </ThemedText>
                </ThemedView>
              </ThemedTouchableOpacity>
              {/* Editar */}
              <ThemedTouchableOpacity
                onPress={editOption}
                borderColor={colors.border}
                backgroundColor={colors.background}
              >
                <ThemedView style={styles.buttonStyle}>
                  <Icon
                    name={"pencil-square-o"}
                    size={24}
                    color={colors.text}
                  />
                  <ThemedText color={colors.text} type="defaultSemiBold">
                    Editar
                  </ThemedText>
                </ThemedView>
              </ThemedTouchableOpacity>
            </ThemedView>
          </>
        )}
      </ThemedView>
    </>
  );
}

const getStyles = (colors: ReturnType<typeof useTheme>["colors"]) =>
  StyleSheet.create({
    container: {
      justifyContent: "center",
      flex: 1,
      padding: 16,
      backgroundColor: colors.background,
    },
    link: {
      position: "absolute",
      zIndex: 1,
      padding: 8,
    },
    optionContainer: {
      gap: 16,
    },
    backLinkContent: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      flexWrap: "wrap",
      gap: 16,
    },
    buttonStyle: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    title: {
      textAlign: "center",
    },
  });
