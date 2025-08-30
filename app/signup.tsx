import SignupForm, { SignupFormData } from '@/components/Signup';

import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { isClerkAPIResponseError, useSignUp } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const SignupPage = () => {
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 80 : 0;
  const router = useRouter();

  const { signUp } = useSignUp();

  const onSignup = async (data: SignupFormData) => {
    try {
      await signUp?.create({
        emailAddress: data.email,
        // phoneNumber: data.phone,
        password: data.password,
      });

      signUp?.prepareEmailAddressVerification({
        strategy: 'email_code',
      });

      router.push({
        pathname: '/verify/[email]',
        params: {
          email: data.email,
        },
      });
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
      if (isClerkAPIResponseError(error)) {
        Alert.alert('Error', error.errors[0].longMessage);
      }
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

        <SignupForm style={{ flex: 1, marginTop: 20 }} onSubmit={onSignup} />
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
