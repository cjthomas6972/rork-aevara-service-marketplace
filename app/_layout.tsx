import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider } from "@/contexts/AuthContext";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function RootLayoutNav() {
  return (
    <Stack screenOptions={{ headerBackTitle: "Back" }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="client/browse" options={{ headerShown: false }} />
      <Stack.Screen name="client/booking" options={{ headerShown: false }} />
      <Stack.Screen name="client/dashboard" options={{ headerShown: false }} />
      <Stack.Screen name="provider/dashboard" options={{ headerShown: false }} />
      <Stack.Screen name="marketer/dashboard" options={{ headerShown: false }} />
      <Stack.Screen name="admin/dashboard" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <GestureHandlerRootView>
          <RootLayoutNav />
        </GestureHandlerRootView>
      </AuthProvider>
    </QueryClientProvider>
  );
}
