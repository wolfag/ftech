import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { ReactElement } from 'react';
import {
  StyleSheet,
  Text,
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';

type Props = Omit<TouchableOpacityProps, 'style'> & {
  label?: string;
  Icon: ReactElement;
  style?: {
    btn?: TouchableOpacityProps['style'];
    label?: TextProps['style'];
  };
};

const CircleButton = ({ label, Icon, style, ...btnProps }: Props) => {
  return (
    <TouchableOpacity {...btnProps} style={[styles.container, style?.btn]}>
      <View style={styles.circle}>{Icon}</View>
      <Text style={[styles.label, style?.label]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default CircleButton;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 10,
  },
  label: {
    ...defaultStyles.buttonText,
    color: '#000',
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
