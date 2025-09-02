import { useAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { MMKV } from 'react-native-mmkv';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const storage = new MMKV({
//   id: 'inactivity-storage',
// });

const RecordTimeKey = 'startTime';
const INACTIVITY_TIME_EXCEED = 3000;

type Props = {
  children: React.ReactNode;
};
const UserInactivity = ({ children }: Props) => {
  const appState = useRef(AppState.currentState);
  const router = useRouter();

  const { isSignedIn } = useAuth();

  const recordStartTime = () => {
    // storage.set(RecordTimeKey, Date.now());
    AsyncStorage.setItem(RecordTimeKey, Date.now().toString());
  };

  useEffect(() => {
    const handleAppStateChange = async (nextAppState: AppStateStatus) => {
      console.log('handleAppStateChange', nextAppState);
      if (nextAppState === 'background') {
        recordStartTime();
      } else if (
        nextAppState === 'active' &&
        appState.current.match(/background/)
      ) {
        // const previousTime = storage.contains(RecordTimeKey)
        //   ? storage.getNumber(RecordTimeKey) || 0
        //   : 0;
        const previousTime = parseInt(
          (await AsyncStorage.getItem(RecordTimeKey)) || '0',
        );
        const elapsed = Date.now() - previousTime;

        if (elapsed > INACTIVITY_TIME_EXCEED && isSignedIn) {
          router.replace('/(authenticated)/(modals)/lock');
        }
      }
      appState.current = nextAppState;
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      subscription.remove();
    };
  }, []);

  return children;
};

export default UserInactivity;
