import React, { useCallback, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { FlatList } from "react-native";
import axios from "axios";
import ThemedSafeAreaView from "../src/components/ThemedSafeAreaView";
import ThemedText from "../src/components/ThemedText";
import { IWeeks } from "../types/weeks";
import { useTheme } from "../src/context/ThemeContext";
import ThemedView from "../src/components/ThemedView";
import ThemedTouchableOpacity from "../src/components/ThemedTouchableOpacity";
import { format } from "date-fns";
import { IWeek } from "../types/week";
import WeekModal from "../src/components/WeekModal";
import { useLoading } from "../src/context/LoadingContext";
import { useFocusEffect } from "expo-router";

const API_URL = "https://project-api-woad.vercel.app";

export default function Month() {
  const [weeks, setWeeks] = useState<IWeeks[]>([]);
  const [week, setWeek] = useState<IWeek>({} as IWeek);
  const [modalVisible, setModalVisible] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [selectedWeekId, setSelectedWeekId] = useState<number | null>(null);
  const { showLoading, hideLoading, reload, resetReload } = useLoading();

  function showModal() {
    setModalVisible(true);
    setIsDisabled(true);
  }

  function hideModal() {
    setModalVisible(false);
    setIsDisabled(false);
    setSelectedWeekId(null);
  }

  const { colors } = useTheme();

  function getWeekById(id: number) {
    showLoading();
    return axios
      .get(`${API_URL}/api/notes/weeks/${id}`)
      .then((response) => {
        setWeek(response.data.week);
        showModal();
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => hideLoading());
  }
  useEffect(() => {
    showLoading();
    axios
      .get(`${API_URL}/api/notes/weeks`)
      .then((response) => {
        setWeeks(response.data.weeks);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => hideLoading());
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (selectedWeekId !== null && reload) {
        getWeekById(selectedWeekId).finally(() => {
          resetReload(); // ← Adiciona isso aqui
        });
      }
    }, [reload, selectedWeekId])
  );

  const renderWeek = ({ item }: { item: IWeeks }) => (
    <ThemedTouchableOpacity
      onPress={() => {
        setSelectedWeekId(item.id);
        getWeekById(item.id);
      }}
      borderColor={colors.border}
      containerStyle={{
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 12,
        backgroundColor: colors.background,
        borderWidth: 1,
        borderColor: colors.border,
        marginBottom: 12,
      }}
      isDisabled={isDisabled}
    >
      <ThemedView style={{ gap: 12 }}>
        <ThemedText style={{ textAlign: "center" }}>
          Semana: {item.id}
        </ThemedText>
        <ThemedView style={{ flexDirection: "row", gap: 12 }}>
          <ThemedText>
            Início: {format(new Date(item.start_date), "dd/MM/yyyy")}
          </ThemedText>
          <ThemedText>
            Final: {format(new Date(item.end_date), "dd/MM/yyyy")}
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ThemedTouchableOpacity>
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
      />

      {week && (
        <WeekModal
          id={week.id}
          created_at={week.created_at}
          updated_at={week.updated_at}
          start_date={week.start_date}
          end_date={week.end_date}
          notes={week.notes}
          modalVisible={modalVisible}
          hideModal={() => hideModal()}
        />
      )}
    </ThemedSafeAreaView>
  );
}
