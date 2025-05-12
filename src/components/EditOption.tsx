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
import { useOptions } from "../context/OptionsContext";

interface IEditOption {
  id: number;
  note: string;
  title: string;
}

var API_URL = "https://project-api-woad.vercel.app";
export default function EditOption() {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const { options } = useOptions();
  const { showLoading, hideLoading, setReload, reload } = useLoading();
  const [updatedNote, setUpdatedNote] = useState({
    note: options.note,
    title: options.title,
  });
  const [notesAlerts, setNotesAlerts] = useState({
    titleAlert: false,
    noteAlert: false,
  });

  const titleInputRef = useRef<TextInput | null>(null);
  const noteInputRef = useRef<TextInput | null>(null);

  const handleTitleChange = (text: string) => {
    setUpdatedNote((prev) => ({ ...prev, title: text }));
  };

  const handleNoteChange = (text: string) => {
    setUpdatedNote((prev) => ({ ...prev, note: text }));
  };
  function validateFields() {
    let hasError = false;

    if (updatedNote.title.trim().length === 0) {
      setNotesAlerts((prev) => ({ ...prev, titleAlert: true }));
      setTimeout(() => {
        setNotesAlerts((prev) => ({ ...prev, titleAlert: false }));
      }, 3000);
      hasError = true;
    }

    if (updatedNote.note.trim().length === 0) {
      setNotesAlerts((prev) => ({ ...prev, noteAlert: true }));
      setTimeout(() => {
        setNotesAlerts((prev) => ({ ...prev, noteAlert: false }));
      }, 3000);
      hasError = true;
    }

    return !hasError;
  }

  function saveNotes() {
    if (!validateFields()) {
      Toast.show({
        type: "error",
        text1: "Erro ao salvar",
        text2: "Os campos de titulo ou de anotações estão vazios",
        position: "top",
        visibilityTime: 2680,
        autoHide: true,
      });
      return;
    }
    titleInputRef.current?.blur();
    noteInputRef.current?.blur();
    showLoading();
    const url = `${API_URL}/api/notes`;
    axios
      .put(url, {
        id: options.id,
        title: updatedNote.title,
        note: updatedNote.note,
      })
      .then(function (response) {
        if (response.status == 200) {
          Toast.show({
            type: "success",
            text1: "Sucesso",
            text2: "Anotação editada com sucesso!",
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
          "Erro no PUT /api/notes:",
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
      <ThemedText
        type="title"
        style={{
          textAlign: "center",
          color:
            notesAlerts.noteAlert || notesAlerts.titleAlert
              ? colors.error
              : colors.text,
          marginBottom: 32,
        }}
      >
        Editar anotação
      </ThemedText>
      <ThemedInput
        ref={titleInputRef}
        placeholder="Título"
        value={updatedNote.title}
        onChangeText={handleTitleChange}
        showValidation={notesAlerts.titleAlert}
      />
      <ThemedInput
        ref={noteInputRef}
        placeholder="Anotação"
        value={updatedNote.note}
        onChangeText={handleNoteChange}
        isMultiline={true}
        numberOfLines={4}
        showValidation={notesAlerts.noteAlert}
      />
      <ThemedTouchableOpacity
        onPress={() => saveNotes()}
        borderColor={
          notesAlerts.noteAlert || notesAlerts.titleAlert
            ? colors.error
            : colors.border
        }
      >
        <ThemedView
          style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
        >
          <Icon
            name={"floppy-o"}
            color={
              notesAlerts.noteAlert || notesAlerts.titleAlert
                ? colors.error
                : colors.text
            }
            size={24}
          />
          <ThemedText
            type="subtitle"
            style={[
              {
                color:
                  notesAlerts.noteAlert || notesAlerts.titleAlert
                    ? colors.error
                    : colors.text,
              },
            ]}
          >
            Salvar
          </ThemedText>
        </ThemedView>
      </ThemedTouchableOpacity>
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
