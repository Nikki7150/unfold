import { DarkTheme, DefaultTheme, ThemeProvider, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';
import { ShareIntentProvider } from 'expo-share-intent';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { useEffect } from 'react';
import { requestNotificationPermission, scheduleDailyReminder } from '@/utils/notifications';
import { useSettingsStore } from '@/store/useSettingsStore';

SplashScreen.preventAutoHideAsync();

export const unstable_settings = { anchor: '(tabs)' };

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const reminderHour = useSettingsStore((s) => s.reminderHour);
  const reminderMinute = useSettingsStore((s) => s.reminderMinute);
  useEffect(() => {
    const setupNotifications = async () => {
      if (await requestNotificationPermission()) {
        await scheduleDailyReminder(reminderHour, reminderMinute);
      }
    };
    void setupNotifications();
  }, [reminderHour, reminderMinute]);

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