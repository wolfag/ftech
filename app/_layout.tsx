import Colors from '@/constants/Colors';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Link, Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { DevToolsBubble } from 'react-native-react-query-devtools';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import 'react-native-reanimated';
import { TouchableOpacity, View } from 'react-native';
import UserInactivity from '@/context/UserInactivity';

const EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY =
  process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const queryClient = new QueryClient();

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

  const { isSignedIn, isLoaded } = useAuth();
  const segments = useSegments();

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

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    const isAuthGroup = segments[0] === '(authenticated)';

    if (isSignedIn && !isAuthGroup) {
      router.replace('/(authenticated)/(tabs)/home');
    } else {
      router.replace('/');
    }
  }, [isSignedIn]);

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
      <Stack.Screen
        name='verify/[email]'
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
        name='(authenticated)/(tabs)'
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='(authenticated)/crypto/[id]'
        options={{
          title: '',
          headerLeft: () => (
            <Ionicons
              name='arrow-back'
              size={34}
              color={Colors.dark}
              onPress={router.back}
            />
          ),
          headerLargeTitle: true,
          headerTransparent: true,
          headerRight: () => (
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <TouchableOpacity>
                <Ionicons
                  name='notifications-outline'
                  color={Colors.dark}
                  size={30}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name='star-outline' color={Colors.dark} size={30} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name='(authenticated)/(modals)/lock'
        options={{ headerShown: false, animation: 'none' }}
      />
      <Stack.Screen
        name='(authenticated)/(modals)/account'
        options={{
          presentation: 'transparentModal',
          animation: 'fade',
          title: '',
          headerTransparent: true,
          headerLeft: () => (
            <Ionicons
              onPress={router.back}
              name='close-outline'
              size={34}
              color={'#fff'}
            />
          ),
        }}
      />
    </Stack>
  );
}

export default function RootLayoutNav() {
  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <QueryClientProvider client={queryClient}>
        <UserInactivity>
          <InitialLayout />
        </UserInactivity>
        <DevToolsBubble queryClient={queryClient} />
      </QueryClientProvider>
    </ClerkProvider>
  );
}
