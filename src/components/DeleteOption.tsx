import React, { useRef, useState } from "react";
import ThemedText from "./ThemedText";
import ThemedInput from "./ThemedInput";
import ThemedTouchableOpacity from "./ThemedTouchableOpacity";
import ThemedView from "./ThemedView";
import Icon from "./Icon";
import { StyleSheet, TextInput } from "react-native";
import { Toast } from "toastify-react-native";
import { useLoading } from "../context/LoadingContext";
import axios from "axios";
import { useTheme } from "../context/ThemeContext";
import ModalTemplate from "./ModalTemplate";

interface IOptionsModal {
  id: number;
  visible: boolean;
  onClose: () => void;
}

var API_URL = "https://project-api-woad.vercel.app";
export default function DeleteOption({ id, onClose, visible }: IOptionsModal) {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const { showLoading, hideLoading, setReload, reload } = useLoading();

  function deleteNotes() {
    showLoading();
    const url = `${API_URL}/api/notes/${id}`;
    axios
      .delete(url)
      .then(function (response) {
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
        }
        hideLoading();
      })
      .catch(function (error) {
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
    <>
      <ModalTemplate
        animationType="fade"
        hideModal={onClose}
        modalVisible={visible}
      >
        <ThemedText
          type="title"
          style={{
            textAlign: "center",
            marginBottom: 32,
          }}
        >
          Deletar
        </ThemedText>
      </ModalTemplate>
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
    backLinkContent: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
    },
  });
