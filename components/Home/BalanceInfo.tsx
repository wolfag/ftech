import Colors from '@/constants/Colors';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import MyButton from '../MyButton';
import { useBalanceStore } from '@/store/balanceStore';

type Props = {
  style?: ViewStyle;
};

const BalanceInfo = ({ style }: Props) => {
  const balance = useBalanceStore().balance();
  return (
    <View style={[styles.container, style]}>
      <View style={styles.row}>
        <Text style={styles.balance}>{balance}</Text>
        <Text style={styles.currency}>€</Text>
      </View>

      <MyButton
        label='Accounts'
        style={{
          btn: {
            backgroundColor: Colors.lightGray,
            marginVertical: 20,
          },
          label: {
            color: Colors.dark,
          },
        }}
        variant='small'
      />
    </View>
  );
};

export default BalanceInfo;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 10,
  },
  balance: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  currency: {
    fontSize: 20,
    fontWeight: '500',
  },
});
