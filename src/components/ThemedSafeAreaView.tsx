import { type ViewProps } from 'react-native';
import { colors } from '../theme/colors';
import { SafeAreaView } from 'react-native-safe-area-context';

export function ThemedSafeAreaView(props: ViewProps) {
  const backgroundColor = colors.background;
  return (
    <SafeAreaView
      style={[
        { backgroundColor },
        { flex: 1, padding: 16 },
        props.style,
      ]}
      {...props}
    />
  );
}
