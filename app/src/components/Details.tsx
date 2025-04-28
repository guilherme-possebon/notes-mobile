import React, { useState } from "react";
import { INote } from "../../../types/note";
import { StyleSheet, TouchableOpacity } from "react-native";
import ThemedView from "./ThemedView";
import ThemedText from "./ThemedText";

export default function Details({ title, note, created_at }: INote) {
  const [isVisible, setIsVisible] = useState(false);

  function toggleDetails() {
    setIsVisible(!isVisible);
  }
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle">{title}</ThemedText>

      <TouchableOpacity onPress={toggleDetails}>icone</TouchableOpacity>
      {isVisible && (
        <>
          <ThemedView style={styles.details}>
            <ThemedText type="defaultSemiBold">{note}</ThemedText>
          </ThemedView>
        </>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  details: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#f1f1f1",
    borderRadius: 5,
  },
});
