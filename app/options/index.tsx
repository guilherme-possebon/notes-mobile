import React, { useCallback, useEffect, useState } from "react";
import { BackHandler, Pressable, StyleSheet } from "react-native";
import { useTheme } from "../../src/context/ThemeContext";
import ThemedView from "../../src/components/ThemedView";
import ThemedText from "../../src/components/ThemedText";
import Icon from "../../src/components/Icon";
import ThemedSafeAreaView from "../../src/components/ThemedSafeAreaView";
import { useFocusEffect, useNavigation, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useOptions } from "../../src/context/OptionsContext";
import { useOptionsButtons } from "../../src/context/OptionsButtonsContext";
import OptionsToShow from "../../src/components/Options";
import EditOption from "../../src/components/EditOption";
import DeleteOption from "../../src/components/DeleteOption";
import { useLoading } from "../../src/context/LoadingContext";

export default function Options() {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const navigation = useNavigation();
  const { optionsButton, setOptionsButton } = useOptionsButtons();
  const { options } = useOptions();
  const { triggerReload } = useLoading();

  function hideModal() {
    setOptionsButton((prev) => ({ ...prev, delete: false }));
  }

  const goBack = useCallback(() => {
    setOptionsButton({ edit: false, delete: false });
    triggerReload();
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

        {optionsButton.edit && (
          <>
            <EditOption goBack={goBack} />
          </>
        )}
        {optionsButton.delete && (
          <>
            <DeleteOption
              id={options.id}
              onClose={hideModal}
              visible={optionsButton.delete}
              goBack={goBack}
            />
          </>
        )}

        <OptionsToShow />
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
