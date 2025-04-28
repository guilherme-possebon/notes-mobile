import { View, type ViewProps } from "react-native";
import colors from "../theme/colors";

export default function ThemedView(props: ViewProps) {
  const backgroundColor = colors.background;
  return <View style={[{ backgroundColor }, props.style]} {...props} />;
}
