import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'expo-router';
import { useForm } from 'react-hook-form';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import InputField from '../Fields/InputField';
import MyButton from '../MyButton';
import Spacer from '../Spacer';
import { signupSchema } from './schema';
import { SignupFormData } from './type';

type Props = {
  style?: ViewStyle;
  defaultValues?: SignupFormData;
  onSubmit: (data: SignupFormData) => void;
};

const SignupForm = ({ style, defaultValues, onSubmit }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<SignupFormData>({
    defaultValues: {
      // countryCode: '',
      // phone: '',
      email: '',
      password: '',
      ...defaultValues,
    },
    resolver: yupResolver(signupSchema),
  });

  return (
    <View style={style}>
      <InputField
        control={control}
        name='email'
        label='Email address'
        keyboardType='email-address'
        placeholder='email'
      />
      <Spacer />
      {/* <InputField
        control={control}
        name='phone'
        label='Phone number'
        keyboardType='phone-pad'
        placeholder='phone'
      /> */}
      {/* <Spacer /> */}
      <InputField
        control={control}
        name='password'
        label='Password'
        placeholder='password'
        secureTextEntry
      />
      <Spacer />

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
        onPress={handleSubmit(onSubmit)}
        style={{
          btn: [
            isValid ? styles.enabled : styles.disabled,
            { marginBottom: 20 },
          ],
        }}
      />
    </View>
  );
};

export default SignupForm;

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
