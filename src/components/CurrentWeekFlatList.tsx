import React from "react";
import { GroupedNote } from "../../app";
import ThemedView from "./ThemedView";
import ThemedText from "./ThemedText";
import { Dimensions, FlatList, StyleSheet } from "react-native";
import Details from "./Details";
import { useTheme } from "../context/ThemeContext";
import { ICurrentWeek } from "../../types/currentWeek";

export default function CurrentWeekFlatList({ notes }: ICurrentWeek) {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const groupedNotes: GroupedNote[] =
    notes?.reduce((acc, note) => {
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
    <>
      <FlatList
        data={groupedNotes}
        renderItem={renderDay}
        keyExtractor={(item) => item.day}
        contentContainerStyle={styles.listContainer}
      />
    </>
  );
}

const getStyles = (colors: ReturnType<typeof useTheme>["colors"]) =>
  StyleSheet.create({
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
  });
