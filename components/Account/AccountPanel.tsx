import Colors from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text, View, StyleSheet } from 'react-native';
import ActionItem from './ActionItem';
import Panel from './Panel';

const AccountPanel = () => {
  return (
    <Panel>
      <ActionItem
        Icon={<Ionicons name='log-out' size={24} color={'#fff'} />}
        label='Log out'
      />
      <ActionItem
        Icon={<Ionicons name='person' size={24} color={'#fff'} />}
        label='Account'
      />
      <ActionItem
        Icon={<Ionicons name='bulb' size={24} color={'#fff'} />}
        label='Learn'
      />
      <ActionItem
        Icon={<Ionicons name='megaphone' size={24} color={'#fff'} />}
        label='Inbox'
        Tail={
          <View style={styles.tag}>
            <Text style={styles.numberTag}>14</Text>
          </View>
        }
      />
    </Panel>
  );
};

export default AccountPanel;

const styles = StyleSheet.create({
  tag: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 10,
    borderRadius: 10,
    justifyContent: 'center',
  },
  numberTag: {
    color: '#fff',
    fontSize: 12,
  },
});
