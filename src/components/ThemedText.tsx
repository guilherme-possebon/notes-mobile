import { Text, type TextProps, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";

export type ThemedTextProps = TextProps & {
  type?:
    | "default"
    | "title"
    | "defaultSemiBold"
    | "subtitle"
    | "link"
    | "small"
    | "smallSemiBold";
};

export default function ThemedText({
  style,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const { colors } = useTheme();
  const color = colors.text;
  const styles = getStyles(colors);

  return (
    <Text
      style={[
        { color },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        type === "small" ? styles.small : undefined,
        type === "smallSemiBold" ? styles.smallSemiBold : undefined,

        style,
      ]}
      {...rest}
    />
  );
}

const getStyles = (colors: ReturnType<typeof useTheme>["colors"]) =>
  StyleSheet.create({
    default: {
      fontSize: 16,
      lineHeight: 24,
    },
    defaultSemiBold: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: "600",
    },
    title: {
      fontSize: 32,
      fontWeight: "bold",
      lineHeight: 32,
    },
    subtitle: {
      fontSize: 20,
      fontWeight: "semibold",
    },
    link: {
      lineHeight: 30,
      fontSize: 16,
      color: colors.link,
    },
    small: {
      fontSize: 12,
      lineHeight: 16,
    },
    smallSemiBold: {
      fontSize: 12,
      lineHeight: 16,
      fontWeight: "600",
    },
  });
