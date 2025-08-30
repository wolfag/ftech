import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { Link, useLocalSearchParams } from 'expo-router';
import { Fragment, useEffect, useState } from 'react';
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  isClerkAPIResponseError,
  useSignIn,
  useSignUp,
} from '@clerk/clerk-expo';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const CELL_COUNT = 6;
const autoComplete = Platform.select<TextInputProps['autoComplete']>({
  android: 'sms-otp',
  default: 'one-time-code',
});

const OTPPage = () => {
  const { email } = useLocalSearchParams<{
    email: string;
  }>();

  const { signIn } = useSignIn();
  const { signUp, setActive } = useSignUp();

  const [code, setCode] = useState('');
  const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
  const [codeFieldProps, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  const verifyCode = async () => {
    try {
      await signUp?.attemptEmailAddressVerification?.({ code });

      if (signUp?.status === 'complete') {
        console.log({ session: signUp?.createdSessionId });
        await setActive?.({ session: signUp?.createdSessionId });
      } else {
        console.error(JSON.stringify(signUp, null, 2));
      }
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        Alert.alert('Error', error.errors[0].longMessage);
      }
    }
  };

  useEffect(() => {
    if (code.length !== CELL_COUNT) {
      return;
    }

    verifyCode();
  }, [code]);

  return (
    <View style={defaultStyles.container}>
      <Text style={defaultStyles.header}>6-digit code</Text>
      <Text style={defaultStyles.descriptionText}>
        Code sent to <Text style={{ fontWeight: 'bold' }}>{email}</Text> unless
        you already have an account
      </Text>

      <CodeField
        ref={ref}
        {...codeFieldProps}
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={code}
        onChangeText={setCode}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType='number-pad'
        textContentType='oneTimeCode'
        autoComplete={autoComplete}
        renderCell={({ index, symbol, isFocused }) => (
          <Fragment key={index}>
            <View
              onLayout={getCellOnLayoutHandler(index)}
              style={[styles.cellRoot, isFocused && styles.focusCell]}
            >
              <Text style={styles.cellText}>
                {symbol || (isFocused && <Cursor />)}
              </Text>
            </View>
            {index === 2 && (
              <View key={`separator-${index}`} style={styles.separator} />
            )}
          </Fragment>
        )}
      />

      <Link href={'/login'} replace asChild>
        <TouchableOpacity>
          <Text style={defaultStyles.textLink}>
            Already have an account? Log in
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default OTPPage;

const styles = StyleSheet.create({
  codeFieldRoot: {
    marginVertical: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    gap: 12,
  },
  cellRoot: {
    width: 45,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
  },
  cellText: {
    color: '#000',
    fontSize: 36,
    textAlign: 'center',
  },
  focusCell: {
    paddingBottom: 8,
  },
  separator: {
    height: 2,
    width: 10,
    backgroundColor: Colors.gray,
    alignSelf: 'center',
  },
});
