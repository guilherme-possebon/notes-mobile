import { Tabs } from "expo-router";
import { colors } from "../src/theme/colors";
import { Icon } from "../src/components/Icon";

export default function Layout() {
  return (
    <Tabs
      initialRouteName="today"
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
        tabBarActiveTintColor: colors.primary,
        tabBarStyle: { backgroundColor: colors.background },
      }}
    >
      <Tabs.Screen
        name="today"
        options={{
          title: "Today",
          tabBarIcon: ({ color }) => (
            <Icon name="home" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="weeks"
        options={{
          title: "Weeks",
          tabBarIcon: ({ color }) => (
            <Icon name="list" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
