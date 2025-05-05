import React, { useRef } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Animated,
} from "react-native";
import { Tabs } from "expo-router";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import Icon from "./Icon";
import { useTheme } from "../context/ThemeContext";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface IconProps {
  name: string;
  size: number;
  color: string;
}

interface TabItemProps {
  label: string;
  isFocused: boolean;
  onPress: () => void;
  icon: React.ReactNode;
}

interface TabConfig {
  name: string;
  title: string;
  iconName: string;
}

const TAB_WIDTH = SCREEN_WIDTH / 4;

const TabItem = ({ label, isFocused, onPress, icon }: TabItemProps) => {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const dotScale = useRef(new Animated.Value(isFocused ? 1 : 0)).current;
  const dotOpacity = useRef(new Animated.Value(isFocused ? 1 : 0)).current;

  const pressScale = useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.spring(dotScale, {
        toValue: isFocused ? 1 : 0,
        speed: 20,
        useNativeDriver: true,
      }),
      Animated.timing(dotOpacity, {
        toValue: isFocused ? 1 : 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isFocused]);

  const handlePressIn = () => {
    Animated.spring(pressScale, {
      toValue: 0.95,
      speed: 20,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(pressScale, {
      toValue: 1,
      speed: 20,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={styles.tabItem}
      accessibilityLabel={label}
      accessibilityHint={`Navigate to ${label} tab`}
      accessibilityRole="button"
      accessibilityState={{ selected: isFocused }}
    >
      <Animated.View
        style={[styles.tabContent, { transform: [{ scale: pressScale }] }]}
      >
        <Animated.View
          style={[
            styles.focusedIndicator,
            {
              backgroundColor: colors.text,
              transform: [{ scale: dotScale }],
              opacity: dotOpacity,
            },
          ]}
        />
        {icon}
        <Text
          style={[
            styles.tabLabel,
            {
              color: isFocused ? colors.text : colors.primary,
              fontWeight: isFocused ? "bold" : "normal",
            },
          ]}
        >
          {label}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

interface CustomTabBarProps extends BottomTabBarProps {
  tabs: TabConfig[];
}

const CustomTabBar = ({ state, navigation, tabs }: CustomTabBarProps) => {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  return (
    <View style={styles.tabBar}>
      <View style={[styles.topBorder, { backgroundColor: colors.primary }]} />
      <View style={styles.tabContainer}>
        {tabs.map((tab, index) => {
          const route = state.routes.find((r) => r.name === tab.name);
          const isFocused = route
            ? state.index === state.routes.indexOf(route)
            : false;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route?.key || tab.name,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(tab.name);
            }
          };

          const icon = (
            <Icon
              name={tab.iconName}
              size={24}
              color={isFocused ? colors.text : colors.primary}
            />
          );

          return (
            <TabItem
              key={tab.name}
              label={tab.title}
              isFocused={isFocused}
              onPress={onPress}
              icon={icon}
            />
          );
        })}
      </View>
    </View>
  );
};

const getStyles = (colors: ReturnType<typeof useTheme>["colors"]) =>
  StyleSheet.create({
    tabBar: {
      backgroundColor: colors.background,
      height: 70,
      borderTopWidth: 0,
      elevation: 4,
    },
    topBorder: {
      height: 4,
      width: "100%",
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      backgroundColor: colors.primary,
    },
    tabContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      height: 66,
    },
    tabItem: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    tabContent: {
      alignItems: "center",
      justifyContent: "center",
    },
    focusedIndicator: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginBottom: 4,
      backgroundColor: colors.text,
    },
    tabLabel: {
      fontSize: 12,
      marginTop: 4,
    },
  });

interface AppTabsProps {
  tabs: TabConfig[];
  initialRouteName?: string;
}

export default function AppTabs({ tabs, initialRouteName }: AppTabsProps) {
  const { colors } = useTheme();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
      }}
      initialRouteName={initialRouteName || tabs[0]?.name}
      tabBar={(props) => <CustomTabBar {...props} tabs={tabs} />}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ color }: { color: string }) => (
              <Icon name={tab.iconName} size={24} color={color} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
