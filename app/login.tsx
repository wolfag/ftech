import MyButton from '@/components/MyButton';
import SigninForm, { SigninFormData } from '@/components/Signin';
import Spacer from '@/components/Spacer';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { useSignIn } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const LoginPage = () => {
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 80 : 0;

  const { signIn, setActive } = useSignIn();

  const signInByGoogle = async () => {};

  const signInByApple = async () => {};

  const signInByEmail = async (data: SigninFormData) => {
    try {
      await signIn!.create({
        identifier: data.email,
        password: data.password,
      });
      if (signIn?.status === 'complete') {
        setActive?.({ session: signIn?.createdSessionId });
      } else {
        console.error(JSON.stringify(signIn, null, 2));
      }
    } catch (error) {
      console.error({ error });
    }
  };

  const onContinue = (data: SigninFormData) => {
    signInByEmail(data);
  };

  return (
    <KeyboardAvoidingView
      style={defaultStyles.flex1}
      behavior='padding'
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <View style={defaultStyles.container}>
        <Text style={defaultStyles.header}>Welcome back</Text>
        <Text style={defaultStyles.descriptionText}>
          {`Enter the email associated with your account`}
        </Text>

        <SigninForm style={{ marginTop: 20 }} onSubmit={onContinue} />

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <View style={styles.line} />
          <Text style={styles.orText}>or</Text>
          <View style={styles.line} />
        </View>

        <MyButton
          label='Continue with Google'
          Icon={<Ionicons name='logo-google' size={24} color={'#000'} />}
          onPress={signInByGoogle}
          style={{
            btn: {
              backgroundColor: '#fff',
            },
            label: {
              color: '#000',
            },
          }}
        />
        <Spacer />
        <MyButton
          label='Continue with Apple'
          Icon={<Ionicons name='logo-apple' size={24} color={'#000'} />}
          onPress={signInByApple}
          style={{
            btn: {
              backgroundColor: '#fff',
            },
            label: {
              color: '#000',
            },
          }}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginPage;

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
  orText: {
    color: Colors.gray,
    fontSize: 20,
  },
  line: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.gray,
  },
  socialBtn: {
    ...defaultStyles.pillButton,
    flexDirection: 'row',
    gap: 16,
    marginTop: 20,
    backgroundColor: '#fff',
  },
});
