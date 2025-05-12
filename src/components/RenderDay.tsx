import React from "react";
import { GroupedNote } from "../../app";
import ThemedView from "./ThemedView";
import ThemedText from "./ThemedText";
import { FlatList, StyleSheet } from "react-native";
import Details from "./Details";
import { useTheme } from "../context/ThemeContext";

export default function RenderDay({ item }: { item: GroupedNote }) {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  return (
    <>
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
    </>
  );
}

const getStyles = (colors: ReturnType<typeof useTheme>["colors"]) =>
  StyleSheet.create({
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
