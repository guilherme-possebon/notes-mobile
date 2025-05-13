import React from "react";
import Loading from "../src/components/Loading";
import { LoadingProvider, useLoading } from "../src/context/LoadingContext";
import AppTabs from "../src/components/AppTabs";
import ThemedSafeAreaView from "../src/components/ThemedSafeAreaView";
import ToastManager from "toastify-react-native";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider, useTheme } from "../src/context/ThemeContext";
import ThemedView from "../src/components/ThemedView";
import ThemedText from "../src/components/ThemedText";
import Icon from "../src/components/Icon";
import ThemedTouchableOpacity from "../src/components/ThemedTouchableOpacity";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import OptionsProvider from "../src/context/OptionsContext";
import OptionsButtonsProvider from "../src/context/OptionsButtonsContext";

interface IToastConfig {
  text1: string;
  text2: string;
}
const LayoutContent = () => {
  const { colors, theme, setTheme } = useTheme();
  const { isLoading } = useLoading();
  const insets = useSafeAreaInsets();

  const toastConfig = {
    success: ({ text1, text2 }: IToastConfig) => (
      <ThemedView
        style={{
          backgroundColor: colors.success,
          padding: 16,
          borderRadius: 12,
          flexDirection: "row",
          alignItems: "center",
          shadowColor: colors.success,
          shadowOpacity: 0.3,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 4,
          elevation: 4,
          zIndex: 999,
        }}
      >
        <Icon name="check" color={colors.toastText} size={24} />
        <ThemedView style={{ marginLeft: 12, flex: 1 }}>
          <ThemedText
            style={{
              color: colors.toastText,
              fontSize: 16,
              fontWeight: "700",
            }}
          >
            {text1}
          </ThemedText>
          {text2 && (
            <ThemedText
              style={{
                color: colors.toastText,
                fontSize: 14,
                marginTop: 4,
              }}
            >
              {text2}
            </ThemedText>
          )}
        </ThemedView>
      </ThemedView>
    ),

    error: ({ text1, text2 }: IToastConfig) => (
      <ThemedView
        style={{
          backgroundColor: colors.error,
          padding: 16,
          borderRadius: 12,
          flexDirection: "row",
          alignItems: "center",
          shadowColor: colors.error,
          shadowOpacity: 0.3,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 4,
          elevation: 4,
          zIndex: 999,
        }}
      >
        <Icon name="remove" color={colors.toastText} size={24} />
        <ThemedView style={{ marginLeft: 12, flex: 1 }}>
          <ThemedText
            style={{
              color: colors.toastText,
              fontSize: 16,
              fontWeight: "700",
            }}
          >
            {text1}
          </ThemedText>
          {text2 && (
            <ThemedText
              style={{
                color: colors.toastText,
                fontSize: 14,
                marginTop: 4,
              }}
            >
              {text2}
            </ThemedText>
          )}
        </ThemedView>
      </ThemedView>
    ),
  };
  const tabs = [
    {
      name: "create",
      title: "Criar",
      iconName: "pencil-square-o",
    },
    { name: "index", title: "Semana", iconName: "home" },
    { name: "month", title: "Mês", iconName: "calendar" },
  ];

  return (
    <ThemedSafeAreaView>
      <StatusBar />
      <ThemedView
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          position: "absolute",
          top: insets.top + 8,
          right: insets.right + 12,
          zIndex: 1,
        }}
      >
        {theme == "light" ? (
          <ThemedTouchableOpacity
            onPress={() => setTheme("dark")}
            containerStyle={{
              padding: 2,
            }}
            borderColor={colors.toastText}
            contentStyle={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Icon name={"moon-o"} color={colors.text} size={24} />
          </ThemedTouchableOpacity>
        ) : (
          <ThemedTouchableOpacity
            onPress={() => setTheme("light")}
            containerStyle={{
              padding: 2,
            }}
            borderColor={colors.toastText}
            contentStyle={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Icon name={"sun-o"} color={colors.text} size={24} />
          </ThemedTouchableOpacity>
        )}
      </ThemedView>
      <AppTabs tabs={tabs} initialRouteName="index" />
      {isLoading && <Loading />}
      <ToastManager useModal={true} config={toastConfig} />
    </ThemedSafeAreaView>
  );
};

export default function Layout() {
  return (
    <LoadingProvider>
      <OptionsProvider>
        <OptionsButtonsProvider>
          <ThemeProvider>
            <LayoutContent />
          </ThemeProvider>
        </OptionsButtonsProvider>
      </OptionsProvider>
    </LoadingProvider>
  );
}
