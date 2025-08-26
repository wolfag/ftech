import CountryInput from '@/components/CountryInput';
import MyButton from '@/components/MyButton';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { Link, useRouter } from 'expo-router';
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

const SignupPage = () => {
  const [countryCode, setCountryCode] = useState('+84');
  const [phoneNumber, setPhoneNumber] = useState('');
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 80 : 0;
  const router = useRouter();

  const onSignup = () => {};

  return (
    <KeyboardAvoidingView
      behavior='padding'
      style={defaultStyles.flex1}
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <View style={defaultStyles.container}>
        <Text style={defaultStyles.header}>Let's get started!</Text>
        <Text style={defaultStyles.descriptionText}>
          Enter your phone number. We will send you a confirmation code there
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
              phoneNumber !== '' ? styles.enabled : styles.disabled,
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
