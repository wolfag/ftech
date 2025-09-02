import NumberPad from '@/components/Lock/NumberPad';
import Colors from '@/constants/Colors';
import { useUser } from '@clerk/clerk-expo';
import { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import * as LocalAuthentication from 'expo-local-authentication';

const OFFSET = 20;
const TIME = 80;
const CODE_LENGTH = 6;
const FAKE_CODE_ALLOW = '111111';

const LockModal = () => {
  const { user } = useUser();
  const codeLength = Array(CODE_LENGTH).fill(0);

  const router = useRouter();

  const firstName = user?.fullName || 'X';

  const [code, setCode] = useState<number[]>([]);

  const offset = useSharedValue(0);
  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));

  const onBiometricAuthPress = useCallback(async () => {
    const { success } = await LocalAuthentication.authenticateAsync();
    if (success) {
      router.replace('/(authenticated)/(tabs)/home');
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  }, []);

  const numberBackspace = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCode((prev) => prev.slice(0, -1));
  }, []);

  const onNumberPress = useCallback(
    (value: number) => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setCode((prev) => [...prev, value]);
    },
    [setCode],
  );

  useEffect(() => {
    if (code.length === CODE_LENGTH) {
      if (code.join('') === FAKE_CODE_ALLOW) {
        router.replace('/(authenticated)/(tabs)/home');
        setCode([]);
      } else {
        offset.value = withSequence(
          withTiming(-OFFSET, { duration: TIME / 2 }),
          withRepeat(withTiming(OFFSET, { duration: TIME }), 4, true),
          withTiming(0, { duration: TIME / 2 }),
        );
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        setCode([]);
      }
    }
  }, [code, setCode]);

  return (
    <SafeAreaView>
      <Text style={styles.greeting}>Welcome back, {firstName}</Text>

      <Animated.View style={[styles.codeView, style]}>
        {codeLength.map((_, index) => (
          <View
            key={index}
            style={[
              styles.codeEmpty,
              {
                backgroundColor: code[index]
                  ? Colors.primary
                  : Colors.lightGray,
              },
            ]}
          />
        ))}
      </Animated.View>

      <View>
        <NumberPad
          style={{ marginHorizontal: 80, marginBottom: 80 }}
          onBiometricAuthPress={onBiometricAuthPress}
          onNumberPress={onNumberPress}
          onNumberBackspace={code.length > 0 ? numberBackspace : undefined}
        />
        <Text
          style={{
            alignSelf: 'center',
            color: Colors.primary,
            fontWeight: '500',
            fontSize: 18,
          }}
        >
          Forgot your passcode?
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default LockModal;

const styles = StyleSheet.create({
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 80,
    alignSelf: 'center',
  },
  codeView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    marginVertical: 100,
  },
  codeEmpty: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  numbersView: {
    marginHorizontal: 80,
    gap: 60,
  },
  number: {
    fontSize: 32,
  },
});
