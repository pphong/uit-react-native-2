import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { Text, View } from "react-native";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(auths)" options={{ headerShown: false }} />
        <Stack.Screen name="(axios)" options={{ headerShown: false }} />
        <Stack.Screen name="(props)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
      <Toast
        config={{
          success: ({ text1, text2, ...rest }) => (
            <View
              style={{
                height: 60,
                width: "90%",
                backgroundColor: "#b7d1bf",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 8,
              }}
            >
              <Text style={{ color: "green", fontWeight: "bold" }}>
                {text1}
              </Text>
              <Text style={{ color: "green" }}>{text2}</Text>
            </View>
          ),
        }}
      />
    </ThemeProvider>
  );
}
