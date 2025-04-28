import React from "react";
import Loading from "./src/components/Loading";
import { LoadingProvider, useLoading } from "./src/context/LoadingContext";
import AppTabs from "./src/components/AppTabs";
import ThemedSafeAreaView from "./src/components/ThemedSafeAreaView";
import { AlertNotificationRoot } from "react-native-alert-notification";

const LayoutContent = () => {
  const { isLoading } = useLoading();
  const tabs = [
    {
      name: "create",
      title: "Criar",
      iconName: "pencil-square-o",
    },
    { name: "index", title: "Semana", iconName: "home" },
    { name: "weeks", title: "Mês", iconName: "calendar" },
  ];

  return (
    <ThemedSafeAreaView>
      <AppTabs tabs={tabs} initialRouteName="index" />
      {isLoading && <Loading />}
    </ThemedSafeAreaView>
  );
};

export default function Layout() {
  return (
    <LoadingProvider>
      <AlertNotificationRoot>
        <LayoutContent />
      </AlertNotificationRoot>
    </LoadingProvider>
  );
}
