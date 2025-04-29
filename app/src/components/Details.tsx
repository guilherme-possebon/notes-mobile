import React, { useState, useRef } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import ThemedView from "./ThemedView";
import ThemedText from "./ThemedText";
import Icon from "./Icon";
import colors from "../theme/colors";
import { INote } from "../../../types/note";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function Details({ title, note, created_at }: INote) {
  const [isVisible, setIsVisible] = useState(false);
  const rotation = useRef(new Animated.Value(0)).current;

  const toggleDetails = () => {
    const toValue = isVisible ? 0 : 1;

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    Animated.timing(rotation, {
      toValue,
      duration: 250,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();

    setIsVisible(!isVisible);
  };

  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity onPress={toggleDetails} style={styles.header}>
        <ThemedText type="subtitle" style={styles.title}>
          {title}
        </ThemedText>
        <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
          <ThemedText>
            <Icon name="chevron-down" color={colors.border} size={20} />
          </ThemedText>
        </Animated.View>
      </TouchableOpacity>

      {isVisible && (
        <ThemedView style={styles.details}>
          <ThemedText type="default" style={styles.note}>
            {note}
          </ThemedText>
        </ThemedView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.background,
    borderRadius: 16,
    marginVertical: 8,
    borderColor: colors.divider,
    borderWidth: 1,
    shadowColor: colors.divider,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
    marginRight: 12,
  },
  details: {
    marginTop: 12,
    padding: 12,
  },
  note: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 20,
  },
});
