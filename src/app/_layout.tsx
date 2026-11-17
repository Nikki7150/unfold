import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';
import { useEffect } from 'react';
import { useShareIntent } from "expo-share-intent";
import { getArticleTitle } from '@/utils/getArticleTitle';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import AppTabs from '@/components/app-tabs';

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const { hasShareIntent, shareIntent } = useShareIntent();
  useEffect(() => {
    const webUrl = shareIntent?.webUrl;

    if (hasShareIntent && webUrl) {
      getArticleTitle(webUrl).then((result) => {
        console.log('TITLE: ', result.title);
        console.log('URL: ', result.url);
      });
    }
  }, [hasShareIntent, shareIntent]);

  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      <AppTabs />
    </ThemeProvider>
  );
}
