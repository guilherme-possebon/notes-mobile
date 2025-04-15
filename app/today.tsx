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

export default function Home() {
  const today = new Date();
  const weekDay = daysOfWeek[today.getDay()];
  return (
    <ThemedSafeAreaView>
      <ThemedText type="title">{weekDay}</ThemedText>
      <ThemedText type="default">Learn more about us here.</ThemedText>
      <StatusBar style="auto" />
    </ThemedSafeAreaView>
  );
}
