import React, { useRef, useState } from "react";
import ThemedSafeAreaView from "../src/components/ThemedSafeAreaView";
import ThemedText from "../src/components/ThemedText";
import ThemedInput from "../src/components/ThemedInput";
import ThemedTouchableOpacity from "../src/components/ThemedTouchableOpacity";
import Icon from "../src/components/Icon";
import ThemedView from "../src/components/ThemedView";
import { Button, StyleSheet, TextInput } from "react-native";
import axios from "axios";
import { useLoading } from "../src/context/LoadingContext";
import { Toast } from "toastify-react-native";
import { useTheme } from "../src/context/ThemeContext";

var API_URL = "https://project-api-woad.vercel.app";

export default function Create() {
  const { showLoading, hideLoading, setReload, reload } = useLoading();
  const { colors } = useTheme();
  const [dayNote, setDayNote] = useState({
    title: "",
    note: "",
  });
  const [notesAlerts, setNotesAlerts] = useState({
    titleAlert: false,
    noteAlert: false,
  });

  const titleInputRef = useRef<TextInput | null>(null);
  const noteInputRef = useRef<TextInput | null>(null);

  const handleTitleChange = (text: string) => {
    setDayNote((prev) => ({ ...prev, title: text }));
  };

  const handleNoteChange = (text: string) => {
    setDayNote((prev) => ({ ...prev, note: text }));
  };

  function validateFields() {
    let hasError = false;

    if (dayNote.title.trim().length === 0) {
      setNotesAlerts((prev) => ({ ...prev, titleAlert: true }));
      setTimeout(() => {
        setNotesAlerts((prev) => ({ ...prev, titleAlert: false }));
      }, 3000);
      hasError = true;
    }

    if (dayNote.note.trim().length === 0) {
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
      .post(url, {
        title: dayNote.title,
        note: dayNote.note,
      })
      .then(function (response) {
        if (response.status == 201) {
          Toast.show({
            type: "success",
            text1: "Sucesso",
            text2: "Anotação criada com sucesso!",
            position: "top",
            visibilityTime: 2000,
            autoHide: true,
          });

          setReload(!reload);
          setDayNote({ title: "", note: "" });
        }
        hideLoading();
      })
      .catch(function (error) {
        hideLoading();
        console.error(
          "Erro no POST /api/notes:",
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
    <ThemedSafeAreaView>
      <ThemedView style={[styles.container]}>
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
          Criar anotação
        </ThemedText>
        <ThemedInput
          ref={titleInputRef}
          placeholder="Título"
          value={dayNote.title}
          onChangeText={handleTitleChange}
          showValidation={notesAlerts.titleAlert}
        />
        <ThemedInput
          ref={noteInputRef}
          placeholder="Anotação"
          value={dayNote.note}
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
      </ThemedView>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    paddingHorizontal: 24,
    gap: 12,
  },
});
