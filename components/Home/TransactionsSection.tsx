import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { useBalanceStore } from '@/store/balanceStore';
import { Transaction } from '@/store/type';
import { Ionicons } from '@expo/vector-icons';
import { useCallback } from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';

type Props = {
  style?: ViewStyle;
};

const TransactionsSection = ({ style }: Props) => {
  const transactions = useBalanceStore().transactions;

  const renderItem = useCallback(({ id, title, amount, date }: Transaction) => {
    const isIncome = amount > 0;

    return (
      <View key={id} style={styles.item}>
        <View
          style={[
            styles.circle,
            { backgroundColor: isIncome ? '#00ca9238' : '#ff6f7029' },
          ]}
        >
          <Ionicons
            name={isIncome ? 'add' : 'remove'}
            size={24}
            color={isIncome ? 'green' : 'red'}
          />
        </View>
        <View style={defaultStyles.flex1}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.date}>{date.toLocaleString()}</Text>
        </View>
        <Text>{amount} €</Text>
      </View>
    );
  }, []);

  return (
    <View style={style}>
      <Text style={defaultStyles.header}>Transactions</Text>

      <View style={styles.transactions}>
        {transactions.length === 0 && (
          <Text style={{ padding: 14, color: Colors.gray }}>
            No transactions
          </Text>
        )}

        {transactions.slice(0, 5).map(renderItem)}
      </View>
    </View>
  );
};

export default TransactionsSection;

const styles = StyleSheet.create({
  transactions: {
    padding: 14,
    backgroundColor: '#fff',
    borderRadius: 16,
    gap: 20,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  title: { fontWeight: '400' },
  date: { color: Colors.gray, fontSize: 12 },
});
