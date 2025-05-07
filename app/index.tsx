import axios from "axios";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { router } from "expo-router";
import { IWeek } from "../types/week";
import { useLoading } from "../src/context/LoadingContext";
import { INote } from "../types/note";
import ThemedSafeAreaView from "../src/components/ThemedSafeAreaView";
import ThemedView from "../src/components/ThemedView";
import ThemedText from "../src/components/ThemedText";
import ThemedTouchableOpacity from "../src/components/ThemedTouchableOpacity";
import Icon from "../src/components/Icon";
import { useTheme } from "../src/context/ThemeContext";
import CurrentWeekFlatList from "../src/components/CurrentWeekFlatList";

const API_URL = "https://project-api-woad.vercel.app";

export interface GroupedNote {
  day: string;
  notes: INote[];
}

export default function Week() {
  const [weekNote, setWeekNote] = useState({} as IWeek);
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const { showLoading, hideLoading, reload } = useLoading();

  useEffect(() => {
    async function fetchWeekNotes() {
      showLoading();
      const url = `${API_URL}/api/notes/week`;
      try {
        const response = await axios.get(url);
        setWeekNote(response.data.week);
      } catch (error) {
        console.log("Error: ", error);
      }
      hideLoading();
    }
    fetchWeekNotes();
  }, [reload]);

  return (
    <ThemedSafeAreaView
      style={{ paddingBottom: 64, backgroundColor: colors.background, flex: 1 }}
    >
      {weekNote.notes ? (
        <>
          <ThemedText type="title" style={[styles.title]}>
            Semana Atual
          </ThemedText>
          <CurrentWeekFlatList notes={weekNote.notes} />
        </>
      ) : (
        <ThemedView style={styles.emptyContainer}>
          <ThemedText type="title">Semana sem notas...</ThemedText>
          <ThemedText type="subtitle">Tente começar criando uma!</ThemedText>
          <ThemedTouchableOpacity
            onPress={() => router.navigate("/create")}
            borderStyle={colors.border}
          >
            <ThemedView style={{ flexDirection: "row", gap: 8 }}>
              <Icon name="pencil" size={24} color={colors.text} />
              <ThemedText type="subtitle">Criar nota</ThemedText>
            </ThemedView>
          </ThemedTouchableOpacity>
        </ThemedView>
      )}
    </ThemedSafeAreaView>
  );
}

const getStyles = (colors: ReturnType<typeof useTheme>["colors"]) =>
  StyleSheet.create({
    title: {
      textAlign: "center",
      marginVertical: 16,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      gap: 32,
    },
  });
