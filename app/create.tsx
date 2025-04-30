import React, { useEffect, useRef, useState } from "react";
import ThemedSafeAreaView from "./src/components/ThemedSafeAreaView";
import ThemedText from "./src/components/ThemedText";
import ThemedInput from "./src/components/ThemedInput";
import ThemedTouchableOpacity from "./src/components/ThemedTouchableOpacity";
import Icon from "./src/components/Icon";
import colors from "./src/theme/colors";
import ThemedView from "./src/components/ThemedView";
import { Animated, StyleSheet, TextInput } from "react-native";
import axios from "axios";
import { useLoading } from "./src/context/LoadingContext";
import { ALERT_TYPE, Dialog, Toast } from "react-native-alert-notification";

var API_URL = "https://project-api-woad.vercel.app";

export default function Create() {
  const { showLoading, hideLoading, setReload, reload } = useLoading();
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
        type: ALERT_TYPE.DANGER,
        title: "Erro ao salvar",
        textBody: "Os campos de titulo ou de anotações estão vazios",
        autoClose: 2680,
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
            type: ALERT_TYPE.SUCCESS,
            title: "Sucesso",
            textBody: "Anotação criada com sucesso!",
            autoClose: 2000,
          });
          setReload(!reload);
          setDayNote({ title: "", note: "" });
        }
        hideLoading();
      })
      .catch(function (error) {
        console.error(
          "Erro no POST /api/notes:",
          error?.response || error?.message || error
        );
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: "Erro ao salvar",
          textBody: "Erro: " + (error?.message || "Erro desconhecido"),
          autoClose: 2000,
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
          }}
        >
          Criar anotação
        </ThemedText>
        <ThemedView>
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
        </ThemedView>
        <ThemedTouchableOpacity
          label="Salvar"
          onPress={() => saveNotes()}
          accessibilityHint="Salvar"
          icon={
            <Icon
              name={"floppy-o"}
              color={
                notesAlerts.noteAlert || notesAlerts.titleAlert
                  ? colors.error
                  : colors.text
              }
              size={24}
            />
          }
          textType="subtitle"
          contentStyle={
            notesAlerts.noteAlert || notesAlerts.titleAlert
              ? colors.error
              : colors.text
          }
          borderStyle={
            notesAlerts.noteAlert || notesAlerts.titleAlert
              ? colors.error
              : colors.divider
          }
        />
      </ThemedView>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    gap: 32,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
});
