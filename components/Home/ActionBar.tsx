import Colors from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/build/Ionicons';
import { StyleSheet, View, ViewStyle } from 'react-native';
import CircleButton from '../CircleButton';

import { Feather } from '@expo/vector-icons';
import Dropdown from '../Dropdown';
import { useBalanceStore } from '@/store/balanceStore';

type Props = {
  style?: ViewStyle;
};

const ActionBar = ({ style }: Props) => {
  const runTransaction = useBalanceStore().runTransaction;

  const onAdd = () => {
    runTransaction({
      id: Math.random().toString(),
      title: 'Added money',
      amount: Math.floor(Math.random() * 1000) * (Math.random() > 0.5 ? 1 : -1),
      date: new Date(),
    });
  };

  return (
    <View style={[styles.container, style]}>
      <CircleButton
        label='Add'
        Icon={<Ionicons name='add' size={30} color={Colors.dark} />}
        onPress={onAdd}
      />
      <CircleButton
        label='Exchange'
        Icon={<Ionicons name='refresh' size={30} color={Colors.dark} />}
      />
      <CircleButton
        label='Details'
        Icon={<Ionicons name='list' size={30} color={Colors.dark} />}
      />

      <Dropdown
        options={[
          {
            key: 'statement',
            title: 'Statement',
            icon: {
              ios: {
                name: 'list.bullet.rectangle.fill',
                pointSize: 24,
              },
            },
            onPress: () => {},
          },
          {
            key: 'converter',
            title: 'Converter',
            icon: {
              ios: {
                name: 'coloncurrencysign.arrow.circlepath',
                pointSize: 24,
              },
            },
            onPress: () => {},
          },
          {
            key: 'background',
            title: 'Background',
            icon: {
              ios: {
                name: 'photo.fill',
                pointSize: 24,
              },
            },
            onPress: () => {},
          },
          {
            key: 'account',
            title: 'Add new account',
            icon: {
              ios: {
                name: 'plus.rectangle.on.folder.fill',
                pointSize: 24,
              },
            },
            onPress: () => {},
          },
        ]}
      >
        <CircleButton
          label='More'
          Icon={<Feather name='more-horizontal' size={24} color='black' />}
        />
      </Dropdown>
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
