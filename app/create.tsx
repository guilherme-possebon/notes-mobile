import React, { useState } from "react";
import ThemedSafeAreaView from "./src/components/ThemedSafeAreaView";
import ThemedText from "./src/components/ThemedText";
import ThemedInput from "./src/components/ThemedInput";
import ThemedTouchableOpacity from "./src/components/ThemedTouchableOpacity";
import Icon from "./src/components/Icon";
import colors from "./src/theme/colors";
import ThemedView from "./src/components/ThemedView";
import { Alert, StyleSheet } from "react-native";
import axios from "axios";
import { useLoading } from "./src/context/LoadingContext";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

export default function Create() {
  const { showLoading, hideLoading } = useLoading();
  const [dayNote, setDayNote] = useState({
    title: "",
    note: "",
  });

  // Handler for updating the title
  const handleTitleChange = (text: string) => {
    setDayNote((prev) => ({ ...prev, title: text }));
  };

  // Handler for updating the note
  const handleNoteChange = (text: string) => {
    setDayNote((prev) => ({ ...prev, note: text }));
  };

  function saveNotes() {
    /*  showLoading();
    axios
      .post("/api/notes", {
        title: dayNote.title,
        note: dayNote.note,
      })
      .then(function (response) {
        if (response.status == 201) {
        }
        hideLoading();
      })
      .catch(function (error) {
        console.log(error);
      }); */
  }

  return (
    <ThemedSafeAreaView>
      <ThemedView style={[styles.container]}>
        <ThemedText type="title" style={{ textAlign: "center" }}>
          Criar anotação
        </ThemedText>
        <ThemedView>
          <ThemedInput
            placeholder="Digite o título..."
            value={dayNote.title}
            onChangeText={handleTitleChange}
          />
          <ThemedInput
            placeholder="Digite a anotação..."
            value={dayNote.note}
            onChangeText={handleNoteChange}
            isMultiline={true}
            numberOfLines={4}
          />
        </ThemedView>
        <ThemedTouchableOpacity
          label="Salvar"
          onPress={() =>
            Toast.show({
              type: ALERT_TYPE.SUCCESS,
              title: "Anotação salva!",
              textBody: "Sua anotação foi criada com sucesso.",
              autoClose: 2000,
            })
          }
          accessibilityHint="Salvar"
          icon={<Icon name={"floppy-o"} color={colors.primary} size={24} />}
          textType="subtitle"
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
  },
});
