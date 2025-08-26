import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Link, Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function InitialLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  const router = useRouter();

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen
        name='signup'
        options={{
          title: '',
          headerBackTitle: '',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerLeft: () => (
            <Ionicons
              onPress={router.back}
              name='arrow-back'
              size={34}
              color={Colors.dark}
            />
          ),
        }}
      />
      <Stack.Screen
        name='login'
        options={{
          title: '',
          headerBackTitle: '',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerLeft: () => (
            <Ionicons
              onPress={router.back}
              name='arrow-back'
              size={34}
              color={Colors.dark}
            />
          ),
          headerRight: () => (
            <Link href={'/help'} asChild>
              <Ionicons name='help-circle' size={34} color={Colors.dark} />
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name='help'
        options={{ title: 'Help', presentation: 'modal' }}
      />
    </Stack>
  );
}

export default function RootLayoutNav() {
  return <InitialLayout />;
}
