import { StatusBar } from "expo-status-bar";
import { ThemedSafeAreaView } from "../src/components/ThemedSafeAreaView";
import { ThemedText } from "../src/components/ThemedText";

const daysOfWeek = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

export default function Weeks() {
  const today = new Date();
  const weekDay = daysOfWeek[today.getDay()];
  return (
    <ThemedSafeAreaView>
      <ThemedText type="title">12u3127</ThemedText>
      <ThemedText type="default">asdffdfasfasdfsdfsdfasdfre.</ThemedText>
      <StatusBar style="auto" />
    </ThemedSafeAreaView>
  );
}
