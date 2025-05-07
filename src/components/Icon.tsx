import { FontAwesome } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

type TIcon = {
  name: string | any;
  color?: string;
  size?: number;
};

export default function Icon({ name, color, size = 40 }: TIcon) {
  const { colors } = useTheme();
  const iconColor = color || colors.text;
  return <FontAwesome name={name} size={size} color={iconColor} />;
}
