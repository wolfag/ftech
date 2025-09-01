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
  label?: string;
  style?: {
    btn?: TouchableOpacityProps['style'];
    label?: TextProps['style'];
  };
  variant?: 'default' | 'small';
  Icon?: ReactElement;
};

const BaseStyle = {
  default: defaultStyles.pillButton,
  small: defaultStyles.pillButtonSmall,
};

const MyButton = ({
  label,
  style,
  variant = 'default',
  Icon,
  ...btnProps
}: Props) => {
  return (
    <TouchableOpacity
      {...btnProps}
      style={[styles.container, BaseStyle[variant], style?.btn]}
    >
      {Icon}
      {!!label && (
        <Text style={[defaultStyles.buttonText, style?.label]}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};

export default MyButton;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 10,
    flexDirection: 'row',
  },
});
