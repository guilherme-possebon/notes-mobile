import React, { useState, useRef } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  LayoutAnimation,
} from "react-native";
import ThemedView from "./ThemedView";
import ThemedText from "./ThemedText";
import Icon from "./Icon";
import { INote } from "../../types/note";
import { useTheme } from "../context/ThemeContext";
import { usePathname, useRouter } from "expo-router";
import { useOptions } from "../context/OptionsContext";

export default function Details({
  title,
  note,
  created_at,
  updated_at,
  id,
}: INote) {
  const { colors } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const styles = getStyles(colors);
  const rotation = useRef(new Animated.Value(0)).current;
  const router = useRouter();
  const { optionsInfo } = useOptions();
  const pathname = usePathname();

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

  function showOptionsModal() {
    optionsInfo({ id, title, note, created_at, updated_at, pathname });
    router.push("/options");
  }

  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  return (
    <TouchableOpacity
      style={styles.container}
      onLongPress={showOptionsModal}
      onPress={toggleDetails}
      activeOpacity={0.8}
    >
      <ThemedView>
        <ThemedView
          style={[
            styles.header,
            {
              borderBottomLeftRadius: isVisible ? 0 : 16,
              borderBottomRightRadius: isVisible ? 0 : 16,
              borderBottomWidth: isVisible ? StyleSheet.hairlineWidth : 1,
            },
          ]}
        >
          <ThemedText type="subtitle" style={styles.title}>
            {title}
          </ThemedText>
          <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
            <ThemedText>
              <Icon name="chevron-down" color={colors.border} size={20} />
            </ThemedText>
          </Animated.View>
        </ThemedView>
      </ThemedView>

      {isVisible && (
        <ThemedView style={styles.details}>
          <ThemedText type="default" style={styles.note}>
            {note}
          </ThemedText>
        </ThemedView>
      )}
    </TouchableOpacity>
  );
}

const getStyles = (colors: ReturnType<typeof useTheme>["colors"]) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      marginVertical: 8,
      shadowColor: colors.divider,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 4,
      borderRadius: 16,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderColor: colors.border,
      borderWidth: 1,
      padding: 16,
      borderRadius: 16,
    },
    title: {
      flex: 1,
      fontSize: 18,
      fontWeight: "600",
      marginRight: 12,
    },
    details: {
      padding: 12,
      borderColor: colors.border,
      borderWidth: 1,
      borderTopWidth: 0,
      borderBottomLeftRadius: 16,
      borderBottomRightRadius: 16,
    },
    note: {
      color: colors.text,
      fontSize: 14,
      lineHeight: 20,
    },
  });
