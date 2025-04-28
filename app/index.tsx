import axios from "axios";
import { useEffect, useState } from "react";
import { IWeek } from "../types/week";
import Details from "./src/components/Details";
import ThemedTouchableOpacity from "./src/components/ThemedTouchableOpacity";
import { router } from "expo-router";
import colors from "./src/theme/colors";
import { StyleSheet } from "react-native";
import ThemedSafeAreaView from "./src/components/ThemedSafeAreaView";
import ThemedText from "./src/components/ThemedText";
import ThemedView from "./src/components/ThemedView";
import Icon from "./src/components/Icon";
import { useLoading } from "./src/context/LoadingContext";

const daysOfWeek = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

var API_URL = "http://192.168.3.81:3000";

export default function Week() {
  const [weekNote, setWeekNote] = useState({} as IWeek);
  const { showLoading, hideLoading } = useLoading();
  useEffect(() => {
    async function weekNotes() {
      const url = `${API_URL}/api/notes/week`;
      showLoading();
      try {
        const response = await axios.get(url);
        setWeekNote(response.data.week);
      } catch (error) {
        console.log("Error: ", error);
      }
      hideLoading();
    }
    weekNotes();
  }, []);

  return (
    <ThemedSafeAreaView>
      {weekNote ? (
        weekNote.notes?.map((note) => (
          <>
            <Details
              title={note.title}
              note={note.note}
              id={note.id}
              created_at={note.created_at}
              updated_at={note.updated_at}
            />
            <ThemedText type="subtitle">{note.title}</ThemedText>
            <ThemedText>{note.note}</ThemedText>
          </>
        ))
      ) : (
        <>
          <ThemedView style={[styles.container]}>
            <ThemedView>
              <ThemedText type="title">Semana sem notas...</ThemedText>
              <ThemedText type="subtitle">
                Tente começar criando uma!
              </ThemedText>
            </ThemedView>
            <ThemedTouchableOpacity
              label="Criar nota"
              accessibilityHint="Criar nota"
              textType="subtitle"
              icon={<Icon name={"pencil"} size={24} color={colors.primary} />}
              onPress={() => router.navigate("/create")}
            />
          </ThemedView>
        </>
      )}
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 32,
  },
});
