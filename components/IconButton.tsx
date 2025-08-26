import { defaultStyles } from '@/constants/Styles';
import { ReactElement } from 'react';
import {
  StyleSheet,
  Text,
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

type Props = Omit<TouchableOpacityProps, 'style'> & {
  label: string;
  Icon: ReactElement;
  style?: {
    btn?: TouchableOpacityProps['style'];
    label?: TextProps['style'];
  };
};

const IconButton = ({ label, Icon, style, ...btnProps }: Props) => {
  return (
    <TouchableOpacity {...btnProps} style={[styles.container, style?.btn]}>
      {Icon}
      <Text style={[styles.label, style?.label]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  container: {
    ...defaultStyles.pillButton,
    flexDirection: 'row',
    gap: 16,
    marginTop: 20,
    backgroundColor: '#fff',
  },
  label: {
    ...defaultStyles.buttonText,
    color: '#000',
  },
});
