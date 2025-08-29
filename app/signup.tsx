import MyButton from '@/components/MyButton';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { isEmail } from '@/utils';
import { isClerkAPIResponseError, useSignUp } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const SignupPage = () => {
  const [username, setUsername] = useState('');

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 80 : 0;
  const router = useRouter();

  const { signUp } = useSignUp();

  const signupByPhone = async () => {
    try {
      await signUp?.create({
        phoneNumber: username,
      });

      signUp?.preparePhoneNumberVerification();

      router.push({
        pathname: '/verify/[username]',
        params: {
          username,
        },
      });
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
      if (isClerkAPIResponseError(error)) {
        Alert.alert('Error', error.errors[0].longMessage);
      }
    }
  };

  const signupByEmail = async () => {
    try {
      await signUp?.create({
        emailAddress: username,
      });

      signUp?.prepareEmailAddressVerification();

      router.push({
        pathname: '/verify/[username]',
        params: {
          username,
        },
      });
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
      if (isClerkAPIResponseError(error)) {
        Alert.alert('Error', error.errors[0].longMessage);
      }
    }
  };

  const onSignup = () => {
    if (!username.length) {
      return;
    }

    if (isEmail(username)) {
      signupByEmail();
    } else {
      signupByPhone();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior='padding'
      style={defaultStyles.flex1}
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <View style={defaultStyles.container}>
        <Text style={defaultStyles.header}>Let's get started!</Text>
        <Text style={defaultStyles.descriptionText}>
          Enter your credential. We will send you a confirmation code there
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, defaultStyles.flex1]}
            placeholder='Email or phone number'
            placeholderTextColor={Colors.gray}
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <Link href={'/login'} replace asChild>
          <TouchableOpacity>
            <Text style={defaultStyles.textLink}>
              Already have an account? Log in
            </Text>
          </TouchableOpacity>
        </Link>

        <View style={defaultStyles.flex1} />

        <MyButton
          label='Sign up'
          onPress={onSignup}
          style={{
            btn: [
              username !== '' ? styles.enabled : styles.disabled,
              { marginBottom: 20 },
            ],
          }}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignupPage;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 40,
    flexDirection: 'row',
  },
  input: {
    backgroundColor: Colors.lightGray,
    padding: 20,
    borderRadius: 16,
    fontSize: 20,
    marginRight: 10,
  },
  enabled: {
    backgroundColor: Colors.primary,
  },
  disabled: {
    backgroundColor: Colors.primaryMuted,
  },
});
