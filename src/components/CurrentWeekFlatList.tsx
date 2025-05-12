import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { ICurrentWeek } from "../../types/currentWeek";
import { GroupedNote } from "../../app";
import RenderDay from "./RenderDay";

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

  return (
    <>
      <FlatList
        data={groupedNotes}
        renderItem={({ item }) => <RenderDay item={item} />}
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
  });
