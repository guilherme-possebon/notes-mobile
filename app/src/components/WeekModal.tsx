import React from "react";
import ThemedText from "./ThemedText";
import { IWeek } from "../../../types/week";
import { useTheme } from "../context/ThemeContext";
import CurrentWeekFlatList from "./CurrentWeekFlatList";
import { Dimensions, StyleSheet } from "react-native";
import ThemedView from "./ThemedView";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function WeekModal({ id, notes, start_date, end_date }: IWeek) {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  return (
    <>
      <ThemedView style={[styles.modalContainer]}>
        <ThemedView style={[styles.modal]}>
          <ThemedText>{id}</ThemedText>
          <CurrentWeekFlatList notes={notes} />
          <ThemedText>{start_date}</ThemedText>
          <ThemedText>{end_date}</ThemedText>
        </ThemedView>
      </ThemedView>
    </>
  );
}

const getStyles = (colors: ReturnType<typeof useTheme>["colors"]) =>
  StyleSheet.create({
    modalContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      zIndex: 2,
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
      justifyContent: "center",
      alignItems: "center",
    },
    modal: {
      width: SCREEN_WIDTH - 40,
      height: SCREEN_HEIGHT - 70,
      backgroundColor: colors.success,
      marginBottom: 60,
    },
  });
