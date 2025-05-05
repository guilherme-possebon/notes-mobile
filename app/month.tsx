import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { FlatList, View } from "react-native";
import axios from "axios";
import ThemedSafeAreaView from "./src/components/ThemedSafeAreaView";
import ThemedText from "./src/components/ThemedText";
import { IWeeks } from "../types/weeks";
import { useTheme } from "./src/context/ThemeContext";

const API_URL = "https://project-api-woad.vercel.app";

export default function Month() {
  const [weeks, setWeeks] = useState<IWeeks[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { colors } = useTheme();

  useEffect(() => {
    axios
      .get(`${API_URL}/api/notes/weeks`)
      .then((response) => {
        setWeeks(response.data.weeks);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setLoading(false));
  }, []);

  const renderWeek = ({ item }: { item: IWeeks }) => (
    <View style={{ marginBottom: 16 }}>
      <ThemedText>ID: {item.id}</ThemedText>
      <ThemedText>Início: {item.start_date}</ThemedText>
      <ThemedText>Final: {item.end_date}</ThemedText>
    </View>
  );

  return (
    <ThemedSafeAreaView
      style={{ flex: 1, padding: 16, backgroundColor: colors.background }}
    >
      <StatusBar style="auto" />
      <FlatList
        data={weeks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderWeek}
        ListEmptyComponent={() => (
          <ThemedText>
            {loading ? "Carregando semanas..." : "Nenhuma semana disponível."}
          </ThemedText>
        )}
      />
    </ThemedSafeAreaView>
  );
}
