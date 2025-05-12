import React, { useCallback, useEffect, useState } from "react";
import { BackHandler, Pressable, StyleSheet } from "react-native";
import { useTheme } from "../../src/context/ThemeContext";
import ThemedView from "../../src/components/ThemedView";
import ThemedText from "../../src/components/ThemedText";
import Icon from "../../src/components/Icon";
import ThemedSafeAreaView from "../../src/components/ThemedSafeAreaView";
import {
  useFocusEffect,
  useLocalSearchParams,
  useNavigation,
  usePathname,
  useRouter,
  useSegments,
} from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ThemedTouchableOpacity from "../../src/components/ThemedTouchableOpacity";
import { useOptions } from "../../src/context/OptionsContext";
import Details from "../../src/components/Details";

export default function Options() {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const navigation = useNavigation();
  const [optionsButton, setOptionsButton] = useState({
    edit: false,
    delete: false,
  });
  const { options } = useOptions();

  const goBack = useCallback(() => {
    setOptionsButton({ edit: false, delete: false });
    router.replace(options?.pathname);
  }, [router, options]);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        goBack();
        return true;
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

      return () => subscription.remove();
    }, [goBack])
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();

      goBack();
    });

    return unsubscribe;
  }, [navigation, goBack]);

  function editOption() {
    setOptionsButton(() => ({ edit: true, delete: false }));
  }

  function deleteOption() {
    setOptionsButton(() => ({ edit: false, delete: true }));
  }

  function cancelOption() {
    goBack();
  }

  return (
    <>
      <ThemedSafeAreaView style={styles.container}>
        <Pressable
          onPress={goBack}
          style={[styles.link, { top: 0, left: insets.left + 12 }]}
        >
          <ThemedView style={styles.backLinkContent}>
            <Icon name={"arrow-left"} size={16} color={colors.text} />
            <ThemedText type="link">Voltar</ThemedText>
          </ThemedView>
        </Pressable>
        <ThemedView style={styles.optionContainer}>
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
            {/* Editar */}
            <ThemedTouchableOpacity
              onPress={editOption}
              borderColor={colors.primary}
              backgroundColor={colors.primary}
            >
              <ThemedView style={styles.buttonStyle}>
                <Icon
                  name={"pencil-square-o"}
                  size={24}
                  color={colors.themeColor}
                />
                <ThemedText color={colors.themeColor} type="defaultSemiBold">
                  Editar
                </ThemedText>
              </ThemedView>
            </ThemedTouchableOpacity>
            {/* Deletar */}
            <ThemedTouchableOpacity
              onPress={deleteOption}
              borderColor={colors.danger}
              backgroundColor={colors.danger}
            >
              <ThemedView style={styles.buttonStyle}>
                <Icon name={"trash-o"} size={24} color={colors.themeColor} />
                <ThemedText color={colors.themeColor} type="defaultSemiBold">
                  Deletar
                </ThemedText>
              </ThemedView>
            </ThemedTouchableOpacity>
            {/* Cancelar */}
            <ThemedTouchableOpacity
              onPress={cancelOption}
              borderColor={colors.gray}
              backgroundColor={colors.gray}
            >
              <ThemedView style={styles.buttonStyle}>
                <Icon name={"remove"} size={24} color={colors.themeColor} />
                <ThemedText color={colors.themeColor} type="defaultSemiBold">
                  Cancelar {/* Fixed typo from "Cacelar" */}
                </ThemedText>
              </ThemedView>
            </ThemedTouchableOpacity>
          </ThemedView>
        </ThemedView>
        {optionsButton.edit && (
          <>
            <ThemedText>Editar</ThemedText>
          </>
        )}
        {optionsButton.delete && (
          <>
            <ThemedText>Deletar</ThemedText>
          </>
        )}
      </ThemedSafeAreaView>
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
