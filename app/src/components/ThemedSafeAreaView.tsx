import {
  SafeAreaView,
  SafeAreaViewProps,
} from "react-native-safe-area-context";
import colors from "../theme/colors";

export default function ThemedSafeAreaView(props: SafeAreaViewProps) {
  const backgroundColor = colors.background;
  return (
    <SafeAreaView
      style={[{ backgroundColor }, { flex: 1 }, props.style]}
      {...props}
    />
  );
}
