import Colors from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/build/Ionicons';
import { StyleSheet, View, ViewStyle } from 'react-native';
import CircleButton from '../CircleButton';

type Props = {
  style?: ViewStyle;
};

const ActionBar = ({ style }: Props) => {
  return (
    <View style={[styles.container, style]}>
      <CircleButton
        label='Add'
        Icon={<Ionicons name='add' size={30} color={Colors.dark} />}
      />
      <CircleButton
        label='Exchange'
        Icon={<Ionicons name='refresh' size={30} color={Colors.dark} />}
      />
      <CircleButton
        label='Details'
        Icon={<Ionicons name='list' size={30} color={Colors.dark} />}
      />
    </View>
  );
};

export default ActionBar;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
