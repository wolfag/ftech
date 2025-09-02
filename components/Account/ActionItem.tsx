import Colors from '@/constants/Colors';
import { ReactElement } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  label: string;
  Icon: ReactElement;
  Tail?: ReactElement;
  onPress?: () => void;
};

const ActionItem = ({ label, Icon, Tail, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      {Icon}
      <Text style={styles.label}>{label}</Text>
      {Tail}
    </TouchableOpacity>
  );
};

export default ActionItem;

const styles = StyleSheet.create({
  btn: {
    padding: 14,
    flexDirection: 'row',
    gap: 20,
  },
  label: {
    color: '#fff',
    fontSize: 18,
    flex: 1,
  },
});
