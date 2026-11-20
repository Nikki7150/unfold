import { DarkTheme, DefaultTheme, ThemeProvider, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';
import { ShareIntentProvider } from 'expo-share-intent';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { useEffect } from 'react';
import { requestNotificationPermission, scheduleDailyReminder } from '@/utils/notifications';

SplashScreen.preventAutoHideAsync();

export const unstable_settings = { anchor: '(tabs)' };

export default function RootLayout() {
  const colorScheme = useColorScheme();
  useEffect(() => {
    const setupNotifications = async () => {
      if (await requestNotificationPermission()) {
        await scheduleDailyReminder(20, 42);
      }
    };
    void setupNotifications();
  }, []);

  return (
    <ShareIntentProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AnimatedSplashOverlay />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="shareintent" options={{ presentation: 'modal' }} />
        </Stack>
      </ThemeProvider>
    </ShareIntentProvider>
  );
}