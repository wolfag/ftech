import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { StyleSheet, View, ViewStyle } from 'react-native';
import InputField from '../Fields/InputField';
import MyButton from '../MyButton';
import Spacer from '../Spacer';
import { signinSchema } from './schema';
import { SigninFormData } from './type';

type Props = {
  style?: ViewStyle;
  defaultValues?: SigninFormData;
  onSubmit: (data: SigninFormData) => void;
};

const SignupForm = ({ style, defaultValues, onSubmit }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<SigninFormData>({
    defaultValues: {
      email: '',
      password: '',
      ...defaultValues,
    },
    resolver: yupResolver(signinSchema),
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
      <InputField
        control={control}
        name='password'
        label='Password'
        placeholder='password'
        secureTextEntry
      />
      <Spacer />

      <View style={defaultStyles.flex1} />

      <MyButton
        label='Continue'
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
