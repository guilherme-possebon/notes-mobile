import { View, type ViewProps } from "react-native";
import { useTheme } from "../context/ThemeContext";

export default function ThemedView(props: ViewProps) {
  const { colors } = useTheme();
  const backgroundColor = colors.background;
  return <View style={[{ backgroundColor }, props.style]} {...props} />;
}
