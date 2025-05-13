import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import ThemedText from "./ThemedText";
import ThemedView from "./ThemedView";
import { Toast } from "toastify-react-native";
import { useLoading } from "../context/LoadingContext";
import axios from "axios";
import { useTheme } from "../context/ThemeContext";
import ModalTemplate from "./ModalTemplate";
import { useOptions } from "../context/OptionsContext";
import Details from "./Details";
import ThemedTouchableOpacity from "./ThemedTouchableOpacity";
import Icon from "./Icon";

interface IOptionsModal {
  id: number;
  visible: boolean;
  onClose: () => void;
  goBack: () => void;
}

const API_URL = "https://project-api-woad.vercel.app";

export default function DeleteOption({
  id,
  onClose,
  visible,
  goBack,
}: IOptionsModal) {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const { showLoading, hideLoading, setReload, reload } = useLoading();
  const { options } = useOptions();

  function deleteNotes() {
    showLoading();
    axios
      .delete(`${API_URL}/api/notes/${id}`)
      .then((response) => {
        if (response.status == 200) {
          Toast.show({
            type: "success",
            text1: "Sucesso",
            text2: "Anotação deletada com sucesso!",
            position: "top",
            visibilityTime: 2000,
            autoHide: true,
          });
          setReload(!reload);
          goBack();
        }
      })
      .catch((error) => {
        hideLoading();
        console.error(
          "Erro no DELETE /api/notes:",
          error?.response || error?.message || error
        );
        Toast.show({
          position: "center",
          type: "error",
          text1: "Erro",
          text2: error?.response || error?.message || error,
          useModal: true,
        });
      });
  }

  return (
    <ModalTemplate
      hideModal={onClose}
      modalVisible={visible}
      hightValueToReduce={200}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedText type="title" style={styles.title}>
          Deletar: {options.title}
        </ThemedText>
        <Details
          id={options.id}
          title={options.title}
          note={options.note}
          created_at={options.created_at}
          updated_at={options.updated_at}
        />
        <ThemedView style={styles.buttonContainer}>
          <ThemedTouchableOpacity
            onPress={deleteNotes}
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
          <ThemedTouchableOpacity
            onPress={onClose}
            contentStyle={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              width: 90,
            }}
            borderColor={colors.border}
          >
            <ThemedView
              style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
            >
              <Icon name={"remove"} size={24} />
              <ThemedText type="defaultSemiBold" style={[]}>
                Cancelar
              </ThemedText>
            </ThemedView>
          </ThemedTouchableOpacity>
        </ThemedView>
      </ScrollView>
    </ModalTemplate>
  );
}

const getStyles = (colors: ReturnType<typeof useTheme>["colors"]) =>
  StyleSheet.create({
    scrollContent: {
      flexGrow: 1,
      padding: 16,
      backgroundColor: colors.background,
    },
    title: {
      textAlign: "center",
      marginBottom: 32,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      flexWrap: "wrap",
      gap: 16,
      marginVertical: 16,
    },
    buttonStyle: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
  });
