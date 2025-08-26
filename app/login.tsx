import CountryInput from '@/components/CountryInput';
import IconButton from '@/components/IconButton';
import MyButton from '@/components/MyButton';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

enum SignInType {
  Phone,
  Email,
  Google,
  Apple,
}

const LoginPage = () => {
  const [countryCode, setCountryCode] = useState('+84');
  const [phoneNumber, setPhoneNumber] = useState('');
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 80 : 0;
  const router = useRouter();

  const onSignIn = (type: SignInType) => {};

  return (
    <KeyboardAvoidingView
      style={defaultStyles.flex1}
      behavior='padding'
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <View style={defaultStyles.container}>
        <Text style={defaultStyles.header}>Welcome back</Text>
        <Text style={defaultStyles.descriptionText}>
          Enter the phone number associated with your account
        </Text>
        <View style={styles.inputContainer}>
          <CountryInput value={countryCode} onValueChange={setCountryCode} />
          <TextInput
            style={[styles.input, defaultStyles.flex1]}
            placeholder='Mobile number'
            placeholderTextColor={Colors.gray}
            keyboardType='numeric'
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>

        <MyButton
          label='Continue'
          style={{
            btn: [
              phoneNumber !== '' ? styles.enabled : styles.disabled,
              { marginBottom: 20 },
            ],
          }}
          onPress={() => onSignIn(SignInType.Phone)}
        />

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <View style={styles.line} />
          <Text style={styles.orText}>or</Text>
          <View style={styles.line} />
        </View>

        <IconButton
          label='Continue with email'
          Icon={<Ionicons name='mail' size={24} color={'#000'} />}
          onPress={() => onSignIn(SignInType.Email)}
        />
        <IconButton
          label='Continue with Google'
          Icon={<Ionicons name='logo-google' size={24} color={'#000'} />}
          onPress={() => onSignIn(SignInType.Google)}
        />
        <IconButton
          label='Continue with Apple'
          Icon={<Ionicons name='logo-apple' size={24} color={'#000'} />}
          onPress={() => onSignIn(SignInType.Apple)}
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
