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
    | "smallSemiBold"
    | "smallTitle";
  color?: string;
};

export default function ThemedText({
  style,
  type = "default",
  color,
  ...rest
}: ThemedTextProps) {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  return (
    <Text
      style={[
        { color: color ? color : colors.text },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        type === "small" ? styles.small : undefined,
        type === "smallSemiBold" ? styles.smallSemiBold : undefined,
        type === "smallTitle" ? styles.smallTitle : undefined,

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
    smallTitle: {
      fontSize: 24,
      fontWeight: "bold",
    },
    subtitle: {
      fontSize: 20,
      fontWeight: "semibold",
    },
    link: {
      lineHeight: 30,
      fontSize: 16,
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
