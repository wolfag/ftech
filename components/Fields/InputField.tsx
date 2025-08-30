import Colors from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/build/MaterialIcons';
import { useState } from 'react';
import { useController } from 'react-hook-form';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';

type Props = Omit<
  TextInputProps,
  'onChangeText' | 'onBlur' | 'value' | 'ref' | 'style'
> & {
  control: any;
  name: string;
  label?: string;
  style?: ViewStyle;
};
const InputField = ({ control, name, label, style, ...rest }: Props) => {
  const {
    field,
    fieldState: { invalid, isTouched, error },
  } = useController({ name, control });

  console.log({ error });

  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={style}>
      {!!label && <Text style={[styles.label]}>{label}</Text>}
      <TextInput
        {...rest}
        style={[
          styles.input,
          isFocus && styles.inputFocus,
          invalid && isTouched && styles.inputNegative,
        ]}
        onChangeText={field.onChange}
        onBlur={() => {
          field.onBlur();
          setIsFocus(false);
        }}
        onFocus={() => {
          setIsFocus(true);
        }}
        value={field.value}
        ref={field.ref}
      />
      {isTouched && invalid && !!error?.message && (
        <View style={styles.errorContainer}>
          <MaterialIcons name='error-outline' size={16} color='red' />
          <Text style={styles.errorText}>{error?.message}</Text>
        </View>
      )}
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    fontSize: 20,
    marginRight: 10,
    borderWidth: 0.1,
    borderColor: Colors.gray,
    shadowColor: Colors.gray,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  inputFocus: {
    borderColor: 'green',
    borderWidth: 0.4,
    shadowColor: 'green',
  },
  inputNegative: {
    borderColor: 'red',
    borderWidth: 0.4,
    shadowColor: 'red',
  },
  label: {
    marginBottom: 4,
    fontSize: 24,
    color: Colors.dark,
  },
  errorText: {
    color: 'red',
    marginLeft: 5,
  },
  errorContainer: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
