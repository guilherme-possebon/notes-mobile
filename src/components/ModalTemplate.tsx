import React from "react";
import {
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Modal from "react-native-modal";
import { useTheme } from "../context/ThemeContext";
import ThemedTouchableOpacity from "./ThemedTouchableOpacity";
import Icon from "./Icon";

interface IModal {
  children: React.ReactNode;
  hideModal: () => void;
  modalVisible: boolean;
  hightValueToReduce?: number;
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function ModalTemplate({
  children,
  hideModal,
  modalVisible,
  hightValueToReduce,
}: IModal) {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  return (
    <Modal
      isVisible={modalVisible}
      hasBackdrop={false}
      animationIn={"zoomIn"}
      onBackdropPress={hideModal}
      onSwipeComplete={hideModal}
      swipeDirection="down"
    >
      <TouchableWithoutFeedback>
        <View style={styles.backdrop}>
          <TouchableWithoutFeedback>
            <View
              style={[
                styles.modalView,
                {
                  width: SCREEN_WIDTH - 20,
                  height: hightValueToReduce
                    ? SCREEN_HEIGHT - hightValueToReduce
                    : SCREEN_HEIGHT,
                },
              ]}
            >
              <ThemedTouchableOpacity
                containerStyle={styles.icon}
                onPress={hideModal}
              >
                <Icon name={"remove"} color={colors.text} size={24} />
              </ThemedTouchableOpacity>
              {children}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const getStyles = (colors: ReturnType<typeof useTheme>["colors"]) =>
  StyleSheet.create({
    backdrop: {
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
    },
    icon: {
      position: "absolute",
      right: 0,
      padding: 8,
    },
  });
