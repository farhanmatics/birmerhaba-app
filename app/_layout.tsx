import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Merriweather: require('../assets/fonts/MerriweatherSans-Regular.ttf'),
    Lato: require('../assets/fonts/Lato-Regular.ttf'),
    MajorMonoDisplay: require('../assets/fonts/MajorMonoDisplay-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="start" options={{ headerShown: false }} />
        <Stack.Screen name="Register" options={{ headerShown: false }} />
        <Stack.Screen name="Confirmation" options={{ headerShown: false }} />
        <Stack.Screen name="Login" options={{ headerShown: false }} />
        <Stack.Screen name="LoggedHome" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
