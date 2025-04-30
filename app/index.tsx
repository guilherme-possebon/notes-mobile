import axios from "axios";
import { useEffect, useState } from "react";
import { StyleSheet, FlatList, Dimensions } from "react-native";
import { router } from "expo-router";
import { IWeek } from "../types/week";
import { useLoading } from "./src/context/LoadingContext";
import { INote } from "../types/note";
import ThemedSafeAreaView from "./src/components/ThemedSafeAreaView";
import ThemedView from "./src/components/ThemedView";
import ThemedText from "./src/components/ThemedText";
import Details from "./src/components/Details";
import ThemedTouchableOpacity from "./src/components/ThemedTouchableOpacity";
import Icon from "./src/components/Icon";
import colors from "./src/theme/colors";

const API_URL = "https://project-api-woad.vercel.app";

interface GroupedNote {
  day: string;
  notes: INote[];
}

export default function Week() {
  const [weekNote, setWeekNote] = useState({} as IWeek);
  const { showLoading, hideLoading, reload } = useLoading();

  useEffect(() => {
    showLoading();
    async function fetchWeekNotes() {
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

  const groupedNotes: GroupedNote[] =
    weekNote.notes?.reduce((acc, note) => {
      const noteDate = new Date(note.created_at);
      const dayKey = noteDate.toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "2-digit",
        month: "2-digit",
      });
      const existingGroup = acc.find((group) => group.day === dayKey);
      if (existingGroup) {
        existingGroup.notes.push(note);
      } else {
        acc.push({ day: dayKey, notes: [note] });
      }
      return acc;
    }, [] as GroupedNote[]) || [];

  const renderDay = ({ item }: { item: GroupedNote }) => (
    <ThemedView style={styles.dayContainer}>
      <ThemedText type="title" style={styles.dayHeader}>
        {item.day.charAt(0).toUpperCase() + item.day.slice(1)}
      </ThemedText>
      <FlatList
        data={item.notes}
        renderItem={({ item: note }) => (
          <Details
            key={note.id}
            title={note.title}
            note={note.note}
            id={note.id}
            created_at={note.created_at}
            updated_at={note.updated_at}
          />
        )}
        keyExtractor={(note) => note.id.toString()}
        scrollEnabled={false}
      />
    </ThemedView>
  );

  return (
    <ThemedSafeAreaView
      style={{ paddingBottom: 64, backgroundColor: colors.background }}
    >
      <ThemedText type="title" style={[styles.title]}>
        Semana Atual
      </ThemedText>
      {weekNote.notes && groupedNotes.length > 0 ? (
        <FlatList
          data={groupedNotes}
          renderItem={renderDay}
          keyExtractor={(item) => item.day}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <ThemedView style={styles.emptyContainer}>
          <ThemedText type="title">Semana sem notas...</ThemedText>
          <ThemedText type="subtitle">Tente começar criando uma!</ThemedText>
          <ThemedTouchableOpacity
            label="Criar nota"
            accessibilityHint="Criar nota"
            textType="subtitle"
            icon={<Icon name="pencil" size={24} color={colors.primary} />}
            onPress={() => router.navigate("/create")}
          />
        </ThemedView>
      )}
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    marginVertical: 16,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 16,
  },
  dayContainer: {
    padding: 16,
    borderRadius: 8,
    borderColor: colors.divider,
    borderWidth: 1,
    shadowColor: colors.divider,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  dayHeader: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 32,
  },
});
