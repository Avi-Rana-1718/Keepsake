import { Stack } from "expo-router";
import { LogBox, View } from "react-native";
import { StatusBar } from "expo-status-bar"

LogBox.ignoreAllLogs(true);

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light"/>
      <Stack 
        screenOptions={{
          contentStyle: {
            // backgroundColor: "#131314",
          }
        }}
        >
        <Stack.Screen name="(tabs)" options={{
          headerShown: false
        }}/>
        <Stack.Screen name="+not-found" options={{
          headerShown: false
        }} />
        <Stack.Screen name="auth" options={{
          headerShown: false
        }} />
        <Stack.Screen name="notifications" options={{
          headerShown: false
        }} />
      </Stack>
    </>
  );
}
