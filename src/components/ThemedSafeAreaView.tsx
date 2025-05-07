import {
  SafeAreaView,
  SafeAreaViewProps,
} from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";

export default function ThemedSafeAreaView(props: SafeAreaViewProps) {
  const { colors } = useTheme();
  const backgroundColor = colors.background;
  return (
    <SafeAreaView
      style={[{ backgroundColor }, { flex: 1 }, props.style]}
      {...props}
    />
  );
}
