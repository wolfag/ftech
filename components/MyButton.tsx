import { defaultStyles } from '@/constants/Styles';
import {
  Text,
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

type Props = Omit<TouchableOpacityProps, 'style'> & {
  label: string;
  style?: {
    btn?: TouchableOpacityProps['style'];
    label?: TextProps['style'];
  };
};

const MyButton = ({ label, style, ...btnProps }: Props) => {
  return (
    <TouchableOpacity
      {...btnProps}
      style={[defaultStyles.pillButton, style?.btn]}
    >
      <Text style={[defaultStyles.buttonText, style?.label]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default MyButton;
