import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useForm } from 'react-hook-form';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import InputField from '../Fields/InputField';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export type NameFormData = {
  firstName: string;
  lastName: string;
};

type Props = {
  style?: ViewStyle;
  defaultValues?: NameFormData;
  onSubmit: (data: NameFormData) => void;
};

const formSchema = yup.object({
  firstName: yup.string().required('Please input your first name'),
  lastName: yup.string().required('Please input your last name'),
});

const EditNameForm = ({ style, defaultValues, onSubmit }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<NameFormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      ...defaultValues,
    },
    resolver: yupResolver(formSchema),
  });

  return (
    <View style={[styles.editRow, style]}>
      <InputField control={control} name='firstName' placeholder='First Name' />
      <InputField control={control} name='lastName' placeholder='Last Name' />

      <TouchableOpacity onPress={handleSubmit(onSubmit)}>
        <Ionicons name='checkmark-outline' size={24} color={'#fff'} />
      </TouchableOpacity>
    </View>
  );
};

export default EditNameForm;

const styles = StyleSheet.create({
  container: { flexDirection: 'row', gap: 6 },
  fullNameText: { fontSize: 26, color: '#fff' },
  editRow: {
    flex: 1,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  inputField: {
    // width: 140,
    // height: 44,
    // borderWidth: 1,
    // borderColor: Colors.gray,
    // borderRadius: 8,
    // padding: 10,
    // backgroundColor: '#fff',
  },
});
