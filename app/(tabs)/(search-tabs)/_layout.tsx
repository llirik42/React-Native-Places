import { Stack } from 'expo-router';


export default function SearchLayout() {
  return (
    <Stack screenOptions={{
      headerTitleAlign: "center",
    }}>
      <Stack.Screen name="index" options={{
        headerTitle: "Поиск локации"
      }} />
      <Stack.Screen name="locationChoice" options={{
        headerTitle: "Выбор локации"
      }} />
      <Stack.Screen name="(location-info-tabs)" options={{
        headerTitle: "Информация о локации"
      }} />
    </Stack>
  )
}
