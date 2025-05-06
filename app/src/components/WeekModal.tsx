import React from "react";
import { IWeek } from "../../../types/week";
import { useTheme } from "../context/ThemeContext";
import CurrentWeekFlatList from "./CurrentWeekFlatList";
import { Dimensions, Modal, StyleSheet } from "react-native";
import ThemedView from "./ThemedView";
import Icon from "./Icon";
import ThemedTouchableOpacity from "./ThemedTouchableOpacity";

interface IWeekModal extends IWeek {
  hideModal: () => void;
  modalVisible: boolean;
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function WeekModal({
  id,
  notes,
  start_date,
  end_date,
  hideModal,
  modalVisible,
}: IWeekModal) {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          hideModal();
        }}
      >
        <ThemedView style={[styles.centeredView]}>
          <ThemedView style={styles.modalView}>
            <ThemedTouchableOpacity
              containerStyle={styles.icon}
              onPress={() => hideModal()}
            >
              <Icon name={"remove"} color={colors.text} size={24} />
            </ThemedTouchableOpacity>
            <CurrentWeekFlatList notes={notes} />
          </ThemedView>
        </ThemedView>
      </Modal>
    </>
  );
}

const getStyles = (colors: ReturnType<typeof useTheme>["colors"]) =>
  StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    modalView: {
      backgroundColor: colors.background,
      borderRadius: 16,
      paddingTop: 52,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      width: SCREEN_WIDTH - 20,
      height: SCREEN_HEIGHT,
    },
    icon: {
      position: "absolute",
      right: 0,
      padding: 8,
    },
  });
